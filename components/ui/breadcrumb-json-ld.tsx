import { company } from "@/data/company";
import { JsonLd } from "@/components/ui/json-ld";

// BreadcrumbList: só ajuda a busca a mostrar o caminho da página nos
// resultados (Home > Engenharia); não altera nada visível na página.
export function BreadcrumbJsonLd({
  items,
}: {
  items: readonly { name: string; path: string }[];
}) {
  if (!company.siteUrl) return null;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: new URL(item.path, company.siteUrl).href,
        })),
      }}
    />
  );
}
