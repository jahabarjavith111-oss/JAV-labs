"use client";

import { useEffect, useState } from "react";

/**
 * Atomic-orbit hero video.
 * Respects prefers-reduced-motion: the static poster frame is shown
 * instead of the animation when the visitor asks for reduced motion.
 */
export function HeroVisual() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Defer the initial sync out of the effect body (no cascading render).
    queueMicrotask(() => setReducedMotion(query.matches));

    function onChange(event: MediaQueryListEvent) {
      setReducedMotion(event.matches);
    }
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <video
      autoPlay={!reducedMotion}
      muted
      loop
      playsInline
      preload="metadata"
      poster="/videos/jav-labs-atomic-orbit-poster.jpg"
      aria-hidden="true"
      className="h-full w-full object-contain object-center"
    >
      <source
        src="/videos/jav-labs-atomic-orbit.mp4"
        type="video/mp4"
      />
    </video>
  );
}
