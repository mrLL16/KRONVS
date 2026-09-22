"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function AuraInteractions() {
  const pathname = usePathname();
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    const root = document.querySelector<HTMLElement>(".aura-site");
    const cursor = cursorRef.current;
    let frame = 0;

    const move = (event: PointerEvent) => {
      if (reducedMotion.matches || !finePointer.matches) return;
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const x = event.clientX;
        const y = event.clientY;
        cursor?.style.setProperty("--cursor-x", `${x}px`);
        cursor?.style.setProperty("--cursor-y", `${y}px`);
        root?.style.setProperty("--aura-pointer-x", `${x}px`);
        root?.style.setProperty("--aura-pointer-y", `${y}px`);
        root?.style.setProperty(
          "--aura-shift-x",
          `${(x / window.innerWidth - 0.5) * 24}px`,
        );
        root?.style.setProperty(
          "--aura-shift-y",
          `${(y / window.innerHeight - 0.5) * 18}px`,
        );
        cursor?.classList.add("is-visible");
        cursor?.classList.toggle(
          "is-active",
          Boolean(
            (event.target as Element | null)?.closest(
              "a, button, input, textarea, select, [data-aura-interactive]",
            ),
          ),
        );
      });
    };

    const leave = () => cursor?.classList.remove("is-visible", "is-active");
    const press = (event: PointerEvent) => {
      if (reducedMotion.matches || event.button !== 0) return;
      const interactive = (event.target as Element | null)?.closest(
        "a, button, [data-aura-interactive]",
      );
      if (!interactive) return;
      const pulse = document.createElement("span");
      pulse.className = "aura-click-pulse";
      pulse.style.left = `${event.clientX}px`;
      pulse.style.top = `${event.clientY}px`;
      document.body.append(pulse);
      pulse.addEventListener("animationend", () => pulse.remove(), {
        once: true,
      });
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", press, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", press);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [pathname]);

  return (
    <>
      <div ref={cursorRef} className="aura-pointer" aria-hidden="true" />
    </>
  );
}
