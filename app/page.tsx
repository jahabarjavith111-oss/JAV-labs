import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { Approach } from "@/components/home/approach";
import { ServicesPreview } from "@/components/home/services-preview";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { ProcessPreview } from "@/components/home/process-preview";
import { Pricing } from "@/components/home/pricing";
import { FaqSection } from "@/components/home/faq";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "Abdul Javid J. — Websites, Web Apps & AI Products for Businesses",
  description:
    "Independent developer building business websites, full-stack web applications, AI-powered products, and SaaS MVPs for founders and businesses worldwide. Projects start at $450 USD.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Approach />
      <ServicesPreview />
      <FeaturedProjects />
      <ProcessPreview />
      <Pricing />
      <FaqSection />
      <FinalCta />
    </>
  );
}
