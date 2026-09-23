import { projetosContent } from "@/content";
export type ProjectCategory = "Engenharia" | "Sistemas" | "Consultoria";
type ProjectImage = { src: string; alt: string; width: number; height: number };
export interface Project {
  slug: string;
  published: boolean;
  title: string;
  category: ProjectCategory;
  sector: string;
  description: string;
  client?: string;
  city?: string;
  problem: string;
  scope: string;
  contribution: string;
  verifiedResult?: string;
  disciplines: string[];
  status: string;
  image?: ProjectImage;
  images?: ProjectImage[];
  href?: string;
}
// Conteúdo editável em content/projetos.json (somente material autorizado,
// imagens próprias e resultados verificáveis).
export const projects = projetosContent.items as Project[];
