import { promises as fs } from "fs";
import path from "path";
import { cookies } from "next/headers";

import { SESSION_COOKIE, isValidSessionToken } from "@/lib/auth";
import { slugify } from "@/lib/slugify";
import type { GalleryContent } from "@/lib/content-types";

const GALLERY_DIR = path.join(process.cwd(), "public", "gallery");
const GALLERY_JSON = path.join(process.cwd(), "content", "gallery.json");

const ALLOWED_EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

const MAX_FILE_BYTES = 8 * 1024 * 1024;

async function requireAuth(): Promise<boolean> {
  const store = await cookies();
  return isValidSessionToken(store.get(SESSION_COOKIE)?.value);
}

async function readGallery(): Promise<GalleryContent> {
  try {
    const raw = await fs.readFile(GALLERY_JSON, "utf-8");
    return JSON.parse(raw) as GalleryContent;
  } catch {
    return { images: [] };
  }
}

async function writeGallery(content: GalleryContent): Promise<void> {
  await fs.writeFile(GALLERY_JSON, JSON.stringify(content, null, 2) + "\n", "utf-8");
}

// Writes straight to public/gallery and content/gallery.json on disk — same
// local-authoring model as the rest of the CMS. On Vercel the filesystem is
// read-only at runtime, so uploads made against a live deployment won't
// persist there.
export async function POST(request: Request) {
  if (!(await requireAuth())) {
    return Response.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  const caption = String(form?.get("caption") ?? "");

  if (!file || typeof file === "string") {
    return Response.json({ ok: false, error: "No file provided." }, { status: 400 });
  }

  const extension = ALLOWED_EXTENSIONS[file.type];
  if (!extension) {
    return Response.json(
      { ok: false, error: "Unsupported image type. Use JPG, PNG, WEBP, or GIF." },
      { status: 400 }
    );
  }
  if (file.size > MAX_FILE_BYTES) {
    return Response.json({ ok: false, error: "Image is too large (max 8MB)." }, { status: 400 });
  }

  const id = `${slugify(caption || file.name.replace(/\.[^.]+$/, ""))}-${Date.now()}`;
  const filename = `${id}.${extension}`;

  await fs.mkdir(GALLERY_DIR, { recursive: true });
  const bytes = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(GALLERY_DIR, filename), bytes);

  const content = await readGallery();
  content.images.push({ id, src: `/gallery/${filename}`, caption });
  await writeGallery(content);

  return Response.json({ ok: true, data: content });
}

export async function DELETE(request: Request) {
  if (!(await requireAuth())) {
    return Response.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return Response.json({ ok: false, error: "Missing id." }, { status: 400 });
  }

  const content = await readGallery();
  const image = content.images.find((img) => img.id === id);
  if (!image) {
    return Response.json({ ok: false, error: "Image not found." }, { status: 404 });
  }

  content.images = content.images.filter((img) => img.id !== id);
  await writeGallery(content);

  const filename = path.basename(image.src);
  await fs.unlink(path.join(GALLERY_DIR, filename)).catch(() => {});

  return Response.json({ ok: true, data: content });
}
