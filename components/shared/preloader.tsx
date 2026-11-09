"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "count" | "lift" | "gone";

/**
 * Cinematic intro — Lusion-style counter + curtain lift.
 *
 * Behaviour:
 * - Rendered during SSR so it appears on first paint (no content flash);
 *   if JavaScript never runs, a CSS failsafe animation lifts it anyway
 *   (see `.preloader` in globals.css), so content is never trapped.
 * - Counter runs ~0.8 s, then the curtain lifts (~0.8 s) and the overlay
 *   unmounts. Total ≈ 1.6 s — short enough for repeat visits.
 * - Scrolling is locked only while the overlay is on screen (Lenis stop
 *   + a native overflow guard).
 * - Under `prefers-reduced-motion` it lifts almost immediately.
 */
export function Preloader() {
  const [phase, setPhase] = useState<Phase>("count");
  const [progress, setProgress] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = rootRef.current;

    // Kill the CSS failsafe — JS now owns the lifecycle.
    if (root) root.style.animation = "none";

    // Lock scrolling while the intro is up.
    window.__lenis?.stop();
    document.documentElement.classList.add("intro-lock");

    let interval = 0;
    const timers: number[] = [];

    function finish() {
      setPhase("gone");
      window.__lenis?.start();
      document.documentElement.classList.remove("intro-lock");
    }

    if (reduced) {
      // Almost instant — just avoids a hard flash.
      timers.push(window.setTimeout(finish, 120));
    } else {
      // Irregular count-up, ~800 ms to reach 100.
      interval = window.setInterval(() => {
        setProgress((value) => {
          if (value >= 100) return 100;
          return Math.min(100, value + 3 + Math.random() * 9);
        });
      }, 34);

      timers.push(
        window.setTimeout(() => {
          window.clearInterval(interval);
          setProgress(100);
          setPhase("lift");
        }, 850),
      );
      timers.push(window.setTimeout(finish, 1700));
    }

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      window.clearInterval(interval);
      window.__lenis?.start();
      document.documentElement.classList.remove("intro-lock");
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      ref={rootRef}
      data-phase={phase}
      aria-hidden="true"
      className="preloader fixed inset-0 z-[90] flex flex-col items-center justify-center bg-base"
    >
      {/* Ambient accent glow */}
      <div
        className="glow left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 bg-accent"
        aria-hidden="true"
      />

      {/* Brand */}
      <div className="relative flex flex-col items-center">
        <span className="font-display text-[clamp(64px,12vw,132px)] font-bold leading-none tracking-[-0.05em] text-fg">
          JAV
        </span>
        <span className="label-mono mt-4 text-fg-3">
          Digital Engineering Studio
        </span>

        {/* Progress line under the wordmark */}
        <span className="mt-7 block h-px w-48 overflow-hidden bg-line">
          <span
            className="block h-full origin-left bg-gradient-to-r from-accent to-accent-bright transition-transform duration-150 ease-out"
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </span>
      </div>

      {/* Counter — bottom right */}
      <span className="absolute bottom-7 right-7 font-mono text-sm tabular-nums tracking-[0.2em] text-fg-2 sm:bottom-9 sm:right-10">
        {String(Math.round(progress)).padStart(3, "0")}
      </span>

      {/* Loading label — bottom left */}
      <span className="absolute bottom-7 left-7 label-mono text-fg-3 sm:bottom-9 sm:left-10">
        Loading experience
      </span>
    </div>
  );
}
