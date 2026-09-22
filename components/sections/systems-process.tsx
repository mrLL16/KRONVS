import { MethodCarousel, type MethodStep } from "@/components/sections/method-carousel";

const steps: readonly MethodStep[] = [
  {
    title: "Entender a operação",
    detailTitle: "Conhecer o trabalho real.",
    summary: "Mapear como o processo funciona hoje e quem participa dele.",
    explanation: "Conversamos com quem executa e acompanha as rotinas para compreender entradas, decisões, responsabilidades e informações usadas no dia a dia.",
    points: ["Fluxos atuais", "Pessoas e responsabilidades"],
  },
  {
    title: "Identificar o problema",
    detailTitle: "Localizar o que atrasa a operação.",
    summary: "Encontrar gargalos, retrabalho e informações dispersas.",
    explanation: "Separamos os sintomas das causas: onde a equipe repete tarefas, perde contexto ou depende de planilhas e registros desconectados.",
    points: ["Gargalos e retrabalho", "Dados dispersos"],
  },
  {
    title: "Arquitetar a solução",
    detailTitle: "Definir a estrutura do sistema.",
    summary: "Organizar fluxos, módulos, usuários e integrações necessárias.",
    explanation: "Traduzimos a operação em jornadas, regras e módulos. Avaliamos permissões e possíveis integrações antes de definir o escopo de desenvolvimento.",
    points: ["Fluxos e regras", "Módulos e acessos"],
  },
  {
    title: "Prototipar",
    detailTitle: "Validar antes de construir.",
    summary: "Testar a interface e a lógica com os envolvidos.",
    explanation: "Apresentamos os caminhos principais em um protótipo para conferir linguagem, sequência das tarefas e informações necessárias antes de ampliar a implementação.",
    points: ["Interface e navegação", "Validação dos fluxos"],
  },
  {
    title: "Desenvolver",
    detailTitle: "Construir por entregas.",
    summary: "Implementar a solução em etapas e revisar cada entrega.",
    explanation: "Desenvolvemos os módulos conforme o escopo acordado, verificando as regras do processo e tornando cada entrega disponível para revisão.",
    points: ["Implementação incremental", "Revisão das entregas"],
  },
  {
    title: "Validar",
    detailTitle: "Conferir com quem vai usar.",
    summary: "Testar o sistema com usuários e ajustar os fluxos.",
    explanation: "Os cenários de uso são testados com os envolvidos para identificar falhas, esclarecer comportamentos e ajustar o sistema antes da adoção operacional.",
    points: ["Cenários reais", "Ajustes de uso"],
  },
  {
    title: "Evoluir",
    detailTitle: "Melhorar a partir do uso.",
    summary: "Priorizar melhorias depois que o sistema entra na rotina.",
    explanation: "O uso revela novas necessidades e oportunidades. Avaliamos o retorno da equipe e organizamos as próximas melhorias conforme as prioridades e o escopo acordado.",
    points: ["Retorno dos usuários", "Próximas prioridades"],
  },
];

export function SystemsProcess() {
  return (
    <section className="section container process-section systems-process-section">
      <div className="aura-section-heading">
        <span className="aura-mono aura-muted">02 / PROCESSO</span>
        <h2>Da operação atual ao sistema em uso.</h2>
      </div>
      <MethodCarousel steps={steps} ariaLabel="Etapas do desenvolvimento de sistemas" variant="internal" />
    </section>
  );
}
