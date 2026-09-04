# 3D Portfolio Experience

Spec: `docs/superpowers/specs/2026-08-29-3d-portfolio-experience-design.md`

## Goal

Add a separate `/3d` route that reimagines the portfolio as one scroll-driven 3D scene (React Three Fiber + drei), reachable via a navbar toggle, with full content parity with the existing `/` site and zero visual/behavioral change to `/` itself.

## Tasks

- [x] **1. Install 3D dependencies**
  `npm install three @react-three/fiber @react-three/drei` and `npm install -D @types/three`.
  → Verify: `npm run lint` and `npm run build` still succeed with no new errors.

- [x] **2. Extract shared copy into `src/constants/index.ts`**
  Add `heroCopy` (kicker, name, subtitle, `heroTech` list) and `aboutCopy`/`aboutFacts` (bio paragraphs + facts array), moving the literals currently inline in `src/views/Home.tsx` and `src/views/About.tsx`. Update both views to import and use the constants instead of inline literals.
  → Verify: `npm run lint` passes; `npm run dev`, visit `/`, confirm Home and About render identically to before (same text, same layout).

- [x] **3. Extract `ContactForm` component**
  Create `src/components/ContactForm.tsx` containing the zod schema, `useForm`, submit handler, and `<Form>` JSX currently in `src/views/Contact.tsx`. Update `Contact.tsx` to render `<ContactForm />` inside its existing wrapper.
  → Verify: on `/`, Contact section looks unchanged; submit a test message and confirm the existing success/error toast still fires (network tab shows POST to `/api/contact`).

- [x] **4. Scaffold `/3d` route with camera rig and empty beats**
  Create `src/app/3d/page.tsx` with `<Canvas>` → `CameraRig` (`src/components/three/CameraRig.tsx`), lerping the camera between 6 hardcoded keyframes (position + lookAt) and writing the nearest beat's `sectionsConfig` id to the existing Zustand `activeSection` via `setActiveSection`. Six placeholder box meshes stand in for the real beats.
  **Implementation deviation from the original plan:** drei's `<ScrollControls>`/`useScroll()` turned out to anchor any `<Html>` content to the scene's world origin rather than the viewport, so a `Navbar3D` rendered inside it scrolled away with the content instead of staying pinned; a transparent DOM scroll-catcher on top would also have blocked raycasted clicks on 3D objects needed for Task 6. Replaced with `src/components/three/useScrollProgress.ts` — a hook with no DOM overlay at all, driving a shared `progressTarget` ref (0..1) from `wheel`/`touch`/keyboard (Arrow/PageUp/PageDown/Home/End) listeners on `window`. `CameraRig` reads this ref every frame and eases toward it; `Navbar3D` (now plain fixed DOM, not drei `Html`) writes to it directly on nav-link click. Also found and fixed: R3F's canvas size observer missed its initial measurement in this Next.js/Turbopack setup, leaving the canvas at the browser's 300×150 default until something forced a re-measure — worked around with a one-off `window.dispatchEvent(new Event('resize'))` ~300ms after mount in `page.tsx`.
  → Verified: fresh `npm run build`/`npm run lint` pass; in a real (non-backgrounded) browser tab, dispatched wheel input moved the camera smoothly through all 6 beats in order with `activeSection` updating correctly, and nav-link clicks jumped to the right beat. Automated browser-tab testing for this task was unreliable because the CDP-controlled tab runs with `document.hidden = true`, which throttles `requestAnimationFrame` (what `useFrame` depends on) — confirmed via direct inspection, not a code issue. Worth a quick manual check in a normal foregrounded browser before considering this fully done.

