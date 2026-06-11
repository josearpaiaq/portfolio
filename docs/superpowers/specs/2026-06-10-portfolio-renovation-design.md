# Portfolio Renovation — Design Spec

**Date:** 2026-06-10
**Status:** Approved in brainstorming (visual direction, structure, content plan, SEO/cleanup scope)
**Related:** `ROADMAP.md` (Phases 1–4 of this round; Phases 5–6 out of scope)

## 1. Goal

Turn the current single-page portfolio into a personal marketing tool that builds
immediate trust with recruiters and clients. Constraints set by the owner:

- **No information is lost** — all jobs, all 8 projects, all tags, CV download, and media links remain.
- **The contact form stays** (react-hook-form + zod + Resend) and must actually work in production.
- New **light/dark mode** feature; **no availability badge**; **no photo for now** (slot reserved).

## 2. Decisions log (from brainstorming)

| Decision | Choice |
| --- | --- |
| Production contact form | Netlify **Next.js runtime** (drop static export), API route unchanged |
| Scope | Full renovation: ROADMAP Phases 1–4 |
| Visual direction | **B — Dark & Electric**: near-black canvas, lime accent, monospace details |
| Availability badge | **Removed** (user request) |
| Theming | Light + dark themes, system default, navbar toggle, persisted |
| Photo | None for now; typographic hero with slot for later |
| Background video | **Removed** (6.4 MB); replaced by CSS radial lime glow |
| Experience layout | Vertical stack (drop horizontal scroll + `IJobs.width` vw hack) |
| Projects layout | 3 featured large cards + 5 compact expandable cards (all 8 kept) |
| Scroll snapping | Desktop only; mobile scrolls freely |

## 3. Architecture & deployment

- `next.config.mjs`: remove `output: 'export'`. No other config needed.
- `netlify.toml`:
  ```toml
  [build]
    command = "npm run build"
    publish = ".next"

  [[plugins]]
    package = "@netlify/plugin-nextjs"
  ```
  (Exact publish dir per current `@netlify/plugin-nextjs` docs — verify at implementation.)
- `src/app/api/contact/route.ts` ships as-is (plus honeypot check, §7.6). Runs as a Netlify serverless function via the runtime.
- **Owner action items at deploy:** set `RESEND_API_KEY` and `CONTACT_EMAIL_TO` env vars in the Netlify dashboard; test the form on the deploy preview.

## 4. Theming system

- `next-themes` with shadcn convention: `attribute="class"`, `defaultTheme="system"`, `enableSystem`, persisted to localStorage. `suppressHydrationWarning` on `<html>`.
- All theme values live as shadcn CSS variables in `globals.css` (`:root` = light, `.dark` = dark) so `src/components/ui/*` pick them up automatically. Replace every hardcoded `teal-*` class in custom components/views with semantic tokens.

| Token | Dark | Light |
| --- | --- | --- |
| `--background` | zinc-950 `#0a0a0a` | zinc-50 `#fafafa` |
| `--foreground` | zinc-50 | zinc-900 |
| `--muted-foreground` | zinc-400 | zinc-600 |
| `--border` / `--input` | zinc-800 | zinc-200 |
| `--card` | zinc-900 | white |
| `--primary` (accent) | lime-400 `#a3e635` | lime-400 (fills) |
| `--primary-foreground` | near-black | near-black |
| `--ring` | lime-400 | lime-700 |

- Accent **text** on light backgrounds uses lime-700 `#4d7c0f` for WCAG contrast; lime-400 is reserved for fills with dark text on both themes.
- Hero glow: CSS `radial-gradient(ellipse at 70% 20%, rgba(163,230,53,0.10), transparent)` (slightly stronger on light).
- Monospace details (kickers, chips, labels) use the existing Geist Mono variable font.

## 5. Page structure & UX

Section order: **Home → About (new) → Experience → Projects → Tech Stack → Contact (+ Footer)**.

