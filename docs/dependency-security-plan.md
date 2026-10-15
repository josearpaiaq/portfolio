# Dependency Security Plan

**Date:** 2026-10-14
**Sources:** GitHub Dependabot (10 open alerts on `master`) + `npm audit` on `develop` (16 findings, includes advisories newer than Dependabot's list).

## Summary

Only `next` (and `sharp`, which ships with it) affects the deployed site. Everything else is build/lint tooling that never runs in production. A single patch upgrade of Next.js plus a non-breaking `npm audit fix` clears all critical issues and most highs. The rest needs major upgrades (ESLint, Tailwind) that can wait.

## Findings

| Package                                          | Severity     | Origin                                     | Runs in prod?            | Fix                                                |
| ------------------------------------------------ | ------------ | ------------------------------------------ | ------------------------ | -------------------------------------------------- |
| `next` 16.3.0                                    | **critical** | direct                                     | yes                      | `16.4.1` (vulnerable range is `16.0.0 – 16.3.7`)   |
| `sharp` 0.35.3                                   | high         | via `next`                                 | yes (image optimization) | `>=0.35.5`, pulled in by `next@16.4.1`             |
| `brace-expansion`                                | high         | eslint, tailwind tooling                   | no                       | `npm audit fix`                                    |
| `js-yaml` 4.3.1                                  | high         | eslint 8                                   | no                       | `npm audit fix`                                    |
| `source-map-js`                                  | high         | postcss/tailwind                           | no                       | `npm audit fix`                                    |
| `fast-glob`, `eslint-import-resolver-typescript` | high         | eslint tooling                             | no                       | `npm audit fix`                                    |
| `glob` 10.3.10, `@next/eslint-plugin-next`       | high         | `eslint-config-next@14`                    | no                       | major: `eslint-config-next@16` (requires ESLint 9) |
| `braces`, `micromatch`, `chokidar`               | high         | `tailwindcss@3`                            | no                       | major: Tailwind v4 (no fix on v3)                  |
| `postcss-selector-parser`                        | moderate/low | `tailwindcss@3`, `@tailwindcss/typography` | no                       | none on 6.x; Tailwind v4 removes Tailwind's copy   |

### What the `next` advisories mean for this site

- **RCE in `next/og` `ImageResponse`**: relevant. The site has `opengraph-image.tsx` for home and blog posts. Both are prerendered at build time today, but the route still exists. Patch first.
- **Metadata image routes bypass `dynamicParams`**: relevant to the blog. `dynamicParams = false` is how draft posts return 404. A bypass could render the OG image (title) of a draft post.
- **RCE / SSRF in Image Optimization API**: probably low exposure, because on Netlify `/_next/image` is usually served by Netlify Image CDN rather than Next's optimizer. Patch regardless.
- **Cache poisoning in SSG/ISR**: possibly relevant, since the Netlify runtime serves prerendered pages.
- **RCE on Windows-hosted servers**, **dev server MCP endpoint leak**: not applicable to production (Netlify runs Linux; dev server only).

## Plan

### Phase 1 — Patch Next.js (do now, low risk)

1. `npm install next@16.4.1 @next/mdx@16.4.1`, keeping both on the same version.
2. `npm audit fix` without `--force`. It only bumps transitive deps within their semver ranges.
3. Verify:
   - `npm run build`, `npm run lint`, `npx tsc --noEmit` pass.
   - `npm audit` shows no `next`, `sharp`, `brace-expansion`, `js-yaml`, `source-map-js` or `fast-glob` findings.
   - `npm run start`: home, `/projects`, `/blog`, a blog post, `/feed.xml`, `/sitemap.xml` and both OG images return 200; an unknown blog slug returns 404.
   - Netlify deploy preview of `develop` loads, images render, and the contact form sends.
4. Merge to `master` so Dependabot closes the alerts.

> Do **not** run `npm audit fix --force`. It suggests downgrading `@tailwindcss/typography` to 0.5.4 and jumping to Tailwind v4 and `eslint-config-next@16` blindly.

### Phase 2 — ESLint 9 + `eslint-config-next@16` (dev-only, medium effort)

`eslint-config-next@16` has a peer dependency of `eslint >=9`, which means migrating `.eslintrc.json` to flat config (`eslint.config.mjs`). It also aligns lint rules with Next 16 (the current config is from Next 14). Clears `glob` and `@next/eslint-plugin-next`.

- Verify: `npm run lint` reports the same or only intended new warnings; the `prettier` integration still works.

### Phase 3 — Tailwind v4 (dev-only, large effort, optional)

The only way to clear `braces`, `micromatch` and `chokidar`, because v3 has no fixed release. It is a real migration: `tailwind.config.ts` moves to CSS `@theme`, the shadcn HSL tokens and the typography config (`--tw-prose-*` mapping) have to be ported, and the `tailwindcss-animate` and `@tailwindcss/typography` plugins move to `@plugin`. These packages only run during the build on trusted input, so this is a "when convenient" task, not a security emergency.

- Verify: visual check of every section in light and dark mode, plus blog post prose and code blocks, before and after.

### Accepted risk

`postcss-selector-parser` inside `@tailwindcss/typography@0.5.x` is pinned to `6.0.10` with no patched 6.x release. It only parses this project's own CSS at build time. Dismiss the Dependabot alert as "tolerable risk" if it remains after Phase 3.
