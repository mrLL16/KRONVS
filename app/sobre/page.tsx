import { PageShell } from "@/components/layout/page-shell";
import { JourneyTimeline } from "@/components/sections/journey-timeline";
import { AuthorSignature } from "@/components/sections/author-signature";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Sobre a KRONVS",
  "A trajetória da KRONVS: do início das operações em 2022 à atuação integrada entre engenharia, consultoria, processos e tecnologia.",
  "/sobre",
);
export default function About() {
  return (
    <PageShell>
      <JourneyTimeline />
      <AuthorSignature />
    </PageShell>
  );
}
