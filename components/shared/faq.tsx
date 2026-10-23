import type { Faq } from "@/lib/faqs";

/**
 * FAQ list — every question and answer is permanently visible.
 * No accordion, no clicking: visitors read everything at a glance,
 * which also keeps the full content available to search engines.
 */
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-10 lg:gap-x-16">
      {items.map((item) => (
        <div key={item.question} className="min-w-0">
          <h3 className="text-base font-semibold leading-snug text-fg sm:text-lg">
            {item.question}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-fg-2 sm:text-[15px]">
            {item.answer}
          </p>
        </div>
      ))}
    </div>
  );
}
