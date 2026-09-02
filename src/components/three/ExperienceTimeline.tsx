'use client';

import { Edges, Html } from '@react-three/drei';
import { Mesh } from 'three';
import { useState } from 'react';
import { jobs, sectionsConfig } from '@/constants';
import useStore from '@/store';
import { IJobs } from '@/types';
import { beatZ } from './sceneLayout';
import useLerpedScale from './useLerpedScale';

const VISIBLE_RADIUS = 0.6;
// Kept well under half the job spacing (2.2) so adjacent orbs' hoverable
// zones never overlap — overlapping zones made hover flicker unpredictably
// between neighbors.
const HIT_RADIUS = 0.85;

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
  const scaleRef = useLerpedScale<Mesh>(isHovered ? 1.15 : 1);

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
        <Edges color="#9ee62c" transparent opacity={showHitArea ? (isHovered ? 0.6 : 0.3) : 0} />
      </mesh>

      <mesh ref={scaleRef}>
        <sphereGeometry args={[VISIBLE_RADIUS, 48, 48]} />
        <meshStandardMaterial
          color={isCurrent ? '#9ee62c' : '#4f7a17'}
          roughness={0.2}
          metalness={0.5}
        />
      </mesh>
    </>
  );
}

export default function ExperienceTimeline({ onSelect }: { onSelect: (job: IJobs) => void }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const isActive = useStore((state) => state.activeSection === sectionsConfig.experience.id);
  const baseZ = beatZ(2);
  const spacing = 2.2;
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
