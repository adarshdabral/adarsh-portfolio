"use client";

import Image from "next/image";
import { Star, GitFork, Users } from "lucide-react";

import { useJsonFetch } from "@/lib/use-json-fetch";
import Ash from "@/components/os/Ash";
import type { GithubData } from "@/lib/github";

function ContributionGraph({
  days,
}: {
  days: { date: string; count: number }[];
}) {
  const weeks: { date: string; count: number }[][] = [];
  let current: { date: string; count: number }[] = [];
  for (const day of days) {
    current.push(day);
    if (current.length === 7) {
      weeks.push(current);
      current = [];
    }
  }
  if (current.length) weeks.push(current);

  const levelFor = (count: number) => {
    if (count === 0) return "bg-neutral-200 dark:bg-neutral-800";
    if (count < 3) return "bg-blue-200 dark:bg-blue-900";
    if (count < 6) return "bg-blue-400 dark:bg-blue-700";
    if (count < 10) return "bg-blue-600 dark:bg-blue-500";
    return "bg-blue-800 dark:bg-blue-300";
  };

  return (
    <div className="flex gap-[3px] overflow-x-auto pb-1">
      {weeks.map((week, wi) => (
        <div key={wi} className="flex flex-col gap-[3px]">
          {week.map((day) => (
            <div
              key={day.date}
              title={`${day.date}: ${day.count} contribution${day.count === 1 ? "" : "s"}`}
              className={`h-2.5 w-2.5 rounded-sm ${levelFor(day.count)}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function RepoCard({
  repo,
}: {
  repo: { name: string; description: string | null; url: string; stars: number; forks: number; language: string | null };
}) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-lg border border-neutral-200 p-3 transition hover:border-blue-300 hover:bg-blue-50/50 dark:border-neutral-800 dark:hover:border-blue-800 dark:hover:bg-blue-950/20"
    >
      <p className="truncate text-sm font-semibold text-neutral-800 dark:text-neutral-100">
        {repo.name}
      </p>
      <p className="mt-0.5 line-clamp-2 text-xs text-neutral-500">
        {repo.description ?? "No description."}
      </p>
      <div className="mt-2 flex items-center gap-3 text-[11px] text-neutral-400">
        {repo.language && <span>{repo.language}</span>}
        <span className="flex items-center gap-1">
          <Star className="h-3 w-3" /> {repo.stars}
        </span>
        <span className="flex items-center gap-1">
          <GitFork className="h-3 w-3" /> {repo.forks}
        </span>
      </div>
    </a>
  );
}

export default function GithubLiveView() {
  const state = useJsonFetch<GithubData>("/api/github");

  if (state.status === "loading") {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-300 border-t-blue-600" />
      </div>
    );
  }

  if (state.status === "error" || !state.data.ok) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
        <Ash size={56} pose="thinking" />
        <p className="text-sm text-neutral-500">
          GitHub stats aren&apos;t available right now.
        </p>
        <p className="max-w-xs text-xs text-neutral-400">
          Set GITHUB_USERNAME (and optionally GITHUB_TOKEN) in your
          environment to enable this panel.
        </p>
      </div>
    );
  }

  const { profile, topLanguages, topRepos, pinnedRepos, contributions } =
    state.data;
  const repos = pinnedRepos ?? topRepos;

  return (
    <div className="h-full overflow-auto p-5">
      <div className="flex items-start gap-3">
        <Image
          src={profile.avatarUrl}
          alt={profile.name ?? profile.login}
          width={48}
          height={48}
          className="rounded-full"
        />
        <div className="min-w-0">
          <a
            href={profile.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-neutral-900 hover:underline dark:text-neutral-100"
          >
            {profile.name ?? profile.login}
          </a>
          <p className="text-xs text-neutral-500">@{profile.login}</p>
          {profile.bio && (
            <p className="mt-1 text-xs text-neutral-500">{profile.bio}</p>
          )}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-4 text-xs text-neutral-500">
        <span className="flex items-center gap-1">
          <Users className="h-3.5 w-3.5" /> {profile.followers} followers
        </span>
        <span>{profile.publicRepos} public repos</span>
      </div>

      {topLanguages.length > 0 && (
        <div className="mt-4">
          <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Top languages
          </h3>
          <div className="flex h-2 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
            {topLanguages.map((lang, i) => (
              <div
                key={lang.name}
                title={`${lang.name} ${lang.percent}%`}
                style={{
                  width: `${lang.percent}%`,
                  opacity: 1 - i * 0.14,
                }}
                className="h-full bg-blue-600"
              />
            ))}
          </div>
          <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-neutral-500">
            {topLanguages.map((lang) => (
              <span key={lang.name}>
                {lang.name} · {lang.percent}%
              </span>
            ))}
          </div>
        </div>
      )}

      {contributions ? (
        <div className="mt-4">
          <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-neutral-500">
            {contributions.total} contributions
          </h3>
          <ContributionGraph days={contributions.days} />
        </div>
      ) : (
        <p className="mt-4 text-[11px] text-neutral-400">
          Set GITHUB_TOKEN to unlock the contribution graph and pinned repos.
        </p>
      )}

      {repos.length > 0 && (
        <div className="mt-4">
          <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-neutral-500">
            {pinnedRepos ? "Pinned repos" : "Top repos"}
          </h3>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {repos.map((repo) => (
              <RepoCard key={repo.name} repo={repo} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
