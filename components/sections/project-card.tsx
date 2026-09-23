"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { projetosContent } from "@/content";
import type { Project } from "@/data/projects";
import { useSwipe } from "@/components/ui/use-swipe";
export function ProjectCard({ project }: { project: Project }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const images = project.images ?? (project.image ? [project.image] : []);
  const activeImage = images[imageIndex];
  const swipe = useSwipe((direction) => setImageIndex((index) => Math.min(Math.max(index + direction, 0), images.length - 1)));

  return (
    <article className="ds-card project-card">
      {activeImage && (
        <div className="project-gallery" {...swipe}
          onPointerDown={(event) => { event.stopPropagation(); swipe.onPointerDown(event); }}
          onPointerUp={(event) => { event.stopPropagation(); swipe.onPointerUp(event); }}
        >
          <button
            type="button"
            className="project-visual"
            aria-label={`Ampliar foto ${imageIndex + 1} de ${images.length} do projeto ${project.title}`}
            onClick={() => dialogRef.current?.showModal()}
          >
            <Image
              {...activeImage}
              draggable={false}
              alt={activeImage.alt}
              sizes="(max-width: 767px) calc(100vw - 96px), (max-width: 1100px) 38vw, 34vw"
              className="project-image"
            />
          </button>
          {images.length > 1 && (
            <div className="project-gallery-controls" aria-label="Fotos do projeto">
              <button type="button" aria-label="Foto anterior" disabled={imageIndex === 0} onClick={() => setImageIndex((index) => index - 1)}>
                <ArrowLeft size={16} aria-hidden="true" />
              </button>
              <span aria-live="polite">{String(imageIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
              <button type="button" aria-label="Próxima foto" disabled={imageIndex === images.length - 1} onClick={() => setImageIndex((index) => index + 1)}>
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      )}
      <div className="project-card-content">
        <div className="project-card-summary">
          <span className="business-kicker">
            {project.category} · {project.sector} · {project.status}
          </span>
          <h3>{project.title}</h3>
          {(project.client || project.city) && (
            <p className="project-location">{[project.client, project.city].filter(Boolean).join(" · ")}</p>
          )}
        </div>
        <dl className="project-card-details">
          {[
            [projetosContent.cardLabels.challenge, project.problem],
            [projetosContent.cardLabels.scope, project.scope],
            [projetosContent.cardLabels.contribution, project.contribution],
            ...(project.verifiedResult
              ? [[projetosContent.cardLabels.result, project.verifiedResult]]
              : []),
          ].map(([label, text]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{text}</dd>
            </div>
          ))}
        </dl>
        {project.href && (
          <Link className="text-link" href={project.href}>
            {projetosContent.cardLabels.learnMore} {project.title}
          </Link>
        )}
      </div>
      {activeImage && (
        <dialog
          ref={dialogRef}
          className="project-lightbox"
          aria-label={`Foto ampliada do projeto ${project.title}`}
          onClick={(event) => {
            if (event.target === event.currentTarget) dialogRef.current?.close();
          }}
        >
          <button
            type="button"
            className="project-lightbox-close"
            aria-label="Fechar foto ampliada"
            onClick={() => dialogRef.current?.close()}
          >
            <X size={22} aria-hidden="true" />
          </button>
          <Image
            {...activeImage}
            alt={activeImage.alt}
            sizes="(max-width: 767px) 90vw, 75vw"
            className="project-lightbox-image"
          />
        </dialog>
      )}
    </article>
  );
}
