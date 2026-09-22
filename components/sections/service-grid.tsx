"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useSwipe } from "@/components/ui/use-swipe";

export type ServiceItem = {
  title: string;
  description: string;
  items: string[];
};
export function ServiceGrid({
  title,
  items,
}: {
  title: string;
  items: ServiceItem[];
}) {
  const [active, setActive] = useState(0);
  const move = (direction: -1 | 1) => setActive((index) => Math.min(Math.max(index + direction, 0), items.length - 1));
  const swipe = useSwipe(move);
  return (
    <section className="section container service-catalog">
      <div className="aura-section-heading">
        <span className="aura-mono aura-muted">01 / CAPACIDADES</span>
        <h2>{title}</h2>
      </div>
      <div className="service-catalog-grid" role="region" aria-label="Capacidades" {...swipe}>
        {items.map((item, i) => (
          <article className="ds-card aura-card" data-reveal key={item.title} data-active={i === active}>
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
      <div className="service-catalog-controls" role="group" aria-label="Navegar pelas capacidades">
        <span className="aura-mono aura-muted" aria-live="polite">{String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
        <div>
          <button type="button" aria-label="Capacidade anterior" disabled={active === 0} onClick={() => move(-1)}><ArrowLeft size={19} aria-hidden="true" /></button>
          <button type="button" aria-label="Próxima capacidade" disabled={active === items.length - 1} onClick={() => move(1)}><ArrowRight size={19} aria-hidden="true" /></button>
        </div>
      </div>
    </section>
  );
}