- [x] **5. Build the six scene-beat components**
  In `src/components/three/`: `HeroOrb` (glossy `MeshDistortMaterial` sphere + idle rotation, `HeroOverlayText` as a fixed DOM overlay using `heroCopy`, visible only while `activeSection === 'home'`), `AboutPanel` (glass card using `aboutCopy`/`aboutFacts`), `ExperienceTimeline` (one orb + always-visible company-name label per `jobs` entry), `ProjectsField` (one card-object per `projects` entry in a 4-column grid, bigger if `featured`, title label on hover), `TechCluster` (spheres on a Fibonacci-sphere distribution from `tags`, slow idle rotation, tag name on hover), `ContactPanel` (glass card rendering `<ContactForm />`).
  **Implementation deviation:** `AboutPanel`/`ContactPanel` initially used drei's `<Html transform>` (perspective-scaled to the 3D anchor) per the spec, but since `CAMERA_OFFSET` (6) is less than `BEAT_SPACING` (10), the camera flies past/through each beat's content on the way to the next one — with `transform`, this made the glass panels balloon to fill the entire screen at the moment of closest approach. Switched to plain `<Html center occlude>` (fixed CSS size, screen-position tracked but not perspective-scaled) — panels now stay a comfortable, readable, constant size regardless of camera distance. Also added a scene `<fog>` for depth cueing between beats.
  → Verified: all six beats show correct content matching `/` (same bio/facts, job titles+dates, project titles+status, tag names) via direct progress-ref inspection and screenshots at each beat.

- [x] **6. Add click-to-detail overlay**
  `src/components/three/DetailOverlay.tsx`: a fixed-position DOM portal, hidden by default, rendering `<JobCard {...job} />` or `<ProjectDetailCard {...project} />` when a job orb / project object is clicked, with a backdrop that closes on click, Escape, or an explicit close button. Wired into `ExperienceTimeline`/`ProjectsField` via `onSelect`, state lifted in `page.tsx`.
  → Verified in-browser: clicking a project card opened the correct `ProjectDetailCard` (title, description, tags, Live/GitHub links); Escape closed it cleanly.

- [ ] **6a. Known tuning item (not fixed, flagging for follow-up if desired)**
  Because `CAMERA_OFFSET < BEAT_SPACING`, the camera also passes close to non-Html mesh objects (job orbs, project cards) shortly after visiting them, making them briefly loom large at screen edges before the next beat settles. Content-panel ballooning (the bigger issue) is fixed per Task 5; this residual "flying past" of plain meshes reads as intentional motion during real smooth scrolling and is left as-is, but could be tuned later (e.g. raising `CAMERA_OFFSET` and rescaling scene objects) if it feels off in practice.

- [x] **7. `Navbar3D` and 2D↔3D toggle**
  `src/components/Navbar3D.tsx` mirrors `Navbar.tsx`'s markup/active-link styling (driven by the same `activeSection` store field); each link click sets the shared `progressTarget` ref (see Task 4) to the target beat's fraction instead of `scrollTo`-ing a DOM id. `ThemeToggle` is replaced with a "← Back to 2D" link to `/` (see Task 9 for why). Added a small `Box`-icon link to `Navbar.tsx` (both desktop and mobile rows, next to `ThemeToggle`) pointing to `/3d`.
  → Verified in-browser: on `/`, the new icon button navigates to `/3d`; on `/3d`, clicking nav links (e.g. "Projects") moved the camera to that beat and updated the active-link highlight; "Back to 2D" returns to `/` unchanged.

- [x] **8. Reduced-motion and low-power fallback**
  `CameraRig` already snaps instantly (no lerp) when `reducedMotion` is true; `HeroOrb`'s idle rotation and `TechCluster`'s orbit freeze under the same flag. Added `src/components/three/useIsLowPower.ts` (`matchMedia('(pointer: coarse), (max-width: 768px)')`) — on low-power devices `page.tsx` skips `<Environment preset="studio">`, caps `<Canvas dpr>` to `[1,1]`, and `TechCluster` renders every sphere with lower geometry detail (10 segments vs 24).
  **Deviation from the literal spec wording:** the spec said low-power mode should render "fewer spheres"; implemented instead as *all* tags always rendered with cheaper geometry, to honor the earlier, stronger "full content parity, nothing hidden" decision — dropping tags would mean some tech tags never appear at all on mobile.
  → Verified via code review + `matchMedia` logic (window-resize testing was not reliable in this automation environment — worth a quick real-device/DevTools-mobile-emulation check).

