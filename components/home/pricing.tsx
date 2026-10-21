import { Check } from "lucide-react";
import { ButtonLink } from "@/components/shared/button";
import { pricing } from "@/lib/pricing";

/** Homepage pricing block — single "starting at" statement with custom quotes. */
export function Pricing() {
  return (
    <section
      aria-labelledby="pricing-heading"
      className="border-t border-line bg-elevated py-16 sm:py-24"
    >
      <div className="shell">
        <div className="mx-auto max-w-3xl rounded-3xl border border-line bg-card p-8 text-center sm:p-12">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent-2">
            {pricing.eyebrow}
          </p>
          <h2
            id="pricing-heading"
            className="font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl"
          >
            {pricing.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-fg-2 sm:text-base">
            {pricing.description}
          </p>

          <ul className="mx-auto mt-8 grid max-w-xl gap-3 text-left">
            {pricing.points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 text-sm text-fg-2"
              >
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent-2"
                  aria-hidden="true"
                />
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col items-center gap-4">
            <ButtonLink href="/contact">
              Get a Custom Quote
            </ButtonLink>
            <p className="max-w-md text-xs leading-relaxed text-fg-3">
              {pricing.note}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
