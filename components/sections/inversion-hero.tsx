"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDownRight } from "lucide-react";
import { ContactLink } from "@/components/ui/contact-link";
import styles from "./inversion-hero.module.css";

// The circle inverts colors via mix-blend-mode (a single white shape
// difference-blended against the text) rather than a clipped duplicate
// layer, so there's no second copy of the text that can drift out of
// alignment with the real one.
const BALL_SIZE = 380; // px — fixed diameter during phase 1 travel

const clamp = (v: number) => Math.min(1, Math.max(0, v));

export function InversionHero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [viewH, setViewH] = useState(600);
  const [viewW, setViewW] = useState(800);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      setViewH(window.innerHeight);
      setViewW(window.innerWidth);
    };
    const onScroll = () => {
      const past = -track.getBoundingClientRect().top;
      setScrollY(Math.max(0, past));
    };

    measure();
    onScroll();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // phase progress 0 → 1
  const p1 = clamp(scrollY / viewH);
  const p2 = clamp((scrollY - viewH) / viewH);

  // Power4 InOut
  const p1e = p1 < 0.5 ? 8 * p1 ** 4 : 1 - (-2 * p1 + 2) ** 4 / 2;
  // ease-in²
  const p2e = p2 * p2;

  // geometry
  const yOff = (1 - p1e) * (viewH / 2 + BALL_SIZE / 2);
  const coverSize = Math.max(viewW, viewH) * 2.8;
  const ballSize = BALL_SIZE + p2e * (coverSize - BALL_SIZE);
  return (
    <section id="top" className={styles.hero}>
      <div ref={trackRef} className={styles.track}>
        <div className={styles.stage}>
          <div
            className={styles.ball}
            style={{
              width: ballSize,
              height: ballSize,
              transform: `translate(-50%, calc(-50% + ${yOff}px))`,
            }}
          />

          <div className={styles.layer}>
            <span className="aura-mono aura-muted" data-motion-hero-meta>
              KRONVS / ENGENHARIA · TECNOLOGIA
            </span>
            <h1 className={styles.title} data-motion-hero-title>
              Projetos de engenharia.
              <br />
              <span>Sistemas para sua empresa.</span>
            </h1>
            <p className={styles.lead} data-motion-hero-lead>
              Elaboramos projetos, planejamos obras e orientamos decisões
              técnicas. Também desenvolvemos sistemas para controlar vendas,
              finanças e processos, substituindo planilhas e tarefas manuais.
              Você pode contratar uma área ou as duas.
            </p>
            <div className={styles.actions} data-motion-hero-actions>
              <a className="aura-button" href="#solucoes" data-smooth-scroll>
                Conhecer soluções <ArrowDownRight size={18} aria-hidden="true" />
              </a>
              <ContactLink variant="text" location="home-hero">
                Falar com a KRONVS
              </ContactLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
