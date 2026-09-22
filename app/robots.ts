import type { MetadataRoute } from "next";
import { company } from "@/data/company";
export default function robots(): MetadataRoute.Robots {
  return company.siteUrl
    ? {
        rules: { userAgent: "*", allow: "/", disallow: "/api/" },
        sitemap: new URL("/sitemap.xml", company.siteUrl).href,
      }
    : { rules: { userAgent: "*", disallow: "/" } };
}
