export const company = {
  name: "KRONVS",
  fullName: "KRONVS Engenharia & Consultoria",
  cnpj: "69.112.536/0001-03",
  whatsapp: process.env.NEXT_PUBLIC_COMPANY_WHATSAPP || "5511966042263",
  email: process.env.NEXT_PUBLIC_COMPANY_EMAIL ?? "",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "",
};
export const description =
  "Projetos de engenharia, planejamento e consultoria técnica. Sistemas web sob medida para gerenciar vendas, finanças e processos da sua empresa.";
export type ContactIntent = "general" | "engineering" | "systems" | "both";
export function contactHref(intent: ContactIntent = "general") {
  return intent === "general" ? "/contato" : `/contato?necessidade=${intent}`;
}
