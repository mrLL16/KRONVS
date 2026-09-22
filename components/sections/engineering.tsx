import { SectionIndex } from "@/components/technical/section-index";
import { ContactLink } from "@/components/ui/contact-link";
import { ProjectPreview } from "@/components/technical/project-preview";
const scopes = [
  [
    "Projetos de engenharia",
    "Desenvolvimento e compatibilização de projetos, do levantamento inicial à documentação para execução. Instalações, projetos mecânicos e climatização fazem parte dessa frente.",
  ],
  [
    "Consultoria e estudos",
    "Análise de necessidades, estudos de viabilidade, especificações e avaliação técnica de propostas para apoiar decisões e contratações.",
  ],
  [
    "Planejamento e gestão",
    "Planejamento, gestão de obras, fiscalização e acompanhamento técnico, com atenção a prazos, interfaces e entregáveis.",
  ],
  [
    "Levantamentos e documentação",
    "Levantamentos técnicos, as built, memoriais, quantitativos e organização das informações do projeto.",
  ],
];
export function Engineering() {
  return (
    <section
      id="engenharia"
      className="section container practice-section"
      aria-labelledby="engineering-title"
    >
      <SectionIndex number="03">ENGENHARIA & CONSULTORIA</SectionIndex>
      <div className="practice-layout">
        <div className="practice-intro">
          <h2 id="engineering-title">
            Projetos e orientação técnica
            <br />
            <span className="muted">para planejar e executar.</span>
          </h2>
          <p>
            Para quem precisa desenvolver um projeto, avaliar uma instalação,
            planejar uma obra ou tomar uma decisão técnica.
          </p>
          <p>
            Entregamos desenhos, memoriais, especificações e quantitativos para
            orientar a contratação e a execução. Também podemos planejar e
            acompanhar a obra, conforme o serviço contratado.
          </p>
          <ContactLink
            intent="engineering"
            variant="text"
            location="engineering"
          >
            Falar sobre engenharia
          </ContactLink>
        </div>
        <div className="practice-scopes">
          <ProjectPreview />
          {scopes.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="practice-note">
        <span>Exemplo de necessidade</span>
        <p>
          Uma empresa vai reformar suas instalações e precisa levantar o que
          existe, desenvolver o projeto e definir o que contratar.
        </p>
      </div>
    </section>
  );
}
