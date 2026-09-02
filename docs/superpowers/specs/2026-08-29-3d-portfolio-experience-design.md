# 3D Portfolio Experience — Design

Date: 2026-08-29
Status: Approved, pending implementation plan

## Overview

Add a second, fully 3D interactive version of the portfolio at a new route (`/3d`), reachable via a toggle in the existing navbar. The 2D site at `/` is not replaced and remains the default landing experience. The 3D version carries the same content (jobs, projects, tech tags, working contact form) as the 2D site, sourced from the same data, presented as one continuous scroll-driven 3D scene in a "soft studio / product" aesthetic (glossy dark-lit spheres, frosted-glass panels, soft shadows — think an Apple product page rendered in 3D).

## Goals

- A visitor can scroll through Home → About → Experience → Projects → Tech Stack → Contact entirely inside a 3D scene, with the camera moving between six fixed "beats."
- Every piece of content that exists on the 2D site also exists on the 3D one (full parity) — no 3D-exclusive or 2D-exclusive data.
- Clicking a project or job object opens a real, readable, accessible detail panel — reusing the existing `ProjectDetailCard`/`JobCard` components, not reimplementing them.
- The contact form on `/3d` is fully functional (same `/api/contact` endpoint, same validation, same honeypot).
- Reasonable behavior on mobile and for `prefers-reduced-motion`, without hiding any content.
- Zero visual or behavioral change to the existing `/` route, except for one added navbar button.

## Non-goals

- No VR/AR support.
- No physics simulation beyond simple decorative motion (idle rotation/orbit).
- No CMS or new content — data still lives in `src/constants/index.ts`.
- No attempt to make the 3D canvas itself respect the light/dark theme toggle (see Theming below).

## Dependencies

Add: `three`, `@react-three/fiber`, `@react-three/drei`, and `@types/three` (dev dependency).

No other new dependencies. `<Environment preset="studio">` (from drei) supplies the glossy/soft-studio lighting look without needing a custom postprocessing pipeline.

## Route & top-level structure

New file `src/app/3d/page.tsx` (client component), structurally parallel to `src/app/page.tsx`:

```
<div>
  <Navbar3D />
  <Canvas dpr={[1, deviceCapDpr]}>
    <ScrollControls pages={6} damping={0.25}>
      <CameraRig />              // reads scroll offset, lerps camera between 6 keyframes
      <HeroOrb />                // beat 0 — Home
      <AboutPanel />             // beat 1 — About
      <ExperienceTimeline />     // beat 2 — Experience
      <ProjectsField />          // beat 3 — Projects
      <TechCluster />            // beat 4 — Tech Stack
      <ContactPanel />           // beat 5 — Contact
      <Environment preset="studio" />
    </ScrollControls>
  </Canvas>
  <DetailOverlay />              // fixed-position DOM overlay, shown on click
</div>
```

All new 3D-specific components live under `src/components/three/`.

## Camera & scroll system

- `ScrollControls` (drei) creates a virtual tall scroll container and exposes scroll progress via `useScroll()`.
- `CameraRig` (in `src/components/three/CameraRig.tsx`) holds a fixed array of 6 keyframes (`{ position: Vector3, lookAt: Vector3 }`, one per beat) and, on every frame, computes the current scroll fraction, finds the two nearest keyframes, and lerps the camera between them (or snaps instantly — see Reduced motion below).
- `CameraRig` also computes the nearest whole beat index each frame and, when it changes, calls the existing Zustand `setActiveSection` action with that beat's id from `sectionsConfig`. This is a pure consumer of the existing store shape — no store changes needed.
- `Navbar3D` (in `src/components/Navbar3D.tsx`) visually mirrors `Navbar.tsx` (same markup/classes, same active-link styling driven by `activeSection`), but each link's `onClick` calls a small helper that imperatively sets the `ScrollControls` scroll element's `scrollTop` to the target beat's fraction of total scroll height, instead of `scrollTo(id)`'s `scrollIntoView`.

## Scene beats

| Beat | Component | Visual | Data source |
|---|---|---|---|
| 0 Home | `HeroOrb` | One large glossy sphere (drei `<MeshDistortMaterial>`), slow idle rotation; name/title rendered as a fixed-position DOM overlay (not `<Html>` in-scene) so text stays crisp | new `heroCopy` constant |
| 1 About | `AboutPanel` | Frosted-glass panel via drei `<Html transform occlude>`, holding bio paragraphs + facts list; 1–2 small decorative spheres drifting behind it | new `aboutCopy` / `aboutFacts` constants |
| 2 Experience | `ExperienceTimeline` | One small orb per job, arranged in a gentle depth arc (nearest = most recent); the current-beat orb is highlighted; click opens detail overlay with `JobCard` | existing `jobs` |
| 3 Projects | `ProjectsField` | One glossy card-object per project in a loose grid (bigger for `featured: true`); click opens detail overlay with `ProjectDetailCard` | existing `projects` |
| 4 Tech Stack | `TechCluster` | Small spheres orbiting a central point, each labeled with its tag on hover (via a small `<Html>` billboard label); no click interaction needed | existing `tags` / `tagsEnum` |
| 5 Contact | `ContactPanel` | Frosted-glass panel via `<Html transform occlude>` rendering the shared `ContactForm` component | shared `ContactForm` (new, see below) |

