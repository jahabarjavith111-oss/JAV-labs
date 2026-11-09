"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "@/lib/motion";

/**
 * Inertia smooth scrolling — the Lusion-style feel.
 *
 * Uses Lenis (≈5 KB) rather than a hand-rolled scroller: it handles
 * wheel/touch input, anchor links, and — importantly — honours
 * `prefers-reduced-motion` natively (smoothing is disabled and programmatic
 * scrolls become instant, while scroll-position sync keeps working).
 *
 * Anchor links land 104px above their target so content clears the
 * fixed pill navigation (matches `scroll-padding-top: 6.5rem`).
 */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      // Handle same-page anchors (/#approach). Lenis respects the page's
      // scroll-padding-top, so targets land below the fixed pill nav.
      anchors: true,
    });

    window.__lenis = lenis;

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}
