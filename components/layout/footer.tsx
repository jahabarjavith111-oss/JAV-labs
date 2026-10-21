import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import { footerNav, legalNav } from "@/lib/navigation";
import { featuredServices } from "@/lib/services";
import { siteConfig } from "@/lib/site-config";
import { GithubIcon, LinkedinIcon } from "@/components/shared/social-icons";

export async function Footer() {
  "use cache";
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-elevated">
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
            The independent studio of Abdul Javid J. — building business
            websites, full-stack applications, and AI-powered products.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-fg-3 transition-colors hover:border-line-2 hover:text-fg"
            >
              <GithubIcon />
            </a>
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
          <h2 className="label-mono mb-4 text-fg-2">
            Site
          </h2>
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
          <h2 className="label-mono mb-4 text-fg-2">
            Services
          </h2>
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
          <h2 className="label-mono mb-4 text-fg-2">
            Contact
          </h2>
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-2 text-sm break-all text-fg-2 transition-colors hover:text-fg"
          >
            <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
            {siteConfig.email}
          </a>
          <p className="mt-3 text-sm text-fg-3">{siteConfig.location}</p>
          <Link
            href="/contact"
            className="mt-4 inline-flex rounded-full border border-line-2 px-4 py-2 text-sm text-fg transition-colors hover:border-accent/60 hover:bg-accent/10"
          >
            Start a Project
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
