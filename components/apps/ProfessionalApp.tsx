"use client";

import { useState, type ComponentType } from "react";
import {
  FileText,
  Briefcase,
  GraduationCap,
  ListChecks,
  Code2,
} from "lucide-react";

import { GithubGlyph } from "@/components/os/icons/BrandIcons";
import ResumeView from "./professional/ResumeView";
import ExperienceView from "./professional/ExperienceView";
import EducationView from "./professional/EducationView";
import SkillsView from "./professional/SkillsView";
import GithubLiveView from "./professional/GithubLiveView";
import LeetcodeLiveView from "./professional/LeetcodeLiveView";

type FileId =
  | "resume"
  | "experience"
  | "education"
  | "skills"
  | "github"
  | "leetcode";

const FILES: {
  id: FileId;
  name: string;
  icon: ComponentType<{ className?: string }>;
}[] = [
  { id: "resume", name: "Resume.pdf", icon: FileText },
  { id: "experience", name: "Experience.txt", icon: Briefcase },
  { id: "education", name: "Education.txt", icon: GraduationCap },
  { id: "skills", name: "Skills.txt", icon: ListChecks },
  { id: "github", name: "GitHub.live", icon: GithubGlyph },
  { id: "leetcode", name: "LeetCode.live", icon: Code2 },
];

const VIEWS: Record<FileId, ComponentType> = {
  resume: ResumeView,
  experience: ExperienceView,
  education: EducationView,
  skills: SkillsView,
  github: GithubLiveView,
  leetcode: LeetcodeLiveView,
};

export default function ProfessionalApp() {
  const [selected, setSelected] = useState<FileId>("resume");
  const ActiveView = VIEWS[selected];

  return (
    <div className="flex h-full">
      <div className="w-40 shrink-0 overflow-y-auto border-r border-neutral-200 bg-neutral-50/70 p-2 dark:border-neutral-800 dark:bg-neutral-900/40">
        {FILES.map((file) => {
          const Icon = file.icon;
          const active = file.id === selected;
          return (
            <button
              key={file.id}
              type="button"
              onClick={() => setSelected(file.id)}
              className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-neutral-600 hover:bg-blue-50 dark:text-neutral-300 dark:hover:bg-blue-950/40"
              }`}
            >
              <Icon
                className={`h-3.5 w-3.5 shrink-0 ${active ? "text-white" : "text-blue-600 dark:text-blue-400"}`}
              />
              <span className="truncate">{file.name}</span>
            </button>
          );
        })}
      </div>
      <div className="min-w-0 flex-1">
        <ActiveView />
      </div>
    </div>
  );
}
