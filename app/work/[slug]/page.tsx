import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, MessagesSquare } from "lucide-react";
import { ButtonLink } from "@/components/shared/button";
import { ProjectImage } from "@/components/shared/project-image";
import { getProject, projects } from "@/lib/projects";

type CaseStudyProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: `${project.name} — Case Study`,
    description: project.summary,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const overview = [
    { label: "Problem", value: project.problem },
    { label: "Target users", value: project.users },
    { label: "My role", value: project.role },
  ];

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden border-b border-line bg-elevated">
        <div
          className="glow -top-24 right-0 h-72 w-72 bg-accent"
          aria-hidden="true"
        />
        <div className="shell relative pt-[124px] pb-12 sm:pt-[148px] sm:pb-16">
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-sm text-fg-2 transition-colors hover:text-fg"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All projects
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-line bg-card px-3 py-1 text-xs text-fg-3">
              {project.category}
            </span>
            <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-accent-2">
              {project.status}
            </span>
          </div>

          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
            {project.name}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-fg-2 sm:text-lg">
            {project.tagline}
          </p>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.tech.map((item) => (
              <span
                key={item}
                className="rounded-md bg-card px-2.5 py-1 text-xs text-fg-3"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Hero image or labeled slot */}
      <section className="py-10 sm:py-14" aria-label="Project preview">
        <div className="shell">
          <ProjectImage
            src={project.images?.[0]?.src}
            alt={`${project.name} interface preview`}
            slotHint={`Add a screenshot at public/images/projects/${project.slug}.png — it will appear here automatically.`}
            className="aspect-[16/7] !rounded-2xl"
          />
        </div>
      </section>

      {/* Overview */}
      <section
        aria-labelledby="overview-heading"
        className="border-t border-line bg-elevated py-14 sm:py-16"
      >
        <div className="shell">
          <h2
            id="overview-heading"
            className="font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl"
          >
            Overview
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {overview.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-line bg-card p-6"
              >
                <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-accent-2">
                  {item.label}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-2">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution & features */}
      <section
        aria-labelledby="solution-heading"
        className="py-14 sm:py-20"
      >
        <div className="shell grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2
              id="solution-heading"
              className="font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl"
            >
              Solution
            </h2>
            <p className="mt-4 text-base leading-relaxed text-fg-2">
              {project.solution}
            </p>

            <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.15em] text-fg-3">
              Key features
            </h3>
            <ul className="mt-4 space-y-3">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-fg-2"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent-2"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-xl border border-line bg-card p-6">
              <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-fg-3">
                Engineering approach
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-2">
                {project.approach}
              </p>
            </div>

            <div className="rounded-xl border border-line bg-card p-6">
              <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-fg-3">
                Challenges &amp; decisions
              </h3>
              <ul className="mt-4 space-y-3">
                {project.decisions.map((decision) => (
                  <li
                    key={decision}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-fg-2"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    {decision}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Status */}
      <section
        aria-labelledby="status-heading"
        className="border-t border-line py-14 sm:py-16"
      >
        <div className="shell max-w-3xl">
          <h2
            id="status-heading"
            className="font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl"
          >
            Current status
          </h2>
          <div className="mt-5 rounded-xl border border-accent/30 bg-accent/5 p-6">
            <p className="text-sm font-medium text-accent-2">
              {project.status}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-fg-2">
              {project.statusDetails}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line bg-elevated py-14 sm:py-16">
        <div className="shell flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold text-fg sm:text-2xl">
              Building something similar?
            </h2>
            <p className="mt-2 flex items-center gap-2 text-sm text-fg-2">
              <MessagesSquare className="h-4 w-4 text-accent-2" aria-hidden="true" />
              Tell me about the problem — I&apos;ll review it and reply with
              next steps.
            </p>
          </div>
          <ButtonLink href="/contact">Start a Project</ButtonLink>
        </div>
      </section>
    </>
  );
}
