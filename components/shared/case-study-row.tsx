import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { Project } from "@/lib/projects";
import { ProjectImage } from "@/components/shared/project-image";

type CaseStudyRowProps = {
  project: Project;
  /** Flip the visual to the right on large screens. */
  reversed?: boolean;
};

/**
 * Large editorial case-study row — big visual, summary, honest status,
 * key features, and a link to the full case study.
 */
export function CaseStudyRow({ project, reversed = false }: CaseStudyRowProps) {
  const image = project.images?.[0];
  const keyFeatures = project.features.slice(0, 4);

  return (
    <article className="group grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
      {/* Visual */}
      <Link
        href={`/work/${project.slug}`}
        tabIndex={-1}
        aria-hidden="true"
        className={`relative block overflow-hidden rounded-2xl border border-line transition-colors duration-300 group-hover:border-line-2 ${
          reversed ? "lg:order-2" : ""
        }`}
      >
        <ProjectImage
          src={image?.src}
          alt={image?.alt ?? `${project.name} project cover`}
          slotHint={`Add a screenshot at public/images/projects/${project.slug}.png`}
          className="aspect-video !rounded-none !border-0 transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </Link>

      {/* Content */}
      <div className={reversed ? "lg:order-1" : ""}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-line bg-elevated px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-fg-3">
            {project.category}
          </span>
          <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] font-medium text-accent-2">
            {project.status}
          </span>
        </div>

        <h3 className="mt-5 font-display text-[clamp(28px,3.4vw,40px)] font-bold leading-[1.1] tracking-[-0.03em] text-fg">
          {project.name}
        </h3>
        <p className="mt-1.5 text-base text-fg-2">{project.tagline}</p>

        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fg-2">
          {project.summary}
        </p>

        <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
          {keyFeatures.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2.5 text-sm text-fg-2"
            >
              <Check
                className="mt-0.5 h-4 w-4 shrink-0 text-accent-2"
                aria-hidden="true"
              />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Link
            href={`/work/${project.slug}`}
            className="group/link inline-flex items-center gap-2 rounded-xl bg-fg px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent"
            aria-label={`View the ${project.name} case study`}
          >
            View case study
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
