"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { globalContent } from "@/content";
import { ChevronDown, ArrowUpRight } from "lucide-react";
export function SolutionsDropdown({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const active = pathname === "/engenharia" || pathname === "/sistemas";
  useEffect(() => {
    function outside(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, []);
  return (
    <div
      className="solutions-dropdown"
      ref={root}
      onPointerEnter={(event) => {
        if (
          event.pointerType === "mouse" &&
          matchMedia("(min-width: 768px)").matches
        )
          setOpen(true);
      }}
      onPointerLeave={(event) => {
        if (
          event.pointerType === "mouse" &&
          !root.current?.contains(document.activeElement)
        )
          setOpen(false);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.stopPropagation();
          setOpen(false);
          trigger.current?.focus();
        }
      }}
    >
      <button
        ref={trigger}
        className={active ? "nav-link is-active" : "nav-link"}
        type="button"
        aria-expanded={open}
        aria-controls="solutions-menu"
        onClick={() => setOpen(!open)}
      >
        {globalContent.nav.solutions}
        <ChevronDown
          size={14}
          aria-hidden="true"
          className={open ? "rotated" : ""}
        />
      </button>
      <div
        id="solutions-menu"
        className={`solutions-menu ${open ? "is-open" : ""}`}
        inert={!open}
      >
        <Link
          href="/engenharia"
          aria-current={pathname === "/engenharia" ? "page" : undefined}
          onClick={() => {
            setOpen(false);
            onNavigate();
          }}
        >
          <strong>{globalContent.nav.engineering}</strong>
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
        <Link
          href="/sistemas"
          aria-current={pathname === "/sistemas" ? "page" : undefined}
          onClick={() => {
            setOpen(false);
            onNavigate();
          }}
        >
          <strong>{globalContent.nav.systems}</strong>
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
