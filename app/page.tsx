import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ContactLink } from "@/components/ui/contact-link";
import { PageShell } from "@/components/layout/page-shell";
import { HomeMethod } from "@/components/sections/home-method";
import { InversionHero } from "@/components/sections/inversion-hero";
import { pageMetadata } from "@/lib/metadata";
import { company } from "@/data/company";
import { homeContent as c } from "@/content";
import { JsonLd } from "@/components/ui/json-ld";
import styles from "./home.module.css";

export const metadata = pageMetadata(c.seo.title, c.seo.description, "/");
export default function Home() {
  return (
    <PageShell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": company.siteUrl ? `${company.siteUrl}#organization` : undefined,
              name: company.name,
              legalName: company.fullName,
              ...(company.siteUrl ? { url: company.siteUrl } : {}),
              description: c.seo.description,
            },
            {
              "@type": "WebSite",
              "@id": company.siteUrl ? `${company.siteUrl}#website` : undefined,
              name: company.name,
              ...(company.siteUrl
                ? { url: company.siteUrl, publisher: { "@id": `${company.siteUrl}#organization` } }
                : {}),
              inLanguage: "pt-BR",
            },
          ],
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
              <span className="aura-mono aura-muted">{c.solutions.eyebrow}</span>
              <h2>
                {c.solutions.titleLine1}
                <br />
                <span>{c.solutions.titleLine2Highlight}</span>
              </h2>
            </div>
          </div>
          <div className={styles.services}>
            {c.solutions.cards.map((card) => (
              <article className="aura-card" key={card.linkHref}>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <Link className={styles.serviceLink} href={card.linkHref}>
                  {card.linkLabel}{" "}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </section>
        <section className={`${styles.section} ${styles.process}`}>
          <div className={styles.sectionHeading}>
            <div>
              <span className="aura-mono aura-muted">{c.method.eyebrow}</span>
              <h2>
                {c.method.titleLine1}
                <br />
                <span>{c.method.titleLine2Highlight}</span>
              </h2>
            </div>
            <p>{c.method.text}</p>
          </div>
          <HomeMethod />
        </section>
        <section className={`${styles.contact} aura-mesh`}>
          <span className="aura-mono aura-muted">{c.cta.eyebrow}</span>
          <h2>
            {c.cta.titleLine1}
            <br />
            <span>{c.cta.titleLine2Highlight}</span>
          </h2>
          <div className={styles.contactRow}>
            <p>{c.cta.text}</p>
            <ContactLink variant="primary" location="home-cta">
              {c.cta.button}
            </ContactLink>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
