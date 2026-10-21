export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

/** Shared development process — used on the homepage and services page. */
export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Understand the problem",
    description:
      "I start with your business problem, your users, and what success looks like — before any technology is chosen.",
  },
  {
    number: "02",
    title: "Define scope and deliverables",
    description:
      "Together we agree on what will be delivered, what is excluded, the milestones, and the timeline.",
  },
  {
    number: "03",
    title: "Design the experience",
    description:
      "Core user journeys and the interface direction are shaped first, so the build has a clear target.",
  },
  {
    number: "04",
    title: "Develop in stages",
    description:
      "The agreed features are implemented in manageable stages, with visible progress along the way.",
  },
  {
    number: "05",
    title: "Test and refine",
    description:
      "Responsiveness, key user flows, forms, accessibility, and error states are checked and polished.",
  },
  {
    number: "06",
    title: "Deploy and hand over",
    description:
      "The final deliverable is deployed, handed over with the required documentation, and any ongoing support is agreed separately.",
  },
];
