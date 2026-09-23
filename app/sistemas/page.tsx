import { PageShell } from "@/components/layout/page-shell";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceGrid } from "@/components/sections/service-grid";
import { SystemsProcess } from "@/components/sections/systems-process";
import { SystemShowcase } from "@/components/sections/system-showcase";
import { AuthorialSystems } from "@/components/sections/authorial-systems";
import { CTASection } from "@/components/sections/cta-section";
import { ContactLink } from "@/components/ui/contact-link";
import { sistemasContent as c } from "@/content";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(c.seo.title, c.seo.description, "/sistemas");
export default function SystemsPage() {
  return (
    <PageShell>
      <PageHero
        signal="systems"
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        description={c.hero.description}
      >
        <ContactLink intent="systems">{c.hero.button}</ContactLink>
      </PageHero>
      <SystemShowcase />
      <ServiceGrid title={c.services.title} items={c.services.cards} />
      <AuthorialSystems />
      <SystemsProcess />
      <CTASection
        title={c.cta.title}
        text={c.cta.text}
        button={c.cta.button}
        intent="systems"
      />
    </PageShell>
  );
}
