import { globalContent } from "@/content";
import { ContactLink } from "@/components/ui/contact-link";
import type { ContactIntent } from "@/data/company";
export function CTASection({
  title,
  text,
  button = "Falar sobre meu projeto",
  intent = "general",
}: {
  title: string;
  text: string;
  button?: string;
  intent?: ContactIntent;
}) {
  return (
    <section className="section container compact-cta aura-final-cta aura-mesh">
      <div>
        <span className="aura-mono aura-muted">{globalContent.pageChrome.ctaEyebrow}</span>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <ContactLink intent={intent} location="page-end">
        {button}
      </ContactLink>
    </section>
  );
}
