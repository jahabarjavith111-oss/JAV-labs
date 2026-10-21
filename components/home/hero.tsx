import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
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
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-[var(--color-fg)] text-white"
    >
      {/* Restrained accent glows on ink */}
      <div
        className="glow -top-32 -left-24 h-96 w-96 bg-accent"
        aria-hidden="true"
      />
      <div
        className="glow top-10 right-0 h-80 w-80 bg-accent-2"
        aria-hidden="true"
      />

      <div className="shell relative z-[3] grid items-center gap-12 pt-[120px] pb-24 sm:pt-[144px] sm:pb-28 lg:grid-cols-5 lg:gap-10 lg:pb-36">
        {/* Copy */}
        <div className="lg:col-span-3">
          <p className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            Independent Developer · AI &amp; SaaS Builder
          </p>

          <h1
            id="hero-heading"
            className="font-display text-[clamp(40px,6vw,84px)] font-bold leading-[1.04] tracking-[-0.03em] text-balance"
          >
            I Build Websites, Web Applications, and AI Products That{" "}
            <span className="serif-accent text-accent">
              Help Businesses Grow
            </span>
            .
          </h1>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            From business websites to full-stack platforms and AI-powered
            products, I help turn your ideas into practical, polished digital
            experiences.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <ButtonLink href="/contact">Start a Project</ButtonLink>
            <ButtonLink href="/work" variant="light">
              Explore My Work
            </ButtonLink>
          </div>

          <p className="label-mono mt-9 text-white/55">
            {heroSummary.join("  ·  ")}
          </p>
        </div>

        {/* Selected work panel — real projects, no fake dashboards */}
        <div className="lg:col-span-2">
          <div className="rounded-[18px] border border-white/15 bg-card p-5 shadow-[0_30px_70px_-36px_rgba(0,0,0,0.7)] sm:p-6">
            <div className="flex items-center justify-between">
              <p className="label-mono text-fg-3">Selected work</p>
              <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-3">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-accent"
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
                    className="group flex items-center justify-between gap-4 rounded-[14px] border border-line bg-elevated px-4 py-3.5 transition-colors hover:border-accent/60"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold tracking-tight text-fg transition-colors group-hover:text-accent-2">
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
                className="inline-flex items-center gap-1.5 text-sm font-medium text-fg-2 transition-colors hover:text-accent-2"
              >
                View all case studies
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Soft transition into the page surface */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-20 bg-[linear-gradient(to_bottom,transparent,var(--color-base))] lg:h-28"
        aria-hidden="true"
      />
    </section>
  );
}
