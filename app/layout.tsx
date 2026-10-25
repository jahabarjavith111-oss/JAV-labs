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
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Websites, AI & SaaS Products`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "theme-color": "#0a0d12",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} ${instrument.variable} ${plexMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-full flex-col">
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
