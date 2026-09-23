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
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
      ...(company.siteUrl ? { url: new URL(path, company.siteUrl) } : {}),
    },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
  };
}
