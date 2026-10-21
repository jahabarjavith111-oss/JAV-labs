import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "outline" | "light" | "ghost";

const variants: Record<Variant, string> = {
  /* Accent pill, white label — hover fills with ink */
  primary:
    "bg-accent text-white hover:bg-fg shadow-[0_12px_28px_-16px_rgba(255,90,54,0.75)]",
  /* Outlined pill — hover fills with ink */
  outline: "border border-line-2 text-fg hover:bg-fg hover:text-white",
  /* Outlined pill for dark backgrounds — hover fills with white */
  light: "border border-white/35 text-white hover:bg-white hover:text-fg",
  ghost: "text-fg-2 hover:text-fg",
};

const chips: Record<Variant, string> = {
  primary: "bg-white text-accent",
  outline:
    "bg-fg text-white group-hover:bg-accent group-hover:text-white",
  light: "bg-white text-fg group-hover:bg-accent group-hover:text-white",
  ghost: "bg-line text-fg",
};

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

/**
 * Site-wide CTA link — pill shape with an inner circular arrow chip
 * that nudges right on hover.
 */
export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      {...props}
      className={`group inline-flex items-center gap-2.5 rounded-full py-2 pl-6 pr-2 text-sm font-medium transition-colors duration-200 ${variants[variant]} ${className}`}
    >
      {children}
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-200 group-hover:translate-x-0.5 ${chips[variant]}`}
      >
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </span>
    </Link>
  );
}
