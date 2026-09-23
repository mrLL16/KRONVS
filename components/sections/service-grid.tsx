"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useSwipe } from "@/components/ui/use-swipe";

export type ServiceItem = {
  title: string;
  description: string;
  items: string[];
};

// Same fan math as the reference card-fan-carousel: position is a function
// of distance from the active card, capped at 3 slots either side so a
// longer deck doesn't spread off-screen.
const MAX_FAN_DISTANCE = 3;

function spreadMultiplier() {
  if (typeof window === "undefined") return 1;
  const w = window.innerWidth;
  if (w < 480) return 0.34;
  if (w < 640) return 0.44;
  if (w < 1024) return 0.72;
  return 1;
}

function slotFor(distance: number, multiplier: number) {
  const capped = Math.max(-MAX_FAN_DISTANCE, Math.min(MAX_FAN_DISTANCE, distance));
  const abs = Math.abs(capped);
  return {
    xRem: capped * 10.5 * multiplier,
    yRem: abs * abs * 0.85 * multiplier,
    rotate: capped * 10,
    scale: 1 - abs * abs * 0.045,
    zIndex: 10 - Math.abs(distance),
    opacity: Math.abs(distance) > MAX_FAN_DISTANCE ? 0 : 1,
  };
}

export function ServiceGrid({
  title,
  items,
}: {
  title: string;
  items: ServiceItem[];
}) {
  const [active, setActive] = useState(0);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const isFirstRender = useRef(true);
  const move = (direction: -1 | 1) => setActive((index) => Math.min(Math.max(index + direction, 0), items.length - 1));
  const swipe = useSwipe(move);

  const layout = (animate: boolean) => {
    const multiplier = spreadMultiplier();
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const slot = slotFor(i - active, multiplier);
      const target = {
        x: `${slot.xRem}rem`,
        y: `${slot.yRem}rem`,
        rotate: slot.rotate,
        scale: slot.scale,
        zIndex: slot.zIndex,
        opacity: slot.opacity,
      };
      if (animate) {
        gsap.to(el, { ...target, duration: 0.7, ease: "elastic.out(1, 0.75)" });
      } else {
        gsap.set(el, target);
      }
    });
  };

  useLayoutEffect(() => {
    layout(false);
    isFirstRender.current = false;
    const onResize = () => layout(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isFirstRender.current) return;
    layout(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <section className="section container service-catalog">
      <div className="service-catalog-heading">
        <span className="aura-mono aura-muted">01 / CAPACIDADES</span>
        <h2>{title}</h2>
      </div>
      <div className="fan-stage">
        <button
          type="button"
          className="fan-arrow fan-arrow-left"
          aria-label="Capacidade anterior"
          disabled={active === 0}
          onClick={() => move(-1)}
        >
          <ArrowLeft size={20} aria-hidden="true" />
        </button>
        <div className="service-catalog-grid" role="region" aria-label="Capacidades" {...swipe}>
          {items.map((item, i) => (
            <article
              className="ds-card aura-card fan-card"
              data-reveal
              key={item.title}
              data-active={i === active}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              onClick={() => setActive(i)}
            >
              <span className="aura-mono aura-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <ul>
                {item.items.map((text) => (
                  <li key={text}>{text}</li>
                ))}
              </ul>
              <span className="aura-card-signal" aria-hidden="true" />
            </article>
          ))}
        </div>
        <button
          type="button"
          className="fan-arrow fan-arrow-right"
          aria-label="Próxima capacidade"
          disabled={active === items.length - 1}
          onClick={() => move(1)}
        >
          <ArrowRight size={20} aria-hidden="true" />
        </button>
      </div>
      <div className="fan-dots" role="tablist" aria-label="Ir para capacidade">
        {items.map((item, i) => (
          <button
            key={item.title}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Ir para ${item.title}`}
            className={i === active ? "is-active" : ""}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </section>
  );
}
