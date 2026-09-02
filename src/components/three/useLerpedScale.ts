'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { MathUtils, Object3D } from 'three';

// Smoothly eases an object's uniform scale toward a target each frame,
// instead of snapping instantly on hover state changes.
export default function useLerpedScale<T extends Object3D>(targetScale: number, factor = 0.2) {
  const ref = useRef<T>(null);

  useFrame(() => {
    if (!ref.current) return;
    const next = MathUtils.lerp(ref.current.scale.x, targetScale, factor);
    ref.current.scale.setScalar(next);
  });

  return ref;
}
