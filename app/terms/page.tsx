import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms of use for this website, including how quotes, pricing, and project agreements work.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms & Conditions"
        description="Last updated: October 2026. These terms cover use of this website; individual projects are governed by their own written agreement."
      />

      <article className="py-14 sm:py-20">
        <div className="shell max-w-3xl space-y-10 text-sm leading-relaxed text-fg-2">
          <section aria-labelledby="terms-1">
            <h2
              id="terms-1"
              className="mb-3 font-display text-xl font-semibold text-fg"
            >
              1. Use of this website
            </h2>
            <p>
              This website presents services, projects, and contact information
              for {siteConfig.name}. You may browse it and submit an inquiry
              for legitimate purposes. You may not attempt to disrupt, probe,
              or misuse the site or its forms.
            </p>
          </section>

          <section aria-labelledby="terms-2">
            <h2
              id="terms-2"
              className="mb-3 font-display text-xl font-semibold text-fg"
            >
              2. Services and quotes
            </h2>
            <p>
              Information on this site — including service descriptions,
              deliverables, and process steps — is general information to help
              you decide whether to get in touch.{" "}
              <strong className="text-fg">
                Nothing on this site constitutes a binding offer.
              </strong>{" "}
              A project begins only after scope, deliverables, timeline, price,
              and payment terms are agreed in writing between you and{" "}
              {siteConfig.name}.
            </p>
          </section>

          <section aria-labelledby="terms-3">
            <h2
              id="terms-3"
              className="mb-3 font-display text-xl font-semibold text-fg"
            >
              3. Pricing
            </h2>
            <p>
              Prices shown on this site (such as &quot;projects start at $450
              USD&quot;) are starting prices for small, clearly scoped work —
              not fixed quotes. Final pricing depends on scope, integrations,
              design complexity, timeline, and support requirements, and is
              confirmed in your individual quote before work begins.
            </p>
          </section>

          <section aria-labelledby="terms-4">
            <h2
              id="terms-4"
              className="mb-3 font-display text-xl font-semibold text-fg"
            >
              4. Project work and intellectual property
            </h2>
            <p>
              Each project is governed by its own proposal or agreement, which
              defines deliverables, revision scope, ownership of the work, and
              payment schedule. Where no written agreement exists, no work
              begins and no rights are transferred. The specific terms for a
              project always take precedence over this page.
            </p>
          </section>

          <section aria-labelledby="terms-5">
            <h2
              id="terms-5"
              className="mb-3 font-display text-xl font-semibold text-fg"
            >
              5. Project showcases
            </h2>
            <p>
              Case studies on this site describe personal and exploratory
              projects with their honest current status. They do not represent
              client work, revenue figures, or performance guarantees unless
              explicitly stated otherwise.
            </p>
          </section>

          <section aria-labelledby="terms-6">
            <h2
              id="terms-6"
              className="mb-3 font-display text-xl font-semibold text-fg"
            >
              6. External links
            </h2>
            <p>
              This site may link to external resources such as code
              repositories or professional profiles. Those sites are governed
              by their own terms and policies, and this site is not responsible
              for their content.
            </p>
          </section>

          <section aria-labelledby="terms-7">
            <h2
              id="terms-7"
              className="mb-3 font-display text-xl font-semibold text-fg"
            >
              7. Contact
            </h2>
            <p>
              Questions about these terms can be sent to{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-accent-2 underline underline-offset-4"
              >
                {siteConfig.email}
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
