"use client";

import { useRef, useState } from "react";
import { Trash2, Save, Upload } from "lucide-react";

import { useCmsContent } from "@/lib/use-cms-content";
import type { GalleryContent } from "@/lib/content-types";
import { inputClass, cardClass, primaryButtonClass } from "./shared";

export default function GalleryEditor() {
  const { state, updateLocal, save, saveStatus, saveError } =
    useCmsContent<GalleryContent>("gallery");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [captionDraft, setCaptionDraft] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (state.status === "error") {
    return <div className="p-5 text-xs text-red-500">{state.error}</div>;
  }
  if (state.status === "loading") {
    return (
      <div className="flex h-full items-center justify-center text-xs text-neutral-400">
        Loading...
      </div>
    );
  }

  const content = state.data;

  function updateCaption(index: number, caption: string) {
    updateLocal((prev) => ({
      ...prev,
      images: prev.images.map((img, i) => (i === index ? { ...img, caption } : img)),
    }));
  }

  async function handleUpload(file: File) {
    setUploading(true);
    setUploadError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("caption", captionDraft);
      const res = await fetch("/api/cms/gallery-upload", { method: "POST", body: form });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Upload failed.");
      updateLocal(() => json.data as GalleryContent);
      setCaptionDraft("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/cms/gallery-upload?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Delete failed.");
      updateLocal(() => json.data as GalleryContent);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Delete failed.");
    }
  }

  function handleSave() {
    save(content);
  }

  return (
    <div className="h-full overflow-auto p-4">
      <div className={cardClass}>
        <label className="mb-1 block text-xs font-medium text-neutral-500">
          Caption for next upload (optional)
        </label>
        <input
          value={captionDraft}
          onChange={(e) => setCaptionDraft(e.target.value)}
          placeholder="A caption..."
          className={inputClass}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUpload(file);
          }}
          className="mt-2 block text-xs text-neutral-500"
          disabled={uploading}
        />
        <p className="mt-1.5 flex items-center gap-1 text-xs text-neutral-400">
          <Upload className="h-3.5 w-3.5" />
          {uploading ? "Uploading..." : "JPG, PNG, WEBP, or GIF — max 8MB."}
        </p>
        {uploadError && <p className="mt-1 text-xs text-red-500">{uploadError}</p>}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        {content.images.map((image, i) => (
          <div key={image.id} className={cardClass}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.src}
              alt={image.caption || "Gallery image"}
              className="mb-2 h-28 w-full rounded-md object-cover"
            />
            <input
              value={image.caption}
              onChange={(e) => updateCaption(i, e.target.value)}
              placeholder="Caption"
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => handleDelete(image.id)}
              className="mt-2 flex items-center gap-1 text-xs text-red-500 hover:underline"
            >
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={saveStatus === "saving"}
          className={primaryButtonClass}
        >
          <Save className="h-3.5 w-3.5" />
          {saveStatus === "saving" ? "Saving captions..." : "Save captions"}
        </button>
        {saveStatus === "saved" && (
          <span className="text-xs text-emerald-600">Saved</span>
        )}
        {saveStatus === "error" && (
          <span className="text-xs text-red-500">{saveError}</span>
        )}
      </div>
      <p className="mt-4 text-xs text-neutral-400">
        Uploads and deletes save instantly. Use &quot;Save captions&quot; after
        editing caption text above.
      </p>
    </div>
  );
}
