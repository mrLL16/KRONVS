"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectCard } from "./project-card";
import methodStyles from "@/app/home.module.css";
import { useSwipe } from "@/components/ui/use-swipe";

export function ProjectCarousel({ projects }: { projects: readonly Project[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const project = projects[activeIndex];

  const move = (direction: -1 | 1) => {
    setActiveIndex((current) =>
      Math.min(Math.max(current + direction, 0), projects.length - 1),
    );
  };
  const swipe = useSwipe(move);

  return (
    <div className="project-carousel" role="region" aria-label="Projetos e aplicações" data-reveal>
      <div className="project-carousel-controls">
        <div className={`project-carousel-count ${methodStyles.methodStepSelect}`} role="group" aria-label="Selecionar projeto">
          {projects.map((item, index) => (
            <button
              key={item.slug}
              type="button"
              className={index === activeIndex ? methodStyles.isActive : ""}
              aria-label={`Projeto ${index + 1} de ${projects.length}: ${item.title}`}
              aria-pressed={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
        <div className="project-carousel-actions">
          <span className="aura-mono aura-muted" aria-live="polite">
            {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
          <div className={methodStyles.methodArrows}>
            <button type="button" aria-label="Projeto anterior" disabled={activeIndex === 0} onClick={() => move(-1)}>
              <ArrowLeft size={20} aria-hidden="true" />
            </button>
            <button type="button" aria-label="Próximo projeto" disabled={activeIndex === projects.length - 1} onClick={() => move(1)}>
              <ArrowRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <div className="project-carousel-stage" aria-live="polite" {...swipe}>
        <ProjectCard key={project.slug} project={project} />
      </div>
    </div>
  );
}
