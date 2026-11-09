import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";

/**
 * Capabilities — technical expertise demonstrated through the real
 * stack used across TXNORYX, VERIDEX, and CiVIQ. No invented claims:
 * every technology listed has shipped in a case-studied project.
 */

const capabilityGroups = [
  {
    title: "Interfaces",
    text: "Fast, accessible front ends — dashboards, product UIs, and marketing sites built to work on every screen.",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Recharts"],
  },
  {
    title: "Backends & APIs",
    text: "Reliable server-side logic, authentication, and integrations — designed around your data and users.",
    tech: ["Node.js", "FastAPI", "Spring Boot", "REST APIs", "JWT auth"],
  },
  {
    title: "Data & Infrastructure",
    text: "Consistent data, reproducible environments, and deployment pipelines that keep releases boring.",
    tech: ["PostgreSQL", "MySQL", "Redis", "Docker", "S3 storage"],
  },
  {
    title: "AI Systems",
    text: "Grounded AI features — copilots, extraction, and recommendations with evaluation and human review built in.",
    tech: ["AI agents", "OpenAI-compatible APIs", "Gemini", "SSE streaming"],
  },
];

/** Every technology, for the marquee band. */
const marqueeTech = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "FastAPI",
  "Spring Boot",
  "PostgreSQL",
  "MySQL",
  "Redis",
  "Docker",
  "Tailwind CSS",
  "TanStack Query",
  "Zustand",
  "Recharts",
  "React Three Fiber",
  "REST APIs",
  "JWT Auth",
  "AI Agents",
  "Gemini",
  "OpenAI APIs",
];

export function Capabilities() {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="border-t border-line py-16 sm:py-24"
    >
      <div className="shell">
        <SectionHeading
          eyebrow="Our capabilities"
          title="Engineering across the modern web stack"
          description="From interface to infrastructure to AI — the same stack that powers our case studies, applied to your product."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {capabilityGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 70} className="h-full">
              <article className="glass edge-glow flex h-full flex-col rounded-2xl p-6">
                <h3 className="font-display text-lg font-semibold text-fg">
                  {group.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-fg-2">
                  {group.text}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2 pt-1">
                  {group.tech.map((name) => (
                    <li
                      key={name}
                      className="rounded-full border border-line bg-base/60 px-2.5 py-1 font-mono text-[11px] tracking-wide text-fg-2"
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Infinite technology marquee */}
      <div className="marquee mt-12 border-y border-line bg-elevated py-4" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {marqueeTech.map((name) => (
                <span
                  key={`${copy}-${name}`}
                  className="flex items-center gap-6 px-6 font-mono text-sm uppercase tracking-[0.16em] text-fg-3"
                >
                  {name}
                  <span className="h-1 w-1 rounded-full bg-accent-bright/70" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
