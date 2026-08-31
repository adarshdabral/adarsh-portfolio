import experienceData from "@/content/experience.json";
import type { ExperienceEntry } from "@/lib/content-types";

const entries = experienceData.entries as ExperienceEntry[];

function formatRange(start: string, end: string | null) {
  const fmt = (v: string) => {
    const [y, m] = v.split("-");
    return new Date(Number(y), Number(m) - 1).toLocaleDateString(undefined, {
      month: "short",
      year: "numeric",
    });
  };
  return `${fmt(start)} - ${end ? fmt(end) : "Present"}`;
}

export default function ExperienceView() {
  return (
    <div className="h-full overflow-auto p-5">
      <p className="mb-4 font-mono text-[11px] text-neutral-400">
        # Experience.txt
      </p>
      <ol className="space-y-6">
        {entries.map((entry) => (
          <li
            key={entry.id}
            className="border-l-2 border-blue-200 pl-4 dark:border-blue-900"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {entry.role} · {entry.company}
              </h3>
              <span className="font-mono text-[11px] text-neutral-400">
                {formatRange(entry.startDate, entry.endDate)}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-neutral-500">{entry.location}</p>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-neutral-600 dark:text-neutral-300">
              {entry.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <p className="mt-6 text-xs text-neutral-400">
        Sample data — edit content/experience.json to personalize.
      </p>
    </div>
  );
}
