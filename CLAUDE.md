# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start development server on localhost:3000
npm run build      # Production build
npm run lint       # ESLint via next lint
npm run prettier   # Format all files with Prettier + Tailwind plugin
```

No test suite is configured.

## Architecture

Single-page portfolio built with **Next.js 14 App Router**. The entire app renders from `src/app/page.tsx` as a `'use client'` component — there is no server-side rendering for the main UI.

### Scroll layout

The page uses CSS scroll snapping. `<main>` has `snap-y snap-mandatory overflow-y-scroll`, and each section is wrapped in `<SnappingPage>` (`src/components/SnappingPage.tsx`) which applies `snap-center snap-always h-screen`. The `IntersectionObserver` in `page.tsx` watches sections and updates `backgroundColor` state to produce the dynamic background color transitions.

### Sections and views

Views live in `src/views/` and map 1:1 to scroll sections: `Home`, `Experience`, `Projects`, `TechStackPage`, `Contact`. Each view renders inside a `<SnappingPage id="...">` where the `id` must match a key in `sectionsConfig` from `src/constants/index.ts`.

### Data and content

All portfolio content (jobs, projects, tech tags) is defined in `src/constants/index.ts`:
- `jobs: IJobs[]` — work experience cards
- `projects: IProjects[]` — project carousel cards
- `tags` + `tagsEnum` — tech stack items with icons, used both in cards (as `Chip` components) and the TechStack grid
- `sectionsConfig` — maps section names to their DOM ids and optional background styles

To add a new tech tag: add to `tagsEnum`, add its entry in `tags`, then reference it via `tagsEnum.xxx` in jobs/projects.

### Types

`src/types/index.ts` defines `IProjects` and `IJobs`. The `IJobs.width` field is a per-card `vw` string that controls horizontal card width in the scroll — currently hardcoded per job.

### State management

Zustand store (`src/store/index.ts`) tracks two global values: `topVisible` (whether user is at the top section, drives back-to-top button visibility) and `navbarIsOpen` (mobile menu state).

### Contact API

`src/app/api/contact/route.ts` — POST endpoint that sends email via Resend. Requires two env vars:
- `RESEND_API_KEY`
- `CONTACT_EMAIL_TO`

There is no server-side validation; the route trusts the request body directly.

### UI components

`src/components/ui/` contains shadcn/ui components (do not edit these directly — regenerate via shadcn CLI if needed). Custom components are in `src/components/`. Icons are in `src/components/icons/` as inline SVG React components.

### Styling conventions

- Use `cn()` from `src/lib/utils.ts` for conditional class merging — some older components use `.filter(Boolean).join(' ')` but `cn()` is preferred.
- Tailwind color theme is teal-based. Custom colors are not defined in `tailwind.config.ts` beyond the shadcn-required `hsl` variables.
- Tech icons live in `public/icons/` — mix of `.svg` and `.webp` formats.
