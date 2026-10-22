import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { processPromises, processSteps } from "@/lib/process";

/** Homepage process — six stages with named deliverables + client promises. */
export function ProcessPreview() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="border-t border-line bg-elevated py-20 sm:py-28"
    >
      <div className="shell">
        <SectionHeading
          eyebrow="Process"
          title="Six stages, from idea to launch"
          description="Every project follows the same clear path — with a named deliverable at each stage, so you always know what you're getting and when."
          align="center"
        />

        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, index) => (
            <li key={step.number} className="h-full">
              <Reveal delay={index * 60} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-line bg-card p-6">
                  <span className="font-display text-3xl font-semibold text-gradient">
                    {step.number}
                  </span>
                  <h3 className="mt-3 text-base font-semibold text-fg">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-2">
                    {step.description}
                  </p>
                  <p className="mt-4 border-t border-line pt-4 text-xs font-medium leading-relaxed text-accent-2">
                    Deliverable: {step.deliverable}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        {/* Client promises — communication, milestones, handover */}
        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {processPromises.map((promise) => {
            const Icon = promise.icon;
            return (
              <div
                key={promise.title}
                className="rounded-2xl border border-line bg-fg p-6 text-white"
              >
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-accent-bright">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="font-display text-base font-semibold">
                  {promise.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  {promise.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
