import { PageShell } from "@/components/layout/page-shell";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceGrid } from "@/components/sections/service-grid";
import { EngineeringProcess } from "@/components/sections/engineering-process";
import { Projects } from "@/components/sections/projects";
import { CTASection } from "@/components/sections/cta-section";
import { ContactLink } from "@/components/ui/contact-link";
import { engenhariaContent as c } from "@/content";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(c.seo.title, c.seo.description, "/engenharia");
export default function EngineeringPage() {
  return (
    <PageShell>
      <PageHero
        signal="engineering"
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        description={c.hero.description}
      >
        <ContactLink intent="engineering">{c.hero.button}</ContactLink>
      </PageHero>
      <ServiceGrid title={c.services.title} items={c.services.cards} />
      <EngineeringProcess />
      <section className="section container applications-section">
        <h2>{c.applications.title}</h2>
        <p>{c.applications.text}</p>
        <div className="tags">
          {c.applications.tags.map((item) => (
            <span className="ds-tag" key={item}>
              {item}
            </span>
          ))}
        </div>
      </section>
      <Projects categories={["Engenharia", "Consultoria"]} showEmpty />
      <CTASection
        title={c.cta.title}
        text={c.cta.text}
        button={c.cta.button}
        intent="engineering"
      />
    </PageShell>
  );
}
