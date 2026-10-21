import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { Service } from "@/lib/services";

type ServiceCardProps = {
  service: Service;
  /** Show the typical deliverables list. */
  showDeliverables?: boolean;
};

/** Card used in the homepage services preview and on /services. */
export function ServiceCard({ service, showDeliverables = true }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <article
      id={`card-${service.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-line bg-card p-6 transition-colors duration-200 hover:border-line-2 sm:p-7"
    >
      <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-elevated text-accent-2 transition-colors group-hover:border-accent/50">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>

      <h3 className="font-display text-xl font-semibold text-fg">
        {service.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-fg-2">
        {service.summary}
      </p>

      {showDeliverables ? (
        <ul className="mt-5 space-y-2">
          {service.deliverables.slice(0, 3).map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm text-fg-3"
            >
              <Check
                className="mt-0.5 h-4 w-4 shrink-0 text-accent-2"
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-auto pt-6">
        <Link
          href={`/services#${service.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-fg transition-colors hover:text-accent-2"
          aria-label={`Learn more about ${service.title}`}
        >
          Learn more
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
