/**
 * Best-effort in-memory rate limiting — sliding window per key (usually IP).
 *
 * Runs per serverless instance and resets on cold starts, but it is enough
 * to blunt burst abuse on top of Vercel's platform-level protections.
 * Used by both API routes (chat and contact).
 */

const buckets = new Map<string, number[]>();

/** Returns true (and consumes nothing) when the key exceeded `limit` in `windowMs`. */
export function rateLimit(
  key: string,
  limit: number,
  windowMs = 60_000,
): boolean {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    buckets.set(key, recent);
    return true;
  }
  recent.push(now);
  buckets.set(key, recent);
  // Keep the map small on long-lived instances.
  if (buckets.size > 5000) {
    for (const [k, times] of buckets) {
      if (times.every((t) => now - t >= windowMs)) buckets.delete(k);
    }
  }
  return false;
}

/** Client IP from proxy headers (Vercel sets x-forwarded-for). */
export function clientIp(request: Request): string {
  return (
    request.headers
      .get("x-forwarded-for")
      ?.split(",")[0]
      ?.trim()
      .slice(0, 45) || "unknown"
  );
}
