import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import { ProjectImage } from "@/components/shared/project-image";

/** Portfolio card linking to the case study. */
export function ProjectCard({ project }: { project: Project }) {
  const image = project.images?.[0];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card transition-colors duration-200 hover:border-line-2">
      <div className="p-5 pb-0">
        <ProjectImage
          src={image?.src}
          alt={image?.alt ?? `${project.name} interface`}
          slotHint={`Add a screenshot at public/images/projects/${project.slug}.png`}
          className="!rounded-lg"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-line bg-elevated px-2.5 py-1 text-[11px] font-medium text-fg-3">
            {project.category}
          </span>
          <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent-2">
            {project.status}
          </span>
        </div>

        <h3 className="mt-4 font-display text-xl font-semibold text-fg">
          {project.name}
        </h3>
        <p className="mt-1 text-sm text-fg-3">{project.tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-fg-2">
          {project.summary}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((item) => (
            <span
              key={item}
              className="rounded-md bg-elevated px-2 py-1 text-[11px] text-fg-3"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-5">
          <Link
            href={`/work/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-fg transition-colors hover:text-accent-2"
            aria-label={`View the ${project.name} case study`}
          >
            View case study
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
