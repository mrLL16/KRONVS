import { projetosContent } from "@/content";
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
        <span className="aura-mono aura-muted">{projetosContent.section.eyebrow}</span>
        <h2>{projetosContent.section.title}</h2>
      </div>
      {published.length ? (
        <ProjectCarousel projects={published} />
      ) : (
        <div className="project-placeholder aura-card" data-reveal>
          <ProjectPreview />
          <div>
            <span className="business-kicker">
              {projetosContent.placeholder.kicker}
            </span>
            <h3>{projetosContent.placeholder.title}</h3>
            <p>{projetosContent.placeholder.paragraph1}</p>
            <p>{projetosContent.placeholder.paragraph2}</p>
          </div>
        </div>
      )}
    </section>
  );
}
