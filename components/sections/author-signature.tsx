import { ArrowUpRight } from "lucide-react";
import { sobreContent } from "@/content";
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
          {sobreContent.author.titleLine1}
          <br />
          <span className="muted">{sobreContent.author.titleLine2Highlight}</span>
        </h2>
        <p>
          {sobreContent.author.textLine1}
          <br />{sobreContent.author.textLine2}
        </p>
        <ContactLink intent="systems" location="author">
          {sobreContent.author.button}
        </ContactLink>
      </div>
    </section>
  );
}
