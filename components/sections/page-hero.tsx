import { HeroSignal, type HeroSignalKind } from "@/components/sections/hero-signal";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  signal,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
  signal?: HeroSignalKind;
}) {
  return (
    <section className="hero container interior-hero aura-page-hero aura-mesh">
      <div className="aura-hero-meta" data-motion-hero-meta>
        <span className="aura-mono aura-muted">{eyebrow}</span>
        <span className="aura-mono aura-muted">
          KRONVS / SOLUÇÕES SOB MEDIDA
        </span>
      </div>
      <div className="aura-hero-layout">
        <div className="aura-hero-copy">
          <h1 data-motion-hero-title>{title}</h1>
          <div className="hero-business-intro">
            <p className="lead" data-motion-hero-lead>{description}</p>
            <div data-motion-hero-actions>{children}</div>
          </div>
        </div>
        {signal ? <HeroSignal signal={signal} /> : <div className="aura-signal-field" aria-hidden="true" data-aura-float data-motion-hero-visual>
          <span className="aura-signal-line signal-one" />
          <span className="aura-signal-line signal-two" />
          <span className="aura-signal-line signal-three" />
          <span className="aura-signal-line signal-four" />
          <span className="aura-focus-ring" />
          <span className="aura-focus-ring aura-focus-ring-outer" />
          <span className="aura-focus-node">+</span>
        </div>}
      </div>
      <div className="aura-hero-footer">
        <span className="aura-mono">KRONVS / 2026</span>
      </div>
    </section>
  );
}
