import { Plus, Minus } from "lucide-react";
import { SectionIndex } from "@/components/technical/section-index";
const problems = [
  [
    "Projeto sem definição suficiente",
    "A execução começa antes que interferências, requisitos e interfaces estejam realmente resolvidos.",
    "Levantamentos, compatibilização e documentação técnica para orientar a execução.",
  ],
  [
    "Um sistema que não acompanha o negócio",
    "A equipe depende de planilhas ou de ferramentas que não atendem ao processo como ele funciona hoje.",
    "Entendimento dos fluxos e desenvolvimento de um sistema ajustado à necessidade da empresa.",
  ],
  [
    "Decisão técnica sem informação",
    "Fornecedores apresentam soluções diferentes e não existe base técnica suficiente para compará-las.",
    "Análise de propostas, especificações e apoio técnico à contratação.",
  ],
  [
    "Operação sem controle",
    "Informações importantes estão distribuídas entre planilhas, mensagens, documentos e conhecimento individual.",
    "Mapeamento de processos e ferramentas desenvolvidas para a necessidade da operação.",
  ],
  [
    "Obra sem previsibilidade",
    "Prazo, custo, entregáveis e interfaces começam a perder rastreabilidade.",
    "Planejamento, gestão e acompanhamento técnico para apoiar decisões durante a obra.",
  ],
];
export function Problems() {
  return (
    <section
      className="section container problems"
      aria-labelledby="problems-title"
    >
      <div>
        <SectionIndex number="05">QUANDO ENTRAMOS</SectionIndex>
        <h2 id="problems-title">
          Alguns problemas começam pequenos.
          <br />
          <span className="muted">O custo aparece depois.</span>
        </h2>
      </div>
      <div className="problem-list">
        {problems.map(([title, text, response], i) => (
          <details key={title}>
            <summary>
              <span className="mono problem-number">0{i + 1}</span>
              <h3>{title}</h3>
              <Plus className="plus" size={20} aria-hidden="true" />
              <Minus className="minus" size={20} aria-hidden="true" />
            </summary>
            <div className="problem-content">
              <p>{text}</p>
              <p>
                <span className="text-bright">Como podemos atuar:</span>{" "}
                {response}
              </p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
