"use client";

import { Plus, Trash2, Save } from "lucide-react";

import { useCmsContent } from "@/lib/use-cms-content";
import type { SkillCategory } from "@/lib/content-types";
import { inputClass, cardClass, primaryButtonClass, secondaryButtonClass } from "./shared";

export default function SkillsEditor() {
  const { state, updateLocal, save, saveStatus, saveError } = useCmsContent<{
    categories: SkillCategory[];
  }>("skills");

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

  const categories = state.data.categories;

  function update(index: number, patch: Partial<SkillCategory>) {
    updateLocal((prev) => ({
      categories: prev.categories.map((c, i) => (i === index ? { ...c, ...patch } : c)),
    }));
  }

  function remove(index: number) {
    updateLocal((prev) => ({
      categories: prev.categories.filter((_, i) => i !== index),
    }));
  }

  function addCategory() {
    updateLocal((prev) => ({
      categories: [...prev.categories, { name: "", skills: [] }],
    }));
  }

  function handleSave() {
    save({ categories });
  }

  return (
    <div className="h-full overflow-auto p-4">
      <div className="space-y-3">
        {categories.map((cat, i) => (
          <div key={i} className={cardClass}>
            <input
              value={cat.name}
              onChange={(e) => update(i, { name: e.target.value })}
              placeholder="Category name"
              className={`${inputClass} font-medium`}
            />
            <input
              value={cat.skills.join(", ")}
              onChange={(e) =>
                update(i, {
                  skills: e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
              placeholder="Comma-separated skills"
              className={`${inputClass} mt-2`}
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
        <button type="button" onClick={addCategory} className={secondaryButtonClass}>
          <Plus className="h-3.5 w-3.5" /> Add category
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
