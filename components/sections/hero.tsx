import { ArrowDownRight } from "lucide-react";
import { ContactLink } from "@/components/ui/contact-link";
export function Hero() {
  return (
    <section
      className="hero container hero-business"
      aria-labelledby="hero-title"
    >
      <div className="hero-eyebrow">
        <span className="mono">
          ENGENHARIA & CONSULTORIA · SISTEMAS & TECNOLOGIA
        </span>
      </div>
      <h1 id="hero-title">
        Projetos de engenharia.
        <br />
        <em>Sistemas para sua empresa.</em>
      </h1>
      <div className="hero-business-intro">
        <p className="lead">
          Elaboramos projetos, planejamos obras e orientamos decisões técnicas.
          Também desenvolvemos sistemas para controlar vendas, finanças e
          processos, substituindo planilhas e tarefas manuais. Você pode
          contratar uma área ou as duas.
        </p>
        <ContactLink location="hero" />
      </div>
      <div className="hero-paths" aria-label="Escolha uma frente de atuação">
        <a href="#engenharia">
          <span>Projetar instalações, planejar obras e avaliar soluções</span>
          <strong>Preciso de engenharia ou consultoria</strong>
          <ArrowDownRight aria-hidden="true" />
        </a>
        <a href="#sistemas">
          <span>Organizar informações e automatizar o trabalho</span>
          <strong>Preciso de um sistema para minha empresa</strong>
          <ArrowDownRight aria-hidden="true" />
        </a>
      </div>
      <div className="hero-both">
        <span>Seu projeto envolve as duas áreas?</span>
        <ContactLink intent="both" variant="text" location="hero-both">
          Quero combinar as duas frentes
        </ContactLink>
      </div>
    </section>
  );
}
