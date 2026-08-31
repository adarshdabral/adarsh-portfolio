"use client";

import { Flame, Trophy } from "lucide-react";

import { useJsonFetch } from "@/lib/use-json-fetch";
import Ash from "@/components/os/Ash";
import type { LeetcodeData } from "@/lib/leetcode";

const DIFFICULTY_COLOR: Record<string, string> = {
  Easy: "bg-emerald-500",
  Medium: "bg-amber-500",
  Hard: "bg-rose-500",
};

export default function LeetcodeLiveView() {
  const state = useJsonFetch<LeetcodeData>("/api/leetcode");

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
          LeetCode stats aren&apos;t available right now.
        </p>
        <p className="max-w-xs text-xs text-neutral-400">
          Set LEETCODE_USERNAME in your environment to enable this panel.
        </p>
      </div>
    );
  }

  const data = state.data;
  const maxCount = Math.max(1, ...data.byDifficulty.map((d) => d.count));

  return (
    <div className="h-full overflow-auto p-5">
      <div className="flex items-baseline justify-between">
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
          @{data.username}
        </h3>
        {data.ranking && (
          <span className="text-xs text-neutral-500">
            Rank #{data.ranking.toLocaleString()}
          </span>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-neutral-200 p-3 text-center dark:border-neutral-800">
          <p className="text-2xl font-semibold text-blue-700 dark:text-blue-400">
            {data.totalSolved}
          </p>
          <p className="text-[11px] text-neutral-500">Problems solved</p>
        </div>
        <div className="rounded-lg border border-neutral-200 p-3 text-center dark:border-neutral-800">
          <p className="flex items-center justify-center gap-1 text-2xl font-semibold text-blue-700 dark:text-blue-400">
            <Flame className="h-5 w-5" />
            {data.streak ?? "-"}
          </p>
          <p className="text-[11px] text-neutral-500">Day streak</p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {data.byDifficulty.map((d) => (
          <div key={d.difficulty}>
            <div className="mb-0.5 flex justify-between text-[11px] text-neutral-500">
              <span>{d.difficulty}</span>
              <span>{d.count}</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
              <div
                className={`h-full ${DIFFICULTY_COLOR[d.difficulty] ?? "bg-blue-600"}`}
                style={{ width: `${(d.count / maxCount) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {data.contestRating && (
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-neutral-200 p-3 text-xs text-neutral-600 dark:border-neutral-800 dark:text-neutral-300">
          <Trophy className="h-4 w-4 text-blue-600" />
          Contest rating {Math.round(data.contestRating)}
          {data.contestGlobalRanking &&
            ` · global rank #${data.contestGlobalRanking.toLocaleString()}`}
        </div>
      )}
    </div>
  );
}
