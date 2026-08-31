import { cookies, headers } from "next/headers";

import { SESSION_COOKIE, createSessionToken, verifyCredentials } from "@/lib/auth";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (!checkRateLimit(`login:${ip}`, 8, 60_000)) {
    return Response.json(
      { ok: false, error: "Too many attempts — try again in a minute." },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => null);
  const username = typeof body?.username === "string" ? body.username : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!username || !password || !verifyCredentials(username, password)) {
    return Response.json(
      { ok: false, error: "Invalid username or password." },
      { status: 401 }
    );
  }

  const store = await cookies();
  store.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return Response.json({ ok: true });
}
