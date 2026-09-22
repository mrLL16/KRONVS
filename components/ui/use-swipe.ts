"use client";

import { useRef, type MouseEvent, type PointerEvent } from "react";

export function useSwipe(onSwipe: (direction: -1 | 1) => void) {
  const start = useRef<{ x: number; y: number; id: number } | null>(null);
  const swiped = useRef(false);

  return {
    onPointerDown: (event: PointerEvent<HTMLElement>) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      swiped.current = false;
      start.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
    },
    onPointerUp: (event: PointerEvent<HTMLElement>) => {
      if (!start.current || start.current.id !== event.pointerId) return;
      const dx = event.clientX - start.current.x;
      const dy = event.clientY - start.current.y;
      start.current = null;
      if (Math.abs(dx) >= 45 && Math.abs(dx) > Math.abs(dy) * 1.2) {
        swiped.current = true;
        onSwipe(dx < 0 ? 1 : -1);
      }
    },
    onPointerCancel: () => { start.current = null; },
    onClickCapture: (event: MouseEvent<HTMLElement>) => {
      if (!swiped.current) return;
      event.preventDefault();
      event.stopPropagation();
      swiped.current = false;
    },
  };
}
