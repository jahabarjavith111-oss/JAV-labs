import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Globe2 } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { siteConfig } from "@/lib/site-config";

const facts = [
  {
    icon: Globe2,
    label: "Clients worldwide",
    detail: "Remote delivery across time zones",
  },
  {
    icon: MapPin,
    label: "Based in India",
    detail: siteConfig.location,
  },
];

/**
 * About JAV — professional studio introduction between the hero
 * and services. Honest positioning: an independent, founder-led
 * software engineering studio.
 */
export function AboutIntro() {
  return (
    <section
      id="about-jav"
      aria-labelledby="about-jav-heading"
      className="border-t border-line bg-elevated py-16 sm:py-24"
    >
      <div className="shell">
        <div className="grid items-center gap-10 lg:grid-cols-5 lg:gap-14">
          <div className="lg:col-span-3">
            <SectionHeading
              eyebrow="About JAV"
              title={
                <>
                  An independent studio that ships{" "}
                  <span className="serif-accent text-accent-bright">
                    production software
                  </span>
                </>
              }
              description="JAV Digital Engineering Studio is the practice of Abdul Javid J. — an independent software engineer building websites, web applications, CRM systems, AI-powered products, and SaaS MVPs for founders and businesses. You work directly with the person designing and writing your code: clear communication, honest scope, and engineering that holds up after launch."
            />

            <div className="mt-7 flex flex-wrap gap-6">
              {facts.map((fact) => {
                const Icon = fact.icon;
                return (
                  <div key={fact.label} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-card text-accent-bright">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div className="leading-tight">
                      <p className="text-sm font-semibold text-fg">
                        {fact.label}
                      </p>
                      <p className="text-xs text-fg-3">{fact.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link
              href="/about"
              className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-fg-2 transition-colors hover:text-accent-bright"
            >
              More about the studio
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          {/* Founder card */}
          <Reveal className="lg:col-span-2">
            <figure className="glass edge-glow relative overflow-hidden rounded-3xl p-6 sm:p-7">
              <div className="flex items-center gap-4">
                <span className="relative block h-16 w-16 shrink-0 overflow-hidden rounded-2xl ring-1 ring-line-2">
                  <Image
                    src="/images/photo.jpg"
                    alt="Abdul Javid J., founder of JAV Digital Engineering Studio"
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </span>
                <figcaption className="leading-tight">
                  <p className="font-display text-lg font-semibold text-fg">
                    Abdul Javid J.
                  </p>
                  <p className="mt-1 text-sm text-fg-2">
                    Founder · Software Engineer
                  </p>
                </figcaption>
              </div>
              <p className="mt-5 border-t border-line pt-5 text-sm leading-relaxed text-fg-2">
                Every project gets a clear scope, direct communication, and
                code built to be extended — not a template with a logo on it.
              </p>
              <p className="label-mono mt-4 text-fg-3">
                {siteConfig.name}
              </p>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
