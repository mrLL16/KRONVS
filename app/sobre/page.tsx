import { PageShell } from "@/components/layout/page-shell";
import { JourneyTimeline } from "@/components/sections/journey-timeline";
import { AuthorSignature } from "@/components/sections/author-signature";
import { sobreContent as c } from "@/content";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(c.seo.title, c.seo.description, "/sobre");
export default function About() {
  return (
    <PageShell>
      <JourneyTimeline />
      <AuthorSignature />
    </PageShell>
  );
}
