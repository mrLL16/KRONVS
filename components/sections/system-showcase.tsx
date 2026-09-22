"use client";

import { useEffect, useId, useState } from "react";
import {
  CalendarDays,
  Check,
  CircleDollarSign,
  Clock3,
  FolderKanban,
  LayoutDashboard,
  ListChecks,
  TrendingUp,
  Users,
  WalletCards,
} from "lucide-react";

const examples = {
  dashboard: {
    label: "Dashboard",
    title: "A operação inteira em uma única leitura.",
    description:
      "Indicadores, prioridades e tendências organizados para apoiar decisões sem depender de planilhas dispersas.",
  },
  finance: {
    label: "Financeiro",
    title: "Seu financeiro, com contexto e previsibilidade.",
    description:
      "Fluxo de caixa, contas e documentos conectados para mostrar o realizado, o previsto e o que exige atenção.",
  },
  projects: {
    label: "Projetos",
    title: "Projetos avançam com responsáveis e prazos visíveis.",
    description:
      "Entregas, etapas, riscos e pendências reunidos em uma visão construída para acompanhar a execução.",
  },
} as const;

type ExampleKey = keyof typeof examples;

function ProductHeading({ overline, title }: { overline: string; title: string }) {
  return (
    <div className="product-heading">
      <div>
        <span className="product-overline">{overline}</span>
        <h3>{title}</h3>
      </div>
      <span className="product-date">
        <CalendarDays size={15} aria-hidden="true" /> SET / 2026
      </span>
    </div>
  );
}

function DashboardDemo() {
  return (
    <div className="demo-page demo-dashboard">
      <ProductHeading overline="VISÃO EXECUTIVA" title="Dashboard operacional" />
      <div className="dashboard-metrics">
        <article>
          <span>Receita prevista</span>
          <strong>R$ 428 mil</strong>
          <small><TrendingUp size={13} /> 8,4% no período</small>
        </article>
        <article>
          <span>Projetos ativos</span>
          <strong>12</strong>
          <small><FolderKanban size={13} /> 4 entregas nesta semana</small>
        </article>
        <article>
          <span>Eficiência operacional</span>
          <strong>91%</strong>
          <small><Check size={13} /> dentro da meta</small>
        </article>
      </div>
      <div className="dashboard-panels">
        <article className="demo-chart-card">
          <div className="demo-card-heading">
            <div><span>DESEMPENHO</span><strong>Evolução mensal</strong></div>
            <span className="status-chip">Últimos 8 meses</span>
          </div>
          <div className="dashboard-chart" role="img" aria-label="Gráfico ilustrativo de evolução mensal">
            {[38, 52, 47, 65, 58, 76, 69, 88].map((height, index) => (
              <i key={index} style={{ "--bar-size": `${height}%` } as React.CSSProperties} />
            ))}
          </div>
          <div className="chart-axis"><span>FEV</span><span>ABR</span><span>JUN</span><span>SET</span></div>
        </article>
        <article className="dashboard-priorities">
          <div className="demo-card-heading"><div><span>PRIORIDADES</span><strong>Hoje</strong></div></div>
          <ul>
            <li><i className="priority-high" /><span>Validar orçamento</span><small>09:30</small></li>
            <li><i /><span>Revisar cronograma</span><small>14:00</small></li>
            <li><i /><span>Aprovar entrega</span><small>16:30</small></li>
          </ul>
        </article>
      </div>
    </div>
  );
}

