/**
 * Pricing configuration.
 * The starting price shown across the site comes from here —
 * change `startingPrice` to update every pricing mention in one place.
 */
export const pricing = {
  /** Numeric starting price in USD. */
  startingPrice: 450,
  currency: "USD",

  eyebrow: "Pricing",
  headline: "Projects start at $450 USD",

  description:
    "Every project is quoted individually. The final price depends on what you ask for — scope, features, integrations, design complexity, timeline, and support requirements. Once I understand your requirements, you receive a clear quote before any work begins.",

  points: [
    "A clear, itemized quote before any work begins",
    "Scope, milestones, and timeline agreed up front",
    "Custom quotes for AI integrations and complex applications",
  ],

  note: "The $450 figure is a starting price for small, clearly scoped projects — not a fixed price for every request.",
} as const;
