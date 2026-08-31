"use client";

import { Plus, Trash2, Save } from "lucide-react";

import { useCmsContent } from "@/lib/use-cms-content";
import { slugify } from "@/lib/slugify";
import type { EducationEntry } from "@/lib/content-types";
import { inputClass, cardClass, primaryButtonClass, secondaryButtonClass } from "./shared";

function blankEntry(): EducationEntry {
  return {
    id: "",
    institution: "",
    degree: "",
    location: "",
    startDate: "",
    endDate: null,
    honors: [],
  };
}

export default function EducationEditor() {
  const { state, updateLocal, save, saveStatus, saveError } = useCmsContent<{
    entries: EducationEntry[];
  }>("education");

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

  function update(index: number, patch: Partial<EducationEntry>) {
    updateLocal((prev) => ({
      entries: prev.entries.map((e, i) => (i === index ? { ...e, ...patch } : e)),
    }));
  }

  function remove(index: number) {
    updateLocal((prev) => ({
      entries: prev.entries.filter((_, i) => i !== index),
    }));
  }

  function addEntry() {
    updateLocal((prev) => ({ entries: [...prev.entries, blankEntry()] }));
  }

  function handleSave() {
    const cleaned = entries.map((e) => ({
      ...e,
      id: e.id || slugify(e.institution),
    }));
    updateLocal(() => ({ entries: cleaned }));
    save({ entries: cleaned });
  }

  return (
    <div className="h-full overflow-auto p-4">
      <div className="space-y-3">
        {entries.map((entry, i) => (
          <div key={i} className={cardClass}>
            <div className="grid grid-cols-2 gap-2">
              <input
                value={entry.institution}
                onChange={(e) => update(i, { institution: e.target.value })}
                placeholder="Institution"
                className={inputClass}
              />
              <input
                value={entry.degree}
                onChange={(e) => update(i, { degree: e.target.value })}
                placeholder="Degree"
                className={inputClass}
              />
              <input
                value={entry.location}
                onChange={(e) => update(i, { location: e.target.value })}
                placeholder="Location"
                className={inputClass}
              />
              <div className="flex gap-2">
                <input
                  value={entry.startDate}
                  onChange={(e) => update(i, { startDate: e.target.value })}
                  placeholder="Start (YYYY-MM)"
                  className={inputClass}
                />
                <input
                  value={entry.endDate ?? ""}
                  onChange={(e) => update(i, { endDate: e.target.value || null })}
                  placeholder="End (blank = Present)"
                  className={inputClass}
                />
              </div>
            </div>
            <textarea
              value={entry.honors.join("\n")}
              onChange={(e) =>
                update(i, { honors: e.target.value.split("\n").filter(Boolean) })
              }
              placeholder="One honor per line"
              rows={2}
              className={`${inputClass} mt-2 resize-none`}
            />
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
        <button
          type="button"
          onClick={addEntry}
          className={secondaryButtonClass}
        >
          <Plus className="h-3.5 w-3.5" /> Add entry
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
