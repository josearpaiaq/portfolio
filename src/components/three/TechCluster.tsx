'use client';

import { Billboard, Html, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Suspense, useMemo, useRef, useState } from 'react';
import { Group, Mesh } from 'three';
import { tags } from '@/constants';
import { TagIcon } from '@/types';
import { beatZ } from './sceneLayout';
import useLerpedScale from './useLerpedScale';

const RADIUS = 2.8;

function resolveIconSrc(icon?: TagIcon) {
  if (!icon) return undefined;
  if (typeof icon === 'string') return icon;
  return icon.dark ?? icon.light;
}

// Evenly distributes points on a sphere so the tags don't clump.
function fibonacciSpherePoints(count: number, radius: number) {
  const points: [number, number, number][] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    points.push([
      Math.cos(theta) * radiusAtY * radius,
      y * radius,
      Math.sin(theta) * radiusAtY * radius,
    ]);
  }

  return points;
}

function TechBadge({
  src,
  isHovered,
  onHoverStart,
  onHoverEnd,
}: {
  src: string;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const texture = useTexture(src);
  const scaleRef = useLerpedScale<Mesh>(isHovered ? 1.35 : 1);

  return (
    <Billboard>
      <mesh
        ref={scaleRef}
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
        <planeGeometry args={[0.4, 0.4]} />
        <meshBasicMaterial map={texture} transparent toneMapped={false} />
      </mesh>
    </Billboard>
  );
}

function PlaceholderBadge() {
  return (
    <mesh>
      <sphereGeometry args={[0.17, 12, 12]} />
      <meshStandardMaterial color="#4f7a17" />
    </mesh>
  );
}

export default function TechCluster({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<Group>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  // Every tag is always rendered — full content parity with the 2D tech stack
  // grid.
  const entries = useMemo(() => Object.entries(tags), []);
  const points = useMemo(() => fibonacciSpherePoints(entries.length, RADIUS), [entries.length]);

  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.08;
  });

  return (
    <group position={[0, 0, beatZ(4)]}>
      <group ref={groupRef}>
        {entries.map(([key, tag], index) => {
          const isHovered = hovered === key;
          const src = resolveIconSrc(tag.icon);
          if (!src) return null;

          return (
            <group key={key} position={points[index]}>
              <Suspense fallback={<PlaceholderBadge />}>
                <TechBadge
                  src={src}
                  isHovered={isHovered}
                  onHoverStart={() => setHovered(key)}
                  onHoverEnd={() => setHovered((current) => (current === key ? null : current))}
                />
              </Suspense>

              {isHovered && (
                <Html center zIndexRange={[100, 0]} distanceFactor={6}>
                  <div className="pointer-events-none whitespace-nowrap rounded-full border border-white/10 bg-black/60 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-foreground backdrop-blur">
                    {tag.title}
                  </div>
                </Html>
              )}
            </group>
          );
        })}
      </group>
    </group>
  );
}
