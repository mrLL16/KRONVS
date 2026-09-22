"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useSwipe } from "@/components/ui/use-swipe";
import styles from "@/app/home.module.css";

export type MethodStep = {
  title: string;
  detailTitle: string;
  summary: string;
  explanation: string;
  points: readonly string[];
};

export function MethodCarousel({ steps, ariaLabel, variant }: { steps: readonly MethodStep[]; ariaLabel: string; variant?: "internal" }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const step = steps[activeIndex];

  const move = (direction: -1 | 1) => {
    setActiveIndex((current) =>
      Math.min(Math.max(current + direction, 0), steps.length - 1),
    );
  };
  const swipe = useSwipe(move);

  return (
    <div className={`${styles.methodExperience} ${variant === "internal" ? styles.methodInternal : ""}`} role="region" aria-label={ariaLabel}>
      <div className={styles.methodCard} {...swipe}>
        <div key={activeIndex} className={styles.methodCardContent}>
          <div className={styles.methodCardTop}>
            <span className="aura-mono aura-muted">ETAPA {String(activeIndex + 1).padStart(2, "0")}</span>
            <span className="aura-mono aura-muted">{String(activeIndex + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}</span>
          </div>
          <div>
            <h3>{step.title}</h3>
            <p>{step.summary}</p>
          </div>
          <div className={styles.methodProgress} aria-hidden="true">
            <span style={{ width: `${((activeIndex + 1) / steps.length) * 100}%` }} />
          </div>
        </div>
      </div>

      <div className={styles.methodExplanation}>
        <div className={styles.methodExplanationStages} aria-live="polite" aria-atomic="true">
          {steps.map((item, index) => (
            <div
              key={item.title}
              className={`${styles.methodExplanationContent} ${index === activeIndex ? styles.isActive : ""}`}
              aria-hidden={index !== activeIndex}
            >
              <span className="aura-mono aura-muted">O QUE ACONTECE NESTA ETAPA</span>
              <h3>{item.detailTitle}</h3>
              <p>{item.explanation}</p>
              <ul>
                {item.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className={styles.methodNavigation}>
          <div className={styles.methodStepSelect} role="group" aria-label="Selecionar etapa">
            {steps.map((item, index) => (
              <button
                key={item.title}
                type="button"
                className={index === activeIndex ? styles.isActive : ""}
                aria-label={`Etapa ${index + 1}: ${item.title}`}
                aria-pressed={index === activeIndex}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
          <div className={styles.methodArrows}>
            <button type="button" aria-label="Etapa anterior" disabled={activeIndex === 0} onClick={() => move(-1)}>
              <ArrowLeft size={20} aria-hidden="true" />
            </button>
            <button type="button" aria-label="Próxima etapa" disabled={activeIndex === steps.length - 1} onClick={() => move(1)}>
              <ArrowRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
