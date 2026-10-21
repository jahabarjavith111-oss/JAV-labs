import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
};

/** Consistent header for interior pages. Clears the fixed pill navigation. */
export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-elevated">
      <div
        className="glow -top-24 right-10 h-64 w-64 bg-accent"
        aria-hidden="true"
      />
      <div className="shell relative pt-[124px] pb-16 sm:pt-[148px] sm:pb-20">
        <p className="label-mono mb-4 text-accent-2">{eyebrow}</p>
        <h1 className="max-w-3xl font-display text-[clamp(34px,4.6vw,56px)] font-bold leading-[1.06] tracking-[-0.03em] text-balance text-fg">
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
