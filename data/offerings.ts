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
      "Análise e revisão de projetos de HVAC, levantamentos e as built, com acompanhamento técnico de instalações e adequações em ambientes com requisitos específicos de climatização, como unidades hospitalares e assistenciais.",
    items: [
      "Revisão de projetos frente a normas como RDC 50, NBR 7256 e NBR 16401",
      "Levantamentos técnicos e elaboração de as built",
      "Acompanhamento de instalações e adequações",
      "Identificação de incompatibilidades e necessidades técnicas",
    ],
  },
  {
    title: "Planejamento e Gestão de Obras",
    description:
      "Estruturação de prazos, atividades e entregáveis, com acompanhamento físico da obra e apoio técnico à tomada de decisão durante a execução.",
    items: [
      "Cronogramas e planejamento executivo",
      "Acompanhamento físico e controle de prazos",
      "Compatibilização entre disciplinas e gestão de pendências",
      "Apoio técnico à tomada de decisão",
    ],
  },
  {
    title: "Consultoria Técnica",
    description:
      "Apoio técnico para analisar problemas, avaliar cenários e identificar oportunidades de melhoria, com soluções aplicáveis à realidade de cada operação ou projeto.",
    items: [
      "Diagnósticos e análise de problemas",
      "Avaliação de cenários e alternativas técnicas",
      "Estudos de viabilidade",
      "Apoio à tomada de decisão e à contratação",
    ],
  },
  {
    title: "Engenharia de Manutenção",
    description:
      "Estruturação da manutenção a partir do diagnóstico da operação atual, organizando rotinas, prioridades e indicadores para uma gestão mais previsível.",
    items: [
      "Diagnóstico da operação e levantamento de ativos",
      "Identificação de gargalos, riscos e oportunidades de melhoria",
      "Definição de fluxos, rotinas e indicadores",
      "Plano estruturado de manutenção e acompanhamento",
    ],
  },
  {
    title: "Engenharia de Processos",
    description:
      "Mapeamento de processos para identificar gargalos e retrabalho, com padronização de fluxos e procedimentos que melhoram a eficiência operacional.",
    items: [
      "Mapeamento de processos e identificação de gargalos",
      "Padronização e procedimentos",
      "Organização de fluxos operacionais",
      "Indicadores de eficiência e redução de retrabalho",
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
