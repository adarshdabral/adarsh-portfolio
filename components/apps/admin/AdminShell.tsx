"use client";

import { useState, type ComponentType } from "react";
import { LogOut } from "lucide-react";

import ExperienceEditor from "./editors/ExperienceEditor";
import EducationEditor from "./editors/EducationEditor";
import SkillsEditor from "./editors/SkillsEditor";
import SocialLinksEditor from "./editors/SocialLinksEditor";
import ProjectsEditor from "./editors/ProjectsEditor";
import ResearchPapersEditor from "./editors/ResearchPapersEditor";
import AuthoredBookEditor from "./editors/AuthoredBookEditor";
import MusicEditor from "./editors/MusicEditor";
import GalleryEditor from "./editors/GalleryEditor";
import IconsEditor from "./editors/IconsEditor";

const TABS = [
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "social-links", label: "Social & Resume" },
  { id: "projects", label: "Projects" },
  { id: "research-papers", label: "Papers" },
  { id: "authored-book", label: "Book" },
  { id: "music", label: "Music" },
  { id: "gallery", label: "Gallery" },
  { id: "icons", label: "Icons" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const EDITORS: Record<TabId, ComponentType> = {
  experience: ExperienceEditor,
  education: EducationEditor,
  skills: SkillsEditor,
  "social-links": SocialLinksEditor,
  projects: ProjectsEditor,
  "research-papers": ResearchPapersEditor,
  "authored-book": AuthoredBookEditor,
  music: MusicEditor,
  gallery: GalleryEditor,
  icons: IconsEditor,
};

export default function AdminShell({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<TabId>("experience");
  const Editor = EDITORS[tab];

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    onLogout();
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-2 border-b border-neutral-200 px-3 py-2 dark:border-neutral-800">
        <div className="flex flex-wrap gap-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                tab === t.id
                  ? "bg-slate-700 text-white"
                  : "text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="flex shrink-0 items-center gap-1 text-xs text-neutral-500 transition hover:text-red-600"
        >
          <LogOut className="h-3.5 w-3.5" /> Log out
        </button>
      </div>
      <div className="min-h-0 flex-1">
        <Editor />
      </div>
    </div>
  );
}
