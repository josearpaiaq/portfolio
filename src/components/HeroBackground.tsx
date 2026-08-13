'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { tagsEnum, tags } from '@/constants';
import TechIcon from './TechIcon';

const ICON_SIZES = [40, 52, 34, 46, 38, 56];
const ICON_OPACITIES = [0.18, 0.24, 0.16, 0.2, 0.26, 0.14];
const ICON_PHYSICS: BodyPhysics = {
  repelRadius: 110,
  repelStrength: 2200,
  baseSpeed: 12,
  maxSpeed: 70,
  damping: 0.985,
};

const HALOS = [
  { size: 380, opacity: 0.2, color: 'hsl(var(--primary))' },
  { size: 280, opacity: 0.14, color: 'hsl(var(--highlight))' },
];
const HALO_PHYSICS: BodyPhysics = {
  repelRadius: 260,
  repelStrength: 1400,
  baseSpeed: 5,
  maxSpeed: 34,
  damping: 0.99,
};

interface BodyState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

interface BodyPhysics {
  repelRadius: number;
  repelStrength: number;
  baseSpeed: number;
  maxSpeed: number;
  damping: number;
}

function createBody(bounds: { width: number; height: number }, size: number): BodyState {
  const angle = Math.random() * Math.PI * 2;
  return {
    x: Math.random() * Math.max(bounds.width - size, 0),
    y: Math.random() * Math.max(bounds.height - size, 0),
    vx: Math.cos(angle) * 1,
    vy: Math.sin(angle) * 1,
    size,
  };
}

function stepBody(
  body: BodyState,
  dt: number,
  bounds: { width: number; height: number },
  pointer: { x: number; y: number; active: boolean },
  physics: BodyPhysics,
) {
  if (pointer.active) {
    const dx = body.x + body.size / 2 - pointer.x;
    const dy = body.y + body.size / 2 - pointer.y;
    const dist = Math.hypot(dx, dy);
    if (dist > 0 && dist < physics.repelRadius) {
      const force = ((physics.repelRadius - dist) / physics.repelRadius) * physics.repelStrength;
      body.vx += (dx / dist) * force * dt;
      body.vy += (dy / dist) * force * dt;
    }
  }

  body.vx *= physics.damping;
  body.vy *= physics.damping;
  const speed = Math.hypot(body.vx, body.vy);
  if (speed > physics.maxSpeed) {
    body.vx = (body.vx / speed) * physics.maxSpeed;
    body.vy = (body.vy / speed) * physics.maxSpeed;
  } else if (speed < physics.baseSpeed) {
    const angle = speed > 0 ? Math.atan2(body.vy, body.vx) : Math.random() * Math.PI * 2;
    body.vx = Math.cos(angle) * physics.baseSpeed;
    body.vy = Math.sin(angle) * physics.baseSpeed;
  }

  body.x += body.vx * dt;
  body.y += body.vy * dt;

  const maxX = Math.max(bounds.width - body.size, 0);
  const maxY = Math.max(bounds.height - body.size, 0);
  if (body.x < 0) {
    body.x = 0;
    body.vx = Math.abs(body.vx);
  } else if (body.x > maxX) {
    body.x = maxX;
    body.vx = -Math.abs(body.vx);
  }
  if (body.y < 0) {
    body.y = 0;
    body.vy = Math.abs(body.vy);
  } else if (body.y > maxY) {
    body.y = maxY;
    body.vy = -Math.abs(body.vy);
  }
}

function resolveCollisions(bodies: BodyState[]) {
  for (let i = 0; i < bodies.length; i++) {
    for (let j = i + 1; j < bodies.length; j++) {
      const a = bodies[i];
      const b = bodies[j];
      const dx = b.x + b.size / 2 - (a.x + a.size / 2);
      const dy = b.y + b.size / 2 - (a.y + a.size / 2);
      const dist = Math.hypot(dx, dy);
      const minDist = (a.size + b.size) / 2;
      if (dist <= 0 || dist >= minDist) continue;

      const nx = dx / dist;
      const ny = dy / dist;
      const overlap = minDist - dist;

      a.x -= (nx * overlap) / 2;
      a.y -= (ny * overlap) / 2;
      b.x += (nx * overlap) / 2;
      b.y += (ny * overlap) / 2;

      const relVel = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
      if (relVel < 0) {
        a.vx += nx * relVel;
        a.vy += ny * relVel;
        b.vx -= nx * relVel;
        b.vy -= ny * relVel;
      }
    }
  }
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
  const iconStates = useRef<BodyState[]>([]);
  const haloElRefs = useRef<(HTMLDivElement | null)[]>([]);
  const haloStates = useRef<BodyState[]>([]);
  const pointer = useRef({ x: 0, y: 0, active: false });
  const frameRef = useRef<number>(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const bounds = container.getBoundingClientRect();

    iconStates.current = techKeys.map((_, i) =>
      createBody(bounds, ICON_SIZES[i % ICON_SIZES.length]),
    );
    haloStates.current = HALOS.map((halo) => createBody(bounds, halo.size));

    iconElRefs.current.forEach((el, i) => {
      const state = iconStates.current[i];
      if (!el || !state) return;
      el.style.transform = `translate3d(${state.x}px, ${state.y}px, 0)`;
      el.style.opacity = String(ICON_OPACITIES[i % ICON_OPACITIES.length]);
    });
    haloElRefs.current.forEach((el, i) => {
      const state = haloStates.current[i];
      if (!el || !state) return;
      el.style.transform = `translate3d(${state.x}px, ${state.y}px, 0)`;
      el.style.opacity = String(HALOS[i].opacity);
    });

    if (prefersReducedMotion) return;

    let lastTime = performance.now();

    const step = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;
      const liveBounds = container.getBoundingClientRect();

      iconStates.current.forEach((state) => {
        stepBody(state, dt, liveBounds, pointer.current, ICON_PHYSICS);
      });
      resolveCollisions(iconStates.current);
      iconStates.current.forEach((state, i) => {
        const el = iconElRefs.current[i];
        if (el) el.style.transform = `translate3d(${state.x}px, ${state.y}px, 0)`;
      });

      haloStates.current.forEach((state, i) => {
        stepBody(state, dt, liveBounds, pointer.current, HALO_PHYSICS);
        const el = haloElRefs.current[i];
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
        {HALOS.map((halo, i) => (
          <div
            key={i}
            ref={(el) => {
              haloElRefs.current[i] = el;
            }}
            className="absolute left-0 top-0 rounded-full opacity-0 blur-3xl transition-opacity duration-1000 will-change-transform motion-reduce:transition-none"
            style={{ width: halo.size, height: halo.size, backgroundColor: halo.color }}
          />
        ))}

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
