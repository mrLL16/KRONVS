import Image from "next/image";
import { projects } from "@/data/projects";
import { JarvizPreview, TaylorPreview } from "./authorial-systems";
import styles from "./about-portfolio.module.css";

const sts = projects.find((project) => project.slug === "construcao-sts-11");
const water = projects.find((project) => project.slug === "sistema-tratamento-agua");

export function AboutPortfolio() {
  if (!sts?.images?.[0] || !water?.image) return null;

  const items = [
    {
      title: "Construção STS 11",
      field: "Engenharia & Consultoria",
      context: "Atuação profissional · Santos (SP)",
      description: "Planejamento, controle de cronograma e auditorias semanais para acompanhar prazos, custos e conformidade da obra.",
      visual: <Image src={sts.images[0].src} alt={sts.images[0].alt} width={sts.images[0].width} height={sts.images[0].height} className={styles.photo} sizes="(max-width: 760px) 100vw, 50vw" />,
      type: "photo",
    },
    {
      title: "Taylor Hub",
      field: "Sistemas & Tecnologia",
      context: "Projeto autoral · Gestão sob medida",
      description: "Atendimento, pedidos sob medida, etapas de produção, estoque e financeiro conectados em uma operação de alfaiataria.",
      visual: <TaylorPreview />,
      type: "interface",
    },
    {
      title: "Sistema de Tratamento de Água",
      field: "Engenharia & Consultoria",
      context: "Atuação profissional · Setor alimentício",
      description: "Definição dos sistemas de controle de pH e cloro e coordenação das contratações, implantações e partidas em seis unidades.",
      visual: <Image src={water.image.src} alt={water.image.alt} width={water.image.width} height={water.image.height} className={styles.photo} sizes="(max-width: 760px) 100vw, 50vw" />,
      type: "photo",
    },
    {
      title: "JARVIZ",
      field: "Sistemas & Tecnologia",
      context: "Projeto autoral · Gestão financeira",
      description: "Uma visão para acompanhar movimentações, categorias, cartões, faturas, dívidas e investimentos pessoais.",
      visual: <JarvizPreview />,
      type: "interface",
    },
  ] as const;

  return (
    <section className={`section container ${styles.section}`} aria-labelledby="about-portfolio-title">
      <div className={styles.heading}>
        <span className="aura-mono aura-muted">03 / EXPERIÊNCIA APLICADA</span>
        <h2 id="about-portfolio-title">Engenharia e tecnologia, lado a lado.</h2>
        <p>Uma seleção de trabalhos da trajetória profissional e de produtos autorais, em contextos diferentes.</p>
      </div>
      <div className={styles.grid}>
        {items.map((item, index) => (
          <article className={styles.card} key={item.title} data-reveal>
            <div className={`${styles.visual} ${item.type === "photo" ? styles.visualPhoto : styles.visualInterface}`}>
              {item.visual}
            </div>
            <div className={styles.content}>
              <div className={styles.meta}><span>0{index + 1} / 04</span><span>{item.field}</span></div>
              <h3>{item.title}</h3>
              <p className={styles.context}>{item.context}</p>
              <p className={styles.description}>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
