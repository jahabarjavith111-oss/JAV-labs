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
          className="mx-auto max-w-2xl font-display text-[clamp(34px,4.8vw,58px)] font-bold leading-[1.06] tracking-[-0.03em] text-balance text-fg"
        >
          Have an Idea?{" "}
          <span className="serif-accent text-accent">Let&apos;s Build It.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-fg-2">
          Tell us what you&apos;re trying to build, the problem you&apos;re
          solving, and what success looks like. We&apos;ll review your
          requirements and discuss the next steps.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <ButtonLink href="/contact">Tell Us What You&apos;re Building</ButtonLink>
          <ButtonLink href="/work" variant="outline">
            Explore Our Work
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
