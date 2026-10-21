import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProjectCard } from "@/components/shared/project-card";
import { projects } from "@/lib/projects";

/** Homepage featured projects. */
export function FeaturedProjects() {
  return (
    <section
      aria-labelledby="projects-heading"
      className="border-t border-line bg-elevated py-16 sm:py-24"
    >
      <div className="shell">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Selected work"
            title="Projects I've built"
            description="Real projects with honest status labels — each one has a full case problem, approach, and current state."
          />
          <Link
            href="/work"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-fg-2 transition-colors hover:text-fg"
          >
            Explore the portfolio
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
