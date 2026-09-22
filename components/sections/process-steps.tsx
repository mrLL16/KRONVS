export function ProcessSteps({
  title,
  steps,
  compact = false,
}: {
  title: string;
  steps: readonly (readonly [string, string])[];
  compact?: boolean;
}) {
  return (
    <section
      className={`section container process-section ${compact ? "process-compact" : ""}`}
    >
      <div className="aura-section-heading">
        <span className="aura-mono aura-muted">02 / PROCESSO</span>
        <h2>{title}</h2>
      </div>
      <ol className="process-grid">
        {steps.map(([name, text], i) => (
          <li className="aura-card" data-reveal key={name}>
            <span className="step-number">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3>{name}</h3>
            <p>{text}</p>
            <span className="aura-process-line" aria-hidden="true" />
          </li>
        ))}
      </ol>
    </section>
  );
}
