import type { Metadata } from "next";
import { company } from "@/data/company";
import { globalContent } from "@/content";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";
import { AuraInteractions } from "@/components/ui/aura-interactions";
import { SiteMotion } from "@/components/ui/site-motion";
const siteUrl = company.siteUrl ? new URL(company.siteUrl) : undefined;
export const metadata: Metadata = {
  title: globalContent.seo.title,
  description: globalContent.seo.description,
  ...(siteUrl ? { metadataBase: siteUrl, alternates: { canonical: "/" } } : {}),
  openGraph: {
    title: company.fullName,
    description: globalContent.seo.description,
    locale: "pt_BR",
    type: "website",
    siteName: "KRONVS",
    ...(siteUrl ? { url: siteUrl } : {}),
  },
  twitter: { card: "summary_large_image", title: company.fullName, description: globalContent.seo.description },
  robots: { index: Boolean(siteUrl), follow: Boolean(siteUrl) },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          rel="preload"
          href="/fonts/OpenSans-SemiBold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/OpenSans-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body id="top">
        <a className="skip-link" href="#main">
          {globalContent.nav.skipLink}
        </a>
        <Header />
        {children}
        <Footer />
        <SiteMotion />
        <AuraInteractions />
      </body>
    </html>
  );
}
