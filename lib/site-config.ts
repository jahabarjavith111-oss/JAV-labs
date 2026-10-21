/**
 * Single source of truth for identity, contact details, and site-wide settings.
 * Edit this file to change details used across the whole website.
 */
export const siteConfig = {
  name: "Abdul Javid J.",
  shortName: "AJ",
  initials: "AJ",
  role: "Independent Developer · AI & SaaS Builder",
  tagline: "Building Digital Products. Engineering What's Next.",

  description:
    "Independent full-stack developer building business websites, web applications, AI-powered products, and SaaS MVPs for founders and businesses worldwide.",

  /** Verified contact email — used by the contact form fallback and footer. */
  email: "jahabarjavith111@gmail.com",

  location: "Trichy, Tamil Nadu, India",

  links: {
    github: "https://github.com/jahabarjavith111-oss",
    linkedin: "https://www.linkedin.com/in/abdul-javid-a59048373",
  },

  /**
   * Production base URL (no trailing slash).
   * Update NEXT_PUBLIC_SITE_URL when a custom domain is configured.
   */
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://abduljavidj.vercel.app",
} as const;

export type SiteConfig = typeof siteConfig;
