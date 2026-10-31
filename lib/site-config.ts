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
    "JAV Digital Engineering Studio — a remote software company and the independent studio of Abdul Javid J., building business websites, web applications, CRM systems, AI-powered products, and SaaS MVPs for founders and businesses worldwide.",

  /** Verified contact email — used by the contact form fallback and footer. */
  email: "jav.digitalstudio2026@gmail.com",

  location: "Trichy, Tamil Nadu, India",

  links: {
    linkedin: "https://www.linkedin.com/in/abdul-javid-a59048373",
  },

  /**
   * WhatsApp direct chat — shown ONLY inside the AI chat assistant
   * (never in the footer, contact page, or anywhere else on the site).
   * `link` is the clean wa.me URL used in chat replies; `prefillLink`
   * opens a chat with a pre-filled greeting (used by the widget's chip).
   */
  whatsapp: {
    display: "+91 93459 92521",
    link: "https://wa.me/919345992521",
    prefillLink:
      "https://wa.me/919345992521?text=Hi%20Abdul%2C%20I%27d%20like%20to%20discuss%20a%20project%20with%20JAV%20Digital%20Engineering%20Studio.",
  },

  /**
   * Production base URL (no trailing slash).
   * Set NEXT_PUBLIC_SITE_URL when a custom domain is configured —
   * used for canonical/OG metadata, robots, and the sitemap.
   */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://jav-labs.vercel.app",
} as const;

export type SiteConfig = typeof siteConfig;
