"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

export type TextPart = {
  text: string;
  /** Extra classes for this run of words (accent colour, serif, …). */
  className?: string;
  /** Force this part onto its own line. */
  breakBefore?: boolean;
};

type RevealTextProps = {
  /** Plain heading string — split into word masks automatically. */
  text?: string;
  /** Rich heading — array of styled parts. */
  parts?: TextPart[];
  /** Extra classes on the wrapper span. */
  className?: string;
  /** Animate on page load (CSS-only, runs from first paint) instead of on scroll. */
  immediate?: boolean;
  /** Per-word stagger in ms. */
  stagger?: number;
  /** Base delay for `immediate` mode — sequenced with the preloader lift. */
  baseDelay?: number;
};

/**
 * Word-mask headline reveal — the Lusion-style editorial animation.
 *
 * - **Immediate mode (hero):** pure CSS animation that starts on first
 *   paint with a delay that lands as the preloader curtain lifts. Needs
 *   no JavaScript, so the headline still appears if JS ever fails.
 * - **Scroll mode (section headings):** words sit in their normal,
 *   visible position until JS arms them (only when off-screen, so there
 *   is never a visible flash), then an IntersectionObserver plays the
 *   staggered rise when they cross into view.
 * - Text content stays intact for screen readers and search engines;
 *   `prefers-reduced-motion` renders everything statically.
 */
export function RevealText({
  text,
  parts,
  className = "",
  immediate = false,
  stagger = 55,
  baseDelay = 460,
}: RevealTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(false);

  const srcParts: TextPart[] = parts ?? (text ? [{ text }] : []);

  // Flatten parts into words, tracking line-break boundaries.
  const words: { w: string; cls?: string; brk: boolean }[] = [];
  for (const part of srcParts) {
    const pieces = part.text.split(/\s+/).filter(Boolean);
    pieces.forEach((w, i) => {
      words.push({
        w,
        cls: part.className,
        brk: Boolean(part.breakBefore) && i === 0 && words.length > 0,
      });
    });
  }

  // Scroll mode only: arm off-screen headings, observe until revealed.
  useEffect(() => {
    if (immediate) return;
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") return;

    const rect = el.getBoundingClientRect();
    const inViewNow = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;

    if (inViewNow) {
      // Already visible at hydration — leave it static (no flash, no re-anim).
      return;
    }

    setArmed(true);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [immediate]);

  const state =
    immediate || visible ? "visible" : armed ? "armed" : "static";

  return (
    <span
      ref={ref}
      data-reveal={state}
      data-immediate={immediate || undefined}
      className={`rw ${className}`}
    >
      {words.map((item, i) => (
        <Fragment key={`${i}-${item.w}`}>
          {item.brk ? <br /> : i > 0 ? " " : null}
          <span
            className={`rw-mask${item.cls ? ` ${item.cls}` : ""}`}
          >
            <span
              className="rw-word"
              style={{
                transitionDelay: `${i * stagger}ms`,
                animationDelay: `${baseDelay + i * stagger}ms`,
              }}
            >
              {item.w}
            </span>
          </span>
        </Fragment>
      ))}
    </span>
  );
}

/** Convenience wrapper for headings that may be plain text or rich nodes. */
export function revealTitle(title: ReactNode, props?: Partial<RevealTextProps>) {
  if (typeof title === "string") {
    return <RevealText text={title} {...props} />;
  }
  return title;
}
