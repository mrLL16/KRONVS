import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ContactLink } from "@/components/ui/contact-link";
import { PageShell } from "@/components/layout/page-shell";
import { HomeMethod } from "@/components/sections/home-method";
import { InversionHero } from "@/components/sections/inversion-hero";
import { pageMetadata } from "@/lib/metadata";
import { company } from "@/data/company";
import styles from "./home.module.css";

export const metadata = pageMetadata(
  "KRONVS | Engenharia, Consultoria e Tecnologia",
  "Projetos, consultoria técnica e sistemas personalizados para estruturar soluções, melhorar processos e apoiar decisões.",
  "/",
);
export default function Home() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: company.name,
            legalName: company.fullName,
            ...(company.siteUrl ? { url: company.siteUrl } : {}),
            description:
              "Engenharia, consultoria e desenvolvimento de sistemas personalizados.",
          }).replace(/</g, "\\u003c"),
        }}
      />
      <div className={`aura-scope aura-home ${styles.page}`}>
        <InversionHero />
        <section
          id="solucoes"
          className={`${styles.section} ${styles.solutions}`}
        >
          <div className={styles.sectionHeading}>
            <div>
              <span className="aura-mono aura-muted">01 / SOLUÇÕES</span>
              <h2>
                Duas frentes de atuação.
                <br />
                <span>Contratadas juntas ou separadas.</span>
              </h2>
            </div>
          </div>
          <div className={styles.services}>
            <article className="aura-card">
              <h3>Engenharia &amp; Consultoria</h3>
              <p>
                Projetos de engenharia e HVAC, planejamento, gestão e
                acompanhamento técnico. Da análise de uma instalação à
                organização de obras e processos.
              </p>
              <Link className={styles.serviceLink} href="/engenharia">
                Conhecer Engenharia{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </article>
            <article className="aura-card">
              <h3>Sistemas &amp; Tecnologia</h3>
              <p>
                Sistemas personalizados, automações, dashboards e ferramentas de
                gestão para digitalizar rotinas e reunir informações que hoje
                estão dispersas.
              </p>
              <Link className={styles.serviceLink} href="/sistemas">
                Conhecer Sistemas <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </article>
          </div>
        </section>
        <section className={`${styles.section} ${styles.process}`}>
          <div className={styles.sectionHeading}>
            <div>
              <span className="aura-mono aura-muted">02 / MÉTODO</span>
              <h2>
                A solução começa
                <br />
                <span>antes da ferramenta.</span>
              </h2>
            </div>
            <p>
              Conhecer o contexto, estruturar a decisão e apoiar a aplicação no
              trabalho real.
            </p>
          </div>
          <HomeMethod />
        </section>
        <section className={`${styles.contact} aura-mesh`}>
          <span className="aura-mono aura-muted">03 / PRÓXIMO PASSO</span>
          <h2>
            Tem um problema que
            <br />
            <span>precisa ser estruturado?</span>
          </h2>
          <div className={styles.contactRow}>
            <p>
              Conte o cenário. A KRONVS ajuda a transformar a necessidade em uma
              solução executável.
            </p>
            <ContactLink variant="primary" location="home-cta">
              Falar sobre meu projeto
            </ContactLink>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
