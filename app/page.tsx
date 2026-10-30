import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { ServicesPreview } from "@/components/home/services-preview";
import { Approach } from "@/components/home/approach";
import { ProcessPreview } from "@/components/home/process-preview";
import { Pricing } from "@/components/home/pricing";
import { FaqSection } from "@/components/home/faq";
import { FinalCta } from "@/components/home/final-cta";
import { faqs } from "@/lib/faqs";

export const metadata: Metadata = {
  title: {
    absolute:
      "JAV Digital Engineering Studio — Websites, Web Apps, CRMs & AI Products",
  },
  description:
    "Independent studio building business websites, full-stack web applications, CRM systems, AI-powered products, and SaaS MVPs for founders and businesses worldwide.",
  alternates: {
    canonical: "/",
  },
};

/** FAQPage schema — mirrors the FAQ accordion rendered below. */
const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <Hero />
      <FeaturedProjects />
      <ServicesPreview />
      <Approach />
      <ProcessPreview />
      <Pricing />
      <FaqSection />
      <FinalCta />
    </>
  );
}
