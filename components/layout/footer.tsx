import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { Brand } from "./brand";
export function Footer() {
  return (
    <footer className="footer container">
      <div className="footer-top">
        <div>
          <Brand />
        </div>
        <p className="mono">
          Engenharia & Consultoria.
          <br />
          Sistemas & Tecnologia.
        </p>
        <a className="back-top" href="#top" aria-label="Voltar ao início">
          <ArrowUp size={20} aria-hidden="true" />
        </a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} KRONVS</span>
        <Link href="/avisos-legais">Avisos legais</Link>
        <Link href="/avisos-legais#privacidade">Política de privacidade</Link>
      </div>
    </footer>
  );
}
