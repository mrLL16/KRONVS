import Link from "next/link";

// Aceita [texto](endereço) dentro de um texto simples editado em /conteudo.
export function InlineLinks({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (!match) return part;
        const [, label, href] = match;
        return href.startsWith("/") ? (
          <Link key={i} href={href}>{label}</Link>
        ) : (
          <a key={i} href={href}>{label}</a>
        );
      })}
    </>
  );
}
