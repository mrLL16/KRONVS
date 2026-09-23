import { SectionIndex } from "@/components/technical/section-index";
const principles = [
  [
    "Clareza antes de começar",
    "Objetivo, escopo e entregáveis definidos antes de desenvolver.",
  ],
  [
    "Soluções para o uso real",
    "Projetos que consideram a execução. Sistemas que consideram quem vai utilizá-los.",
  ],
  [
    "Cada frente com seu espaço",
    "Engenharia e desenvolvimento de sistemas têm escopos próprios e podem ser contratados separadamente.",
  ],
  [
    "Decisão baseada em informação",
    "Transformar percepções e informações dispersas em critérios claros para decisão.",
  ],
  [
    "Comunicação objetiva",
    "Traduzir questões técnicas para apoiar decisões ao longo de cada projeto.",
  ],
];
export function Principles() {
  return (
    <section
      className="section container principles"
      aria-labelledby="principles-title"
    >
      <SectionIndex number="07">PRINCÍPIOS</SectionIndex>
      <h2 id="principles-title">
        Princípios de trabalho.
        <br />
        <span className="muted">Válidos para as duas frentes.</span>
      </h2>
      <div className="principles-list">
        {principles.map(([title, text], i) => (
          <article key={title}>
            <span className="mono">0{i + 1} /</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
