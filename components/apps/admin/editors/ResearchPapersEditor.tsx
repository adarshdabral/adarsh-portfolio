"use client";

import { Plus, Trash2, Save } from "lucide-react";

import { useCmsContent } from "@/lib/use-cms-content";
import { slugify } from "@/lib/slugify";
import type { ResearchPaper } from "@/lib/content-types";
import { inputClass, cardClass, primaryButtonClass, secondaryButtonClass } from "./shared";

function blankPaper(): ResearchPaper {
  return {
    id: "",
    title: "",
    venue: "",
    date: "",
    coAuthors: [],
    abstract: "",
    doiUrl: null,
    pdfUrl: null,
  };
}

export default function ResearchPapersEditor() {
  const { state, updateLocal, save, saveStatus, saveError } = useCmsContent<{
    entries: ResearchPaper[];
  }>("research-papers");

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

  const entries = state.data.entries;

  function update(index: number, patch: Partial<ResearchPaper>) {
    updateLocal((prev) => ({
      entries: prev.entries.map((e, i) => (i === index ? { ...e, ...patch } : e)),
    }));
  }

  function remove(index: number) {
    updateLocal((prev) => ({ entries: prev.entries.filter((_, i) => i !== index) }));
  }

  function addPaper() {
    updateLocal((prev) => ({ entries: [...prev.entries, blankPaper()] }));
  }

  function handleSave() {
    const cleaned = entries.map((e) => ({ ...e, id: e.id || slugify(e.title) }));
    updateLocal(() => ({ entries: cleaned }));
    save({ entries: cleaned });
  }

  return (
    <div className="h-full overflow-auto p-4">
      <div className="space-y-3">
        {entries.map((paper, i) => (
          <div key={i} className={cardClass}>
            <input
              value={paper.title}
              onChange={(e) => update(i, { title: e.target.value })}
              placeholder="Paper title"
              className={inputClass}
            />
            <div className="mt-2 grid grid-cols-2 gap-2">
              <input
                value={paper.venue}
                onChange={(e) => update(i, { venue: e.target.value })}
                placeholder="Venue / journal"
                className={inputClass}
              />
              <input
                value={paper.date}
                onChange={(e) => update(i, { date: e.target.value })}
                placeholder="Date (YYYY-MM)"
                className={inputClass}
              />
            </div>
            <input
              value={paper.coAuthors.join(", ")}
              onChange={(e) =>
                update(i, {
                  coAuthors: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                })
              }
              placeholder="Co-authors, comma-separated"
              className={`${inputClass} mt-2`}
            />
            <textarea
              value={paper.abstract}
              onChange={(e) => update(i, { abstract: e.target.value })}
              placeholder="Abstract"
              rows={3}
              className={`${inputClass} mt-2 resize-none`}
            />
            <div className="mt-2 grid grid-cols-2 gap-2">
              <input
                value={paper.doiUrl ?? ""}
                onChange={(e) => update(i, { doiUrl: e.target.value || null })}
                placeholder="DOI URL"
                className={inputClass}
              />
              <input
                value={paper.pdfUrl ?? ""}
                onChange={(e) => update(i, { pdfUrl: e.target.value || null })}
                placeholder="PDF URL"
                className={inputClass}
              />
            </div>
            <button
              type="button"
              onClick={() => remove(i)}
              className="mt-2 flex items-center gap-1 text-xs text-red-500 hover:underline"
            >
              <Trash2 className="h-3.5 w-3.5" /> Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button type="button" onClick={addPaper} className={secondaryButtonClass}>
          <Plus className="h-3.5 w-3.5" /> Add paper
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
        {saveStatus === "saved" && <span className="text-xs text-emerald-600">Saved</span>}
        {saveStatus === "error" && <span className="text-xs text-red-500">{saveError}</span>}
      </div>
    </div>
  );
}
