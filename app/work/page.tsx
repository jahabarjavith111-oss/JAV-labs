import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { CaseStudyRow } from "@/components/shared/case-study-row";
import { Reveal } from "@/components/shared/reveal";
import { FinalCta } from "@/components/home/final-cta";
import { projects } from "@/lib/projects";
import { pageOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Work — Web, CRM & AI Case Studies",
  description:
    "Case studies for TXNORYX, VERIDEX, and CiVIQ — the problem each project solves, the approach behind it, and its honest current status.",
  alternates: {
    canonical: "/work",
  },
  openGraph: pageOpenGraph(
    "/work",
    "Work — Web, CRM & AI Case Studies — JAV Digital Engineering Studio",
    "Case studies for TXNORYX, VERIDEX, and CiVIQ — the problem each project solves, the approach behind it, and its honest current status.",
  ),
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Work that shows the thinking"
        description="Each case study covers the problem, the approach, and the honest current status of the project — including what is still in progress."
      />

      <section className="py-16 sm:py-24" aria-label="Projects">
        <div className="shell space-y-20 sm:space-y-24">
          {projects.map((project, index) => (
            <Reveal key={project.slug}>
              <CaseStudyRow project={project} reversed={index % 2 === 1} />
            </Reveal>
          ))}

          <div className="rounded-xl border border-line bg-elevated p-5 text-sm leading-relaxed text-fg-2">
            Screenshots and live demos are being added over time — each case
            study states exactly what is currently public. No project here
            claims clients, revenue, or results that don&apos;t exist.
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
