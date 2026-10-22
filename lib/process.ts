import { ClipboardCheck, Handshake, MessagesSquare } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
  /** The concrete milestone reached at the end of this stage. */
  deliverable: string;
};

/**
 * Six-stage development process — used on the homepage and services page.
 * Written for overseas clients: every stage names its deliverable so
 * progress is visible and milestones are unambiguous.
 */
export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We start with your business problem, your users, and what success looks like — before any technology is chosen. Existing material, constraints, and priorities are collected early.",
    deliverable: "A written summary of goals, users, and scope boundaries",
  },
  {
    number: "02",
    title: "Planning",
    description:
      "Together we agree on what will be delivered, what is excluded, the milestones, and the timeline. You receive a clear quote before any build work begins.",
    deliverable: "A fixed scope, milestone plan, and quotation you approve",
  },
  {
    number: "03",
    title: "Design",
    description:
      "Core user journeys and the interface direction are shaped first, so the build has an agreed visual and functional target — reviewed with you before development starts.",
    deliverable: "Reviewable screen designs for the key flows",
  },
  {
    number: "04",
    title: "Development",
    description:
      "The agreed features are implemented in stages, with regular progress updates you can see and test. Scope changes are handled explicitly, never silently.",
    deliverable: "Working increments demonstrated at each milestone",
  },
  {
    number: "05",
    title: "Testing",
    description:
      "The product is checked against the agreed scope: functionality, responsiveness across devices, and edge cases — with fixes confirmed before launch.",
    deliverable: "A tested build with a completed verification checklist",
  },
  {
    number: "06",
    title: "Deployment",
    description:
      "The product goes live on your hosting and domain, with access transferred to you. You receive the handover material needed to operate and extend it.",
    deliverable: "A live product with full access and handover documentation",
  },
];

export type ProcessPromise = {
  icon: LucideIcon;
  title: string;
  text: string;
};

/** What overseas clients can expect across every engagement. */
export const processPromises: ProcessPromise[] = [
  {
    icon: MessagesSquare,
    title: "Communication",
    text: "Progress updates at agreed checkpoints, in writing, with responses within one business day. Calls are scheduled around your timezone when live discussion is needed.",
  },
  {
    icon: ClipboardCheck,
    title: "Milestones",
    text: "Every stage ends with a named deliverable you can review — nothing moves to the next stage until the current one is accepted.",
  },
  {
    icon: Handshake,
    title: "Handover",
    text: "You own what you pay for: source code, deployment access, and documentation are transferred at the end — no lock-in and no hidden dependencies.",
  },
];
