'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function HorizontalRail({
  children,
  label,
  className,
}: {
  children: ReactNode;
  label: string;
  className?: string;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState({ left: false, right: false });

  const updateCanScroll = () => {
    const rail = railRef.current;
    if (!rail) return;
    setCanScroll({
      left: rail.scrollLeft > 4,
      right: rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 4,
    });
  };

  useEffect(() => {
    updateCanScroll();
    const rail = railRef.current;
    if (!rail) return;
    const observer = new ResizeObserver(updateCanScroll);
    observer.observe(rail);
    return () => observer.disconnect();
  }, []);

  const scrollByDir = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    rail.scrollBy({ left: dir * rail.clientWidth * 0.8, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <div className={cn('relative min-h-0 flex-1', className)}>
      <div
        ref={railRef}
        role="region"
        aria-label={label}
        tabIndex={0}
        onScroll={updateCanScroll}
        className="rail-scrollbar flex h-full snap-x snap-mandatory scroll-px-6 items-stretch gap-5 overflow-x-auto px-6 py-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        {children}
      </div>

      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-background to-transparent transition-opacity duration-300',
          !canScroll.left && 'opacity-0',
        )}
      ></div>
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background to-transparent transition-opacity duration-300',
          !canScroll.right && 'opacity-0',
        )}
      ></div>

      <button
        type="button"
        aria-label={`Scroll ${label} backward`}
        onClick={() => scrollByDir(-1)}
        className={cn(
          'absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full border border-border bg-background/90 p-2 text-foreground shadow-md backdrop-blur transition-all duration-300 hover:border-highlight/60 md:flex',
          !canScroll.left && 'pointer-events-none opacity-0',
        )}
      >
        <ChevronLeft aria-hidden className="h-4 w-4" />
      </button>
      <button
        type="button"
        aria-label={`Scroll ${label} forward`}
        onClick={() => scrollByDir(1)}
        className={cn(
          'absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full border border-border bg-background/90 p-2 text-foreground shadow-md backdrop-blur transition-all duration-300 hover:border-highlight/60 md:flex',
          !canScroll.right && 'pointer-events-none opacity-0',
        )}
      >
        <ChevronRight aria-hidden className="h-4 w-4" />
      </button>
    </div>
  );
}
