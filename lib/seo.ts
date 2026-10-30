import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * Full page-level OpenGraph block for a plain (non case-study) page.
 *
 * Next.js shallow-merges metadata per top-level key, so a page that sets
 * `openGraph` replaces the layout's block entirely. This helper rebuilds it
 * with the correct per-page URL (the layout's block points at the homepage,
 * which mis-attributes shared links) while keeping the site-level fields.
 */
export function pageOpenGraph(
  path: string,
  title: string,
  description: string,
): Metadata["openGraph"] {
  return {
    type: "website",
    url: `${siteConfig.siteUrl}${path === "/" ? "" : path}`,
    siteName: siteConfig.name,
    title,
    description,
    locale: "en_US",
    // og:image / twitter:image come from app/opengraph-image.tsx (auto).
  };
}
