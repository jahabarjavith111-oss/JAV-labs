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
          className="mx-auto max-w-2xl font-display text-[clamp(32px,4.4vw,56px)] font-bold leading-[1.08] tracking-[-0.03em] text-balance text-fg"
        >
          Have an Idea?{" "}
          <span className="serif-accent text-accent">Let&apos;s Build It.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-fg-2">
          Tell me what you&apos;re trying to build, the problem you&apos;re
          solving, and what success looks like. I&apos;ll review your
          requirements and discuss the next steps.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <ButtonLink href="/contact">Start a Project</ButtonLink>
          <ButtonLink href="/work" variant="outline">
            Explore My Work
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
