import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent/90 shadow-[0_0_0_1px_rgba(139,92,246,0.4),0_8px_30px_-12px_rgba(139,92,246,0.6)]",
  outline:
    "border border-line-2 bg-transparent text-fg hover:border-accent/60 hover:bg-accent/10",
  ghost: "text-fg-2 hover:text-fg",
};

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

/** Site-wide CTA link styled as a button. */
export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200 ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