- `sectionsConfig` gains an `about` entry; per-section `styles.background` machinery is removed (single themed canvas).
- The `IntersectionObserver` in `page.tsx` now writes `activeSection` to the Zustand store (instead of swapping background colors). `topVisible` behavior unchanged.
- **Navbar:** links (Home, About, Experience, Projects, Stack) with an active-section indicator (lime underline) driven by `activeSection`; theme toggle button; **Contact** as a lime-filled CTA button. Mobile menu keeps current behavior.
- **SnappingPage:** `min-h-svh md:h-screen md:snap-center md:snap-always` — full-screen snap on `md+`, natural free scroll on mobile so content never clips. `<main>` keeps `overflow-y-scroll` but applies `snap-y snap-mandatory` only at `md+`. Sections that can grow taller than one viewport (Projects) use the `snap-start` + `md:min-h-screen` variant (§7.4).
- **Footer (new):** bottom of the Contact section — clickable email, GitHub, LinkedIn (from `mediaLinks`), `© {year} Jose Arpaia Quintero`.
- Back-to-top button (`MoreOptionsComponent`) stays.

## 6. Component inventory

**New:** `ThemeProvider` (wraps next-themes), `ThemeToggle`, `SectionHeading` (mono kicker + title), `About` view, `Footer`, `CompactProjectCard`.

**Redesigned:** `Home` (hero), `JobCard` (vertical stack, achievement bullets), `ProjectCard` (featured variant: image, status badge, chips, `Live ↗` + `GitHub` actions, hover lift), `Navbar` (active indicator, toggle, CTA), `Contact` (themed inputs — remove `bg-white !text-slate-800` overrides).

**Touched:** `page.tsx`, `SnappingPage`, `store` (add `activeSection`), `constants`, `types`, `globals.css`, `layout.tsx`.

## 7. Content spec

### 7.1 Hero (Home)

```
FULL STACK DEVELOPER                       ← mono kicker, tracking-widest, muted
Jose Arpaia Quintero                       ← H1
I build fast, accessible web and mobile apps
with React, Next.js and TypeScript.        ← value prop, accent on tech names

[View my work]  [Download CV]   get in touch →
```

`View my work` scrolls to projects; `Download CV` keeps `downloadCV()`; `get in touch →` scrolls to contact. Tech chips row stays. Layout reserves a right-side slot for a future photo.

### 7.2 About (new)

Two columns on desktop (bio left ~2/3, quick-facts card right ~1/3), stacked on mobile.

- **Bio:** 150–200 words, first person. Ship with a draft assembled from known facts (Panamá-based, 4+ years, web & mobile, fintech at BlueCore, TypeScript/React/Vue/Angular range, recent AI-assisted side projects). Mark `[PENDING]` spots.
- **Quick-facts card:** 📍 Panamá · 4+ years experience · Currently @ BlueCore · Focus: web & mobile · Languages: ES / EN `[PENDING confirmation]`.
- **During implementation, ask the owner:** years to claim, what motivates/differentiates him, one hobby, one fun fact, languages line. Bio is not final until these land; placeholders must be visually obvious in dev (e.g. `[PENDING: …]`).

### 7.3 Experience

Achievement-style rewrite, same two jobs, same tags, typos fixed ("Fisrt"). Real metrics only — `[TODO: metric]` placeholders where the owner may supply numbers; placeholders are removed (not faked) if no number exists.

- **BlueCore (Nov 2024–Present, Software Engineer):** "Build and ship mobile banking apps for the financial sector with Ionic + Angular, owning UI and feature delivery end to end." Bullets: apps/features shipped `[TODO]`, UX ownership, Ionic+Angular+Tailwind+TS.
- **Etyalab (Nov 2021–Nov 2024, Frontend Developer):** web apps with Vue/React/Next/TS; bullets on features delivered, UI maintenance, `[TODO: metric]`.

`IJobs`: drop `width`; reuse the existing `remarkablePoints` field for the achievement bullets (no new field), rewriting its content per job.

### 7.4 Projects

`IProjects` gains `status: 'Live' | 'WIP' | 'Archived'` and `featured: boolean`.

