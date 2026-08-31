import { cookies } from "next/headers";

import { SESSION_COOKIE, isValidSessionToken } from "@/lib/auth";

export async function GET() {
  const store = await cookies();
  const authenticated = isValidSessionToken(store.get(SESSION_COOKIE)?.value);
  return Response.json({ authenticated });
}
