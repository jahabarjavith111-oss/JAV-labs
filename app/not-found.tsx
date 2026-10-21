import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center pt-[140px] pb-20">
      <div className="shell text-center">
        <p className="font-display text-7xl font-semibold text-gradient sm:text-8xl">
          404
        </p>
        <h1 className="mt-6 font-display text-2xl font-semibold text-fg sm:text-3xl">
          This page doesn&apos;t exist
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-fg-2">
          The link may be outdated, or the page may have moved. Try one of
          these instead.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent/90"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back home
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 rounded-full border border-line-2 px-6 py-3 text-sm font-medium text-fg transition-colors hover:border-accent/60 hover:bg-accent/10"
          >
            Explore my work
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-line-2 px-6 py-3 text-sm font-medium text-fg transition-colors hover:border-accent/60 hover:bg-accent/10"
          >
            Start a project
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
