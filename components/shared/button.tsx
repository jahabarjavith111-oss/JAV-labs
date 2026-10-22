import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "outline" | "light" | "ghost";

/**
 * Minimal, high-contrast, consistent across the site:
 * solid ink primary · hairline outline secondary ·
 * solid white on dark surfaces · bare text ghost.
 */
const variants: Record<Variant, string> = {
  primary: "bg-fg text-white hover:bg-accent",
  outline: "border border-line-2 text-fg hover:border-fg hover:bg-fg hover:text-white",
  light: "bg-white text-fg hover:bg-accent hover:text-white",
  ghost: "text-fg-2 underline-offset-4 hover:text-fg hover:underline",
};

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

/** Site-wide CTA link — rectangular, generous padding, small arrow. */
export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      {...props}
      className={`group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold tracking-tight transition-colors duration-200 ${variants[variant]} ${className}`}
    >
      {children}
      <ArrowRight
        className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </Link>
  );
}
