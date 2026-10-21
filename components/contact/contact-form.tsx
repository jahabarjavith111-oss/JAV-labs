"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Check, CircleAlert, Loader2 } from "lucide-react";
import {
  budgetOptions,
  buildMailtoLink,
  projectTypes,
  timelines,
  validateContactForm,
  type ContactFormData,
  type FieldErrors,
} from "@/lib/validation";

type Status = "idle" | "submitting" | "success" | "error" | "unconfigured";

const emptyForm: ContactFormData = {
  name: "",
  email: "",
  company: "",
  country: "",
  projectType: "",
  budget: "",
  timeline: "",
  message: "",
  reference: "",
  website: "",
};

const inputClass =
  "w-full rounded-lg border border-line bg-elevated px-4 py-3 text-sm text-fg placeholder:text-fg-3 transition-colors focus:border-accent/60 focus:outline-none";

const labelClass = "mb-2 block text-sm font-medium text-fg-2";

function errorClass(hasError: boolean) {
  return hasError ? "border-red-500/60" : "";
}

export function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(emptyForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [showAllErrors, setShowAllErrors] = useState(false);

  function update<K extends keyof ContactFormData>(
    key: K,
    value: ContactFormData[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
    if (errors[key]) {
      setErrors((current) => ({ ...current, [key]: undefined }));
    }
    // Dismiss stale provider/error banners once editing resumes.
    if (status === "error" || status === "unconfigured") {
      setStatus("idle");
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found = validateContactForm(form);
    setErrors(found);
    setShowAllErrors(true);

    if (Object.keys(found).length > 0) {
      const firstField = Object.keys(found)[0];
      document
        .getElementById(firstField)
        ?.focus({ preventScroll: false });
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = (await response.json()) as {
        ok: boolean;
        configured?: boolean;
        errors?: FieldErrors;
      };

      if (result.ok) {
        setStatus("success");
        setForm(emptyForm);
        setShowAllErrors(false);
        return;
      }

      if (result.configured === false) {
        setStatus("unconfigured");
        return;
      }

      if (result.errors) {
        setErrors(result.errors);
        setStatus("idle");
        return;
      }

      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  /* ---------------- Success state ---------------- */
  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="card flex flex-col items-start gap-4 p-8"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/15 text-accent-2">
          <Check className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-display text-xl font-semibold text-fg">
            Message sent
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-fg-2">
            Thanks for reaching out. Your inquiry has been delivered — I will
            review the details and reply to the email address you provided.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-sm font-medium text-accent-2 transition-colors hover:text-fg"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card p-6 sm:p-8">
      {/* Honeypot — hidden from humans, tempting for bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(event) => update("website", event.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Name */}
        <div className="sm:col-span-1">
          <label htmlFor="name" className={labelClass}>
            Full name <span className="text-accent-2">*</span>
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Jane Cooper"
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`${inputClass} ${errorClass(Boolean(errors.name))}`}
          />
          {errors.name ? (
            <p id="name-error" className="mt-1.5 text-xs text-red-600">
              {errors.name}
            </p>
          ) : null}
        </div>

        {/* Email */}
        <div className="sm:col-span-1">
          <label htmlFor="email" className={labelClass}>
            Business email <span className="text-accent-2">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`${inputClass} ${errorClass(Boolean(errors.email))}`}
          />
          {errors.email ? (
            <p id="email-error" className="mt-1.5 text-xs text-red-600">
              {errors.email}
            </p>
          ) : null}
        </div>

        {/* Company / Country */}
        <div className="sm:col-span-1">
          <label htmlFor="company" className={labelClass}>
            Company or project name{" "}
            <span className="text-fg-3">(optional)</span>
          </label>
          <input
            id="company"
            type="text"
            autoComplete="organization"
            placeholder="Acme Inc."
            value={form.company}
            onChange={(event) => update("company", event.target.value)}
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="country" className={labelClass}>
            Country <span className="text-fg-3">(optional)</span>
          </label>
          <input
            id="country"
            type="text"
            autoComplete="country-name"
            placeholder="United States"
            value={form.country}
            onChange={(event) => update("country", event.target.value)}
            className={inputClass}
          />
        </div>

        {/* Project type */}
        <div>
          <label htmlFor="projectType" className={labelClass}>
            Project type <span className="text-accent-2">*</span>
          </label>
          <select
            id="projectType"
            value={form.projectType}
            onChange={(event) => update("projectType", event.target.value)}
            aria-invalid={Boolean(errors.projectType)}
            aria-describedby={
              errors.projectType ? "projectType-error" : undefined
            }
            className={`${inputClass} ${errorClass(Boolean(errors.projectType))}`}
          >
            <option value="">Select a project type</option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.projectType ? (
            <p id="projectType-error" className="mt-1.5 text-xs text-red-600">
              {errors.projectType}
            </p>
          ) : null}
        </div>

        {/* Budget / project size */}
        <div>
          <label htmlFor="budget" className={labelClass}>
            Project size &amp; budget <span className="text-accent-2">*</span>
          </label>
          <select
            id="budget"
            value={form.budget}
            onChange={(event) => update("budget", event.target.value)}
            aria-invalid={Boolean(errors.budget)}
            aria-describedby={
              errors.budget ? "budget-error" : "budget-help"
            }
            className={`${inputClass} ${errorClass(Boolean(errors.budget))}`}
          >
            <option value="">Select an option</option>
            {budgetOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.budget ? (
            <p id="budget-error" className="mt-1.5 text-xs text-red-600">
              {errors.budget}
            </p>
          ) : (
            <p id="budget-help" className="mt-1.5 text-xs text-fg-3">
              Projects start at $450 USD — every project is quoted
              individually, and the final cost differs with scope.
            </p>
          )}
        </div>

        {/* Timeline */}
        <div className="sm:col-span-2">
          <label htmlFor="timeline" className={labelClass}>
            Desired timeline <span className="text-accent-2">*</span>
          </label>
          <select
            id="timeline"
            value={form.timeline}
            onChange={(event) => update("timeline", event.target.value)}
            aria-invalid={Boolean(errors.timeline)}
            aria-describedby={errors.timeline ? "timeline-error" : undefined}
            className={`${inputClass} ${errorClass(Boolean(errors.timeline))}`}
          >
            <option value="">Select a timeline</option>
            {timelines.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
          {errors.timeline ? (
            <p id="timeline-error" className="mt-1.5 text-xs text-red-600">
              {errors.timeline}
            </p>
          ) : null}
        </div>

        {/* Message */}
        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelClass}>
            Project description <span className="text-accent-2">*</span>
          </label>
          <textarea
            id="message"
            rows={6}
            placeholder="What are you trying to build, what problem does it solve, and what does success look like?"
            value={form.message}
            onChange={(event) => update("message", event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={`${inputClass} resize-y ${errorClass(Boolean(errors.message))}`}
          />
          {errors.message ? (
            <p id="message-error" className="mt-1.5 text-xs text-red-600">
              {errors.message}
            </p>
          ) : null}
        </div>

        {/* Reference URL */}
        <div className="sm:col-span-2">
          <label htmlFor="reference" className={labelClass}>
            Project reference URL{" "}
            <span className="text-fg-3">(optional)</span>
          </label>
          <input
            id="reference"
            type="url"
            placeholder="https://example.com"
            value={form.reference}
            onChange={(event) => update("reference", event.target.value)}
            aria-invalid={Boolean(errors.reference)}
            aria-describedby={errors.reference ? "reference-error" : undefined}
            className={`${inputClass} ${errorClass(Boolean(errors.reference))}`}
          />
          {errors.reference ? (
            <p id="reference-error" className="mt-1.5 text-xs text-red-600">
              {errors.reference}
            </p>
          ) : null}
        </div>
      </div>

      {/* Unconfigured / error states */}
      {status === "unconfigured" ? (
        <div
          role="alert"
          className="mt-6 rounded-lg border border-amber-500/40 bg-amber-500/10 p-4"
        >
          <p className="text-sm font-medium text-amber-900">
            The form isn&apos;t connected yet — your message has{" "}
            <strong>not</strong> been sent.
          </p>
          <p className="mt-1.5 text-sm text-amber-800">
            Please email directly instead, or configure{" "}
            <code className="rounded bg-amber-500/15 px-1">
              SMTP_PASS
            </code>{" "}
            (see the README).
          </p>
          <a
            href={buildMailtoLink(form)}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-fg underline decoration-amber-600 underline-offset-4 hover:text-accent-2"
          >
            Open my message in your email app
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      ) : null}

      {status === "error" ? (
        <div
          role="alert"
          className="mt-6 flex items-start gap-3 rounded-lg border border-red-500/40 bg-red-500/10 p-4"
        >
          <CircleAlert
            className="mt-0.5 h-4 w-4 shrink-0 text-red-600"
            aria-hidden="true"
          />
          <div>
            <p className="text-sm font-medium text-red-700">
              Something went wrong and your message was not delivered.
            </p>
            <a
              href={buildMailtoLink(form)}
              className="mt-2 inline-block text-sm text-fg underline decoration-red-500 underline-offset-4 hover:text-accent-2"
            >
              Try emailing directly instead
            </a>
          </div>
        </div>
      ) : null}

      {showAllErrors && Object.keys(errors).length > 0 && status === "idle" ? (
        <p role="alert" className="mt-5 text-sm text-red-600">
          Please fix the highlighted fields above.
        </p>
      ) : null}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-accent py-2 pl-6 pr-2 text-sm font-medium text-white transition-colors hover:bg-fg disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Send project inquiry
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-accent transition-transform duration-200 group-hover:translate-x-0.5">
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </>
          )}
        </button>

        <p className="text-xs leading-relaxed text-fg-3">
          Your details are used only to respond to your inquiry.{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-2 hover:text-fg-2"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </form>
  );
}
