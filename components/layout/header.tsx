"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { globalContent } from "@/content";
import { Brand } from "./brand";
import { SolutionsDropdown } from "@/components/navigation/solutions-dropdown";
import { AIChatButton } from "@/components/chat/ai-chat";
export function Header() {
  const pathname = usePathname();
  return <HeaderContent key={pathname} pathname={pathname} />;
}
function HeaderContent({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hover, setHover] = useState(false);
  const [focused, setFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    let previous = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = Math.max(0, window.scrollY);
      setScrolled(y > 64);
      if (y < 64) {
        setHidden(false);
        previous = y;
      } else if (Math.abs(y - previous) > 8) {
        setHidden(y > previous);
        previous = y;
      }
    };
    const scroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", scroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  const concealed = hidden && !hover && !focused && !open;
  return (
    <header
      className={`site-header ${scrolled ? "is-scrolled" : ""} ${concealed ? "nav-concealed" : ""} ${open ? "mobile-open" : ""}`}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setHover(true);
      }}
      onPointerLeave={() => setHover(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <div className="site-header-inner container">
        <Link className="brand-link" href="/" aria-label="KRONVS — início">
          <Brand />
        </Link>
        <nav id="navigation" className="site-nav" aria-label="Principal">
          <Link
            className="nav-link"
            href="/"
            aria-current={pathname === "/" ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {globalContent.nav.home}
          </Link>
          <SolutionsDropdown
            pathname={pathname}
            onNavigate={() => setOpen(false)}
          />
          <Link
            className="nav-link"
            href="/sobre"
            aria-current={pathname === "/sobre" ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {globalContent.nav.about}
          </Link>
          <Link
            className="nav-link"
            href="/contato"
            aria-current={pathname === "/contato" ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {globalContent.nav.contact}
          </Link>
        </nav>
        <div className="header-actions">
          <AIChatButton />
          <button
            ref={toggle}
            className="mobile-menu-trigger icon-control"
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-controls="navigation"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
}
