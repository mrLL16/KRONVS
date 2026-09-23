import { sistemasContent } from "@/content";
import { MethodCarousel } from "@/components/sections/method-carousel";

const content = sistemasContent.process;

export function SystemsProcess() {
  return (
    <section className="section container process-section systems-process-section">
      <div className="aura-section-heading">
        <span className="aura-mono aura-muted">{content.eyebrow}</span>
        <h2>{content.title}</h2>
      </div>
      <MethodCarousel steps={content.steps} ariaLabel="Etapas do desenvolvimento de sistemas" variant="internal" />
    </section>
  );
}
