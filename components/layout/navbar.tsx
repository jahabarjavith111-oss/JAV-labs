"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { mainNav } from "@/lib/navigation";
import { siteConfig } from "@/lib/site-config";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  // (State adjustment during render — the recommended pattern,
  // instead of setState inside an effect.)
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Close on Escape.
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-3 md:pt-5">
      <div className="shell">
        {/* Floating pill navigation */}
        <div className="flex items-center justify-between gap-3 rounded-[999px] border border-line/80 bg-[var(--color-base)]/92 px-3 py-2 shadow-[0_14px_36px_-24px_rgba(16,42,67,0.45)] backdrop-blur-xl">
          {/* Brand */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 rounded-full py-1 pl-1 pr-2"
            aria-label={`${siteConfig.name} — home`}
          >
            <span className="flex h-9 w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-[11px] bg-black ring-1 ring-line">
              <Image
                src="/images/logo-mark.png"
                alt=""
                width={62}
                height={29}
                priority
                className="h-auto w-[62px]"
              />
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="font-display text-sm font-semibold tracking-tight text-fg">
                {siteConfig.shortName}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-3">
                Digital Engineering Studio
              </span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Main navigation" className="hidden md:block">
            <ul className="flex items-center gap-0.5">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`rounded-full px-4 py-2 text-[14.5px] transition-colors duration-200 ${
                      isActive(item.href)
                        ? "bg-[var(--color-fg)]/[0.06] font-medium text-fg"
                        : "text-fg-2 hover:text-fg"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {/* Primary CTA — accent pill with inner arrow chip */}
            <Link
              href="/contact"
              className="group hidden items-center gap-2 rounded-full bg-accent py-1.5 pl-5 pr-1.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-fg md:inline-flex"
            >
              Discuss your project
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-accent transition-transform duration-200 group-hover:translate-x-0.5">
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </Link>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-fg transition-colors hover:text-accent-2 md:hidden"
            >
              {open ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile navigation — rounded panel under the pill */}
        {open ? (
          <nav
            id="mobile-menu"
            aria-label="Mobile navigation"
            className="mt-2 rounded-[26px] border border-line bg-[var(--color-base)]/96 p-2 shadow-[0_20px_50px_-30px_rgba(16,42,67,0.5)] backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-0.5">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`block rounded-full px-4 py-3 text-base transition-colors ${
                      isActive(item.href)
                        ? "bg-[var(--color-fg)]/[0.06] font-medium text-fg"
                        : "text-fg-2 hover:bg-[var(--color-fg)]/[0.05] hover:text-fg"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="mt-1.5">
                <Link
                  href="/contact"
                  className="group flex items-center justify-between gap-2 rounded-full bg-accent py-2 pl-5 pr-2 text-sm font-medium text-white transition-colors hover:bg-fg"
                >
                  Discuss your project
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-accent transition-transform duration-200 group-hover:translate-x-0.5">
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
