# Portfolio Renovation — Implementation Plan

Spec: `docs/superpowers/specs/2026-06-10-portfolio-renovation-design.md`

## Goal

Ship the approved renovation: working contact form on Netlify, dark/light lime-zinc theme, new About section, restructured Experience/Projects, footer, SEO package — losing zero content.

## Tasks

- [x] 1. Deployment fix: remove `output: 'export'` (next.config.mjs), netlify.toml → `publish = ".next"` + `@netlify/plugin-nextjs` → Verified: `npm run build` lists `ƒ /api/contact`
- [x] 2. Theme foundation: `next-themes`, lime/zinc CSS variables (spec §4) in globals.css, `ThemeProvider` + `ThemeToggle` → Verified: builds; toggle persistence to confirm in owner visual pass
- [x] 3. Layout shell: observer → `activeSection` in store (drop bg-color swapping), snap desktop-only, `SnappingPage` `min-h-svh` + `snap-start` variant, delete `background.mp4` → Verified: builds; scroll behavior to confirm in owner visual pass
- [x] 4. Navbar + Footer: active-link indicator, theme toggle, Contact CTA button; Footer (email + GitHub + LinkedIn + ©) mounted in Contact section → Verified
- [x] 5. Hero: new copy (spec §7.1), mono kicker, CTAs, lime glow, photo slot → Verified in rendered HTML
- [x] 6. About section: `sectionsConfig.about`, bio draft + quick-facts card with `[PENDING]` markers (owner fills facts) → Verified: `id="about"` renders with PENDING markers
- [x] 7. Experience: vertical stack, achievement rewrite + typo fixes, drop `IJobs.width` → Verified
- [x] 8. Projects: `status`/`featured` fields, 3 featured cards + 5 expandable compact cards, `next/image`, remove embla carousel + deps → Verified: all 8 in constants, embla uninstalled
- [x] 9. Contact polish: themed inputs, fix validation message, honeypot (client + API) → Verified: real send returned Resend id; honeypot returns fake 200; invalid body returns 422
- [x] 10. SEO + cleanup + final verification: metadata/robots/sitemap/OG image/JSON-LD, stray zod import out, `cn()` swaps, lint switched to ESLint CLI (next lint removed in Next 16), reduced-motion in FadeIn → Verified: build + lint pass; meta/JSON-LD present; robots/sitemap/og-image return 200

## Done When

- [x] Build + lint clean (owner still owes a visual pass: both themes, mobile + desktop scroll)
- [x] Contact form sends end-to-end in dev (deploy preview pending: owner must set `RESEND_API_KEY` + `CONTACT_EMAIL_TO` in Netlify)
- [x] All 8 projects, both jobs, CV download, and media links present — nothing lost

## Notes

- Tasks 5–8 are independent of each other (all depend on 2–3).
- Owner inputs pending (non-blocking, `[PENDING]`/`[TODO]` markers until answered): bio facts (motivation, hobby, fun fact, languages) and optional job metrics.
- Owner deploy actions: `RESEND_API_KEY` + `CONTACT_EMAIL_TO` in Netlify dashboard.