## Detail overlay (click interaction)

`DetailOverlay` is a single fixed-position DOM component (portal, above the canvas) that:
- Is empty/hidden by default.
- Opens when a job or project object in the scene is clicked, rendering `<JobCard {...job} />` or `<ProjectDetailCard {...project} />` unmodified inside a simple centered panel with a backdrop.
- Closes on backdrop click, an explicit close button, or Escape.
- Slightly dims/blurs the canvas behind it while open (CSS only, no change to the R3F render loop).

This reuses the existing components as-is — both already accept the full `IJobs`/`IProjects` object as spread props, so no new detail-rendering logic is needed.

## Content parity — required changes to existing files

Three existing files get small, additive touches so both versions read from one source. No visual or behavioral change to the 2D site results from any of these:

1. **`src/constants/index.ts`** — add three new exported constants:
   - `heroCopy`: the kicker text, name, subtitle, and `heroTech` list currently inlined in `Home.tsx`.
   - `aboutCopy`: the three bio paragraphs currently inlined in `About.tsx`.
   - `aboutFacts`: the `facts` array currently defined inline in `About.tsx`.
2. **`src/views/Home.tsx`** and **`src/views/About.tsx`** — replace the inlined literals with imports of the constants above. JSX structure, styling, and rendered output are unchanged.
3. **`src/components/ContactForm.tsx`** (new) — the form portion of `src/views/Contact.tsx` (zod schema, `useForm`, submit handler, and the `<Form>...</Form>` JSX) is moved here as a standalone component. `src/views/Contact.tsx` renders `<ContactForm />` inside its existing `SnappingPage`/`SectionHeading` wrapper — unchanged visually.
4. **`src/components/Navbar.tsx`** — add one small icon button (next to `ThemeToggle`) that links to `/3d`.

## Theming

The 3D canvas always renders in the dark "soft studio" look, independent of the site-wide light/dark toggle — every approved mockup and the storyboard assume a dark backdrop, and a light canvas would clash with the glossy-on-black material style the whole scene is built around. `Navbar3D` therefore omits the `ThemeToggle` and instead has a single "← Back to 2D" link. DOM overlay panels (`DetailOverlay`, `AboutPanel`, `ContactPanel`) still use the project's semantic shadcn tokens, but `/3d` forces the `dark` class on its root so they render consistently against the scene regardless of the visitor's site-wide preference.

## Performance & accessibility fallback

- `prefers-reduced-motion` (checked the same way `HeroBackground.tsx` already does, via `useReducedMotion` from `framer-motion`): `CameraRig` snaps instantly between beat keyframes instead of lerping; `HeroOrb`'s idle rotation and `TechCluster`'s orbit animation are frozen in place.
- Coarse pointer / narrow viewport (`matchMedia('(pointer: coarse)')` or width breakpoint): `TechCluster` renders fewer spheres at once, `<Environment>` is swapped for a cheaper ambient+directional light setup, and `<Canvas dpr>` is capped lower. No section, job, project, or form field is hidden or removed — same content, cheaper rendering.
- No content is ever gated behind JavaScript-disabled or WebGL-unavailable states beyond what's unavoidable for a canvas-based experience; `/3d` is an optional, discoverable addition, not the primary way to reach any content.

## Testing / verification plan

- `npm run lint` passes with no new errors.
- Manual verification in a running `npm run dev` session:
  1. `/` renders and behaves exactly as before the change (visual diff check on Home/About/Contact after the copy/form extraction).
  2. `/3d` loads, all six beats are reachable by scrolling, in order.
  3. Clicking each `Navbar3D` link moves the camera to the correct beat and updates the active-link indicator.
  4. Clicking a project object opens `ProjectDetailCard` with the correct data; clicking a job orb opens `JobCard` with the correct data; both close cleanly.
  5. The contact form on `/3d` successfully posts to `/api/contact` (verified via network tab) and shows the same success/error toasts as the 2D form.
  6. Enabling "reduce motion" at the OS level removes camera lerp and idle/orbit animation on `/3d`.
  7. Resizing to a mobile viewport keeps `/3d` usable (degraded but not broken, no hidden content).

## Out of scope / follow-ups

- Sharing the exact same detail-overlay component between `/3d` and any future 2D modal use is not needed now (2D already navigates to `/projects/[slug]` instead of a modal) — no change to that flow.
- Further visual polish (bloom/postprocessing, custom shaders) is deferred; `<Environment preset="studio">` is the v1 lighting approach.
