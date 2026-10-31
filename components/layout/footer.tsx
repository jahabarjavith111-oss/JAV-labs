import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { footerNav, legalNav } from "@/lib/navigation";
import { featuredServices } from "@/lib/services";
import { siteConfig } from "@/lib/site-config";
import { ButtonLink } from "@/components/shared/button";
import { LinkedinIcon } from "@/components/shared/social-icons";

export async function Footer() {
  "use cache";
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-elevated">
      {/* Contact CTA banner — compact strip above the footer columns */}
      <div className="shell pt-12 sm:pt-14">
        <div className="relative overflow-hidden rounded-3xl bg-fg px-8 py-10 text-white sm:px-12 sm:py-11">
          <div
            className="glow -top-24 left-1/3 h-64 w-64 bg-accent-bright/50"
            aria-hidden="true"
          />
          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <h2 className="font-display text-[clamp(24px,3vw,34px)] font-bold leading-[1.1] tracking-[-0.03em] text-balance">
                Have a project in mind?{" "}
                <span className="serif-accent text-accent-bright">
                  Let&apos;s discuss it.
                </span>
              </h2>
              <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-white/70">
                Tell us what you&apos;re building and the problem it solves —
                you&apos;ll receive an honest assessment and clear next steps.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <ButtonLink href="/contact" variant="light">
                Discuss a Project
              </ButtonLink>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Email us directly
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href="/" className="inline-flex flex-col gap-3">
            <span className="flex h-10 w-[78px] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-black ring-1 ring-line">
              <Image
                src="/images/logo-mark.png"
                alt=""
                width={66}
                height={31}
                className="h-auto w-[66px]"
              />
            </span>
            <span className="font-display text-lg font-semibold leading-tight text-fg">
              {siteConfig.name}
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-2">
            The independent, remote software studio of Abdul Javid J. —
            building business websites, web applications, CRM systems,
            AI-powered products, and SaaS MVPs for founders and businesses
            worldwide.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-fg-3 transition-colors hover:border-line-2 hover:text-fg"
            >
              <LinkedinIcon />
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              aria-label="Send an email"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-fg-3 transition-colors hover:border-line-2 hover:text-fg"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Site links */}
        <nav aria-label="Footer navigation">
          <h2 className="label-mono mb-4 text-fg-2">Site</h2>
          <ul className="space-y-2.5">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-fg-2 transition-colors hover:text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Services links */}
        <nav aria-label="Services">
          <h2 className="label-mono mb-4 text-fg-2">Services</h2>
          <ul className="space-y-2.5">
            {featuredServices.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services#${service.slug}`}
                  className="text-sm text-fg-2 transition-colors hover:text-fg"
                >
                  {service.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/services"
                className="text-sm text-fg-2 transition-colors hover:text-fg"
              >
                All services
              </Link>
            </li>
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h2 className="label-mono mb-4 text-fg-2">Contact</h2>
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-2 text-sm break-all text-fg-2 transition-colors hover:text-fg"
          >
            <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
            {siteConfig.email}
          </a>
          <p className="mt-3 flex items-center gap-2 text-sm text-fg-3">
            <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
            {siteConfig.location}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-fg-3">
            Working with clients worldwide, remotely.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-flex rounded-xl border border-line-2 px-4 py-2 text-sm text-fg transition-colors hover:border-fg hover:bg-fg hover:text-white"
          >
            Discuss a Project
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-line">
        <div className="shell flex flex-col items-start justify-between gap-3 py-5 sm:flex-row sm:items-center">
          <p className="text-xs text-fg-3">
            © {year} {siteConfig.name} — Abdul Javid J. All rights reserved.
          </p>
          <ul className="flex items-center gap-4">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-xs text-fg-3 transition-colors hover:text-fg-2"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
