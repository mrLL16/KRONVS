import { MethodCarousel, type MethodStep } from "@/components/sections/method-carousel";

const steps: readonly MethodStep[] = [
  {
    title: "Diagnóstico",
    detailTitle: "Compreender antes de definir.",
    summary: "Entender o problema, o contexto, as restrições e os objetivos.",
    explanation: "Identificamos a necessidade técnica, as condições de operação e as decisões que o projeto precisa sustentar. O diagnóstico delimita o problema antes de escolher uma solução.",
    points: ["Objetivos e restrições", "Critérios de decisão"],
  },
  {
    title: "Levantamento",
    detailTitle: "Reunir a base técnica.",
    summary: "Reunir projetos, documentos, medições e condições de campo.",
    explanation: "Consolidamos as informações disponíveis e verificamos o que ainda precisa ser levantado. Essa base permite reconhecer interferências, lacunas e premissas que afetam o desenvolvimento.",
    points: ["Documentos e medições", "Condições de campo"],
  },
  {
    title: "Estruturação",
    detailTitle: "Definir o caminho de execução.",
    summary: "Definir metodologia, escopo, premissas e entregáveis.",
    explanation: "Organizamos as etapas, os critérios técnicos e os entregáveis do trabalho. O escopo deixa claro o que será analisado, desenvolvido e validado.",
    points: ["Escopo e premissas", "Etapas e entregáveis"],
  },
  {
    title: "Desenvolvimento",
    detailTitle: "Desenvolver a solução técnica.",
    summary: "Executar estudos, projetos, planejamento ou consultoria.",
    explanation: "Produzimos os estudos, projetos ou análises previstos no escopo, confrontando as alternativas com os requisitos do projeto e as condições de execução.",
    points: ["Estudos e projetos", "Análise de alternativas"],
  },
  {
    title: "Implementação",
    detailTitle: "Apoiar a aplicação em campo.",
    summary: "Acompanhar a aplicação da solução, quando incluído no escopo.",
    explanation: "Quando contratado, acompanhamos a aplicação para esclarecer decisões técnicas e tratar ajustes decorrentes das condições encontradas durante a execução.",
    points: ["Apoio à execução", "Tratamento de ajustes"],
  },
  {
    title: "Controle",
    detailTitle: "Registrar e verificar o resultado.",
    summary: "Revisar resultados, ajustes e documentação conforme a contratação.",
    explanation: "Conferimos os resultados pertinentes ao escopo, registramos ajustes e organizamos a documentação necessária para dar continuidade à operação ou às próximas etapas.",
    points: ["Verificação de resultados", "Documentação técnica"],
  },
];

export function EngineeringProcess() {
  return (
    <section className="section container process-section">
      <div className="aura-section-heading">
        <span className="aura-mono aura-muted">02 / PROCESSO</span>
        <h2>Como conduzimos o trabalho.</h2>
      </div>
      <MethodCarousel steps={steps} ariaLabel="Etapas do processo de engenharia" variant="internal" />
    </section>
  );
}
