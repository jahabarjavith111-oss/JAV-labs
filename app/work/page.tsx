import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { ProjectCard } from "@/components/shared/project-card";
import { FinalCta } from "@/components/home/final-cta";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work — Case Studies",
  description:
    "Case studies for TXNORYX, VERIDEX, and CiVIQ — the problem each project solves, the approach behind it, and its honest current status.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Work that shows the thinking"
        description="Each case study covers the problem, the approach, and the honest current status of the project — including what is still in progress."
      />

      <section className="py-14 sm:py-20" aria-label="Projects">
        <div className="shell">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-line bg-elevated p-5 text-sm leading-relaxed text-fg-2">
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