function FinanceDemo() {
  const transactions = [
    ["Contrato mensal", "Receita", "+ R$ 38.400"],
    ["Fornecedor técnico", "Pagamento", "− R$ 12.850"],
    ["Projeto unidade 04", "Receita", "+ R$ 24.700"],
  ];

  return (
    <div className="demo-page demo-finance">
      <ProductHeading overline="GESTÃO FINANCEIRA" title="Controle financeiro" />
      <div className="finance-summary">
        <div className="finance-balance">
          <span>SALDO PROJETADO</span>
          <strong>R$ 286.420</strong>
          <small><TrendingUp size={13} /> projeção positiva para 90 dias</small>
        </div>
        <div className="finance-kpis">
          <span><small>A RECEBER</small><strong>R$ 94.800</strong></span>
          <span><small>A PAGAR</small><strong>R$ 41.260</strong></span>
        </div>
      </div>
      <div className="finance-flow">
        <div className="finance-flow-heading"><span>FLUXO DE CAIXA</span><small>Realizado <i /> Previsto <i /></small></div>
        <div className="finance-bars">
          {[44, 62, 54, 78, 66, 88].map((height, index) => (
            <span key={index}><i style={{ height: `${height}%` }} /><i style={{ height: `${Math.max(28, height - 17)}%` }} /></span>
          ))}
        </div>
      </div>
      <div className="finance-transactions">
        {transactions.map(([name, type, value], index) => (
          <div key={name}>
            <span className="row-symbol"><WalletCards size={14} /></span>
            <span><strong>{name}</strong><small>{type}</small></span>
            <strong className={index === 1 ? "is-expense" : ""}>{value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsDemo() {
  const columns = [
    { title: "A iniciar", count: "03", cards: [["Levantamento técnico", "UNIDADE 04"], ["Plano executivo", "EXPANSÃO"]] },
    { title: "Em andamento", count: "04", cards: [["Compatibilização", "RETROFIT"], ["Dashboard da obra", "SISTEMA"]] },
    { title: "Em validação", count: "02", cards: [["Memorial técnico", "INSTALAÇÕES"], ["Entrega do módulo", "FINANCEIRO"]] },
  ];

  return (
    <div className="demo-page demo-projects">
      <ProductHeading overline="GESTÃO DE PROJETOS" title="Portfólio em execução" />
      <div className="project-summary">
        <span><FolderKanban size={16} /><strong>9</strong><small>entregas abertas</small></span>
        <span><Users size={16} /><strong>6</strong><small>responsáveis</small></span>
        <span><Clock3 size={16} /><strong>2</strong><small>pontos de atenção</small></span>
      </div>
      <div className="project-board">
        {columns.map((column, columnIndex) => (
          <section key={column.title}>
            <header><span>{column.title}</span><small>{column.count}</small></header>
            {column.cards.map(([title, category], cardIndex) => (
              <article key={title}>
                <span>{category}</span>
                <strong>{title}</strong>
                <footer><i>{String(columnIndex + cardIndex + 2).padStart(2, "0")} SET</i><b>{cardIndex + 2}</b></footer>
              </article>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}

function DemoPage({ selected }: { selected: ExampleKey }) {
  if (selected === "finance") return <FinanceDemo />;
  if (selected === "projects") return <ProjectsDemo />;
  return <DashboardDemo />;
}

export function SystemShowcase() {
  const [selected, setSelected] = useState<ExampleKey>("dashboard");
  const panelId = useId();

  useEffect(() => {
    const selectFromScroll = (event: Event) => {
      const key = (event as CustomEvent<ExampleKey>).detail;
      if (key in examples) setSelected(key);
    };
    window.addEventListener("kronvs:showcase-select", selectFromScroll);
    return () => window.removeEventListener("kronvs:showcase-select", selectFromScroll);
  }, []);

  const select = (key: ExampleKey) => setSelected(key);

  return (
    <section className="showcase-section container" aria-labelledby="showcase-title">
      <div className="showcase-intro" data-reveal>
        <span className="business-kicker">SISTEMAS CRIADOS PARA O SEU NEGÓCIO</span>
        <h2 id="showcase-title">Três produtos.<span className="muted">Três formas de organizar a operação.</span></h2>
      </div>
      <div className="showcase-experience">
        <div className="showcase-sticky">
          <div className="showcase-switch" role="group" aria-label="Explorar exemplos de sistemas">
            {Object.entries(examples).map(([key, item]) => (
              <button key={key} type="button" aria-pressed={selected === key} aria-controls={panelId} onClick={() => select(key as ExampleKey)}>
                {item.label}
              </button>
            ))}
          </div>
          <div className="product-stage">
            <div className="product-frame">
              <div className="product-topbar">
                <span className="window-dots" aria-hidden="true"><i /><i /><i /></span>
                <span>KRONVS / SISTEMA SOB MEDIDA</span>
                <span className="demo-label">DEMONSTRAÇÃO</span>
              </div>
              <div className="product-body">
                <aside className="product-sidebar" aria-label="Módulos da demonstração">
                  <span className="workspace-name">Seu negócio</span>
                  <button className={selected === "dashboard" ? "sidebar-selected" : ""} onClick={() => select("dashboard")}><LayoutDashboard size={17} /> Dashboard</button>
                  <button className={selected === "finance" ? "sidebar-selected" : ""} onClick={() => select("finance")}><CircleDollarSign size={17} /> Financeiro</button>
                  <button className={selected === "projects" ? "sidebar-selected" : ""} onClick={() => select("projects")}><FolderKanban size={17} /> Projetos</button>
                  <span className="sidebar-bottom"><ListChecks size={15} /> Tudo conectado.</span>
                </aside>
                <div id={panelId} className="product-content" aria-live="polite" aria-atomic="true">
                  <div key={selected} className={`product-view product-view--${selected}`}>
                    <DemoPage selected={selected} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="showcase-stories" aria-label="Exemplos de aplicação">
          {Object.entries(examples).map(([key, item], index) => {
            const active = selected === key;
            return (
              <button type="button" className={`showcase-story ${active ? "is-active" : ""}`} data-showcase-key={key} data-active={active} aria-pressed={active} onClick={() => select(key as ExampleKey)} key={key}>
                <span className="aura-mono">{String(index + 1).padStart(2, "0")} / 03</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <i aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
