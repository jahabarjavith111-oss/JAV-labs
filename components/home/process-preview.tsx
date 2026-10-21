import { SectionHeading } from "@/components/shared/section-heading";
import { processSteps } from "@/lib/process";

/** Homepage process preview — how a project runs from idea to launch. */
export function ProcessPreview() {
  return (
    <section aria-labelledby="process-heading" className="py-16 sm:py-24">
      <div className="shell">
        <SectionHeading
          eyebrow="Process"
          title="From idea to launch"
          description="I can support a project from clarifying the idea through implementation, testing, and deployment — here is how the work runs."
          align="center"
        />

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step) => (
            <li
              key={step.number}
              className="relative rounded-2xl border border-line bg-card p-6"
            >
              <span className="font-display text-3xl font-semibold text-gradient">
                {step.number}
              </span>
              <h3 className="mt-3 text-base font-semibold text-fg">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-2">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
