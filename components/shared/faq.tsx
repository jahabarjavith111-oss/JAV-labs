import { ChevronDown } from "lucide-react";
import type { Faq } from "@/lib/faqs";

/**
 * Accessible FAQ accordion built on native <details>/<summary>,
 * so it works with keyboard and touch without JavaScript.
 */
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-card">
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-left text-sm font-medium text-fg transition-colors hover:text-accent-2 sm:px-6 sm:text-base [&::-webkit-details-marker]:hidden">
            {item.question}
            <ChevronDown
              className="h-4 w-4 shrink-0 text-fg-3 transition-transform duration-200 group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p className="px-5 pb-5 text-sm leading-relaxed text-fg-2 sm:px-6 sm:pb-6">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
