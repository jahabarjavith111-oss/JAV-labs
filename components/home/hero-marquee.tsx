import { Asterisk } from "lucide-react";

/**
 * Oversized display marquee band — the signature Lusion-style ribbon
 * that bridges the hero into the page. Alternates solid and outlined
 * words for editorial texture; pauses on hover. Decorative
 * (aria-hidden) — the same keywords appear semantically in the hero
 * summary and page copy.
 */
const items = [
  "Software Engineering",
  "Web Applications",
  "CRM Systems",
  "AI Solutions",
  "SaaS MVPs",
  "Business Websites",
];

export function HeroMarquee() {
  return (
    <div
      aria-hidden="true"
      className="marquee marquee-xl border-t border-line bg-base py-4 sm:py-6"
    >
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {items.map((label, index) => (
              <span
                key={`${copy}-${label}`}
                className="flex items-center gap-7 pl-7 font-display text-[clamp(26px,4.4vw,52px)] font-bold leading-none tracking-[-0.02em]"
              >
                <span
                  className={
                    index % 2
                      ? "text-transparent [-webkit-text-stroke:1px_rgba(238,242,248,0.4)]"
                      : "text-fg"
                  }
                >
                  {label}
                </span>
                <Asterisk
                  className="h-5 w-5 shrink-0 text-accent-bright sm:h-6 sm:w-6"
                  aria-hidden="true"
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
