import { ArrowUpRight, Check, ChevronDown, Plus } from "lucide-react";
import styles from "./aura.module.css";

const workflow = [
  ["01", "Conectar", "Ligue as ferramentas que sua operação já usa."],
  ["02", "Construir", "Modele o fluxo visual sem começar do zero."],
  ["03", "Ativar", "Coloque a automação em produção com controle."],
  ["04", "Escalar", "Amplie o processo à medida que o negócio cresce."],
] as const;

const faq = [
  "Preciso de uma equipe técnica para começar?",
  "Quanto tempo leva para colocar um fluxo em operação?",
  "Meus dados ficam seguros?",
  "Posso começar com um único processo?",
];

export default function AuraDesignSystemPage() {
  return (
    <main className={`aura-scope aura-preview ${styles.page}`}>
      <div className="aura-shell">
        <header className={styles.header}>
          <a className="aura-mono" href="#top" aria-label="Kronvs, início">
            KRONVS<span className={styles.dot}>●</span>
          </a>
          <nav className={styles.nav} aria-label="Prévia do design system">
            <a href="#principles">Princípios</a>
            <a href="#workflow">Workflow</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contato</a>
          </nav>
          <a className={`aura-button ${styles.headerCta}`} href="#contact">
            Começar <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </header>

        <section className={`${styles.hero} aura-mesh`} id="top">
          <div className={styles.heroTop}>
            <span className="aura-mono aura-muted">KRONVS / AI OPERATIONS</span>
            <span className="aura-mono aura-muted">
              DESIGN SYSTEM / AURA DIRECTION
            </span>
          </div>
          <div className={styles.heroContent}>
            <div>
              <h1>
                Automação que
                <br />
                <span>pensa em fluxo.</span>
              </h1>
              <p className={styles.heroLead}>
                Uma camada visual para apresentar sistemas, processos e decisões
                com clareza.
              </p>
              <div className={styles.actions}>
                <a className="aura-button" href="#contact">
                  Conversar com a KRONVS{" "}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
                <a className={styles.textLink} href="#principles">
                  Explorar o sistema{" "}
                  <ChevronDown size={17} aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className={styles.heroOrb} aria-hidden="true">
              <span />
            </div>
          </div>
          <div className={styles.heroFooter}>
            <span className="aura-mono">01 — 06</span>
          </div>
        </section>

        <section
          className={`${styles.section} ${styles.intro}`}
          id="principles"
        >
          <span className="aura-mono aura-muted">01 / PRINCÍPIO</span>
          <div>
            <h2>
              Menos repetição.
              <br />
              <span>Mais capacidade.</span>
            </h2>
            <p>
              O design system fala sobre operação, não sobre efeito. Brilho e
              movimento entram para mostrar sistema vivo; o conteúdo continua
              compreensível sem eles.
            </p>
          </div>
        </section>

        <section
          className={`${styles.section} ${styles.metrics} aura-grid-bg`}
          aria-label="Exemplos de métricas"
        >
          <div className={styles.metricOrb} aria-hidden="true" />
          <article className="aura-card aura-glow">
            <span className="aura-mono aura-muted">AUTOMAÇÕES ATIVAS</span>
            <strong>
              500<span>+</span>
            </strong>
            <p>processos acompanhados</p>
          </article>
          <article className="aura-card">
            <span className="aura-mono aura-muted">TEMPO RECUPERADO</span>
            <strong>
              68<span>%</span>
            </strong>
            <p>de tarefas repetitivas reduzidas</p>
          </article>
          <article className="aura-card">
            <span className="aura-mono aura-muted">MODO DE OPERAÇÃO</span>
            <strong className={styles.metricWord}>ONLINE</strong>
            <p>controle contínuo do fluxo</p>
          </article>
        </section>

        <section
          className={`${styles.section} ${styles.workflow}`}
          id="workflow"
        >
          <div className={styles.sectionHeading}>
            <div>
              <span className="aura-mono aura-muted">02 / WORKFLOW</span>
              <h2>
                Estruturado para
                <br />
                <span>seguir em frente.</span>
              </h2>
            </div>
            <p>
              O padrão de cards traduz o processo em quatro verbos visíveis. Um
              item pode estar ativo; os demais ficam em silêncio.
            </p>
          </div>
          <div className={styles.workflowGrid}>
            {workflow.map(([number, title, text], index) => (
              <article
                className={`aura-card ${index === 1 ? `aura-glow ${styles.activeCard}` : ""}`}
                key={number}
              >
                <div className={styles.cardTop}>
                  <span className="aura-mono">{number}</span>
                  <Plus size={18} aria-hidden="true" />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
                <div className={styles.cardLine}>
                  <span style={{ width: `${32 + index * 19}%` }} />
                </div>
                <span className="aura-mono aura-muted">
                  {index === 1 ? "ACTIVE / RUNNING" : "READY / STANDBY"}
                </span>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.faq}`} id="faq">
          <div className={styles.sectionHeading}>
            <div>
              <span className="aura-mono aura-muted">03 / ANSWERS</span>
              <h2>
                Perguntas que
                <br />
                <span>destravem decisões.</span>
              </h2>
            </div>
            <span className={styles.checkMark}>
              <Check size={18} aria-hidden="true" /> RESPONDA SEM RUÍDO
            </span>
          </div>
          <div>
            {faq.map((question, index) => (
              <details key={question}>
                <summary>
                  <span className="aura-mono">0{index + 1}</span>
                  {question}
                  <ChevronDown size={18} aria-hidden="true" />
                </summary>
                <p>
                  Começamos pelo contexto, definimos o primeiro fluxo e
                  avançamos com uma implementação proporcional ao problema real.
                </p>
              </details>
            ))}
          </div>
        </section>

        <section
          className={`${styles.section} ${styles.contact} aura-mesh`}
          id="contact"
        >
          <span className="aura-mono aura-muted">04 / CONTACT</span>
          <h2>
            Pronto para
            <br />
            <span>automatizar melhor?</span>
          </h2>
          <div className={styles.contactRow}>
            <p>Leve o cenário. A KRONVS ajuda a estruturar o próximo passo.</p>
            <a className="aura-button" href="mailto:contato@kronvs.com.br">
              Falar com a KRONVS <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </section>

        <footer className={styles.footer}>
          <span className="aura-mono">KRONVS / DESIGN SYSTEM AURA</span>
          <span className="aura-mono aura-muted">
            TOKENS · COMPONENTES · MOVIMENTO
          </span>
        </footer>
      </div>
    </main>
  );
}
