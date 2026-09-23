import { Suspense } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { ContactForm } from "@/components/forms/contact-form";
import { HeroSignal } from "@/components/sections/hero-signal";
import { company } from "@/data/company";
import { contatoContent as c } from "@/content";
import { pageMetadata } from "@/lib/metadata";
import styles from "./contact-experience.module.css";
export const metadata = pageMetadata(c.seo.title, c.seo.description, "/contato");
export default function Contact() {
  return (
    <PageShell>
      <section className={`${styles.experience} contact-experience aura-mesh`} aria-labelledby="contact-page-title">
        <div className={styles.layout}>
          <div className={styles.copy}>
            <span className="aura-mono aura-muted">{c.hero.eyebrow}</span>
            <h1 id="contact-page-title">{c.hero.title}</h1>
            <div className={styles.guidance}>
              <p className={styles.lead}>{c.hero.lead}</p>
              {company.email && <a className="text-link" href={`mailto:${company.email}`}>{company.email}</a>}
            </div>
            <div className={styles.signal}>
              <HeroSignal signal="contact" />
            </div>
          </div>
          <div className={styles.formPanel}>
            <Suspense
              fallback={<p role="status">{c.hero.loadingForm} <noscript>{c.form.noscript}</noscript></p>}
            >
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
