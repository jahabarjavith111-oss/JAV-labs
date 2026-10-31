import type { Metadata } from "next";
import {
  IBM_Plex_Mono,
  Instrument_Serif,
  Inter,
  Sora,
} from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ChatWidget } from "@/components/shared/chat-widget";
import { siteConfig } from "@/lib/site-config";
import { services } from "@/lib/services";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  ...(siteConfig.siteUrl
    ? { metadataBase: new URL(siteConfig.siteUrl) }
    : {}),
  title: {
    default: `${siteConfig.name} — Freelance Web, CRM & AI Developer`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "digital engineering studio",
    "software company",
    "remote software development",
    "IT services company",
    "remote developer for hire",
    "hire software developer",
    "freelance developer",
    "freelance web developer",
    "freelance full stack developer",
    "hire full stack developer",
    "full-stack developer",
    "web application development",
    "web development company",
    "business website development",
    "CRM development",
    "CRM software",
    "custom CRM developer",
    "AI development",
    "AI development company",
    "AI solutions",
    "AI automation services",
    "SaaS MVP development",
    "freelance developer India",
    "software developer Tamil Nadu",
  ],
  openGraph: {
    type: "website",
    ...(siteConfig.siteUrl ? { url: siteConfig.siteUrl } : {}),
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Freelance Web, CRM & AI Developer`,
    description: siteConfig.description,
    locale: "en_US",
    // og:image / twitter:image come from app/opengraph-image.tsx (auto).
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Freelance Web, CRM & AI Developer`,
    description: siteConfig.description,
  },
  verification: {
    /** Google Search Console — HTML-file and meta-tag methods both set. */
    google: "googled4f91345db5e353e",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "theme-color": "#0a0d12",
  },
};

/**
 * Schema.org structured data (Organization + WebSite) — helps search
 * engines understand who runs the site, what it offers, and where.
 */
const site = siteConfig.siteUrl;
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site}/#organization`,
      name: siteConfig.name,
      url: site,
      logo: `${site}/images/logo-full.png`,
      email: siteConfig.email,
      description: siteConfig.description,
      keywords:
        "software company, remote software development, IT services, freelance web developer, freelance full stack developer, CRM development, custom CRM software, AI development, AI solutions, AI automation, SaaS MVP development, business website development, web application development",
      areaServed: [
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Country", name: "Canada" },
        { "@type": "Country", name: "Australia" },
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "Country", name: "India" },
      ],
      knowsAbout: [
        "Business websites",
        "Full-stack web applications",
        "CRM systems",
        "AI-powered products",
        "AI automation",
        "SaaS MVP development",
        "Remote software development",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.summary,
          },
        })),
      },
      sameAs: [siteConfig.links.linkedin],
      founder: {
        "@type": "Person",
        name: "Abdul Javid J.",
        jobTitle: "Freelance Software Developer",
        url: `${site}/about`,
        sameAs: [siteConfig.links.linkedin],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${site}/#website`,
      url: site,
      name: siteConfig.name,
      inLanguage: "en",
      publisher: { "@id": `${site}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} ${instrument.variable} ${plexMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-[var(--color-fg)] focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