- [x] **9. Force dark theme on `/3d`**
  The `/3d` root div carries a hardcoded `dark` class, independent of `next-themes`.
  → Verified in-browser: set the site-wide theme to light via `localStorage`, reloaded `/` (confirmed light), then visited `/3d` — canvas and overlay panels still rendered in the dark studio look.

- [x] **10. Final verification pass**
  → Verified:
  - `npm run lint` and `npm run build` clean.
  - `/`: Home, About, and Contact all confirmed pixel-identical to pre-work behavior/content in-browser.
  - `/3d`: all 6 beats confirmed reachable (real wheel input + nav-link clicks) with correct content and correct active-link tracking; project click → `ProjectDetailCard` overlay → Escape close, verified end-to-end.
  - Not independently re-verified this pass (already covered under their own tasks): contact form's actual POST to `/api/contact` on `/3d` (form is the same shared `ContactForm` already proven working on `/` in Task 3 — not re-submitted live to avoid sending a real email), and mobile/reduced-motion visual behavior (logic verified, real-device check recommended).

## Done When

- [x] `/3d` is live, fully interactive, and content-complete relative to `/`.
- [x] `/` shows no visual or behavioral change other than the new toggle button.
- [x] `npm run lint` and `npm run build` pass.

## Notes

- Keep `src/components/three/` as the only home for R3F-specific components — don't leak `three`/`@react-three/*` imports into shared 2D components.
- Tasks 2–3 are the only touches to existing 2D files; everything else is additive.

## Concept revision: "Product Showcase" (post-launch feedback)

First pass shipped but user feedback was: information unreadable (plain bubbles), tech stack should look like the actual tech, and the contact panel was rendering on top of everything. Addressed:

- [x] **`ProjectsField` rebuilt as laptop-screen mockups.** Each project renders as real 3D geometry (bezel + a `planeGeometry` textured via `useTexture(project.image)` + a base "deck"), each wrapped in its own `<Suspense fallback={<PlaceholderScreen />}>` so one slow image doesn't block the rest. Labels are now always-visible (not hover-only), matching `ExperienceTimeline`'s pattern.
- [x] **`TechCluster` rebuilt with real icon badges.** Each tag renders its actual icon (`useTexture` on `tags[key].icon`, resolved via `icon.dark ?? icon.light`) as a billboarded plane on a light card backing, instead of a plain colored sphere. Found and fixed a real bug along the way: 6 icon SVGs (`angular`, `git`, `mysql`, `nestjs`, `nextjs_icon_dark`, `postgresql`) had no `width`/`height` on the root `<svg>` (only a `viewBox`), which silently produced a blank canvas texture in Three.js's loader — fixed by adding explicit dimensions matching each `viewBox` directly in `public/icons/`.
- [x] **Fixed "contact panel over everything" bug.** Root cause was two-fold: (1) drei's `Html` panels stack in DOM/render order, not 3D depth — fixed with `zIndexRange={[100, 0]}` on every panel/label; (2) more importantly, `Html` content doesn't fade/shrink with camera distance or respect scene fog the way real meshes do, so `AboutPanel`/`ContactPanel` stayed fully visible even when far from the active beat. Fixed by gating each panel's visibility on `activeSection` (opacity+`pointer-events` toggle, not unmounting — so an in-progress contact form draft is never lost). Also removed the `occlude` prop from both, since its own raycasting-based `display:none` was fighting with this new visibility control and could hide a panel that should have been showing.
- Not changed: `ExperienceTimeline` (job orbs) — feedback didn't flag this beat, and it already had always-visible labels.

## Follow-up fixes (round 2 of feedback)

- [x] **Job/project title labels bled through on top of other beats' content.** Same root cause as the Contact-panel bug above — `Html` labels in `ExperienceTimeline` and `ProjectsField` stayed fully legible regardless of which beat was actually active, so e.g. Projects titles rendered on top of the About panel when passing near. Fixed with the same `isActive` (`activeSection` from Zustand) gating already used for `AboutPanel`/`ContactPanel` — a beat's labels now only render while that beat is the active one; the underlying 3D orbs/screens stay visible as ambient scenery either way.
- [x] **About panel text washed out mid-paragraph by 3D glow behind it.** `AboutPanel`/`ContactPanel` used a barely-there `bg-white/5` glass background, so bright content behind the panel (e.g. a nearby job orb) bled through and reduced legibility. Changed both to `bg-black/80` + `backdrop-blur-xl` — panels now read reliably regardless of what's rendering behind them, while keeping some blur/glass character.

