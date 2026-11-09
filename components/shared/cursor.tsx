"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Trailing ring cursor (desktop only) — a Lusion-style pointer trail.
 *
 * The native cursor stays visible (forms and accessibility), while an
 * accent ring eases after the pointer and grows over interactive
 * elements. Targets can opt into a text label via `data-cursor="View"`.
 *
 * Fully disabled on coarse/touch pointers, hover-less devices, and
 * `prefers-reduced-motion`; the ring never intercepts input
 * (`pointer-events-none`).
 */
export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  // Capability gates — re-checked live, they can change mid-session.
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const hover = window.matchMedia("(hover: hover)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    function sync() {
      setEnabled(fine.matches && hover.matches && !reduced.matches);
    }
    sync();
    fine.addEventListener("change", sync);
    hover.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      hover.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  // Tracking loop — runs only while enabled.
  useEffect(() => {
    if (!enabled) return;
    const ring = ringRef.current;
    if (!ring) return;

    let targetX = -100;
    let targetY = -100;
    let x = -100;
    let y = -100;
    let shown = false;
    let active = false;
    let frame = 0;

    function onMove(event: PointerEvent) {
      if (!ring) return;
      targetX = event.clientX;
      targetY = event.clientY;

      if (!shown) {
        shown = true;
        ring.dataset.visible = "true";
      }

      const el = event.target;
      const target =
        el instanceof Element
          ? el.closest('a, button, [role="button"], [data-cursor]')
          : null;
      const nextActive = !!target;

      if (nextActive !== active) {
        active = nextActive;
        ring.dataset.active = active ? "true" : "false";
      }

      const label =
        target instanceof HTMLElement ? target.dataset.cursor ?? "" : "";
      if (labelRef.current && labelRef.current.textContent !== label) {
        labelRef.current.textContent = label;
        labelRef.current.style.opacity = label ? "1" : "0";
      }
    }

    function loop() {
      if (!ring) return;
      // Fast ease-out — snappy but weighty.
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;
      ring.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(loop);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[65] flex h-7 w-7 items-center justify-center rounded-full border border-accent-bright/70 opacity-0 transition-[width,height,background-color,border-color,opacity] duration-300 ease-out data-[active=true]:h-14 data-[active=true]:w-14 data-[active=true]:border-accent-bright/40 data-[active=true]:bg-accent-bright/10 data-[visible=true]:opacity-100 motion-reduce:transition-none"
    >
      <span
        ref={labelRef}
        className="font-mono text-[9px] font-medium uppercase tracking-[0.18em] text-fg"
        style={{ opacity: 0 }}
      />
    </div>
  );
}
