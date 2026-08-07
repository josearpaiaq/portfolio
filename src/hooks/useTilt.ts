'use client';

import { useReducedMotion } from 'framer-motion';
import { MouseEvent, useRef } from 'react';

const MAX_TILT_DEG = 10;

export function useTilt<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const prefersReducedMotion = useReducedMotion();

  const onMouseMove = (e: MouseEvent<T>) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(800px) rotateX(${-py * MAX_TILT_DEG}deg) rotateY(${px * MAX_TILT_DEG}deg) translateY(-4px) scale3d(1.02, 1.02, 1.02)`;
  };

  const onMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = '';
  };

  return { ref, onMouseMove, onMouseLeave };
}