- **Featured (large cards):** Gym Routine Manager, Chatterly, URL Shortener — image, `● Live` badge, full description, chips, `Live ↗` + `GitHub` buttons.
- **Compact (5):** Funny Math, Tic Tac Toe, Vue To-do, Rick & Morty Wiki, Country Finder — title, status, clamped description (3 lines), chips, links. **Click/keyboard expands** the card to reveal full description + screenshot. No info deleted; no new dependency (no dialog).
- All 8 currently deployed → status `Live` (owner can adjust per project).
- Images move to `next/image` with explicit dimensions; `loading` defaults handle lazy-loading below the fold.
- The Projects view becomes this featured + compact grid; the embla carousel goes away (remove `embla-carousel-*` deps and `ui/carousel.tsx` if nothing else imports them).
- The Projects section will exceed one viewport on desktop: it uses `snap-start` + `md:min-h-screen` (instead of `snap-center` + fixed `h-screen`) so users can scroll through it while snapping still engages at section boundaries (CSS scroll-snap explicitly allows rest positions inside snap areas taller than the viewport).

### 7.5 Tech Stack

Same grid and data, restyled with theme tokens (mono labels, zinc borders, lime hover).

### 7.6 Contact

Same fields and flow (`fullname`, `email`, `how_did_you_hear`, `message` → POST `/api/contact` → Resend + React Email template). Changes:

- Inputs/textarea use themed tokens (no white overrides); visible lime focus rings.
- Fix client validation message: "Full name must be at least 2 characters." (currently says "Username … 5 characters" on a `min(2)` rule).
- **Honeypot:** hidden `company` field; if filled, the API returns a fake success (200) without sending. Add as `optional` in both zod schemas.
- Success/error toasts stay.

## 8. SEO

- `layout.tsx` metadata: title `Jose Arpaia Quintero — Full Stack Developer`; concise description (Panamá-based full stack dev, React/Next.js/TypeScript, web & mobile); `metadataBase` = current Netlify URL (constant, swappable for a future custom domain); Open Graph (type website; image wired automatically by the `opengraph-image` file convention) + Twitter `summary_large_image`.
- `src/app/opengraph-image.tsx`: `ImageResponse` 1200×630 — dark canvas, lime accent, name + role (served dynamically via Netlify runtime).
- `src/app/robots.ts` (allow all, sitemap ref) and `src/app/sitemap.ts` (single URL).
- JSON-LD `Person` script in layout: name, jobTitle, url, `sameAs` [GitHub, LinkedIn].
- Out of code scope: buying `josearpaia.dev` (owner action; code only needs the `metadataBase` constant updated).

## 9. Code cleanup (only in files already being touched)

- Remove stray `import { ta } from 'zod/v4/locales'` in `src/constants/index.ts`.
- Replace `.filter(Boolean).join(' ')` with `cn()`.
- Delete `public/background.mp4` and the `backgroundVideoUrl` prop path in `SnappingPage`.
- Align lint tooling with Next 16 (`eslint-config-next` upgrade; if `next lint` is no longer supported, switch the `lint` script to the ESLint CLI). Acceptance: `npm run lint` passes.

## 10. Accessibility

- Respect `prefers-reduced-motion` in `FadeIn`/framer-motion (`useReducedMotion`).
- Visible `focus-visible` rings (lime) on all interactive elements; theme toggle has `aria-label`; expandable compact cards are buttons with `aria-expanded`.
- Contrast: lime-400 only as fill with near-black text; lime-700 for accent text on light; muted text ≥ 4.5:1 on both themes.
- Landmarks: `<nav>`, `<main>`, `<footer>`; one `<h1>` (hero), `<h2>` per section.

## 11. Out of scope (future rounds)

Testimonials, certification badges, GitHub stats (Phase 5); blog, newsletter, i18n ES/EN, chatbot (Phase 6); analytics provider (4.4); professional photo/avatar; Tailwind v4 migration.

## 12. Verification

1. `npm run build` and `npm run lint` pass.
2. Manual pass in `npm run dev`: both themes (toggle + system), mobile widths (free scroll, no clipped sections), desktop snap, keyboard-only navigation, compact-card expansion.
3. Contact form end-to-end in dev (real Resend send), then on Netlify deploy preview after env vars are set.
4. Lighthouse spot-check: performance (video removed) and SEO (metadata present).
