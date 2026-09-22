import { PageShell } from "@/components/layout/page-shell";
import { PageHero } from "@/components/sections/page-hero";
import { AboutPortfolio } from "@/components/sections/about-portfolio";
import { AuthorSignature } from "@/components/sections/author-signature";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Sobre a KRONVS",
  "Conheça a abordagem da KRONVS: engenharia, gestão e tecnologia para desenvolver soluções viáveis, documentadas e orientadas à operação.",
  "/sobre",
);
const principles = [
  [
    "Método antes da ferramenta",
    "O ponto de partida é o problema real. Requisitos, restrições e objetivos orientam a escolha do caminho.",
  ],
  [
    "Engenharia aplicada",
    "As decisões consideram o que precisa ser executado, as condições existentes e as interfaces do projeto.",
  ],
  [
    "Tecnologia com propósito",
    "O software deve facilitar a rotina, organizar informações e reduzir complexidade para quem o utiliza.",
  ],
  [
    "Visão de execução",
    "A solução precisa ser viável fora do desenho ou do protótipo, com escopo, responsabilidades e entregas claros.",
  ],
];
export default function About() {
  return (
    <PageShell>
      <PageHero
        signal="about"
        eyebrow="MÉTODO, EXECUÇÃO E OPERAÇÃO"
        title="Sobre a KRONVS"
        description="A KRONVS combina engenharia, gestão e desenvolvimento de sistemas para estruturar problemas e construir soluções que possam ser aplicadas no trabalho real."
      />
      <section className="section container about-intro">
        <h2>
          Conhecimento técnico.
          <br />
          <span className="muted">Visão do trabalho em uso.</span>
        </h2>
        <div>
          <p>
            Uma necessidade pode exigir um projeto de engenharia, uma revisão de
            processos ou um sistema próprio. A atuação começa pela análise do
            contexto, antes de definir ferramentas ou entregáveis.
          </p>
          <p>
            Engenharia & Consultoria e Sistemas & Tecnologia são frentes
            independentes. Quando a necessidade envolve as duas, seus escopos
            podem ser estruturados em conjunto.
          </p>
        </div>
      </section>
      <section className="section container">
        <h2>Como pensamos o trabalho.</h2>
        <div className="philosophy-grid">
          {principles.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <AboutPortfolio />
      <section className="section container trust-section">
        <h2>
          Confiança construída
          <br />
          <span className="muted">durante o trabalho.</span>
        </h2>
        <div className="philosophy-grid">
          {[
            [
              "Escopo e documentação",
              "Registrar premissas, decisões e entregas para tornar o trabalho verificável.",
            ],
            [
              "Acompanhamento próximo",
              "Combinar pontos de revisão e manter a comunicação objetiva ao longo do projeto.",
            ],
            [
              "Visão multidisciplinar",
              "Considerar as relações entre requisitos técnicos, processos e uso das informações.",
            ],
            [
              "Soluções personalizadas",
              "Definir a abordagem conforme a necessidade e validar sua aplicação com quem vai utilizá-la.",
            ],
          ].map(([title, text]) => (
            <article data-reveal key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <AuthorSignature />
    </PageShell>
  );
}
