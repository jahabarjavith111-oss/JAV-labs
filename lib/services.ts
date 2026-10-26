import type { LucideIcon } from "lucide-react";
import { Bot, Globe, Layers, Rocket } from "lucide-react";

export type Service = {
  slug: string;
  icon: LucideIcon;
  title: string;
  /** One-line, benefit-focused summary used on cards. */
  summary: string;
  /** Longer description used on the services page. */
  description: string;
  /** Who this service is for. */
  audience: string;
  /** The problem it solves. */
  problem: string;
  /** Typical deliverables (scope-dependent). */
  deliverables: string[];
  /** Information needed to prepare a quote. */
  quoteInfo: string[];
};

/**
 * Four outcome-focused service groups, shown on the homepage
 * and detailed on /services. Copy focuses on business outcomes
 * rather than technology names.
 */
export const services: Service[] = [
  {
    slug: "business-websites",
    icon: Globe,
    title: "Business Websites & Landing Pages",
    summary:
      "Professional websites and landing pages that turn visitors into enquiries — built to load fast, look credible, and work on every device.",
    description:
      "Most first impressions of a business happen on its website. I build modern, responsive websites and focused landing pages that present your offer clearly, build trust, and give visitors an obvious next step — whether that's a call, a form, or a signup.",
    audience:
      "Local businesses, consultants, service providers, and founders launching a product, campaign, or early-stage validation.",
    problem:
      "Your current site is missing, dated, or failing to convert — visitors arrive but nothing persuades them to take the next step.",
    deliverables: [
      "A responsive website or single-page landing experience",
      "Clear structure: headline, benefits, proof, and calls to action",
      "Working contact or enquiry form",
      "Deployment and basic analytics setup",
    ],
    quoteInfo: [
      "The action visitors should take (call, form, signup)",
      "Your offer, audience, and key message",
      "Pages you need and any content you already have",
      "Any brand assets or reference designs you like",
    ],
  },
  {
    slug: "full-stack-applications",
    icon: Layers,
    title: "Full-Stack Web Applications",
    summary:
      "Custom web applications with dashboards, workflows, and data management — including CRM systems — replacing spreadsheets and manual processes with software that scales.",
    description:
      "When a website isn't enough — you need users, dashboards, data, and workflows. I build web applications end to end: the interface people use, the APIs behind them, and the database that keeps everything consistent. This includes CRM systems and internal tools that centralize customers, pipelines, and reporting — plus connecting the tools you already rely on and improving existing applications without a full rewrite.",
    audience:
      "Businesses and teams with an internal process, a customer-facing product, a CRM or pipeline they want systematized, or a workflow currently held together by spreadsheets.",
    problem:
      "Your operations depend on manual work, disconnected tools, or spreadsheets that don't scale and can't be shared safely.",
    deliverables: [
      "Designed user interface for the key workflows",
      "Backend APIs and database design",
      "CRM features where needed: contacts, pipeline, activity tracking, and reports",
      "Authentication and role-based access where required",
      "Testing, deployment, and handover documentation",
    ],
    quoteInfo: [
      "The users and their main tasks",
      "The workflows and data involved",
      "Integrations or existing systems it must connect to",
      "Any examples of products you consider well built",
    ],
  },
  {
    slug: "ai-applications",
    icon: Bot,
    title: "AI Applications & Automation",
    summary:
      "AI features and automated workflows designed around a specific, measurable business use case — not generic chatbots.",
    description:
      "AI is useful when it is pointed at a real problem — summarizing documents, extracting data, assisting support, recommending actions, or automating repetitive decisions. I design AI features around your workflow, with human control where it matters.",
    audience:
      "Businesses and product teams that see a clear use for AI but need it built into a reliable, usable product.",
    problem:
      "Repetitive, judgment-heavy, or language-heavy work consumes hours that could be spent elsewhere — but generic chatbots don't fit your actual process.",
    deliverables: [
      "A defined use case with clear success criteria",
      "AI integration into your existing product or a new one",
      "Guardrails, fallbacks, and human review where appropriate",
      "Evaluation of output quality before release",
    ],
    quoteInfo: [
      "The task or decision you want AI to assist",
      "The data or documents involved",
      "Whether it integrates with an existing product",
      "Your tolerance for automation vs. human review",
    ],
  },
  {
    slug: "saas-mvp",
    icon: Rocket,
    title: "SaaS MVP Design & Development",
    summary:
      "A focused first version of your SaaS product — designed and built to validate the idea with real users before larger investment.",
    description:
      "The fastest honest way to learn whether a product idea works is to put a real, usable version in front of people. I build focused MVPs with just the core loop needed to validate — designed to be extended, not thrown away.",
    audience:
      "Startup founders and entrepreneurs who need a working first version to test, demonstrate, or raise with.",
    problem:
      "An idea that stays in slides and mockups never gets real feedback — and building everything at once burns budget before learning anything.",
    deliverables: [
      "Core user flow implemented end to end",
      "Clean, extensible codebase ready for the next iteration",
      "Authentication, database, and deployment as needed",
      "A staged plan so the MVP ships before scope grows",
    ],
    quoteInfo: [
      "The one core problem the product solves",
      "The essential features for a first usable version",
      "Your validation goals and target users",
      "Budget range and target launch window",
    ],
  },
];

/** All four service groups are featured on the homepage and in the footer. */
export const featuredServiceSlugs = [
  "business-websites",
  "full-stack-applications",
  "ai-applications",
  "saas-mvp",
] as const;

export const featuredServices = featuredServiceSlugs.map(
  (slug) => services.find((s) => s.slug === slug)!,
);

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
