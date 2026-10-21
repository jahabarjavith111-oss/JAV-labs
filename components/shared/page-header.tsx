import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
};

/** Consistent header for interior pages. */
export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-elevated">
      <div
        className="glow -top-24 right-10 h-64 w-64 bg-accent"
        aria-hidden="true"
      />
      <div className="shell relative py-16 sm:py-20">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent-2">
          {eyebrow}
        </p>
        <h1 className="max-w-3xl font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-2 sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
