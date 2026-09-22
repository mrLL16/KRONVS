import { MethodCarousel } from "@/components/sections/method-carousel";

const steps = [
  {
    title: "Entender",
    detailTitle: "Entender o problema real.",
    summary: "Conhecer o contexto e o problema real.",
    explanation:
      "Antes de propor um projeto ou sistema, identificamos como o trabalho acontece hoje, quem participa e onde está a dificuldade. Essa leitura evita tratar apenas o sintoma.",
    points: ["Contexto e objetivo", "Restrições e envolvidos"],
  },
  {
    title: "Estruturar",
    detailTitle: "Estruturar o caminho.",
    summary: "Definir escopo, critérios e prioridades.",
    explanation:
      "Organizamos as informações em um caminho de execução. Delimitamos o que precisa ser resolvido, as decisões necessárias e a ordem mais coerente para avançar.",
    points: ["Escopo e premissas", "Prioridades e critérios"],
  },
  {
    title: "Desenvolver",
    detailTitle: "Desenvolver com critérios claros.",
    summary: "Construir o projeto ou a solução digital.",
    explanation:
      "Com o problema definido, desenvolvemos o trabalho técnico adequado ao escopo: projeto de engenharia, consultoria ou sistema personalizado. Cada entrega responde a requisitos reais da operação.",
    points: ["Desenvolvimento por etapas", "Validação das decisões"],
  },
  {
    title: "Implementar",
    detailTitle: "Implementar no contexto real.",
    summary: "Apoiar a aplicação no trabalho real.",
    explanation:
      "Acompanhamos a aplicação da solução quando isso fizer parte do escopo, ajustando o que for necessário para que o projeto ou sistema funcione nas condições reais de uso.",
    points: ["Aplicação acompanhada", "Ajustes de uso"],
  },
  {
    title: "Evoluir",
    detailTitle: "Evoluir a partir do uso.",
    summary: "Avaliar resultados e planejar ajustes.",
    explanation:
      "Depois da implantação, avaliamos o que mudou, registramos pontos de atenção e identificamos melhorias possíveis. A evolução parte de evidências do uso, não de funcionalidades adicionadas por hábito.",
    points: ["Leitura dos resultados", "Próximas melhorias"],
  },
] as const;

export function HomeMethod() {
  return <MethodCarousel steps={steps} ariaLabel="Etapas do método KRONVS" />;
}
