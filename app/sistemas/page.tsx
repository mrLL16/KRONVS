import { PageShell } from "@/components/layout/page-shell";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceGrid } from "@/components/sections/service-grid";
import { SystemsProcess } from "@/components/sections/systems-process";
import { SystemShowcase } from "@/components/sections/system-showcase";
import { AuthorialSystems } from "@/components/sections/authorial-systems";
import { CTASection } from "@/components/sections/cta-section";
import { ContactLink } from "@/components/ui/contact-link";
import { systemServices } from "@/data/offerings";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Sistemas & Tecnologia | KRONVS",
  "Sistemas sob medida, automações, dashboards, portais e integrações desenvolvidos a partir dos processos reais da empresa.",
  "/sistemas",
);
export default function SystemsPage() {
  return (
    <PageShell>
      <PageHero
        signal="systems"
        eyebrow="KRONVS / TECNOLOGIA"
        title="Sistemas & Tecnologia"
        description="Software desenvolvido a partir da operação real da empresa: seus processos, suas regras e as informações que precisam estar conectadas."
      >
        <ContactLink intent="systems">Conversar sobre meu sistema</ContactLink>
      </PageHero>
      <SystemShowcase />
      <ServiceGrid
        title="Soluções em Tecnologia"
        items={systemServices}
      />
      <AuthorialSystems />
      <SystemsProcess />
      <CTASection
        title="Qual processo precisa funcionar melhor?"
        text="Conte o que sua equipe faz hoje, onde estão as dificuldades e o que espera de um sistema próprio."
        button="Apresentar minha necessidade"
        intent="systems"
      />
    </PageShell>
  );
}
