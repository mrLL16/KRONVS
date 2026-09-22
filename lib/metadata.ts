import type { Metadata } from "next";
import { company } from "@/data/company";
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    ...(company.siteUrl ? { alternates: { canonical: path } } : {}),
    openGraph: {
      title,
      description,
      type: "website",
      locale: "pt_BR",
      siteName: "KRONVS",
      ...(company.siteUrl ? { url: new URL(path, company.siteUrl) } : {}),
    },
    twitter: { card: "summary", title, description },
  };
}
