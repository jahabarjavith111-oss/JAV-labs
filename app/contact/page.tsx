import type { Metadata } from "next";
import Link from "next/link";
import { Check, Mail, MapPin, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { ContactForm } from "@/components/contact/contact-form";
import { siteConfig } from "@/lib/site-config";
import { GithubIcon, LinkedinIcon } from "@/components/shared/social-icons";

export const metadata: Metadata = {
  title: "Contact — Start a Project",
  description:
    "Tell me what you're trying to build. Project inquiry form for websites, web applications, AI products, and SaaS MVPs.",
};

const includeItems = [
  "What you're trying to build and the problem it solves",
  "Who will use it",
  "Features you consider essential",
  "Your budget range and desired timeline",
  "Links to examples you like",
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Tell me what you're trying to build"
        description="Share the problem, the audience, and what success looks like — I'll review your requirements and discuss the next steps."
      />

      <section className="py-14 sm:py-20" aria-label="Project inquiry">
        <div className="shell grid gap-10 lg:grid-cols-5 lg:gap-14">
          {/* Contact details */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="rounded-2xl border border-line bg-card p-6">
              <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-fg-3">
                Reach me directly
              </h2>

              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-5 flex items-center gap-3 text-sm text-fg-2 transition-colors hover:text-fg"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-elevated text-accent-2">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="break-all">{siteConfig.email}</span>
              </a>

              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center gap-3 text-sm text-fg-2 transition-colors hover:text-fg"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-elevated text-accent-2">
                  <LinkedinIcon />
                </span>
                LinkedIn profile
              </a>

              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center gap-3 text-sm text-fg-2 transition-colors hover:text-fg"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-elevated text-accent-2">
                  <GithubIcon className="h-4 w-4" />
                </span>
                GitHub profile
              </a>

              <p className="mt-5 flex items-center gap-2 border-t border-line pt-5 text-sm text-fg-3">
                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                {siteConfig.location} — working with clients internationally.
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-elevated p-6">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-fg">
                <Sparkles className="h-4 w-4 text-accent-2" aria-hidden="true" />
                What to include
              </h2>
              <ul className="mt-4 space-y-2.5">
                {includeItems.map((item) => (
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
                Not sure about all of this? That&apos;s fine — send what you
                have and we&apos;ll clarify the rest together. Read how your
                data is handled in the{" "}
                <Link
                  href="/privacy"
                  className="underline underline-offset-2 hover:text-fg-2"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
