"use client";

import { useEffect, useRef } from "react";

/**
 * Thin accent progress line pinned to the top edge — shows how far
 * through the page the visitor has scrolled. Transform-only updates
 * on rAF, so it never triggers layout.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let ticking = false;

    function update() {
      ticking = false;
      if (!bar) return;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      bar.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[85] h-[2px]"
    >
      <div
        ref={barRef}
        className="h-full origin-left bg-gradient-to-r from-accent via-accent-bright to-accent-2 will-change-transform"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
