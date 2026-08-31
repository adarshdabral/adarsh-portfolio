import "server-only";
import { createHmac, timingSafeEqual } from "crypto";

export const SESSION_COOKIE = "ashos_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "SESSION_SECRET is not configured. Set it in your environment to use the Admin CMS."
    );
  }
  return secret;
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

/** A signed `<expiryTimestamp>.<hmac>` token — no server-side session store needed. */
export function createSessionToken(): string {
  const expires = String(Date.now() + SESSION_TTL_MS);
  return `${expires}.${sign(expires)}`;
}

export function isValidSessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;

  const expectedSig = sign(payload);
  const sigBuf = Buffer.from(sig);
  const expectedBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expectedBuf.length) return false;
  if (!timingSafeEqual(sigBuf, expectedBuf)) return false;

  const expires = Number(payload);
  return Number.isFinite(expires) && Date.now() < expires;
}

function timingSafeEqualStrings(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) {
    // Compare against itself so the branch still takes comparable time.
    timingSafeEqual(aBuf, aBuf);
    return false;
  }
  return timingSafeEqual(aBuf, bBuf);
}

export function verifyCredentials(username: string, password: string): boolean {
  const expectedUser = process.env.CMS_USERNAME;
  const expectedPass = process.env.CMS_PASSWORD;
  if (!expectedUser || !expectedPass) return false;
  const userOk = timingSafeEqualStrings(username, expectedUser);
  const passOk = timingSafeEqualStrings(password, expectedPass);
  return userOk && passOk;
}
