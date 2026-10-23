import { SectionHeading } from "@/components/shared/section-heading";
import { FaqList } from "@/components/shared/faq";
import { faqs } from "@/lib/faqs";

/** Homepage FAQ section. */
export function FaqSection() {
  return (
    <section aria-labelledby="faq-heading" className="py-16 sm:py-24">
      <div className="shell">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions, answered honestly"
          description="What clients usually want to know before starting a project."
          align="center"
        />
        <div className="mt-10 sm:mt-14">
          <FaqList items={faqs} />
        </div>
      </div>
    </section>
  );
}
