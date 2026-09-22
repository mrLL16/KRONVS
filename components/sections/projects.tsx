import { projects, type ProjectCategory } from "@/data/projects";
import { ProjectCarousel } from "./project-carousel";
import { ProjectPreview } from "@/components/technical/project-preview";
export function Projects({
  category,
  categories,
  showEmpty = false,
}: {
  category?: ProjectCategory;
  categories?: readonly ProjectCategory[];
  showEmpty?: boolean;
}) {
  const published = projects.filter(
    (project) =>
      project.published &&
      (!category || project.category === category) &&
      (!categories || categories.includes(project.category)),
  );
  if (!published.length && !showEmpty) return null;
  return (
    <section className="section container project-section">
      <div className="aura-section-heading">
        <span className="aura-mono aura-muted">03 / PROJETOS</span>
        <h2>Projetos e aplicações.</h2>
      </div>
      {published.length ? (
        <ProjectCarousel projects={published} />
      ) : (
        <div className="project-placeholder aura-card" data-reveal>
          <ProjectPreview />
          <div>
            <span className="business-kicker">
              ESPAÇO PARA PROJETOS AUTORIZADOS
            </span>
            <h3>Contexto, escopo e solução documentados.</h3>
            <p>
              Os projetos serão apresentados aqui conforme a disponibilidade de
              material e as autorizações de divulgação. O desenho ao lado é
              apenas ilustrativo.
            </p>
            <p>
              Cada apresentação poderá reunir o desafio, a atuação da KRONVS,
              imagens e resultados verificáveis.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
