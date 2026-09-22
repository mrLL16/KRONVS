import { Suspense } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { ContactForm } from "@/components/forms/contact-form";
import { HeroSignal } from "@/components/sections/hero-signal";
import { company } from "@/data/company";
import { pageMetadata } from "@/lib/metadata";
import styles from "./contact-experience.module.css";
export const metadata = pageMetadata(
  "Contato | KRONVS",
  "Descreva seu projeto de engenharia, consultoria ou sistema. Prepare uma solicitação e revise a mensagem antes de enviar pelo WhatsApp.",
  "/contato",
);
export default function Contact() {
  return (
    <PageShell>
      <section className={`${styles.experience} contact-experience aura-mesh`} aria-labelledby="contact-page-title">
        <div className={styles.layout}>
          <div className={styles.copy}>
            <span className="aura-mono aura-muted">VAMOS ENTENDER A SUA NECESSIDADE</span>
            <h1 id="contact-page-title">Contato</h1>
            <div className={styles.guidance}>
              <p className={styles.lead}>Conte o cenário, o problema e o que precisa ser desenvolvido. Essas informações ajudam a iniciar uma conversa mais objetiva.</p>
              {company.email && <a className="text-link" href={`mailto:${company.email}`}>{company.email}</a>}
            </div>
            <div className={styles.signal}>
              <HeroSignal signal="contact" />
            </div>
          </div>
          <div className={styles.formPanel}>
            <Suspense
              fallback={<p role="status">Preparando formulário. <noscript>Ative o JavaScript para preencher sua solicitação.</noscript></p>}
            >
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
