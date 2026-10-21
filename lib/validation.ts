/**
 * Shared validation for the project inquiry form.
 * Used on the client (instant feedback) and the server (defense in depth).
 */

import { siteConfig } from "@/lib/site-config";

export const projectTypes = [
  "Business website",
  "Landing page",
  "Full-stack application",
  "AI-powered application",
  "SaaS MVP",
  "Existing application improvement",
  "Other",
] as const;

/**
 * Budget options — project-size based, no fixed price ranges.
 * Pricing starts at $450 USD and is quoted per project.
 */
export const budgetOptions = [
  "Small professional website (from $450 USD)",
  "Business website / landing page",
  "Web application",
  "SaaS MVP / startup product",
  "AI-powered product",
  "Not sure yet",
] as const;

export type ContactFormData = {
  name: string;
  email: string;
  company: string;
  /** Optional — collected for the notification email. */
  country: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  reference: string;
  /** Honeypot — must stay empty. */
  website: string;
};

export type FieldErrors = Partial<Record<keyof ContactFormData, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const URL_RE = /^https?:\/\/[^\s]+\.[^\s]+$/;

export function validateContactForm(data: ContactFormData): FieldErrors {
  const errors: FieldErrors = {};

  if (!data.name.trim()) {
    errors.name = "Please enter your name.";
  } else if (data.name.trim().length < 2) {
    errors.name = "Your name looks too short.";
  }

  if (!data.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_RE.test(data.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!data.projectType) {
    errors.projectType = "Please choose a project type.";
  }

  if (!data.budget) {
    errors.budget = "Please choose an option.";
  }

  if (!data.timeline.trim()) {
    errors.timeline = "Please enter your desired timeline.";
  } else if (data.timeline.trim().length > 120) {
    errors.timeline = "That timeline looks too long — keep it under 120 characters.";
  }

  if (!data.message.trim()) {
    errors.message = "Please describe your project.";
  } else if (data.message.trim().length < 20) {
    errors.message = "Please add a little more detail (at least 20 characters).";
  }

  if (data.reference.trim() && !URL_RE.test(data.reference.trim())) {
    errors.reference = "Please enter a full URL starting with https://";
  }

  return errors;
}

/** Build a prefilled mailto: link — the honest fallback when no form provider is configured. */
export function buildMailtoLink(data: ContactFormData): string {
  const subject = encodeURIComponent(
    `Project inquiry — ${data.projectType || "New project"}`,
  );
  const to = siteConfig.email;
  const body = encodeURIComponent(
    [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      data.company ? `Company / project: ${data.company}` : null,
      data.country ? `Country: ${data.country}` : null,
      `Project type: ${data.projectType}`,
      `Budget: ${data.budget}`,
      `Timeline: ${data.timeline}`,
      data.reference ? `Reference: ${data.reference}` : null,
      "",
      data.message,
    ]
      .filter(Boolean)
      .join("\n"),
  );
  return `mailto:${to}?subject=${subject}&body=${body}`;
}
