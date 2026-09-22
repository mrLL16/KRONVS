import type { MetadataRoute } from "next";
import { company } from "@/data/company";
export default function sitemap(): MetadataRoute.Sitemap {
  return company.siteUrl
    ? [
        "/",
        "/engenharia",
        "/sistemas",
        "/sobre",
        "/contato",
        "/avisos-legais",
      ].map((path) => ({ url: new URL(path, company.siteUrl).href }))
    : [];
}
