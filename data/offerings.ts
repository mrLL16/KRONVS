import type { ServiceItem } from "@/components/sections/service-grid";
export const engineeringServices: ServiceItem[] = [
  {
    title: "Projetos de Engenharia",
    description:
      "Definição técnica e documentação para desenvolver, adequar e executar instalações.",
    items: [
      "Desenvolvimento e adequações",
      "Estudos e compatibilização",
      "Especificações e memoriais",
      "Suporte técnico à execução",
    ],
  },
  {
    title: "HVAC e Climatização",
    description:
      "Análise da instalação como um sistema: carga térmica, equipamentos, distribuição de ar e desempenho.",
    items: [
      "VRF, expansão direta, UTAs e fan coils",
      "Ventilação, exaustão e pressurização",
      "Carga térmica e avaliação de desempenho",
      "Projetos e suporte técnico em ambientes críticos",
    ],
  },
  {
    title: "Planejamento e Gestão de Obras",
    description:
      "Organização de prazos, interfaces e entregáveis para acompanhar o que foi previsto e o que está em execução.",
    items: [
      "Cronogramas e planejamento executivo",
      "Controle de avanço e pendências",
      "Interferências e coordenação de disciplinas",
      "Acompanhamento de entregáveis",
    ],
  },
  {
    title: "Consultoria Técnica",
    description:
      "Informações e critérios para comparar alternativas e fundamentar decisões.",
    items: [
      "Diagnósticos e análise de problemas",
      "Pareceres e avaliação de alternativas",
      "Estudos de viabilidade",
      "Apoio à contratação e à tomada de decisão",
    ],
  },
  {
    title: "Facilities e Manutenção",
    description:
      "Estruturação das rotinas de manutenção e da gestão operacional de ativos.",
    items: [
      "Planos preventivos e análise de ativos",
      "Procedimentos e indicadores",
      "Organização de rotinas",
      "Melhoria de processos operacionais",
    ],
  },
  {
    title: "Engenharia de Processos",
    description:
      "Revisão de como o trabalho acontece, das entradas de informação às entregas.",
    items: [
      "Análise de fluxos",
      "Padronização e procedimentos",
      "Organização operacional",
      "Definição de indicadores de eficiência",
    ],
  },
];
export const systemServices: ServiceItem[] = [
  {
    title: "Sistemas personalizados",
    description:
      "Software construído em torno das regras e necessidades internas da empresa.",
    items: [
      "Gestão de projetos e obras",
      "CRM e controle comercial",
      "Financeiro e acompanhamento operacional",
      "Gestão de clientes e documentos",
    ],
  },
  {
    title: "Automação de processos",
    description:
      "Digitalização de tarefas que hoje dependem de repetição, conferência manual ou controles fragmentados.",
    items: [
      "Planilhas e formulários",
      "Aprovações e fluxos de tarefas",
      "Relatórios recorrentes",
      "Conexão entre etapas do trabalho",
    ],
  },
  {
    title: "Dashboards e indicadores",
    description:
      "Informações organizadas para acompanhar a operação e apoiar decisões.",
    items: [
      "Indicadores financeiros e comerciais",
      "Produtividade e cronogramas",
      "KPIs e acompanhamento operacional",
      "Visões por equipe ou responsabilidade",
    ],
  },
  {
    title: "Portais e plataformas internas",
    description:
      "Um ambiente comum para registrar, consultar e acompanhar o trabalho.",
    items: [
      "Dados e documentos",
      "Tarefas e processos",
      "Comunicação contextual",
      "Histórico e rastreabilidade",
    ],
  },
  {
    title: "Integrações",
    description:
      "Conexões definidas após avaliar os sistemas existentes, a disponibilidade de interfaces e as permissões necessárias.",
    items: [
      "APIs e bancos de dados",
      "Serviços externos",
      "Plataformas corporativas",
      "Viabilidade e escopo avaliados por projeto",
    ],
  },
];
export const engineeringSteps = [
  [
    "Diagnóstico",
    "Entender o problema, o contexto, as restrições e os objetivos.",
  ],
  [
    "Levantamento",
    "Reunir projetos, documentos, medições e condições de campo.",
  ],
  ["Estruturação", "Definir metodologia, escopo, premissas e entregáveis."],
  [
    "Desenvolvimento",
    "Executar estudos, projetos, planejamento ou consultoria.",
  ],
  [
    "Implementação",
    "Acompanhar a aplicação da solução, quando incluído no escopo.",
  ],
  [
    "Controle",
    "Revisar resultados, ajustes e documentação conforme a contratação.",
  ],
] as const;
export const systemSteps = [
  [
    "Entender a operação",
    "Mapear como o processo funciona hoje e quem participa dele.",
  ],
  [
    "Identificar o problema",
    "Localizar gargalos, retrabalho e informações dispersas.",
  ],
  ["Arquitetar a solução", "Definir fluxos, módulos, usuários e integrações."],
  [
    "Prototipar",
    "Validar interface e lógica antes de ampliar o desenvolvimento.",
  ],
  ["Desenvolver", "Construir a solução em etapas e revisar as entregas."],
  ["Validar", "Testar com usuários e ajustar os fluxos de trabalho."],
  ["Evoluir", "Priorizar melhorias após uso real, conforme o escopo acordado."],
] as const;
