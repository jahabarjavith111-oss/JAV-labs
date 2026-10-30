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
    default: `${siteConfig.name} — Websites, AI & SaaS Products`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "digital engineering studio",
    "freelance developer",
    "full-stack developer",
    "web applications",
    "CRM development",
    "CRM systems",
    "AI development",
    "SaaS MVP development",
    "business websites",
  ],
  openGraph: {
    type: "website",
    ...(siteConfig.siteUrl ? { url: siteConfig.siteUrl } : {}),
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Websites, AI & SaaS Products`,
    description: siteConfig.description,
    locale: "en_US",
    // og:image / twitter:image come from app/opengraph-image.tsx (auto).
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Websites, AI & SaaS Products`,
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
 * engines understand who runs the site and what it offers.
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
      areaServed: "Worldwide",
      knowsAbout: [
        "Business websites",
        "Full-stack web applications",
        "CRM systems",
        "AI-powered products",
        "SaaS MVP development",
      ],
      sameAs: [siteConfig.links.linkedin],
      founder: {
        "@type": "Person",
        name: "Abdul Javid J.",
        jobTitle: "Software Engineer",
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
