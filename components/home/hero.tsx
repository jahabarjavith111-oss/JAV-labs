"use client";

import dynamic from "next/dynamic";
import { ButtonLink } from "@/components/shared/button";
import { Magnetic } from "@/components/shared/magnetic";
import { RevealText } from "@/components/shared/reveal-text";

/**
 * The 3D globe is loaded client-side only — it never blocks SSR,
 * and the rest of the hero paints immediately while it hydrates.
 */
const Globe = dynamic(
  () => import("@/components/home/globe").then((mod) => mod.Globe),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        className="relative h-full w-full animate-pulse rounded-full bg-[radial-gradient(circle_at_50%_46%,rgba(47,123,255,0.35),transparent_62%)] motion-reduce:animate-none"
      />
    ),
  },
);

const heroSummary = [
  "Business Websites",
  "Web Applications",
  "CRM Systems",
  "AI Solutions",
  "SaaS MVPs",
];

/**
 * Hero — the Orbital Globe as the signature visual.
 * Left: badge, headline, description, CTAs. Right: the interactive
 * 3D globe in its own column (never overlaps text or navigation),
 * sized responsively for laptop → desktop → tablet → mobile.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-base text-fg"
    >
      {/* Restrained accent glows */}
      <div
        className="glow -top-32 -left-24 h-96 w-96 bg-accent"
        aria-hidden="true"
      />
      <div
        className="glow bottom-0 left-10 h-80 w-80 bg-accent-bright/60"
        aria-hidden="true"
      />

      <div className="shell relative z-[3] pt-[120px] pb-10 sm:pt-[144px] sm:pb-14">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-16">
          {/* Left column — copy */}
          <div className="min-w-0">
            <p className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-line bg-card/70 px-4 py-1.5 text-xs font-medium text-fg backdrop-blur-md">
              <span
                className="h-1.5 w-1.5 rounded-full bg-accent-bright"
                aria-hidden="true"
              />
              Remote software company — working with clients worldwide
            </p>

            <h1
              id="hero-heading"
              className="font-display text-[clamp(38px,5.6vw,68px)] font-bold leading-[1.05] tracking-[-0.035em] text-balance text-fg"
            >
              <RevealText
                immediate
                baseDelay={760}
                stagger={60}
                parts={[
                  { text: "Ideas into products." },
                  {
                    text: "Complexity into clarity.",
                    className: "serif-accent text-accent-bright",
                    breakBefore: true,
                  },
                ]}
              />
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-fg-2 sm:text-lg">
              We&apos;re a remote software company building business websites,
              full-stack web applications, CRM systems, AI-powered products,
              and SaaS MVPs for companies and founders worldwide.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Magnetic>
                <ButtonLink href="/contact" className="px-7 py-3.5">
                  Tell Us What You&apos;re Building
                </ButtonLink>
              </Magnetic>
              <Magnetic>
                <ButtonLink
                  href="/work"
                  variant="outline"
                  className="px-7 py-3.5"
                >
                  Explore Our Work
                </ButtonLink>
              </Magnetic>
            </div>
          </div>

          {/* Right column — the signature Orbital Globe */}
          <div className="relative h-[300px] min-w-0 sm:h-[380px] lg:h-[540px] xl:h-[600px]">
            <Globe />
          </div>
        </div>

        {/* Summary row + scroll cue */}
        <div className="mt-10 border-t border-line pt-7 sm:mt-12">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:grid-cols-5">
            {heroSummary.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 text-sm font-medium text-fg"
              >
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-bright"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>

          <div className="scroll-cue mt-9 hidden sm:flex" aria-hidden="true">
            <span className="label-mono text-fg-3">Scroll to explore</span>
          </div>
        </div>
      </div>
    </section>
  );
}
