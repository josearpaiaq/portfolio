'use client';

import { MeshDistortMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three';
import { beatZ } from './sceneLayout';

export default function HeroOrb({ reducedMotion }: { reducedMotion: boolean }) {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (reducedMotion || !meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.15;
    meshRef.current.rotation.x += delta * 0.05;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, beatZ(0)]}>
      <sphereGeometry args={[1.6, 64, 64]} />
      <MeshDistortMaterial
        color="#9ee62c"
        distort={0.35}
        speed={reducedMotion ? 0 : 1.6}
        roughness={0.15}
        metalness={0.4}
      />
    </mesh>
  );
}
