"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * Route-change page transition — a subtle fade-and-rise whenever the
 * visitor navigates between routes (remounting children via `key`
 * replays the `.page-enter` animation). First load included; it runs
 * underneath the preloader, so the entry sequence stays seamless.
 * Disabled under `prefers-reduced-motion` in CSS.
 */
export function PageFade({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="page-enter h-full">
      {children}
    </div>
  );
}
