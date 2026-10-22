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
      className="relative overflow-hidden bg-base text-fg"
    >
      {/* Restrained accent glows on light */}
      <div
        className="glow -top-32 -left-24 h-96 w-96 bg-accent"
        aria-hidden="true"
      />
      <div
        className="glow bottom-0 left-10 h-80 w-80 bg-accent/60"
        aria-hidden="true"
      />

      <div className="shell relative z-[3] pt-[120px] pb-14 sm:pt-[144px] sm:pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:items-stretch lg:gap-14">
          {/* Copy */}
          <div className="flex flex-col justify-center">
            <p className="mb-7 inline-flex w-fit items-center gap-2 rounded-full border border-line bg-card px-4 py-1.5 text-xs font-medium text-fg-2">
              Independent studio — working with clients worldwide
            </p>

            <h1
              id="hero-heading"
              className="font-display text-[clamp(40px,6vw,72px)] font-bold leading-[1.04] tracking-[-0.035em] text-balance text-fg"
            >
              Ideas into products.{" "}
              <span className="serif-accent text-accent">
                Complexity into clarity.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-2 sm:text-lg">
              We build websites, custom software, and AI-powered products for
              businesses and ambitious founders.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <ButtonLink href="/contact" className="px-7 py-3.5">
                Tell Us What You&apos;re Building
              </ButtonLink>
              <ButtonLink
                href="/work"
                variant="outline"
                className="px-7 py-3.5"
              >
                Explore Our Work
              </ButtonLink>
            </div>
          </div>

          {/* Atomic orbit visual — full-height panel covering the right half */}
          <div className="relative min-h-[280px] overflow-hidden lg:min-h-[540px]">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source
                src="/videos/jav-labs-atomic-orbit.mp4"
                type="video/mp4"
              />
            </video>
            {/* Soft blend of the video's edge into the white background */}
            <div
              className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-base to-transparent lg:w-28"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Summary row */}
        <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-line pt-7 sm:grid-cols-4">
          {heroSummary.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2.5 text-sm font-medium text-fg-2"
            >
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
