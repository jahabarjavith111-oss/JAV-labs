import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Security proxy — returns 404 for paths that only exploit scanners
 * and bots ever request (.env files, .git internals, CMS paths, PHP
 * scripts). Nothing on this site lives under these paths, so blocking
 * them costs nothing and removes a whole class of probing traffic.
 *
 * A 404 (not 403) is returned on purpose: it makes the site look like it
 * has never heard of the path, revealing nothing about the stack.
 */

const BLOCKED_PATH_PATTERNS = [
  /^\/\.env/i, // .env, .env.local, .env.production…
  /^\/\.git/i, // .git/config, .git/HEAD…
  /^\/vendor\//i, // PHP composer paths (/vendor/phpunit/…)
  /^\/wp-(admin|login|content|includes)/i, // WordPress scanner probes
  /^\/cgi-bin\//i,
  /^\/xmlrpc\.php$/i,
  /\.php$/i, // any PHP script — this is a Next.js site
  /^\/(phpmyadmin|pma|adminer|adminer\.php)/i,
  /^\/(shell|cmd|eval|console)\.php$/i,
  /^\/\.aws\//i,
  /^\/\.ssh\//i,
  /^\/backup(s)?\.(sql|zip|tar|gz|bak)$/i,
  /^\/(config|settings|db)\.(json|yml|yaml|sql|bak)$/i,
  /^\/actuator(\/|$)/i,
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (BLOCKED_PATH_PATTERNS.some((pattern) => pattern.test(pathname))) {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  // Run on every request except Next.js internals and static assets.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};
