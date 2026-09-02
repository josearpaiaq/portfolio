'use client';

import { Edges, Html, useTexture } from '@react-three/drei';
import { Suspense, useState } from 'react';
import { Group } from 'three';
import { projects, sectionsConfig } from '@/constants';
import useStore from '@/store';
import { IProjects } from '@/types';
import { beatZ } from './sceneLayout';
import useLerpedScale from './useLerpedScale';

const COLUMNS = 4;
const SPACING_X = 2.6;
const SPACING_Y = 2.1;

function ProjectScreen({ project, isHovered }: { project: IProjects; isHovered: boolean }) {
  const texture = useTexture(project.image as string);
  const scaleRef = useLerpedScale<Group>(isHovered ? 1.08 : 1);

  return (
    <group ref={scaleRef}>
      <mesh position={[0, 0, -0.06]}>
        <boxGeometry args={[1.62, 1.02, 0.06]} />
        <meshStandardMaterial color="#161616" roughness={0.5} metalness={0.3} />
      </mesh>

      <mesh>
        <planeGeometry args={[1.5, 0.9]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      <mesh position={[0, -0.56, 0.3]} rotation={[-Math.PI / 2.4, 0, 0]}>
        <boxGeometry args={[1.62, 0.42, 0.05]} />
        <meshStandardMaterial color="#161616" roughness={0.6} metalness={0.2} />
      </mesh>
    </group>
  );
}

function PlaceholderScreen() {
  return (
    <mesh>
      <planeGeometry args={[1.5, 0.9]} />
      <meshStandardMaterial color="#2a2a2a" />
    </mesh>
  );
}

export default function ProjectsField({ onSelect }: { onSelect: (project: IProjects) => void }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const isActive = useStore((state) => state.activeSection === sectionsConfig.projects.id);
  const baseZ = beatZ(3);
  const rows = Math.ceil(projects.length / COLUMNS);
  const rowOffset = (rows - 1) / 2;
  const colOffset = (COLUMNS - 1) / 2;

  return (
    <group position={[0, 0, baseZ]}>
      {projects.map((project, index) => {
        const row = Math.floor(index / COLUMNS);
        const col = index % COLUMNS;
        const x = (col - colOffset) * SPACING_X;
        const y = (rowOffset - row) * SPACING_Y;
        const scale = project.featured ? 1.15 : 0.85;
        const isHovered = hovered === project.slug;

        return (
          <group key={project.slug} position={[x, y, 0]} scale={scale}>
            {/* Larger invisible hit-area covering the whole laptop shape
                (screen + bezel + base), always present regardless of
                whether the screenshot texture has finished loading — so
                every card is clickable immediately, not just once its
                Suspense boundary resolves. Outlined with a clean edge
                silhouette (not a full wireframe, which shows a busy
                diagonal crosshatch from the box's internal triangulation)
                while Projects is the active beat, so the clickable zone is
                visible instead of just the laptop graphic. */}
            <mesh
              position={[0, -0.2, 0.1]}
              onClick={(event) => {
                event.stopPropagation();
                onSelect(project);
              }}
              onPointerOver={(event) => {
                event.stopPropagation();
                setHovered(project.slug);
                document.body.style.cursor = 'pointer';
              }}
              onPointerOut={() => {
                setHovered((current) => (current === project.slug ? null : current));
                document.body.style.cursor = 'auto';
              }}
            >
              <boxGeometry args={[1.8, 1.5, 0.6]} />
              <meshBasicMaterial transparent opacity={0} depthWrite={false} />
              <Edges color="#9ee62c" transparent opacity={isActive ? (isHovered ? 0.6 : 0.3) : 0} />
            </mesh>

            <Suspense fallback={<PlaceholderScreen />}>
              <ProjectScreen project={project} isHovered={isHovered} />
            </Suspense>

            {/* Clickable too: aiming at a small 3D card is fiddly, but this
                is a normal DOM element — a reliable way in, not just a
                fallback. */}
            {isActive && (
              <Html center zIndexRange={[100, 0]} position={[0, -0.78, 0]} distanceFactor={6}>
                <button
                  type="button"
                  onClick={() => onSelect(project)}
                  onMouseEnter={() => setHovered(project.slug)}
                  onMouseLeave={() =>
                    setHovered((current) => (current === project.slug ? null : current))
                  }
                  className={`cursor-pointer whitespace-nowrap rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-foreground backdrop-blur transition-colors ${
                    isHovered ? 'border-highlight bg-black/80' : 'border-white/10 bg-black/60'
                  }`}
                >
                  {project.title}
                </button>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}
