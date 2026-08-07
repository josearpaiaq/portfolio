'use client';

import { useReducedMotion } from 'framer-motion';
import { MouseEvent, useRef } from 'react';
import { tags } from '@/constants';
import TechIcon from './TechIcon';

const MAX_SCALE = 1.35;
const RADIUS = 110;

export default function TechStack() {
  const iconRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const iconRects = useRef<DOMRect[]>([]);
  const prefersReducedMotion = useReducedMotion();

  const handleMouseEnter = () => {
    iconRects.current = iconRefs.current.map((el) => el?.getBoundingClientRect() ?? new DOMRect());
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    iconRefs.current.forEach((el, i) => {
      const rect = iconRects.current[i];
      if (!el || !rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
      const scale = 1 + Math.max(0, (RADIUS - dist) / RADIUS) * (MAX_SCALE - 1);
      el.style.transform = `scale(${scale})`;
    });
  };

  const handleMouseLeave = () => {
    iconRefs.current.forEach((el) => {
      if (el) el.style.transform = '';
    });
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="grid w-full grid-cols-4 gap-3 md:grid-cols-6"
    >
      {Object.values(tags).map(({ title, icon, url }, i) => (
        <a
          key={title}
          ref={(el) => {
            iconRefs.current[i] = el;
          }}
          href={url}
          target="_blank"
          rel="noreferrer"
          className="group flex select-none flex-col items-center gap-1.5 rounded-lg border border-transparent p-2 text-muted-foreground transition-all duration-150 ease-out will-change-transform hover:border-border hover:bg-card hover:text-foreground"
        >
          <TechIcon
            icon={icon}
            className="h-10 w-10 transition-transform duration-300 group-hover:-translate-y-1"
          />
          <p className="text-center text-sm">{title}</p>
        </a>
      ))}
    </div>
  );
}
