import { engenhariaContent } from "@/content";
import { MethodCarousel } from "@/components/sections/method-carousel";


const processContent = engenhariaContent.process;

export function EngineeringProcess() {
  return (
    <section className="section container process-section">
      <div className="aura-section-heading">
        <span className="aura-mono aura-muted">{processContent.eyebrow}</span>
        <h2>{processContent.title}</h2>
      </div>
      <MethodCarousel steps={processContent.steps} ariaLabel="Etapas do processo de engenharia" variant="internal" />
    </section>
  );
}
