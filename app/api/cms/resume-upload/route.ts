import { promises as fs } from "fs";
import path from "path";
import { cookies } from "next/headers";

import { SESSION_COOKIE, isValidSessionToken } from "@/lib/auth";
import type { SocialLinksContent } from "@/lib/content-types";

const RESUME_PATH = path.join(process.cwd(), "public", "resume.pdf");
const SOCIAL_LINKS_JSON = path.join(process.cwd(), "content", "social-links.json");

const MAX_FILE_BYTES = 10 * 1024 * 1024;

async function requireAuth(): Promise<boolean> {
  const store = await cookies();
  return isValidSessionToken(store.get(SESSION_COOKIE)?.value);
}

// Writes straight to public/resume.pdf and content/social-links.json on disk
// — same local-authoring model as the rest of the CMS. On Vercel the
// filesystem is read-only at runtime, so uploads made against a live
// deployment won't persist there.
export async function POST(request: Request) {
  if (!(await requireAuth())) {
    return Response.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");

  if (!file || typeof file === "string") {
    return Response.json({ ok: false, error: "No file provided." }, { status: 400 });
  }
  if (file.type !== "application/pdf") {
    return Response.json({ ok: false, error: "Resume must be a PDF." }, { status: 400 });
  }
  if (file.size > MAX_FILE_BYTES) {
    return Response.json({ ok: false, error: "File is too large (max 10MB)." }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(RESUME_PATH, bytes);

  const raw = await fs.readFile(SOCIAL_LINKS_JSON, "utf-8");
  const content = JSON.parse(raw) as SocialLinksContent;
  // Cache-bust so the iframe preview / dock download always pick up the new file.
  content.resumeUrl = `/resume.pdf?v=${Date.now()}`;
  await fs.writeFile(SOCIAL_LINKS_JSON, JSON.stringify(content, null, 2) + "\n", "utf-8");

  return Response.json({ ok: true, data: content });
}
