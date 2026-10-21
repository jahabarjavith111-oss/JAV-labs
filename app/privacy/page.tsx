import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How this website collects and handles information — an accurate, no-tracking privacy policy.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="Last updated: October 2026. This policy describes exactly what this website does — and does not — collect."
      />

      <article className="py-14 sm:py-20">
        <div className="shell max-w-3xl space-y-10 text-sm leading-relaxed text-fg-2">
          <section aria-labelledby="privacy-1">
            <h2
              id="privacy-1"
              className="mb-3 font-display text-xl font-semibold text-fg"
            >
              1. What this website collects
            </h2>
            <p>
              This website does not require an account and does not track you.
              The only personal information collected is what you voluntarily
              submit through the project inquiry form on the{" "}
              <a href="/contact" className="text-accent-2 underline underline-offset-4">
                contact page
              </a>
              : your name, email address, optional company or project name,
              project type, budget range, timeline, project description, and
              any optional reference URL you provide.
            </p>
          </section>

          <section aria-labelledby="privacy-2">
            <h2
              id="privacy-2"
              className="mb-3 font-display text-xl font-semibold text-fg"
            >
              2. How your information is used
            </h2>
            <p>
              Submitted information is used for one purpose only: to review
              your inquiry and respond to you. It is not sold, rented, or used
              for marketing lists. Your details are kept only as long as
              needed to handle the conversation and any resulting project
              correspondence.
            </p>
          </section>

          <section aria-labelledby="privacy-3">
            <h2
              id="privacy-3"
              className="mb-3 font-display text-xl font-semibold text-fg"
            >
              3. Third-party services
            </h2>
            <p>
              Form submissions are processed and delivered by{" "}
              <strong className="text-fg">Web3Forms</strong>, a form-handling
              service, which receives the fields you submit so the message can
              be delivered by email. Please review{" "}
              <a
                href="https://web3forms.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-2 underline underline-offset-4"
              >
                Web3Forms&apos; privacy policy
              </a>{" "}
              for details on how they handle data. The website is hosted on
              infrastructure provided by its hosting platform, which may
              process standard technical logs (such as IP address and
              requested page) for security and operation of the service.
            </p>
          </section>

          <section aria-labelledby="privacy-4">
            <h2
              id="privacy-4"
              className="mb-3 font-display text-xl font-semibold text-fg"
            >
              4. Cookies, analytics, and tracking
            </h2>
            <p>
              This website does not install analytics, advertising pixels, or
              tracking cookies. There is no login system and no user database.
              Basic preferences, if any, are stored by your browser only.
            </p>
          </section>

          <section aria-labelledby="privacy-5">
            <h2
              id="privacy-5"
              className="mb-3 font-display text-xl font-semibold text-fg"
            >
              5. Your rights
            </h2>
            <p>
              You may request access to, correction of, or deletion of any
              personal information you have submitted by emailing{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-accent-2 underline underline-offset-4"
              >
                {siteConfig.email}
              </a>
              . You can also ask any questions about this policy through the
              same address.
            </p>
          </section>

          <section aria-labelledby="privacy-6">
            <h2
              id="privacy-6"
              className="mb-3 font-display text-xl font-semibold text-fg"
            >
              6. Changes to this policy
            </h2>
            <p>
              If the way this site handles information changes — for example,
              if analytics are added later — this page will be updated before
              or at the same time, and the revision date above will change.
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
