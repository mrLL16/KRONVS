import type { MetadataRoute } from "next";
import { execSync } from "node:child_process";
import { company } from "@/data/company";

const routes: Record<string, string> = {
  "/": "content/home.json",
  "/engenharia": "content/engenharia.json",
  "/sistemas": "content/sistemas.json",
  "/sobre": "content/sobre.json",
  "/contato": "content/contato.json",
  "/avisos-legais": "content/legais.json",
};

// Data do último commit que tocou o conteúdo da página, não a data do
// build: diz ao Google quando o TEXTO mudou de verdade, para priorizar
// o novo rastreio sem sugerir atividade que não houve.
function lastModified(file: string): Date | undefined {
  try {
    const iso = execSync(`git log -1 --format=%cI -- ${file}`, {
      cwd: process.cwd(),
    })
      .toString()
      .trim();
    return iso ? new Date(iso) : undefined;
  } catch {
    return undefined;
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  if (!company.siteUrl) return [];
  return Object.entries(routes).map(([path, file]) => ({
    url: new URL(path, company.siteUrl).href,
    lastModified: lastModified(file),
  }));
}
