"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { mainNav } from "@/lib/navigation";
import { siteConfig } from "@/lib/site-config";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  // Solid background once the page is scrolled.
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function isActive(href: string) {
    // Hash links (e.g. /#approach) don't get an active state —
    // they're section anchors, not dedicated routes.
    if (href.includes("#")) return false;
    return pathname.startsWith(href);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-3 md:pt-5">
      <div className="shell">
        {/* Floating pill navigation — solidifies on scroll */}
        <div
          className={`flex items-center justify-between gap-3 rounded-full border px-3 py-2 backdrop-blur-xl transition-all duration-300 ${
            scrolled
              ? "border-line bg-[var(--color-base)]/96 shadow-[0_16px_40px_-28px_rgba(10,13,18,0.45)]"
              : "border-line/60 bg-[var(--color-base)]/80 shadow-none"
          }`}
        >
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
                        ? "bg-fg/[0.06] font-medium text-fg"
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
            {/* Primary CTA — prominent, high-contrast */}
            <Link
              href="/contact"
              className="hidden items-center gap-1.5 rounded-full bg-fg px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent md:inline-flex"
            >
              Discuss a Project
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>

            {/* Mobile menu toggle — compact */}
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

        {/* Mobile navigation — compact panel under the pill */}
        {open ? (
          <nav
            id="mobile-menu"
            aria-label="Mobile navigation"
            className="mt-2 rounded-3xl border border-line bg-[var(--color-base)]/97 p-2 shadow-[0_20px_50px_-30px_rgba(10,13,18,0.5)] backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-0.5">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`block rounded-2xl px-4 py-2.5 text-[15px] transition-colors ${
                      isActive(item.href)
                        ? "bg-fg/[0.06] font-medium text-fg"
                        : "text-fg-2 hover:bg-fg/[0.05] hover:text-fg"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="mt-1.5">
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-1.5 rounded-2xl bg-fg px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent"
                >
                  Discuss a Project
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
