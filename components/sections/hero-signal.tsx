"use client";

import { useEffect, useId, useRef, useState } from "react";
import { globalContent } from "@/content";
import { Cog, DraftingCompass, Layers3, MessageSquareText } from "lucide-react";

export type HeroSignalKind = "engineering" | "systems" | "about" | "contact";

const content = {
  engineering: { ...globalContent.heroPanels.engineering, actionLabel: "Conhecer engenharia" },
  systems: { ...globalContent.heroPanels.systems, actionLabel: "Conhecer sistemas" },
  about: { ...globalContent.heroPanels.about, actionLabel: "Conhecer a KRONVS" },
  contact: { ...globalContent.heroPanels.contact, actionLabel: "Conhecer o contato da KRONVS" },
};

function SignalIcon({
  signal,
  size,
  className,
}: {
  signal: HeroSignalKind;
  size: number;
  className?: string;
}) {
  if (signal === "engineering") {
    return <DraftingCompass className={className} size={size} strokeWidth={1.5} aria-hidden="true" />;
  }
  if (signal === "systems") {
    return <Cog className={className} size={size} strokeWidth={1.5} aria-hidden="true" />;
  }
  if (signal === "about") {
    return <Layers3 className={className} size={size} strokeWidth={1.5} aria-hidden="true" />;
  }
  return <MessageSquareText className={className} size={size} strokeWidth={1.5} aria-hidden="true" />;
}

export function HeroSignal({ signal }: { signal: HeroSignalKind }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const { label, actionLabel, title, description } = content[signal];

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={`aura-signal-field aura-solution-signal ${open ? "is-open" : ""}`}
      data-motion-hero-visual
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
    >
      <span className="aura-signal-line signal-one" aria-hidden="true" />
      <span className="aura-signal-line signal-two" aria-hidden="true" />
      <span className="aura-signal-line signal-three" aria-hidden="true" />
      <span className="aura-signal-line signal-four" aria-hidden="true" />
      <span className="aura-focus-ring" aria-hidden="true" />
      <span className="aura-focus-ring aura-focus-ring-outer" aria-hidden="true" />
      <button
        type="button"
        className="aura-focus-node aura-solution-trigger"
        aria-label={actionLabel}
        aria-expanded={open}
        aria-controls={panelId}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") setOpen(true);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") setOpen(false);
        }}
        onFocus={() => {
          if (window.matchMedia("(hover: hover)").matches) setOpen(true);
        }}
        onBlur={() => setOpen(false)}
        onClick={() => {
          if (window.matchMedia("(hover: none)").matches) {
            setOpen((current) => !current);
          } else {
            setOpen(true);
          }
        }}
      >
        <span className="aura-solution-plus" aria-hidden="true">+</span>
        <SignalIcon signal={signal} className="aura-solution-icon" size={27} />
      </button>
      <div id={panelId} className="aura-solution-preview" aria-hidden={!open}>
        <SignalIcon signal={signal} size={23} />
        <span className="aura-mono">{label}</span>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>
    </div>
  );
}
