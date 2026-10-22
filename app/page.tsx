import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { ServicesPreview } from "@/components/home/services-preview";
import { Approach } from "@/components/home/approach";
import { ProcessPreview } from "@/components/home/process-preview";
import { Pricing } from "@/components/home/pricing";
import { FaqSection } from "@/components/home/faq";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: {
    absolute:
      "JAV Digital Engineering Studio — Websites, Web Apps & AI Products",
  },
  description:
    "Independent studio building business websites, full-stack web applications, AI-powered products, and SaaS MVPs for founders and businesses worldwide. Projects start at $450 USD.",
};

export default function HomePage() {
  return (
    <>
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