## Follow-up fixes (round 3 of feedback)

- [x] **Small/inconsistent click targets on job orbs and project cards.** Both previously required hitting the exact visible mesh surface. Added a larger invisible (`visible={false}`) hit-area mesh per item — a sphere (radius 1.1 vs the visible orb's 0.6) for `ExperienceTimeline`, a box covering the whole laptop shape for `ProjectsField` — carrying all the click/hover handlers, so clicking anywhere near the object now opens it. For `ProjectsField` this also fixes a real timing bug: the click handler used to live on the textured screen mesh *inside* the `Suspense` boundary, so a card was unclickable until its screenshot texture finished loading; the new hit-box lives outside `Suspense` and is clickable immediately.
  **Verification note:** confirmed via Three.js/R3F source that invisible meshes are not excluded from raycasting (neither library checks `.visible` in the raycast path), and confirmed the hover-scale response works correctly in-browser. Could not get a clean end-to-end click→modal confirmation this round — the automation tab entered a much more severe render-throttling state than earlier in the session (camera stopped advancing almost entirely even after 30+ seconds and multiple nav-link clicks), which made it unreliable to test browser-side. Worth a quick real-browser check on your end.
- [x] **Rough/instant hover scaling.** Added `src/components/three/useLerpedScale.ts` (eases an object's scale toward a target each frame, same lerp pattern already used for the camera) and applied it to job orbs, project cards, and tech badges — hover now scales smoothly instead of snapping.
- [x] **Tech badges made backgroundless per request.** Removed the light card backing from `TechCluster`'s icon badges entirely — icons now float directly in space. **Trade-off to watch:** a few dark-colored logos (git, mysql, postgresql, nestjs, angular, bash) may be harder to see against the black scene without that backing; flag if that becomes a problem and a lighter-touch contrast fix (e.g. a soft glow instead of a solid card) can be added.
- [x] **Experience labels now show the date range**, e.g. "NOV, 2024 — PRESENT" under the company name, matching the timeline framing.

## Follow-up: hoverable-zone outlines (user asked to see where to hover)

- [x] Made the invisible hit-areas on `ExperienceTimeline` job orbs and `ProjectsField` project cards visible as a faint lime wireframe (not filled, so it doesn't wash out the scene the way a solid transparent fill did during testing) — brighter on hover, dim otherwise, only shown while that beat is active. This doubles as a real UX affordance addressing the original "confused to find the spot" feedback, not just a debug aid.
  → Verified in-browser: wireframe sphere clearly visible around both job orbs on the Experience beat, wireframe boxes clearly visible around every laptop card on the Projects beat, correctly sized larger than the visible object in both cases and correctly hidden/dimmed off their beat.

## Follow-up: still-fiddly clicking + modal blocks scrolling

- [x] **Job/project title labels are now real clickable `<button>`s**, not just visual pills — clicking the readable label opens the same detail overlay as clicking the 3D object, with a hover-highlight border for feedback. This gives a guaranteed, ordinary DOM click target that doesn't depend on aiming at anything in 3D space, on top of the existing (also still functional) larger 3D hit-areas.
  **Testing note:** a coordinate-based scripted click on a located label sometimes missed, because these `Html`-positioned labels reposition every frame to follow their 3D object — if the camera is still easing when the click fires, the label has moved by the time the click lands. A direct `element.click()` call (and a real settled-camera click) both worked immediately, confirming the click handler itself is correctly wired; this is a scripted-testing artifact; a live cursor click always lands on whatever is actually under it at that instant, and the object's position stabilizes quickly once scrolling stops.
- [x] **Scrolling no longer moves the camera while a detail modal is open.** `useScrollProgress` now takes a `disabled` flag (page.tsx passes `selection !== null`); wheel/touch/keyboard input is ignored while a modal is open, letting the modal's own internal scroll work without fighting the 3D scroll-progress listener, and resuming normally once closed.
  → Verified in-browser: dispatched a wheel event while a project modal was open — progress stayed unchanged; closed the modal, dispatched again — progress changed normally.

## Follow-up: contact form unfocusable + messy/overlapping hover outlines (round 4 of feedback)

- [x] **Root cause found and fixed: contact form inputs couldn't be focused or typed into.** `AboutPanel`/`ContactPanel` used an always-mounted `<Html>` with CSS opacity/`pointer-events` toggled on an *inner* div to hide inactive panels (from the "contact panel over everything" fix). Read drei's `Html.js` source directly: in non-`transform` (`center`) mode, drei's `pointerEvents` prop is never applied to the component's own wrapper `<div>` — that wrapper stays a real, always-`pointer-events:auto`, absolutely-positioned, high-`z-index` DOM element regardless of what CSS is set on content inside it. So the "hidden" About/Contact panel was silently sitting on top of the page intercepting clicks meant for whatever was actually showing, including the Contact form's own inputs. Fixed by switching both to conditional `{isActive && <Html>...}` — the wrapper now fully unmounts instead of just fading, which is the only reliable way to stop it from blocking clicks. Trade-off: navigating away from Contact and back now clears an in-progress draft message, which is preferable to the form being unusable.
  → Verified in-browser with a real click + type test: clicked the "Full name" input, confirmed via `document.activeElement` it became the `INPUT` (previously stayed on `BODY`), typed "Test Name", and confirmed it appeared in the field with a visible focus ring. Re-confirmed this pass via direct DOM query that `AboutPanel`/`ContactPanel` content is genuinely absent from the DOM (not just visually hidden) whenever their beat isn't active.
- [x] **Overlapping hover zones on Experience job orbs.** The two orbs' hit-spheres (radius 1.1 each, spacing 2.2) could touch/overlap at the boundary, causing the hover state to flicker unpredictably between neighbors ("cursor is over the bubble but the bubble is not highlighted"). Reduced `HIT_RADIUS` to 0.85 in `ExperienceTimeline.tsx` — with two spheres 2.2 apart, 2×0.85=1.7 is safely under the spacing, so the zones can no longer touch.
- [x] **Messy diagonal-crosshatch wireframes on Experience/Projects hit-areas.** The visible outline previously used a plain `wireframe: true` material, which draws every internal triangle edge (including the diagonal from each quad's triangulation), reading as a busy "X" pattern rather than a clean outline. Swapped to drei's `<Edges>` component (angle-threshold-filtered `EdgesGeometry`) in both `ExperienceTimeline.tsx` and `ProjectsField.tsx` — outlines now show only the sphere/box silhouette.
  → Verified in-browser: dispatched synthetic `pointermove` events along a vertical sweep near a job label and confirmed the cursor switches to `pointer` across a single, contiguous, correctly-sized range (matching the projected screen size of an 0.85-radius sphere at that camera distance) and cleanly back to `auto` just past its edge — hover detection is working as a single well-bounded zone per orb, not overlapping or flickering.
  **Testing note:** this round's automation tab exhibited an even more extreme version of the previously-documented render throttling — `document.hidden` stayed `true` and the camera did not visibly advance even after 40+ seconds of real wait time and a `requestAnimationFrame` monkey-patch attempt (which didn't help, confirming R3F had already cached the original `rAF` reference before the patch ran). Screenshots taken while the tab is backgrounded can also lag behind real state, since Chrome deprioritizes repainting hidden tabs independently of JS execution — confirmed by cross-checking a screenshot that appeared to show two beats' content simultaneously against a direct DOM query at the same moment, which showed only the actually-active beat's content really present. Switched verification strategy to DOM/JS-state queries and synthetic event dispatch (both of which proceed independently of compositor painting) rather than relying on screenshot pixels. Worth a quick real-browser check on your end for full visual confirmation.
- [x] Removed the temporary `window.__debugProgress` (`src/app/3d/page.tsx`) and `window.__debugStore` (`src/store/index.ts`) debug hooks used during this and earlier rounds' testing.
  → Verified: `npm run lint` and `npm run build` both clean after removal.
