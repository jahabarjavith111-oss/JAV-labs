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

      <div className="shell relative z-[3] pt-[120px] pb-16 sm:pt-[144px] sm:pb-20 lg:pb-36">
        {/* Copy */}
        <div className="lg:max-w-[54%]">
          <p className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm">
            <Sparkles
              className="h-3.5 w-3.5 text-accent-bright"
              aria-hidden="true"
            />
            JAV Digital Engineering Studio
          </p>

          <h1
            id="hero-heading"
            className="font-display text-[clamp(38px,4.4vw,62px)] font-bold leading-[1.06] tracking-[-0.03em] text-balance"
          >
            I Build Websites, Web Applications, and AI Products That{" "}
            <span className="serif-accent text-accent-bright">
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

        {/* Showreel — inline card on mobile, full-height right panel on desktop */}
        <div className="relative mt-12 overflow-hidden rounded-[18px] border border-white/15 bg-black shadow-[0_30px_70px_-36px_rgba(0,0,0,0.7)] lg:absolute lg:inset-y-0 lg:left-[54%] lg:right-[calc(50%_-_50vw)] lg:z-[1] lg:mt-0 lg:rounded-none lg:border-0 lg:shadow-none">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="JAV Digital Engineering Studio showreel"
            className="h-auto w-full object-cover lg:h-full"
          >
            <source src="/videos/hero-showreel.mp4" type="video/mp4" />
          </video>
          {/* Soft fade where the video meets the ink band */}
          <div
            className="absolute inset-y-0 left-0 hidden w-28 bg-gradient-to-r from-[var(--color-fg)] via-[var(--color-fg)]/70 to-transparent lg:block"
            aria-hidden="true"
          />
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
