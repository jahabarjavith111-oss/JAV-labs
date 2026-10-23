"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Faq } from "@/lib/faqs";

/**
 * Animated FAQ accordion.
 * Questions are always visible; clicking one smoothly expands its answer
 * (grid-rows 0fr → 1fr transition, so it animates open AND closed).
 * Several answers can stay open at once, and everything remains in the
 * DOM for search engines.
 */
export function FaqList({ items }: { items: Faq[] }) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  function toggle(index: number) {
    setOpenItems((current) => {
      const next = new Set(current);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-card">
      {items.map((item, index) => {
        const isOpen = openItems.has(index);
        const panelId = `faq-answer-${index}`;

        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="flex w-full cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-left text-sm font-medium text-fg transition-colors hover:text-accent-2 sm:px-6 sm:text-base"
            >
              {item.question}
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-fg-3 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>

            {/* Animated panel: 0fr (closed) → 1fr (open) */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={item.question}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-fg-2 sm:px-6 sm:pb-6">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
