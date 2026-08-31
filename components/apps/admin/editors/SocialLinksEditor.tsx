"use client";

import { useRef, useState } from "react";
import { Plus, Trash2, Save, Upload, FileText } from "lucide-react";

import { useCmsContent } from "@/lib/use-cms-content";
import { slugify } from "@/lib/slugify";
import { SOCIAL_ICONS } from "@/lib/social-icons";
import type { SocialLinksContent, SocialLink } from "@/lib/content-types";
import { inputClass, cardClass, primaryButtonClass, secondaryButtonClass } from "./shared";

const ICON_OPTIONS: SocialLink["icon"][] = [
  "github",
  "linkedin",
  "twitter",
  "instagram",
  "youtube",
  "leetcode",
  "book",
  "journal",
];

export default function SocialLinksEditor() {
  const { state, updateLocal, save, saveStatus, saveError } =
    useCmsContent<SocialLinksContent>("social-links");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleResumeUpload(file: File) {
    setUploading(true);
    setUploadError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/cms/resume-upload", { method: "POST", body: form });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Upload failed.");
      updateLocal(() => json.data as SocialLinksContent);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

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

  function updateLink(index: number, patch: Partial<SocialLink>) {
    updateLocal((prev) => ({
      ...prev,
      links: prev.links.map((l, i) => (i === index ? { ...l, ...patch } : l)),
    }));
  }

  function removeLink(index: number) {
    updateLocal((prev) => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index),
    }));
  }

  function addLink() {
    updateLocal((prev) => ({
      ...prev,
      links: [...prev.links, { id: "", label: "", url: "", icon: "github" as const }],
    }));
  }

  function handleSave() {
    const cleaned: SocialLinksContent = {
      ...content,
      links: content.links.map((l) => ({
        ...l,
        id: l.id || slugify(l.label),
      })),
    };
    updateLocal(() => cleaned);
    save(cleaned);
  }

  return (
    <div className="h-full overflow-auto p-4">
      <div className={cardClass}>
        <label className="mb-1 block text-xs font-medium text-neutral-500">
          Email
        </label>
        <input
          value={content.email}
          onChange={(e) => updateLocal((p) => ({ ...p, email: e.target.value }))}
          className={inputClass}
        />
        <label className="mb-1 mt-2 block text-xs font-medium text-neutral-500">
          Resume URL
        </label>
        <input
          value={content.resumeUrl}
          onChange={(e) => updateLocal((p) => ({ ...p, resumeUrl: e.target.value }))}
          className={inputClass}
        />

        <div className="mt-2 flex items-center gap-2">
          <a
            href={content.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
          >
            <FileText className="h-3.5 w-3.5" /> View current resume
          </a>
        </div>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className={`${secondaryButtonClass} mt-2`}
        >
          <Upload className="h-3.5 w-3.5" />
          {uploading ? "Uploading..." : "Upload new resume (PDF)"}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleResumeUpload(file);
          }}
          className="hidden"
        />
        {uploadError && <p className="mt-1.5 text-xs text-red-500">{uploadError}</p>}
      </div>

      <div className="mt-3 space-y-3">
        {content.links.map((link, i) => {
          const Icon = SOCIAL_ICONS[link.icon];
          return (
          <div key={i} className={cardClass}>
            <div className="grid grid-cols-[auto_1fr_1fr] gap-2">
              <span className="flex h-8 w-8 items-center justify-center">
                <Icon className="h-7 w-7" />
              </span>
              <input
                value={link.label}
                onChange={(e) => updateLink(i, { label: e.target.value })}
                placeholder="Label"
                className={inputClass}
              />
              <select
                value={link.icon}
                onChange={(e) =>
                  updateLink(i, { icon: e.target.value as SocialLink["icon"] })
                }
                className={inputClass}
              >
                {ICON_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <input
                value={link.url}
                onChange={(e) => updateLink(i, { url: e.target.value })}
                placeholder="https://..."
                className={`${inputClass} col-span-3`}
              />
            </div>
            <button
              type="button"
              onClick={() => removeLink(i)}
              className="mt-2 flex items-center gap-1 text-xs text-red-500 hover:underline"
            >
              <Trash2 className="h-3.5 w-3.5" /> Remove
            </button>
          </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button type="button" onClick={addLink} className={secondaryButtonClass}>
          <Plus className="h-3.5 w-3.5" /> Add link
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={saveStatus === "saving"}
          className={primaryButtonClass}
        >
          <Save className="h-3.5 w-3.5" />
          {saveStatus === "saving" ? "Saving..." : "Save changes"}
        </button>
        {saveStatus === "saved" && (
          <span className="text-xs text-emerald-600">Saved</span>
        )}
        {saveStatus === "error" && (
          <span className="text-xs text-red-500">{saveError}</span>
        )}
      </div>
    </div>
  );
}
