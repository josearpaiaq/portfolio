'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { tagsEnum, tags } from '@/constants';
import TechIcon from './TechIcon';

const ICON_SIZES = [40, 52, 34, 46, 38, 56];
const ICON_OPACITIES = [0.18, 0.24, 0.16, 0.2, 0.26, 0.14];

const REPEL_RADIUS = 110;
const REPEL_STRENGTH = 2200;
const BASE_SPEED = 12;
const MAX_SPEED = 70;
const DAMPING = 0.985;

interface IconState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

export default function HeroBackground({
  techKeys,
  children,
}: {
  techKeys: tagsEnum[];
  children: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconElRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconStates = useRef<IconState[]>([]);
  const pointer = useRef({ x: 0, y: 0, active: false });
  const frameRef = useRef<number>(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const { width, height } = container.getBoundingClientRect();

    iconStates.current = techKeys.map((_, i) => {
      const size = ICON_SIZES[i % ICON_SIZES.length];
      const angle = Math.random() * Math.PI * 2;
      return {
        x: Math.random() * Math.max(width - size, 0),
        y: Math.random() * Math.max(height - size, 0),
        vx: Math.cos(angle) * BASE_SPEED,
        vy: Math.sin(angle) * BASE_SPEED,
        size,
      };
    });

    iconElRefs.current.forEach((el, i) => {
      const state = iconStates.current[i];
      if (!el || !state) return;
      el.style.transform = `translate3d(${state.x}px, ${state.y}px, 0)`;
      el.style.opacity = String(ICON_OPACITIES[i % ICON_OPACITIES.length]);
    });

    if (prefersReducedMotion) return;

    let lastTime = performance.now();

    const step = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;
      const bounds = container.getBoundingClientRect();

      iconStates.current.forEach((state, i) => {
        if (pointer.current.active) {
          const dx = state.x + state.size / 2 - pointer.current.x;
          const dy = state.y + state.size / 2 - pointer.current.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 0 && dist < REPEL_RADIUS) {
            const force = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * REPEL_STRENGTH;
            state.vx += (dx / dist) * force * dt;
            state.vy += (dy / dist) * force * dt;
          }
        }

        state.vx *= DAMPING;
        state.vy *= DAMPING;
        const speed = Math.hypot(state.vx, state.vy);
        if (speed > MAX_SPEED) {
          state.vx = (state.vx / speed) * MAX_SPEED;
          state.vy = (state.vy / speed) * MAX_SPEED;
        } else if (speed < BASE_SPEED) {
          const angle = speed > 0 ? Math.atan2(state.vy, state.vx) : Math.random() * Math.PI * 2;
          state.vx = Math.cos(angle) * BASE_SPEED;
          state.vy = Math.sin(angle) * BASE_SPEED;
        }

        state.x += state.vx * dt;
        state.y += state.vy * dt;

        const maxX = Math.max(bounds.width - state.size, 0);
        const maxY = Math.max(bounds.height - state.size, 0);
        if (state.x < 0) {
          state.x = 0;
          state.vx = Math.abs(state.vx);
        } else if (state.x > maxX) {
          state.x = maxX;
          state.vx = -Math.abs(state.vx);
        }
        if (state.y < 0) {
          state.y = 0;
          state.vy = Math.abs(state.vy);
        } else if (state.y > maxY) {
          state.y = maxY;
          state.vy = -Math.abs(state.vy);
        }

        const el = iconElRefs.current[i];
        if (el) el.style.transform = `translate3d(${state.x}px, ${state.y}px, 0)`;
      });

      frameRef.current = requestAnimationFrame(step);
    };

    frameRef.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frameRef.current);
  }, [techKeys, prefersReducedMotion]);

  const updatePointer = (clientX: number, clientY: number) => {
    const bounds = containerRef.current?.getBoundingClientRect();
    if (!bounds) return;
    pointer.current = { x: clientX - bounds.left, y: clientY - bounds.top, active: true };
  };

  return (
    <div
      ref={containerRef}
      className="relative flex w-full flex-1 flex-col"
      onMouseMove={(e) => updatePointer(e.clientX, e.clientY)}
      onMouseLeave={() => (pointer.current.active = false)}
      onTouchStart={(e) => updatePointer(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchMove={(e) => updatePointer(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchEnd={() => (pointer.current.active = false)}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="dark:bg-primary/12 animate-aurora-drift absolute -right-10 -top-16 h-64 w-64 rounded-full bg-primary/20 blur-3xl motion-reduce:animate-none" />
        <div className="bg-highlight/14 animate-aurora-drift absolute right-32 top-16 h-48 w-48 rounded-full blur-3xl [animation-delay:-3s] motion-reduce:animate-none dark:bg-highlight/10" />

        {techKeys.map((key, i) => (
          <div
            key={key}
            ref={(el) => {
              iconElRefs.current[i] = el;
            }}
            className="absolute left-0 top-0 opacity-0 transition-opacity duration-700 will-change-transform"
            style={{
              width: ICON_SIZES[i % ICON_SIZES.length],
              height: ICON_SIZES[i % ICON_SIZES.length],
            }}
          >
            <TechIcon icon={tags[key].icon} alt="" className="h-full w-full object-contain" />
          </div>
        ))}
      </div>

      {children}
    </div>
  );
}
