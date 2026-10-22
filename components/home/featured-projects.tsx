import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { CaseStudyRow } from "@/components/shared/case-study-row";
import { Reveal } from "@/components/shared/reveal";
import { projects } from "@/lib/projects";

/** Homepage selected work — three large editorial case-study rows. */
export function FeaturedProjects() {
  return (
    <section
      id="selected-work"
      aria-labelledby="projects-heading"
      className="border-t border-line py-20 sm:py-28"
    >
      <div className="shell">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Selected work"
            title="Projects built end to end"
            description="Real projects with honest status labels — each one has a full case study covering the problem, the approach, and its current state."
          />
          <Link
            href="/work"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-fg-2 transition-colors hover:text-fg"
          >
            Explore the full portfolio
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-14 space-y-20 sm:space-y-24">
          {projects.map((project, index) => (
            <Reveal key={project.slug}>
              <CaseStudyRow
                project={project}
                reversed={index % 2 === 1}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
