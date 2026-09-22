import { ArrowUpRight } from "lucide-react";
import { ContactLink } from "@/components/ui/contact-link";
export function AuthorSignature() {
  return (
    <section
      className="author-section container aura-mesh"
      aria-labelledby="author-title"
    >
      <div className="author-rule" aria-hidden="true" />
      <div data-reveal>
        <div className="author-percentage" aria-hidden="true">
          <span className="author-count" data-motion-counter data-target="100">
            100
          </span>
          <span>%</span>
          <ArrowUpRight strokeWidth={0.75} />
        </div>
        <h2 id="author-title">
          Esta página foi desenvolvida
          <br />
          <span className="muted">100% pela KRONVS.</span>
        </h2>
        <p>
          O site reúne alguns exemplos da nossa forma de trabalhar.
          <br />Cada projeto começa pela compreensão do seu contexto.
        </p>
        <ContactLink intent="systems" location="author">
          Quero conversar sobre minha ideia
        </ContactLink>
      </div>
    </section>
  );
}
