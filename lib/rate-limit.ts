import "server-only";

const attempts = new Map<string, number[]>();

/**
 * Simple in-memory sliding-window limiter. Per-instance only (resets on
 * cold start, not shared across serverless instances) — a speed bump
 * against casual brute-forcing, not a hard guarantee.
 */
export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (attempts.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    attempts.set(key, recent);
    return false;
  }
  recent.push(now);
  attempts.set(key, recent);
  return true;
}
