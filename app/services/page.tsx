import type { Metadata } from "next";
import { Check, CircleHelp, MessagesSquare } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { ButtonLink } from "@/components/shared/button";
import { FinalCta } from "@/components/home/final-cta";
import { services } from "@/lib/services";
import { processSteps } from "@/lib/process";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Business websites, landing pages, full-stack web applications, SaaS MVPs, AI-powered applications, API integrations, application improvements, and maintenance.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Services built around outcomes"
        description="Business benefits first, implementation details second. Every project is scoped to your actual requirements — nothing is assumed."
      />

      <div className="divide-y divide-line">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <section
              key={service.slug}
              id={service.slug}
              aria-labelledby={`${service.slug}-heading`}
              className={index % 2 === 1 ? "bg-elevated" : ""}
            >
              <div className="shell grid gap-8 py-14 sm:py-16 lg:grid-cols-2 lg:gap-14">
                {/* Left: what it is */}
                <div>
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-card text-accent-2">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-fg-3">
                    {String(index + 1).padStart(2, "0")} — Service
                  </p>
                  <h2
                    id={`${service.slug}-heading`}
                    className="mt-2 font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl"
                  >
                    {service.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-fg-2">
                    {service.description}
                  </p>

                  <div className="mt-6 rounded-xl border border-line bg-card p-5">
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-fg">
                      <MessagesSquare
                        className="h-4 w-4 text-accent-2"
                        aria-hidden="true"
                      />
                      Who it&apos;s for
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-fg-2">
                      {service.audience}
                    </p>
                    <h3 className="mt-4 flex items-center gap-2 text-sm font-semibold text-fg">
                      <CircleHelp
                        className="h-4 w-4 text-accent-2"
                        aria-hidden="true"
                      />
                      The problem it solves
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-fg-2">
                      {service.problem}
                    </p>
                  </div>
                </div>

                {/* Right: deliverables + quote info */}
                <div className="flex flex-col gap-6">
                  <div className="rounded-xl border border-line bg-card p-6">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-fg-3">
                      Typical deliverables
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {service.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm leading-relaxed text-fg-2"
                        >
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-accent-2"
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-xs leading-relaxed text-fg-3">
                      Exact scope is determined by the requirements we agree on
                      together.
                    </p>
                  </div>

                  <div className="rounded-xl border border-line bg-card p-6">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-fg-3">
                      What I need to prepare a quote
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {service.quoteInfo.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm leading-relaxed text-fg-2"
                        >
                          <span
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5">
                      <ButtonLink href="/contact" variant="outline">
                        Request a consultation
                      </ButtonLink>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* How projects run */}
      <section
        aria-labelledby="services-process-heading"
        className="border-t border-line bg-elevated py-16 sm:py-20"
      >
        <div className="shell">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent-2">
            How projects run
          </p>
          <h2
            id="services-process-heading"
            className="font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl"
          >
            Clear steps, agreed before we start
          </h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step) => (
              <li
                key={step.number}
                className="rounded-xl border border-line bg-card p-5"
              >
                <span className="font-display text-lg font-semibold text-accent-2">
                  {step.number}
                </span>
                <h3 className="mt-2 text-sm font-semibold text-fg">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-2">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
