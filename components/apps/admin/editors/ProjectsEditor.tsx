"use client";

import { Plus, Trash2, Save } from "lucide-react";

import { useCmsContent } from "@/lib/use-cms-content";
import { slugify } from "@/lib/slugify";
import type { Project } from "@/lib/content-types";
import { inputClass, cardClass, primaryButtonClass, secondaryButtonClass } from "./shared";

function blankProject(): Project {
  return {
    id: "",
    name: "",
    tagline: "",
    description: "",
    problem: "",
    stack: [],
    screenshots: [],
    liveUrl: null,
    repoUrl: null,
  };
}

export default function ProjectsEditor() {
  const { state, updateLocal, save, saveStatus, saveError } = useCmsContent<{
    entries: Project[];
  }>("projects");

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

  function update(index: number, patch: Partial<Project>) {
    updateLocal((prev) => ({
      entries: prev.entries.map((e, i) => (i === index ? { ...e, ...patch } : e)),
    }));
  }

  function remove(index: number) {
    updateLocal((prev) => ({ entries: prev.entries.filter((_, i) => i !== index) }));
  }

  function addProject() {
    updateLocal((prev) => ({ entries: [...prev.entries, blankProject()] }));
  }

  function handleSave() {
    const cleaned = entries.map((e) => ({ ...e, id: e.id || slugify(e.name) }));
    updateLocal(() => ({ entries: cleaned }));
    save({ entries: cleaned });
  }

  return (
    <div className="h-full overflow-auto p-4">
      <div className="space-y-3">
        {entries.map((project, i) => (
          <div key={i} className={cardClass}>
            <div className="grid grid-cols-2 gap-2">
              <input
                value={project.name}
                onChange={(e) => update(i, { name: e.target.value })}
                placeholder="Project name"
                className={inputClass}
              />
              <input
                value={project.tagline}
                onChange={(e) => update(i, { tagline: e.target.value })}
                placeholder="One-line tagline"
                className={inputClass}
              />
            </div>
            <textarea
              value={project.description}
              onChange={(e) => update(i, { description: e.target.value })}
              placeholder="What it does"
              rows={2}
              className={`${inputClass} mt-2 resize-none`}
            />
            <textarea
              value={project.problem}
              onChange={(e) => update(i, { problem: e.target.value })}
              placeholder="The problem it solves"
              rows={2}
              className={`${inputClass} mt-2 resize-none`}
            />
            <input
              value={project.stack.join(", ")}
              onChange={(e) =>
                update(i, {
                  stack: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                })
              }
              placeholder="Tech stack, comma-separated"
              className={`${inputClass} mt-2`}
            />
            <div className="mt-2 grid grid-cols-2 gap-2">
              <input
                value={project.liveUrl ?? ""}
                onChange={(e) => update(i, { liveUrl: e.target.value || null })}
                placeholder="Live URL"
                className={inputClass}
              />
              <input
                value={project.repoUrl ?? ""}
                onChange={(e) => update(i, { repoUrl: e.target.value || null })}
                placeholder="Repo URL"
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
        <button type="button" onClick={addProject} className={secondaryButtonClass}>
          <Plus className="h-3.5 w-3.5" /> Add project
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
