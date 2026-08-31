import { promises as fs } from "fs";
import path from "path";
import { cookies } from "next/headers";

import { SESSION_COOKIE, isValidSessionToken } from "@/lib/auth";

const ALLOWED_TYPES = new Set([
  "experience",
  "education",
  "skills",
  "social-links",
  "projects",
  "research-papers",
  "authored-book",
  "music",
  "gallery",
  "icons",
]);

async function requireAuth(): Promise<boolean> {
  const store = await cookies();
  return isValidSessionToken(store.get(SESSION_COOKIE)?.value);
}

function contentFilePath(type: string): string {
  return path.join(process.cwd(), "content", `${type}.json`);
}

export async function GET(
  _request: Request,
  ctx: { params: Promise<{ type: string }> }
) {
  const { type } = await ctx.params;

  if (!ALLOWED_TYPES.has(type)) {
    return Response.json({ ok: false, error: "Unknown content type." }, { status: 404 });
  }
  if (!(await requireAuth())) {
    return Response.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  try {
    const raw = await fs.readFile(contentFilePath(type), "utf-8");
    return Response.json({ ok: true, data: JSON.parse(raw) });
  } catch {
    return Response.json(
      { ok: false, error: `Couldn't read content/${type}.json.` },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  ctx: { params: Promise<{ type: string }> }
) {
  const { type } = await ctx.params;

  if (!ALLOWED_TYPES.has(type)) {
    return Response.json({ ok: false, error: "Unknown content type." }, { status: 404 });
  }
  if (!(await requireAuth())) {
    return Response.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ ok: false, error: "Invalid payload." }, { status: 400 });
  }

  // This writes straight to the file on disk. It's built for local content
  // authoring (`npm run dev`, then commit + deploy) — on Vercel the
  // filesystem is read-only at runtime, so edits made against a live
  // deployment won't persist there.
  try {
    await fs.writeFile(
      contentFilePath(type),
      JSON.stringify(body, null, 2) + "\n",
      "utf-8"
    );
    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { ok: false, error: `Couldn't write content/${type}.json.` },
      { status: 500 }
    );
  }
}
