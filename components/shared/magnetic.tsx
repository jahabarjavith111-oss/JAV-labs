"use client";

import { useEffect, useRef, type ReactNode } from "react";

type MagneticProps = {
  children: ReactNode;
  /** How strongly the element leans toward the pointer (0–1). */
  strength?: number;
  /** Extra radius around the element that still attracts it. */
  radius?: number;
  className?: string;
};

/**
 * Magnetic hover — the element eases toward the pointer when it comes
 * close, and springs back when it leaves (the classic premium-CTA feel).
 *
 * Desktop-only: requires a fine pointer and hover support, and is fully
 * disabled under `prefers-reduced-motion`. The rAF loop runs only while
 * there is movement to settle, then stops — zero idle cost.
 */
export function Magnetic({
  children,
  strength = 0.3,
  radius = 56,
  className = "",
}: MagneticProps) {
  const wrapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const fine = window.matchMedia("(pointer: fine)");
    const hover = window.matchMedia("(hover: hover)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let raf = 0;
    let running = false;
    let lastX = 0;
    let lastY = 0;
    let cx = 0;
    let cy = 0;
    let tx = 0;
    let ty = 0;
    let vx = 0;
    let vy = 0;

    function loop() {
      if (!el) return;
      // Ease current offset toward the target.
      vx += (tx - vx) * 0.16;
      vy += (ty - vy) * 0.16;

      if (Math.abs(vx) < 0.05 && Math.abs(vy) < 0.05 && tx === 0 && ty === 0) {
        vx = 0;
        vy = 0;
        el.style.transform = "";
        running = false;
        return;
      }

      el.style.transform = `translate3d(${vx.toFixed(2)}px, ${vy.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(loop);
    }

    function ensureRunning() {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    }

    function onMove(event: PointerEvent) {
      if (!el) return;
      // Live gates — accessibility prefs can flip while the page is open.
      if (!fine.matches || !hover.matches || reduced.matches) {
        tx = 0;
        ty = 0;
        return;
      }

      const rect = el.getBoundingClientRect();
      cx = rect.left + rect.width / 2;
      cy = rect.top + rect.height / 2;
      lastX = event.clientX;
      lastY = event.clientY;

      const dx = lastX - cx;
      const dy = lastY - cy;
      const reach = Math.max(rect.width, rect.height) / 2 + radius;

      if (Math.abs(dx) < reach && Math.abs(dy) < reach) {
        tx = dx * strength;
        ty = dy * strength;
      } else {
        tx = 0;
        ty = 0;
      }
      ensureRunning();
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      if (el) el.style.transform = "";
    };
  }, [strength, radius]);

  return (
    <span
      ref={wrapRef}
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </span>
  );
}
