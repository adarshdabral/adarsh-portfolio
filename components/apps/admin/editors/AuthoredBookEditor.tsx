"use client";

import { Save } from "lucide-react";

import { useCmsContent } from "@/lib/use-cms-content";
import type { AuthoredBook } from "@/lib/content-types";
import { inputClass, cardClass, primaryButtonClass } from "./shared";

export default function AuthoredBookEditor() {
  const { state, updateLocal, save, saveStatus, saveError } =
    useCmsContent<AuthoredBook>("authored-book");

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

  const book = state.data;

  return (
    <div className="h-full overflow-auto p-4">
      <div className={cardClass}>
        <label className="mb-1 block text-xs font-medium text-neutral-500">Title</label>
        <input
          value={book.title}
          onChange={(e) => updateLocal((p) => ({ ...p, title: e.target.value }))}
          className={inputClass}
        />

        <label className="mb-1 mt-2 block text-xs font-medium text-neutral-500">
          Cover image URL (leave blank for the generated placeholder)
        </label>
        <input
          value={book.coverImage ?? ""}
          onChange={(e) =>
            updateLocal((p) => ({ ...p, coverImage: e.target.value || null }))
          }
          className={inputClass}
        />

        <label className="mb-1 mt-2 block text-xs font-medium text-neutral-500">
          Description
        </label>
        <textarea
          value={book.description}
          onChange={(e) => updateLocal((p) => ({ ...p, description: e.target.value }))}
          rows={3}
          className={`${inputClass} resize-none`}
        />

        <div className="mt-2 grid grid-cols-2 gap-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-neutral-500">Publisher</label>
            <input
              value={book.publisher}
              onChange={(e) => updateLocal((p) => ({ ...p, publisher: e.target.value }))}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-neutral-500">Buy URL</label>
            <input
              value={book.buyUrl ?? ""}
              onChange={(e) =>
                updateLocal((p) => ({ ...p, buyUrl: e.target.value || null }))
              }
              className={inputClass}
            />
          </div>
        </div>

        <label className="mb-1 mt-2 block text-xs font-medium text-neutral-500">Excerpt</label>
        <textarea
          value={book.excerpt}
          onChange={(e) => updateLocal((p) => ({ ...p, excerpt: e.target.value }))}
          rows={3}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => save(book)}
          disabled={saveStatus === "saving"}
          className={primaryButtonClass}
        >
          <Save className="h-3.5 w-3.5" />
          {saveStatus === "saving" ? "Saving..." : "Save changes"}
        </button>
        {saveStatus === "saved" && <span className="text-xs text-emerald-600">Saved</span>}
        {saveStatus === "error" && <span className="text-xs text-red-500">{saveError}</span>}
      </div>
    </div>
  );
}
