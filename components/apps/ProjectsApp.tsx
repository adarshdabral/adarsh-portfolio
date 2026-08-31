"use client";

import { useState } from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";

import projectsData from "@/content/projects.json";
import type { Project } from "@/lib/content-types";
import { ProjectsIcon } from "@/components/os/icons/AppPixelIcons";
import { GithubGlyph } from "@/components/os/icons/BrandIcons";

const projects = projectsData.entries as Project[];

function ProjectThumb({ project }: { project: Project }) {
  const image = project.screenshots[0];
  if (image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={image} alt="" className="h-32 w-full rounded-md object-cover" />;
  }
  return (
    <div className="flex h-32 w-full items-center justify-center rounded-md bg-gradient-to-br from-orange-200 to-amber-100 dark:from-orange-950/60 dark:to-amber-950/40">
      <ProjectsIcon className="h-14 w-14 opacity-70" />
    </div>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex flex-col gap-2 rounded-lg border border-neutral-200 p-3 text-left transition hover:border-orange-300 hover:bg-orange-50/50 dark:border-neutral-800 dark:hover:border-orange-800 dark:hover:bg-orange-950/20"
    >
      <ProjectThumb project={project} />
      <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
        {project.name}
      </h3>
      <p className="text-xs text-neutral-500">{project.tagline}</p>
      <div className="flex flex-wrap gap-1">
        {project.stack.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-medium text-orange-700 dark:bg-orange-950/50 dark:text-orange-300"
          >
            {tech}
          </span>
        ))}
      </div>
    </button>
  );
}

function ProjectDetail({ project, onBack }: { project: Project; onBack: () => void }) {
  return (
    <div className="h-full overflow-auto p-5">
      <button
        type="button"
        onClick={onBack}
        className="mb-4 flex items-center gap-1 text-xs text-neutral-500 hover:text-orange-600"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to projects
      </button>

      <ProjectThumb project={project} />

      <h2 className="mt-3 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
        {project.name}
      </h2>
      <p className="text-sm text-neutral-500">{project.tagline}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-orange-100 px-2.5 py-1 text-xs font-medium text-orange-700 dark:bg-orange-950/50 dark:text-orange-300"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-md bg-orange-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-orange-700"
          >
            <ExternalLink className="h-3.5 w-3.5" /> Live site
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-md border border-neutral-300 px-3 py-1.5 text-xs font-medium text-neutral-700 transition hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
          >
            <GithubGlyph className="h-3.5 w-3.5" /> Source
          </a>
        )}
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-neutral-500">
            What it does
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            {project.description}
          </p>
        </div>
        <div>
          <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-neutral-500">
            The problem
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">{project.problem}</p>
        </div>
      </div>

      <p className="mt-6 text-xs text-neutral-400">
        Sample data — edit content/projects.json to personalize.
      </p>
    </div>
  );
}

export default function ProjectsApp() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = projects.find((p) => p.id === selectedId);

  if (selected) {
    return <ProjectDetail project={selected} onBack={() => setSelectedId(null)} />;
  }

  return (
    <div className="h-full overflow-auto p-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpen={() => setSelectedId(project.id)}
          />
        ))}
      </div>
    </div>
  );
}
