import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { ServiceCard } from "@/components/shared/service-card";
import { featuredServices } from "@/lib/services";

/** Homepage services preview — the four principal services. */
export function ServicesPreview() {
  return (
    <section aria-labelledby="services-heading" className="py-16 sm:py-24">
      <div className="shell">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Services"
            title="What I build"
            description="Four ways I help businesses and founders turn ideas into working products."
          />
          <Link
            href="/services"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-fg-2 transition-colors hover:text-fg"
          >
            View all services
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredServices.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
