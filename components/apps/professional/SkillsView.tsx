import skillsData from "@/content/skills.json";
import type { SkillCategory } from "@/lib/content-types";

const categories = skillsData.categories as SkillCategory[];

export default function SkillsView() {
  return (
    <div className="h-full overflow-auto p-5">
      <p className="mb-4 font-mono text-[11px] text-neutral-400">
        # Skills.txt
      </p>
      <div className="space-y-5">
        {categories.map((cat) => (
          <div key={cat.name}>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
              {cat.name}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-xs text-neutral-400">
        Sample data — edit content/skills.json to personalize.
      </p>
    </div>
  );
}
