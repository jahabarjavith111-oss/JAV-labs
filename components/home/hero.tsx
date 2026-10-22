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
      className="relative overflow-hidden bg-fg text-white"
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

      <div className="shell relative z-[3] pt-[120px] pb-14 sm:pt-[144px] sm:pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <div>
            <p className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm">
              Independent studio — working with clients worldwide
            </p>

            <h1
              id="hero-heading"
              className="font-display text-[clamp(40px,6vw,72px)] font-bold leading-[1.04] tracking-[-0.035em] text-balance"
            >
              Ideas into products.{" "}
              <span className="serif-accent text-accent-bright">
                Complexity into clarity.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              We build websites, custom software, and AI-powered products for
              businesses and ambitious founders.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <ButtonLink href="/contact" variant="light" className="px-7 py-3.5">
                Tell Us What You&apos;re Building
              </ButtonLink>
              <ButtonLink
                href="/work"
                className="border border-white/30 bg-transparent px-7 py-3.5 text-white hover:border-white hover:bg-white hover:text-fg"
              >
                Explore Our Work
              </ButtonLink>
            </div>
          </div>

          {/* Atomic orbit visual */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
                className="block h-auto w-full object-contain"
              >
                <source
                  src="/videos/jav-labs-atomic-orbit.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>

        {/* Summary row */}
        <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-white/15 pt-7 sm:grid-cols-4">
          {heroSummary.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2.5 text-sm font-medium text-white/70"
            >
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-bright"
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
