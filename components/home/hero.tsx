import { Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/shared/button";

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
        className="glow -top-32 -left-24 h-96 w-96 bg-accent-bright"
        aria-hidden="true"
      />
      <div
        className="glow top-10 right-0 h-80 w-80 bg-accent-bright/60"
        aria-hidden="true"
      />

      <div className="shell relative z-[3] pt-[120px] pb-24 text-center sm:pt-[144px] sm:pb-28 lg:pb-36">
        {/* Copy */}
        <div className="mx-auto max-w-3xl">
          <p className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm">
            <Sparkles
              className="h-3.5 w-3.5 text-accent-bright"
              aria-hidden="true"
            />
            JAV Digital Engineering Studio
          </p>

          <h1
            id="hero-heading"
            className="font-display text-[clamp(40px,6vw,84px)] font-bold leading-[1.04] tracking-[-0.03em] text-balance"
          >
            I Build Websites, Web Applications, and AI Products That{" "}
            <span className="serif-accent text-accent-bright">
              Help Businesses Grow
            </span>
            .
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            From business websites to full-stack platforms and AI-powered
            products, I help turn your ideas into practical, polished digital
            experiences.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <ButtonLink href="/contact">Start a Project</ButtonLink>
            <ButtonLink href="/work" variant="light">
              Explore My Work
            </ButtonLink>
          </div>

          <p className="label-mono mt-9 text-white/55">
            {heroSummary.join("  ·  ")}
          </p>
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
