/**
 * Single source of truth for identity, contact details, and site-wide settings.
 * Edit this file to change details used across the whole website.
 */
export const siteConfig = {
  name: "JAV Digital Engineering Studio",
  shortName: "JAV",
  initials: "JAV",
  role: "Digital Engineering Studio · Websites, AI & SaaS",
  tagline: "Building Digital Products. Engineering What's Next.",

  description:
    "JAV Digital Engineering Studio — the independent studio of Abdul Javid J., building business websites, web applications, AI-powered products, and SaaS MVPs for founders and businesses worldwide.",

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
