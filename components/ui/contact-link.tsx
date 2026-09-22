"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { contactHref, type ContactIntent } from "@/data/company";
import { track } from "@/lib/analytics";
export function ContactLink({
  children = "Conversar sobre meu projeto",
  intent = "general",
  variant = "primary",
  location = "page",
}: {
  children?: React.ReactNode;
  intent?: ContactIntent;
  variant?: "primary" | "text";
  location?: string;
}) {
  const href = contactHref(intent);
  return (
    <Link
      className={
        variant === "primary" ? "cta aura-cta" : "text-link aura-text-link"
      }
      href={href}
      onClick={() => {
        track(
          intent === "engineering"
            ? "click_engineering"
            : intent === "systems"
              ? "click_custom_system"
              : intent === "both"
                ? "click_combined"
                : "click_primary_cta",
          { location },
        );
      }}
    >
      <span>{children}</span>
      <span className="cta-arrow">
        <ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" />
      </span>
    </Link>
  );
}
