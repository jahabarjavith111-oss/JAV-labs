import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Globe,
  Layers,
  Puzzle,
  Rocket,
  Shield,
  Target,
  Wrench,
} from "lucide-react";

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
 * Full service list shown on /services.
 * The homepage previews the first four (`featuredServiceSlugs`).
 */
export const services: Service[] = [
  {
    slug: "business-websites",
    icon: Globe,
    title: "Business Websites",
    summary:
      "Modern, responsive websites for local businesses, consultants, service providers, and growing companies.",
    description:
      "A clear, fast, professional website that explains what you offer, builds trust with visitors, and makes it easy for them to contact you. Every site is designed around your content and your customers — not a generic template with your logo dropped in.",
    audience:
      "Local businesses, consultants, agencies, and growing companies that need a credible presence online.",
    problem:
      "Potential customers can't find clear information about your business, or your current site looks dated and doesn't work well on phones.",
    deliverables: [
      "Custom-designed responsive pages built around your content",
      "Clear calls to action and contact options",
      "Basic on-page SEO setup (titles, descriptions, headings, sitemap)",
      "Deployment to hosting and handover guidance",
    ],
    quoteInfo: [
      "The pages or sections you need",
      "Your written content, logo, and images (or a plan to create them)",
      "Any special functionality such as forms or booking links",
      "Your preferred timeline",
    ],
  },
  {
    slug: "landing-pages",
    icon: Target,
    title: "Landing Pages",
    summary:
      "Focused, conversion-oriented pages for a product, service, campaign, or launch.",
    description:
      "A single, purposeful page that guides visitors toward one action — contacting you, signing up, or buying. Useful for validating an idea, supporting an ad campaign, or launching a new offer without committing to a full website.",
    audience:
      "Founders, marketers, and businesses running a launch, campaign, or early-stage validation.",
    problem:
      "Traffic is arriving somewhere, but there is no clear, persuasive page turning that attention into action.",
    deliverables: [
      "A single responsive page with a clear conversion goal",
      "Headline, benefit sections, proof areas, and CTA placement",
      "Working contact or signup form",
      "Deployment and analytics setup guidance on request",
    ],
    quoteInfo: [
      "The single action the page should drive",
      "The offer, audience, and key message",
      "Any brand assets or reference designs you like",
      "Your launch date",
    ],
  },
  {
    slug: "full-stack-applications",
    icon: Layers,
    title: "Full-Stack Web Applications",
    summary:
      "Custom web applications with practical workflows, user interfaces, APIs, and data management.",
    description:
      "When a website isn't enough — you need users, dashboards, data, and workflows. I build web applications end to end: the interface people use, the APIs behind them, and the database that keeps everything consistent.",
    audience:
      "Businesses and teams with an internal process, a customer-facing product, or a workflow currently held together by spreadsheets.",
    problem:
      "Your operations depend on manual work, disconnected tools, or spreadsheets that don't scale and can't be shared safely.",
    deliverables: [
      "Designed user interface for the key workflows",
      "Backend APIs and database design",
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
    slug: "saas-mvp",
    icon: Rocket,
    title: "SaaS MVP Development",
    summary:
      "Early-stage product development that helps founders validate an idea with a working first version.",
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
  {
    slug: "ai-applications",
    icon: Bot,
    title: "AI-Powered Applications",
    summary:
      "AI features and integrations designed around a specific, measurable business use case.",
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
    slug: "api-integrations",
    icon: Puzzle,
    title: "API Integrations",
    summary:
      "Connecting the services your business already relies on so data flows without manual work.",
    description:
      "Payment providers, CRMs, email tools, spreadsheets, internal systems — most businesses run on several tools that don't talk to each other. I build and integrate APIs so information moves between them reliably.",
    audience:
      "Teams currently re-typing data between systems or running key processes by hand.",
    problem:
      "Important data is copied between tools manually, which is slow, error-prone, and impossible to audit.",
    deliverables: [
      "Integration design between the chosen systems",
      "API implementation or connection to third-party APIs",
      "Error handling, logging, and retries where appropriate",
      "Testing with real-world scenarios",
    ],
    quoteInfo: [
      "Which systems are involved",
      "What data should move, and how often",
      "Accounts or API access available for the services",
      "What should happen when something fails",
    ],
  },
  {
    slug: "application-improvements",
    icon: Wrench,
    title: "Existing Application Improvements",
    summary:
      "Fixing, extending, and modernizing applications you already have — without starting from zero.",
    description:
      "Not every project needs a rewrite. If an existing application works but is slow, confusing, or missing features, I can stabilize it, add what's missing, and improve the parts that hold your users back.",
    audience:
      "Businesses and founders with an existing product that has outgrown its first version.",
    problem:
      "The application technically works, but bugs, awkward flows, or missing features are costing users, time, or credibility.",
    deliverables: [
      "An audit of the current codebase and user flows",
      "Prioritized list of fixes and improvements",
      "Implementation of agreed changes in stages",
      "Regression checks so existing features keep working",
    ],
    quoteInfo: [
      "Access to the existing repository or hosting",
      "The specific problems users or your team report",
      "Which features must not change",
      "How urgent the work is",
    ],
  },
  {
    slug: "maintenance",
    icon: Shield,
    title: "Maintenance & Technical Support",
    summary:
      "Ongoing care for live websites and applications — updates, fixes, and small improvements.",
    description:
      "Software needs attention after launch: dependency updates, broken links, content changes, small features, and the occasional urgent fix. Maintenance is offered as an explicit, separately agreed arrangement — never assumed.",
    audience:
      "Clients with a live site or application who want a reliable person to call.",
    problem:
      "Small issues pile up unnoticed until they become visible problems, and nobody owns keeping the product healthy.",
    deliverables: [
      "Agreed hours or scope for updates and fixes",
      "Monitoring and dependency updates as agreed",
      "Content or minor feature changes",
      "Priority response for agreed categories of issue",
    ],
    quoteInfo: [
      "The application and its current hosting setup",
      "The types of support you expect",
      "How often updates are needed",
      "Whether urgent response times are required",
    ],
  },
];

/** Slugs of the four services previewed on the homepage. */
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
