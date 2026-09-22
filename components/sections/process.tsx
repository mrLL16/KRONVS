import { SectionIndex } from "@/components/technical/section-index";
const steps = [
  [
    "Entender",
    "Compreender o cenário, a operação, as restrições e o objetivo.",
  ],
  [
    "Diagnosticar",
    "Levantar informações, riscos, interferências e oportunidades.",
  ],
  [
    "Desenvolver",
    "Desenvolver o projeto de engenharia ou sistema conforme o escopo e os critérios acordados.",
  ],
  [
    "Implementar",
    "Transformar a solução em projeto, plano de ação, acompanhamento ou sistema.",
  ],
];
export function Process() {
  return (
    <section
      id="metodo"
      className="section container"
      aria-labelledby="process-title"
    >
      <SectionIndex number="06">MÉTODO</SectionIndex>
      <h2 id="process-title">
        Da necessidade
        <br />
        <span className="process-title-offset muted">à solução.</span>
      </h2>
      <div className="steps">
        {steps.map(([title, text], i) => (
          <article key={title}>
            <span className="step-number">0{i + 1}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
      <p className="method-note">
        <span className="mono">DEPOIS DA ENTREGA /</span> Acompanhar a execução,
        validar resultados e ajustar quando necessário, conforme o escopo
        contratado.
      </p>
    </section>
  );
}
