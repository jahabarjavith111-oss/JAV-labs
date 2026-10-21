import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/shared/button";

/** Closing call to action shared across sections. */
export function FinalCta() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative overflow-hidden border-t border-line py-16 sm:py-24"
    >
      <div
        className="glow -top-20 left-1/4 h-72 w-72 bg-accent"
        aria-hidden="true"
      />

      <div className="shell relative text-center">
        <h2
          id="cta-heading"
          className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl lg:text-5xl"
        >
          Have an Idea? <span className="text-gradient">Let&apos;s Build It.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-fg-2">
          Tell me what you&apos;re trying to build, the problem you&apos;re
          solving, and what success looks like. I&apos;ll review your
          requirements and discuss the next steps.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <ButtonLink href="/contact">
            Start a Project
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href="/work" variant="outline">
            Explore My Work
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
