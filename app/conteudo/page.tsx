import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { contentPages } from "@/content";
import { ContentEditor } from "./content-editor";

export const metadata: Metadata = {
  title: "Conteúdo (local)",
  robots: { index: false, follow: false },
};

export default function ContentPage() {
  if (process.env.NODE_ENV === "production") notFound();
  const pages = Object.entries(contentPages).map(([slug, p]) => ({
    slug,
    title: p.title,
    path: p.path,
    data: p.data,
  }));
  return <ContentEditor pages={pages} />;
}
