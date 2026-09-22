export type ProjectCategory = "Engenharia" | "Sistemas" | "Consultoria";
type ProjectImage = { src: string; alt: string; width: number; height: number };
export interface Project {
  slug: string;
  published: boolean;
  title: string;
  category: ProjectCategory;
  sector: string;
  description: string;
  client?: string;
  city?: string;
  problem: string;
  scope: string;
  contribution: string;
  verifiedResult?: string;
  disciplines: string[];
  status: string;
  image?: ProjectImage;
  images?: ProjectImage[];
  href?: string;
}
// Somente conteúdo autorizado, imagens próprias e resultados verificáveis.
export const projects: Project[] = [
  {
    slug: "sistemas-de-peneiramento",
    published: true,
    title: "Sistemas de peneiramento",
    category: "Engenharia",
    sector: "Setor alimentício",
    description:
      "Estudos técnicos e coordenação da implantação de melhorias em sistemas de peneiramento de unidades do setor alimentício.",
    city: "Unidades em São Paulo, Brasília, Pernambuco, Rio de Janeiro e Gravataí (RS)",
    problem:
      "Reduzir contaminantes e aumentar a confiabilidade do peneiramento.",
    scope:
      "Análise de dados operacionais, estudos técnicos em campo e viabilidade por unidade.",
    contribution:
      "Identificação de melhorias, contratação de fornecedores e equipes multidisciplinares, implantação e comissionamento.",
    disciplines: ["Engenharia de processos", "Estudos de viabilidade", "Implantação e comissionamento"],
    status: "Concluído",
    image: {
      src: "/projects/sistemas-de-peneiramento.png",
      alt: "Registros de equipamentos de peneiramento e acompanhamento técnico em instalações do setor alimentício",
      width: 960,
      height: 1280,
    },
  },
  {
    slug: "sistema-tratamento-agua",
    published: true,
    title: "Novo sistema de tratamento de água",
    category: "Engenharia",
    sector: "Setor alimentício",
    description:
      "Definição e implantação de soluções de tratamento de água para seis unidades do setor alimentício.",
    city: "Unidades em São Paulo, Brasília, Pernambuco, Rio de Janeiro e Gravataí (RS)",
    problem:
      "Controlar parâmetros da água usada como ingrediente na produção.",
    scope:
      "Com empresa especializada, foram definidos sistemas de controle de pH para as seis unidades e de cloro onde necessário, conforme cada instalação.",
    contribution:
      "Coordenação das contratações, implantações e partida dos sistemas nas seis unidades.",
    disciplines: ["Tratamento de água", "Controle de pH e cloro", "Implantação e partida"],
    status: "Concluído",
    image: {
      src: "/projects/sistema-tratamento-agua.png",
      alt: "Sistema de tratamento de água e equipamentos de dosagem de cloro e ácido instalados em unidades do setor alimentício",
      width: 960,
      height: 1280,
    },
  },
  {
    slug: "construcao-sts-11",
    published: true,
    title: "Construção STS 11",
    category: "Consultoria",
    sector: "Qualidade e auditoria",
    description:
      "Planejamento, controle e auditoria semanal de uma obra em Santos (SP).",
    city: "Santos (SP)",
    problem:
      "Manter etapas, prazos, custos e conformidade sob controle diante de desvios e alterações de escopo.",
    scope:
      "Estruturação das etapas, recursos e prazos; cronogramas no MS Project; gestão de riscos e estratégias de mitigação.",
    contribution:
      "Monitoramento de progresso e custos, auditorias semanais, correção de desvios e relatórios para apoiar decisões dos envolvidos.",
    disciplines: ["Planejamento de projetos", "Controle de cronograma", "Qualidade e auditoria"],
    status: "Concluído",
    images: [
      {
        src: "/projects/construcao-sts-11-vista-aerea-1.png",
        alt: "Vista aérea da área de construção do STS 11 em Santos",
        width: 1920,
        height: 1440,
      },
      {
        src: "/projects/construcao-sts-11-vista-aerea-2.png",
        alt: "Vista aérea lateral da área de construção do STS 11",
        width: 1920,
        height: 1440,
      },
      {
        src: "/projects/construcao-sts-11-obra.png",
        alt: "Detalhe das frentes de trabalho na construção do STS 11",
        width: 1920,
        height: 1440,
      },
    ],
  },
];
