import type { ReactNode } from "react";
import { RevealText } from "@/components/shared/reveal-text";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

/**
 * Consistent eyebrow + heading + optional description for page sections.
 * Plain-string titles get the word-mask scroll reveal automatically;
 * rich titles (JSX) render as-is.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={`max-w-2xl ${centered ? "mx-auto text-center" : ""} ${className}`}
    >
      {eyebrow ? (
        <p className="label-mono mb-3.5 text-accent-2">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-[clamp(30px,4.2vw,48px)] font-bold leading-[1.06] tracking-[-0.03em] text-balance text-fg">
        {typeof title === "string" ? <RevealText text={title} /> : title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-fg-2 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
