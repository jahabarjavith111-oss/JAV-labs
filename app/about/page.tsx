import type { Metadata } from "next";
import {
  Bot,
  Braces,
  CheckCircle2,
  Cloud,
  Code2,
  Database,
  GitBranch,
  Lock,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { ProjectImage } from "@/components/shared/project-image";
import { ButtonLink } from "@/components/shared/button";
import { LinkedinIcon } from "@/components/shared/social-icons";
import { siteConfig } from "@/lib/site-config";
import { FinalCta } from "@/components/home/final-cta";
import { pageOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About — Freelance Developer",
  description:
    "Abdul Javid J. — freelance software developer and founder of JAV Digital Engineering Studio, building websites, full-stack applications, CRM systems, and AI-powered products for clients worldwide.",
  alternates: {
    canonical: "/about",
  },
  openGraph: pageOpenGraph(
    "/about",
    "About — Freelance Developer — JAV Digital Engineering Studio",
    "Abdul Javid J. — freelance software developer and founder of JAV Digital Engineering Studio, building websites, full-stack applications, CRM systems, and AI-powered products for clients worldwide.",
  ),
};

const focusAreas = [
  {
    icon: Bot,
    title: "AI-driven applications",
    text: "End-to-end application development with AI integration, automation, and intelligent workflows.",
  },
  {
    icon: Braces,
    title: "REST APIs & backends",
    text: "Secure API design, backend architecture, authentication, and database integration.",
  },
  {
    icon: Database,
    title: "Real-time data systems",
    text: "Dashboards, monitoring workflows, and event-driven application features.",
  },
  {
    icon: Cloud,
    title: "Cloud deployment",
    text: "AWS and Firebase infrastructure with deployment and DevOps-oriented practices.",
  },
  {
    icon: Lock,
    title: "Secure data handling",
    text: "Authentication, authorization, encryption concepts, and responsible data handling.",
  },
  {
    icon: GitBranch,
    title: "Code quality practices",
    text: "Git version control, modular architecture, Agile methodology, and structured workflows.",
  },
];

const experience = [
  {
    role: "Full Stack Developer Intern",
    org: "VDart Technologies Private Limited",
    period: "March 2026 – May 2026",
    note: "Onsite · Contract based",
    points: [
      "Developed and deployed a full-stack web application using PHP, MySQL, and React.js",
      "Designed RESTful APIs and optimized database schema for efficient data handling",
      "Built responsive UI and CRUD features with frontend-backend integration",
    ],
  },
  {
    role: "Business Analyst Intern",
    org: "Cognifyz Technologies Pvt Ltd",
    period: "Internship",
    note: "",
    points: [
      "KPI dashboard development",
      "Business performance reporting",
    ],
  },
  {
    role: "Data Science Intern",
    org: "Cognifyz Technologies Pvt Ltd",
    period: "Internship",
    note: "",
    points: [
      "Data cleaning with Python & SQL",
      "ML-ready data pipelines",
    ],
  },
  {
    role: "GenAI Data Analyst Intern",
    org: "Codveda Technologies Pvt Ltd",
    period: "Internship",
    note: "",
    points: ["Power BI visualizations", "Dataset analysis"],
  },
];

const simulations = [
  "Tata Group — GenAI Data Analyst Simulation",
  "Tata Group — Cybersecurity Analyst Simulation",
  "Walmart — Software Engineering Simulation",
  "Cisco — Junior Cybersecurity Analyst Certification",
];

const skillGroups = [
  {
    label: "Languages",
    items: "Python · Java · Kotlin · SQL · C/C++",
  },
  {
    label: "AI & Machine Learning",
    items: "TensorFlow · scikit-learn · LangChain · Gemini AI",
  },
  {
    label: "Web & Mobile",
    items: "React · HTML/CSS · Flutter · React Native · Android",
  },
  {
    label: "Backend & APIs",
    items: "Spring Boot · Node.js · PHP · REST APIs",
  },
  {
    label: "Data",
    items: "MongoDB · MySQL · PostgreSQL · Power BI · Tableau",
  },
  {
    label: "Cloud & Tools",
    items: "AWS · Firebase · Docker · Git · GitHub · Agile · MVVM",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Abdul Javid J."
        description="Independent software engineer and founder of JAV Digital Engineering Studio — building websites, web applications, CRM systems, and AI-powered products for businesses and founders."
      />

      {/* Story */}
      <section className="py-14 sm:py-20" aria-labelledby="story-heading">
        <div className="shell grid gap-10 lg:grid-cols-5 lg:gap-14">
          <div className="lg:col-span-2">
            <ProjectImage
              src="/images/photo.jpg"
              alt="Portrait of Abdul Javid J."
              className="aspect-[4/5] !rounded-2xl"
            />
          </div>
          <div className="lg:col-span-3">
            <h2
              id="story-heading"
              className="font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl"
            >
              The developer you&apos;ll actually work with
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-fg-2">
              <p>
                I&apos;m Abdul Javid J. — the independent software engineer
                behind JAV Digital Engineering Studio. I build software for one
                reason: the moment an abstract idea becomes something people can
                actually use. A website that wins trust. An application that
                removes a manual task. An AI feature that saves hours of
                repetitive work.
              </p>
              <p>
                My experience spans AI-driven applications, full-stack
                development, backend systems, business intelligence, and
                security-oriented engineering — including professional
                internships where I designed, built, and deployed real
                full-stack applications end to end. I focus on practical
                problems for businesses and founders: understanding exactly what
                you need, building it properly, and shipping software that
                holds up under real use.
              </p>
              <p>
                Through this studio, you work directly with the engineer
                building your product — no account managers, no handoffs, no
                layers in between. Clear communication, honest scope, and no
                pretending a project includes everything. If something falls
                outside what I can genuinely deliver, I&apos;ll tell you
                upfront.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ButtonLink href="/contact">Discuss a Project</ButtonLink>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-xl border border-line-2 px-5 py-3 text-sm font-semibold text-fg transition-colors hover:border-fg hover:bg-fg hover:text-white"
              >
                <LinkedinIcon />
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Focus areas */}
      <section
        aria-labelledby="focus-heading"
        className="border-t border-line bg-elevated py-14 sm:py-20"
      >
        <div className="shell">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent-2">
            What I bring
          </p>
          <h2
            id="focus-heading"
            className="font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl"
          >
            What I focus on as a software engineer
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {focusAreas.map((area) => {
              const Icon = area.icon;
              return (
                <li
                  key={area.title}
                  className="rounded-2xl border border-line bg-card p-5"
                >
                  <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent-2">
                    <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                  </span>
                  <h3 className="text-sm font-semibold text-fg">
                    {area.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-fg-2">
                    {area.text}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Experience */}
      <section
        aria-labelledby="experience-heading"
        className="py-14 sm:py-20"
      >
        <div className="shell">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent-2">
            Experience
          </p>
          <h2
            id="experience-heading"
            className="font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl"
          >
            Professional experience
          </h2>

          <ol className="mt-8 space-y-4">
            {experience.map((item) => (
              <li
                key={`${item.role}-${item.org}`}
                className="rounded-2xl border border-line bg-card p-6"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-fg">
                      {item.role}
                    </h3>
                    <p className="text-sm text-fg-2">{item.org}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-sm text-fg-3">{item.period}</p>
                    {item.note ? (
                      <p className="text-xs text-fg-3">{item.note}</p>
                    ) : null}
                  </div>
                </div>
                <ul className="mt-4 space-y-2">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-sm leading-relaxed text-fg-2"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent-2"
                        aria-hidden="true"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          <div className="mt-6 rounded-2xl border border-line bg-elevated p-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-fg-3">
              Certifications &amp; training programs
            </h3>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {simulations.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-fg-2"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Technical capabilities */}
      <section
        aria-labelledby="skills-heading"
        className="border-t border-line bg-elevated py-14 sm:py-20"
      >
        <div className="shell">
          <div className="flex items-start gap-3">
            <Code2
              className="mt-1.5 h-5 w-5 shrink-0 text-accent-2"
              aria-hidden="true"
            />
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-[0.2em] text-accent-2">
                Technical capabilities
              </p>
              <h2
                id="skills-heading"
                className="font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl"
              >
                Tools I work with
              </h2>
            </div>
          </div>

          <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group) => (
              <div
                key={group.label}
                className="rounded-xl border border-line bg-card p-5"
              >
                <dt className="text-sm font-semibold text-fg">{group.label}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-fg-2">
                  {group.items}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-xs leading-relaxed text-fg-3">
            Grouped by how they are actually used in projects — not an
            exhaustive list of every tool I&apos;ve encountered.
          </p>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
