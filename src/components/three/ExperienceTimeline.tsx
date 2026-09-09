'use client';

// import { Edges } from '@react-three/drei'; // outline disabled for deploy, see below
import { Billboard, Html, useTexture } from '@react-three/drei';
import { Group } from 'three';
import { Suspense, useState } from 'react';
import { jobs, sectionsConfig } from '@/constants';
import useStore from '@/store';
import { IJobs } from '@/types';
import { beatZ } from './sceneLayout';
import useIsLowPower from './useIsLowPower';
import useLerpedScale from './useLerpedScale';

const VISIBLE_RADIUS = 0.6;
// Kept well under half the job spacing (2.2) so adjacent orbs' hoverable
// zones never overlap — overlapping zones made hover flicker unpredictably
// between neighbors.
const HIT_RADIUS = 0.85;
// The company logos are wide wordmarks, not square marks — contain-fit them
// in a box this size (well under the sphere's diameter) so every corner
// stays inside its circular silhouette regardless of aspect ratio.
const LOGO_BOX = VISIBLE_RADIUS * 1.3;

function JobLogo({ src }: { src: string }) {
  const texture = useTexture(src);
  const image = texture.image as { width: number; height: number };
  const aspect = image.width / image.height;

  let width = LOGO_BOX;
  let height = LOGO_BOX / aspect;
  if (height > LOGO_BOX) {
    height = LOGO_BOX;
    width = LOGO_BOX * aspect;
  }

  // The logos' dark/colored strokes blend into the sphere's own shading and
  // hue depending on where the light falls, so give them a light backing
  // plate to read against consistently rather than against the glossy
  // green material directly.
  const padding = 1.25;

  return (
    // A billboard is a flat plane at a constant depth, but the sphere's near
    // pole reaches all the way out to VISIBLE_RADIUS — sitting the plate at
    // less than that let the sphere poke through its center. Clear the pole
    // entirely instead of matching the curved surface.
    <Billboard position={[0, 0, VISIBLE_RADIUS * 1.08]}>
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[width * padding, height * padding]} />
        <meshBasicMaterial
          color="#f5f5f0"
          transparent
          opacity={0.95}
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={texture} transparent toneMapped={false} depthWrite={false} />
      </mesh>
    </Billboard>
  );
}

function JobOrb({
  job,
  isCurrent,
  isHovered,
  showHitArea,
  onSelect,
  onHoverStart,
  onHoverEnd,
}: {
  job: IJobs;
  isCurrent: boolean;
  isHovered: boolean;
  showHitArea: boolean;
  onSelect: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const scaleRef = useLerpedScale<Group>(isHovered ? 1.15 : 1);

  return (
    <>
      {/* Larger invisible hit-area — clicking anywhere near the orb should
          open it, not just the exact visible sphere surface. Outlined with a
          clean edge silhouette (not a full wireframe, which shows a busy
          diagonal crosshatch from the sphere's internal triangulation)
          while its beat is active, so it's clear where the clickable zone
          actually is instead of just the small visible orb. */}
      <mesh
        onClick={(event) => {
          event.stopPropagation();
          onSelect();
        }}
        onPointerOver={(event) => {
          event.stopPropagation();
          onHoverStart();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          onHoverEnd();
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[HIT_RADIUS, 16, 12]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        {/* <Edges color="#9ee62c" transparent opacity={showHitArea ? (isHovered ? 0.6 : 0.3) : 0} /> */}
      </mesh>

      <group ref={scaleRef}>
        <mesh>
          <sphereGeometry args={[VISIBLE_RADIUS, 48, 48]} />
          <meshStandardMaterial
            color={isCurrent ? '#9ee62c' : '#4f7a17'}
            roughness={0.2}
            metalness={0.5}
          />
        </mesh>

        {job.logo && (
          <Suspense fallback={null}>
            <JobLogo src={job.logo} />
          </Suspense>
        )}
      </group>
    </>
  );
}

export default function ExperienceTimeline({ onSelect }: { onSelect: (job: IJobs) => void }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const isActive = useStore((state) => state.activeSection === sectionsConfig.experience.id);
  const isLowPower = useIsLowPower();
  const baseZ = beatZ(2);
  // Tighter on narrow viewports — a portrait phone's narrower horizontal FOV
  // (see computeResponsiveFov in sceneLayout.ts) has less room for orbs
  // spread this far apart, otherwise they crowd the frame edges.
  const spacing = isLowPower ? 2 : 2.2;
  const offset = (jobs.length - 1) / 2;

  return (
    <group position={[0, 0, baseZ]}>
      {jobs.map((job, index) => {
        const x = (index - offset) * spacing;
        const z = index * 0.8;

        const isHovered = hovered === index;

        return (
          <group key={job.company} position={[x, 0, z]}>
            <JobOrb
              job={job}
              isCurrent={index === jobs.length - 1}
              isHovered={isHovered}
              showHitArea={isActive}
              onSelect={() => onSelect(job)}
              onHoverStart={() => setHovered(index)}
              onHoverEnd={() => setHovered((current) => (current === index ? null : current))}
            />

            {/* Only legible while this is the active beat — otherwise it's a
                flat 2D label glued to the screen regardless of how far away
                the orb actually is, and it can overlap other beats' panels.
                Clickable too: aiming at a small 3D orb is fiddly, but this is
                a normal DOM element — a reliable way in, not just a fallback. */}
            {isActive && (
              <Html center zIndexRange={[100, 0]} position={[0, -1, 0]} distanceFactor={6}>
                <button
                  type="button"
                  onClick={() => onSelect(job)}
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered((current) => (current === index ? null : current))}
                  className={`flex cursor-pointer flex-col items-center gap-0.5 whitespace-nowrap rounded-full border px-3 py-1 backdrop-blur transition-colors ${
                    isHovered ? 'border-highlight bg-black/80' : 'border-white/10 bg-black/60'
                  }`}
                >
                  <span className="font-mono text-[10px] uppercase tracking-wider text-foreground">
                    {job.company}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-highlight">
                    {job.startDate} — {job.endDate}
                  </span>
                </button>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}
