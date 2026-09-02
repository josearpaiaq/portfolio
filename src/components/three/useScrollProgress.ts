'use client';

import { useEffect, useRef } from 'react';
import { BEAT_COUNT } from './sceneLayout';

function clamp01(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable;
}

/**
 * Drives the 3D scene's scroll progress (0..1) from wheel, touch drag and
 * keyboard input, without an overlay DOM element — so nothing sits on top of
 * the canvas intercepting clicks meant for 3D objects.
 *
 * Pass `disabled: true` while a modal/overlay is open so scrolling to read
 * it doesn't also move the camera behind it.
 */
export default function useScrollProgress(disabled = false) {
  const progress = useRef(0);
  const disabledRef = useRef(disabled);

  useEffect(() => {
    disabledRef.current = disabled;
  }, [disabled]);

  useEffect(() => {
    const step = 1 / (BEAT_COUNT - 1);

    const onWheel = (event: WheelEvent) => {
      if (disabledRef.current) return;
      progress.current = clamp01(
        progress.current + event.deltaY / (BEAT_COUNT * window.innerHeight),
      );
    };

    let touchStartY: number | null = null;
    const onTouchStart = (event: TouchEvent) => {
      if (disabledRef.current) return;
      touchStartY = event.touches[0]?.clientY ?? null;
    };
    const onTouchMove = (event: TouchEvent) => {
      if (disabledRef.current || touchStartY === null) return;
      const currentY = event.touches[0]?.clientY ?? touchStartY;
      const deltaY = touchStartY - currentY;
      touchStartY = currentY;
      progress.current = clamp01(progress.current + deltaY / (BEAT_COUNT * window.innerHeight));
    };
    const onTouchEnd = () => {
      touchStartY = null;
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (disabledRef.current || isTypingTarget(event.target)) return;
      if (['ArrowDown', 'PageDown'].includes(event.key)) {
        event.preventDefault();
        progress.current = clamp01(progress.current + step);
      } else if (['ArrowUp', 'PageUp'].includes(event.key)) {
        event.preventDefault();
        progress.current = clamp01(progress.current - step);
      } else if (event.key === 'Home') {
        event.preventDefault();
        progress.current = 0;
      } else if (event.key === 'End') {
        event.preventDefault();
        progress.current = 1;
      }
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return progress;
}
