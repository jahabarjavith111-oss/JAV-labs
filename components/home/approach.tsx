import {
  CheckCircle2,
  MessagesSquare,
  PencilRuler,
  RefreshCw,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";

const points = [
  {
    icon: MessagesSquare,
    title: "Direct communication",
    text: "You work with the developer building your product — no account managers, no handoffs, no lost details.",
  },
  {
    icon: PencilRuler,
    title: "Designed around your requirements",
    text: "Solutions are shaped around what your project actually needs, not a generic template with your logo on it.",
  },
  {
    icon: CheckCircle2,
    title: "Clear scope and deliverables",
    text: "You know what is being delivered — and what is not — before any work begins.",
  },
  {
    icon: RefreshCw,
    title: "Responsive by default",
    text: "Every interface is built to work cleanly on phones, tablets, laptops, and desktops.",
  },
  {
    icon: ShieldCheck,
    title: "Testing and deployment",
    text: "Where included in the agreement, testing and deployment are part of the work — not an afterthought.",
  },
  {
    icon: Wrench,
    title: "Maintainable implementation",
    text: "Organized, readable code that is easier to extend, hand over, and improve later.",
  },
];

/** Homepage section: approach + why work with me (merged). */
export function Approach() {
  return (
    <section
      aria-labelledby="approach-heading"
      className="border-t border-line bg-elevated py-16 sm:py-20"
    >
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">
          <div className="lg:col-span-2">
            <SectionHeading
              eyebrow="Approach"
              title="A direct, practical way to work"
              description="You get a clear process, honest answers, and a product built around real business needs — not unnecessary complexity."
            />
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-3">
            {points.map((point) => {
              const Icon = point.icon;
              return (
                <li
                  key={point.title}
                  className="rounded-2xl border border-line bg-card p-5"
                >
                  <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent-2">
                    <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                  </span>
                  <h3 className="text-sm font-semibold text-fg">
                    {point.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-fg-2">
                    {point.text}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
