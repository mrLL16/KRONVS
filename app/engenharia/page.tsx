import { PageShell } from "@/components/layout/page-shell";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceGrid } from "@/components/sections/service-grid";
import { EngineeringProcess } from "@/components/sections/engineering-process";
import { Projects } from "@/components/sections/projects";
import { CTASection } from "@/components/sections/cta-section";
import { ContactLink } from "@/components/ui/contact-link";
import { engineeringServices } from "@/data/offerings";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Engenharia & Consultoria | KRONVS",
  "Projetos, HVAC, planejamento, gestão de obras, manutenção e consultoria técnica para instalações e operações.",
  "/engenharia",
);
export default function EngineeringPage() {
  return (
    <PageShell>
      <PageHero
        signal="engineering"
        eyebrow="KRONVS / ENGENHARIA"
        title="Engenharia & Consultoria"
        description="Soluções técnicas para projetos, instalações, obras e operações que exigem método, controle e responsabilidade."
      >
        <ContactLink intent="engineering">Apresentar meu projeto</ContactLink>
      </PageHero>
      <ServiceGrid
        title="Soluções em Engenharia"
        items={engineeringServices}
      />
      <EngineeringProcess />
      <section className="section container applications-section">
        <h2>Contextos de aplicação.</h2>
        <p>
          As soluções podem ser avaliadas para estes ambientes e necessidades. O
          escopo depende das condições do projeto e dos requisitos técnicos
          aplicáveis.
        </p>
        <div className="tags">
          {[
            "Empresas e escritórios",
            "Clínicas e hospitais",
            "Indústrias",
            "Operações comerciais",
            "Manutenção",
            "Obras",
            "Retrofit",
            "Expansão",
            "Adequação de instalações",
          ].map((item) => (
            <span className="ds-tag" key={item}>
              {item}
            </span>
          ))}
        </div>
      </section>
      <Projects categories={["Engenharia", "Consultoria"]} showEmpty />
      <CTASection
        title="Precisa estruturar uma solução técnica?"
        text="Apresente o projeto, a instalação ou a decisão que precisa de apoio técnico."
        button="Apresentar meu projeto"
        intent="engineering"
      />
    </PageShell>
  );
}
