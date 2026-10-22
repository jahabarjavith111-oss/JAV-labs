import { ButtonLink } from "@/components/shared/button";
import { HeroVisual } from "@/components/home/hero-visual";

const heroSummary = [
  "Business Websites",
  "Web Applications",
  "AI Solutions",
  "SaaS MVPs",
];

/**
 * Hero — balanced 50/50 two-column layout.
 * Left: headline, description, CTAs. Right: the atomic-orbit video.
 * The video's background was re-rendered to the page color (#fbfaf7)
 * and a feathered radial mask melts its edges into the section, so it
 * reads as part of the page rather than an inserted rectangle.
 */
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
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* Left column — copy */}
          <div className="min-w-0">
            <p className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-line bg-card px-4 py-1.5 text-xs font-medium text-fg">
              Independent studio — working with clients worldwide
            </p>

            <h1
              id="hero-heading"
              className="font-display text-[clamp(38px,5.6vw,68px)] font-bold leading-[1.05] tracking-[-0.035em] text-balance text-fg"
            >
              Ideas into products.{" "}
              <span className="serif-accent text-accent">
                Complexity into clarity.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-fg-2 sm:text-lg">
              We build websites, custom software, and AI-powered products for
              businesses and ambitious founders.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
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

          {/* Right column — atomic orbit visual, edges feathered into the page */}
          <div
            className="relative h-[300px] min-w-0 sm:h-[400px] lg:h-[600px]"
            style={{
              maskImage:
                "radial-gradient(ellipse 88% 88% at 50% 50%, black 62%, transparent 96%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 88% 88% at 50% 50%, black 62%, transparent 96%)",
            }}
          >
            <HeroVisual />
          </div>
        </div>

        {/* Summary row */}
        <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-line pt-7 sm:grid-cols-4">
          {heroSummary.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2.5 text-sm font-medium text-fg"
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
