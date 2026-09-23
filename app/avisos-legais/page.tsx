import { PageShell } from "@/components/layout/page-shell";
import { PageHero } from "@/components/sections/page-hero";
import { InlineLinks } from "@/components/ui/inline-links";
import { legaisContent as c } from "@/content";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(c.seo.title, c.seo.description, "/avisos-legais");
export default function Legal() {
  return (
    <PageShell>
      <PageHero
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        description={c.hero.description}
      />
      <div className="container legal-content">
        {c.sections.map((section) => (
          <section key={section.title} id={section.anchor || undefined}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>
                <InlineLinks text={paragraph} />
              </p>
            ))}
          </section>
        ))}
        <p className="legal-references">
          <InlineLinks text={c.references} />
        </p>
      </div>
    </PageShell>
  );
}
