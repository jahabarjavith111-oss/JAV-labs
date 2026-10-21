import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/shared/button";
import { projects } from "@/lib/projects";

const heroSummary = [
  "Business Websites",
  "Web Applications",
  "AI Solutions",
  "SaaS MVPs",
];

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden">
      {/* Restrained background glows */}
      <div
        className="glow -top-32 -left-24 h-96 w-96 bg-accent"
        aria-hidden="true"
      />
      <div
        className="glow -top-10 right-0 h-80 w-80 bg-accent-2"
        aria-hidden="true"
      />

      <div className="shell relative grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-5 lg:gap-10 lg:py-28">
        {/* Copy */}
        <div className="lg:col-span-3">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-1.5 text-xs font-medium text-fg-2">
            <Sparkles className="h-3.5 w-3.5 text-accent-2" aria-hidden="true" />
            Independent Developer · AI &amp; SaaS Builder
          </p>

          <h1
            id="hero-heading"
            className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-fg sm:text-5xl lg:text-6xl"
          >
            I Build Websites, Web Applications, and AI Products That{" "}
            <span className="text-gradient">Help Businesses Grow</span>.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-2 sm:text-lg">
            From business websites to full-stack platforms and AI-powered
            products, I help turn your ideas into practical, polished digital
            experiences.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <ButtonLink href="/contact">
              Start a Project
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/work" variant="outline">
              Explore My Work
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>

          <p className="mt-8 text-sm tracking-wide text-fg-3">
            {heroSummary.join("  ·  ")}
          </p>
        </div>

        {/* Selected work panel — real projects, no fake dashboards */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-line bg-card p-5 shadow-[0_24px_60px_-30px_rgba(139,92,246,0.35)] sm:p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fg-3">
                Selected work
              </p>
              <span className="flex items-center gap-1.5 text-xs text-fg-3">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-accent-2"
                  aria-hidden="true"
                />
                Case studies
              </span>
            </div>

            <ul className="mt-5 space-y-3">
              {projects.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/work/${project.slug}`}
                    className="group flex items-center justify-between gap-4 rounded-xl border border-line bg-elevated px-4 py-3.5 transition-colors hover:border-accent/50"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-fg group-hover:text-white">
                        {project.name}
                      </span>
                      <span className="block truncate text-xs text-fg-3">
                        {project.category}
                      </span>
                    </span>
                    <span className="shrink-0 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 text-[10px] font-medium text-accent-2">
                      {project.status}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-5 border-t border-line pt-4">
              <Link
                href="/work"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-fg-2 transition-colors hover:text-fg"
              >
                View all case studies
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
