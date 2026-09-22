"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./authorial-systems.module.css";
import { useSwipe } from "@/components/ui/use-swipe";

const cases = [
  {
    name: "Taylor Hub",
    type: "Operação sob medida",
    objective: "Conectar atendimento, pedidos sob medida e operação de uma alfaiataria em um único fluxo.",
    scope: "Clientes, medidas, pedidos, etapas de produção, estoque e financeiro.",
    focus: "Do atendimento à entrega, com informações organizadas por etapa.",
  },
  {
    name: "JARVIZ",
    type: "Gestão financeira pessoal",
    objective: "Reunir a rotina financeira pessoal em uma visão que ajude a acompanhar compromissos e decisões.",
    scope: "Movimentações, categorias, cartões e faturas, dívidas e investimentos.",
    focus: "Registro e consulta de informações financeiras em fluxos conectados.",
  },
  {
    name: "Project Flow",
    type: "Gestão de projetos",
    objective: "Dar visibilidade às frentes de projetos de engenharia, obras e investimentos.",
    scope: "Portfólio, cronograma, entregáveis, diário, arquivos, histórico e financeiro do projeto.",
    focus: "Prazos, registros e recursos consultados no contexto de cada projeto.",
  },
] as const;

export function TaylorPreview() {
  return <div className={`${styles.appPreview} ${styles.taylor}`}>
    <aside className={styles.appSidebar}><strong>CRM Alfaiataria</strong><span className={styles.selected}>▦ &nbsp;Dashboard</span><span>▣ &nbsp;Estoque</span><span>◫ &nbsp;Vendas</span><span>◇ &nbsp;Sob Medida</span><span>◌ &nbsp;Clientes</span><span>▤ &nbsp;Financeiro</span></aside>
    <div className={styles.appMain}><div className={styles.appTop}><span>Dashboard de vendas</span><span className={styles.avatar}>TH</span></div><p className={styles.appSub}>Desempenho comercial e produtos com maior saída.</p><div className={styles.taylorFilter}>▦ &nbsp; Período das métricas <span>Este mês &nbsp; ▾</span></div><div className={styles.metricGrid}><div><small>VALOR VENDIDO</small><strong>R$ 18.450</strong><span>Pedidos no período</span></div><div><small>FATURAMENTO REALIZADO</small><strong>R$ 14.900</strong><span>Pagamentos concluídos</span></div><div><small>VENDAS REGISTRADAS</small><strong>24</strong><span>Pedidos cadastrados</span></div></div><div className={styles.taylorBottom}><strong>Produtos com maior saída</strong><div><span>Peça sob medida</span><i style={{width:"68%"}} /></div><div><span>Ajustes</span><i style={{width:"44%"}} /></div></div></div>
  </div>;
}

export function JarvizPreview() {
  return <div className={`${styles.appPreview} ${styles.jarviz}`}><div className={styles.phone}><div className={styles.phoneTop}><span>9:41</span><span>●●● ▰</span></div><div className={styles.phoneContent}><small>FINANCE AI</small><h4>Seu copiloto financeiro pessoal.</h4><div className={styles.jarvizBalance}><span>Total disponível</span><strong>R$ 8.720,00</strong><small>Saldo disponível nas contas cadastradas</small></div><div className={styles.jarvizInsight}>✦ &nbsp; Sua visão financeira em um só lugar</div><h5>Visão do mês</h5><div className={styles.jarvizMetrics}><div><span>Disponível em contas</span><strong>R$ 8.720</strong></div><div><span>Despesas do mês</span><strong>R$ 3.280</strong></div><div><span>Sobra do mês</span><strong>R$ 2.140</strong></div><div><span>Economia do mês</span><strong>R$ 860</strong></div></div></div><div className={styles.phoneNav}><span>Início</span><span>Movimentos</span><span>Cartões</span><span>Mais</span></div></div></div>;
}

function ProjectFlowPreview() {
  return <div className={`${styles.appPreview} ${styles.projectFlow}`}><aside className={styles.appSidebar}><strong>▦ &nbsp; ProjectFlow</strong><small>Capital projects command center</small><span className={styles.selected}>▥ &nbsp; Dashboard</span><span>▤ &nbsp; Projetos</span><span>◫ &nbsp; Financeiro</span><span>⚙ &nbsp; Configurações</span></aside><div className={styles.appMain}><div className={styles.appTop}><span>Painel de decisão</span><b>+ Novo projeto</b></div><p className={styles.appSub}>Prazos críticos e orçamento do portfólio.</p><div className={styles.metricGrid}><div><small>PROJETOS ATIVOS</small><strong>06</strong><span>Em acompanhamento</span></div><div><small>PRAZOS CRÍTICOS</small><strong>02</strong><span>Demandam atenção</span></div><div><small>ENTREGÁVEIS</small><strong>18</strong><span>No portfólio</span></div></div><div className={styles.flowPanel}><strong>Projetos que exigem atenção</strong><div><span>Projeto Alfa</span><em>Prazo próximo</em></div><div><span>Projeto Beta</span><em>Em revisão</em></div><div><span>Projeto Gama</span><em>Em andamento</em></div></div></div></div>;
}

const previews = [<TaylorPreview key="taylor" />, <JarvizPreview key="jarviz" />, <ProjectFlowPreview key="flow" />];

export function AuthorialSystems() {
  const [active, setActive] = useState(0);
  const item = cases[active];
  const move = (direction: -1 | 1) => setActive((index) => Math.min(Math.max(index + direction, 0), cases.length - 1));
  const swipe = useSwipe(move);

  return (
    <section className={`section container ${styles.section}`} aria-labelledby="authorial-systems-title">
      <div className={styles.heading}>
        <div>
          <span className="aura-mono aura-muted">03 / PROJETOS AUTORAIS</span>
          <h2 id="authorial-systems-title">Sistemas em diferentes contextos.</h2>
        </div>
        <p>Três produtos desenvolvidos para rotinas distintas, com interfaces e funcionalidades próprias.</p>
      </div>

      <div className={styles.controls} role="group" aria-label="Selecionar sistema">
        <div className={styles.tabs}>
          {cases.map((project, index) => (
            <button key={project.name} type="button" aria-pressed={active === index} onClick={() => setActive(index)}>
              <span>0{index + 1}</span>{project.name}
            </button>
          ))}
        </div>
        <div className={styles.arrows}>
          <span className="aura-mono aura-muted" aria-live="polite">0{active + 1} / 0{cases.length}</span>
          <button type="button" aria-label="Sistema anterior" disabled={active === 0} onClick={() => move(-1)}><ArrowLeft size={19} /></button>
          <button type="button" aria-label="Próximo sistema" disabled={active === cases.length - 1} onClick={() => move(1)}><ArrowRight size={19} /></button>
        </div>
      </div>

      <div className={styles.card} key={item.name} aria-live="polite" {...swipe}>
        <div className={styles.preview} aria-label={`Prévia de ${item.name}`}>{previews[active]}</div>
        <div className={styles.details}>
          <span className="aura-mono aura-muted">PROJETO AUTORAL / {item.type.toUpperCase()}</span>
          <h3>{item.name}</h3>
          <dl>
            <div><dt>Objetivo</dt><dd>{item.objective}</dd></div>
            <div><dt>Funcionalidades</dt><dd>{item.scope}</dd></div>
            <div><dt>Abordagem</dt><dd>{item.focus}</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}
