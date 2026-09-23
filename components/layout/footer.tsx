import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { globalContent } from "@/content";
import { Brand } from "./brand";
export function Footer() {
  return (
    <footer className="footer container">
      <div className="footer-top">
        <div>
          <Brand />
        </div>
        <p className="mono">
          {globalContent.footer.line1}
          <br />
          {globalContent.footer.line2}
        </p>
        <a className="back-top" href="#top" aria-label="Voltar ao início">
          <ArrowUp size={20} aria-hidden="true" />
        </a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {globalContent.footer.copyrightName}</span>
        <Link href="/avisos-legais">{globalContent.footer.legalNotice}</Link>
        <Link href="/avisos-legais#privacidade">{globalContent.footer.privacyPolicy}</Link>
      </div>
    </footer>
  );
}
