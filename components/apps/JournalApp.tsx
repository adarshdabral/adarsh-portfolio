"use client";

import { useState, type ComponentProps } from "react";
import { ArrowLeft } from "lucide-react";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";

import { useJsonFetch } from "@/lib/use-json-fetch";
import Ash from "@/components/os/Ash";
import type { JournalEntryMeta } from "@/lib/content-types";

interface ListResponse {
  ok: boolean;
  entries: JournalEntryMeta[];
}

interface EntryResponse {
  ok: boolean;
  meta: JournalEntryMeta;
  source: MDXRemoteSerializeResult;
}

const mdxComponents = {
  h1: (props: ComponentProps<"h1">) => (
    <h1 className="mb-2 mt-6 text-lg font-semibold text-neutral-900 dark:text-neutral-100" {...props} />
  ),
  h2: (props: ComponentProps<"h2">) => (
    <h2 className="mb-2 mt-5 text-base font-semibold text-neutral-900 dark:text-neutral-100" {...props} />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3 className="mb-1.5 mt-4 text-sm font-semibold text-neutral-900 dark:text-neutral-100" {...props} />
  ),
  p: (props: ComponentProps<"p">) => (
    <p className="mb-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300" {...props} />
  ),
  ul: (props: ComponentProps<"ul">) => (
    <ul className="mb-3 list-disc space-y-1 pl-5 text-sm text-neutral-600 dark:text-neutral-300" {...props} />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol className="mb-3 list-decimal space-y-1 pl-5 text-sm text-neutral-600 dark:text-neutral-300" {...props} />
  ),
  a: (props: ComponentProps<"a">) => (
    <a className="text-emerald-600 underline underline-offset-2 hover:text-emerald-700 dark:text-emerald-400" {...props} />
  ),
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote className="mb-3 border-l-2 border-emerald-300 pl-3 text-sm italic text-neutral-500 dark:border-emerald-800" {...props} />
  ),
  code: (props: ComponentProps<"code">) => (
    <code className="rounded bg-neutral-100 px-1 py-0.5 font-mono text-xs dark:bg-neutral-800" {...props} />
  ),
};

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function EntryReader({ slug, onBack }: { slug: string; onBack: () => void }) {
  const state = useJsonFetch<EntryResponse>(`/api/journal/${slug}`);

  return (
    <div className="h-full overflow-auto p-5">
      <button
        type="button"
        onClick={onBack}
        className="mb-4 flex items-center gap-1 text-xs text-neutral-500 hover:text-emerald-600"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to journal
      </button>

      {state.status === "loading" && (
        <div className="flex justify-center py-12">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-emerald-300 border-t-emerald-600" />
        </div>
      )}

      {state.status === "error" && (
        <p className="text-sm text-red-500">Couldn&apos;t load this entry.</p>
      )}

      {state.status === "success" && state.data.ok && (
        <article>
          <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            {state.data.meta.title}
          </h1>
          <p className="mt-1 text-xs text-neutral-400">{formatDate(state.data.meta.date)}</p>
          <div className="mt-4">
            <MDXRemote {...state.data.source} components={mdxComponents} />
          </div>
        </article>
      )}
    </div>
  );
}

function EntryList({ onSelect }: { onSelect: (slug: string) => void }) {
  const state = useJsonFetch<ListResponse>("/api/journal");

  if (state.status === "loading") {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-emerald-300 border-t-emerald-600" />
      </div>
    );
  }

  if (state.status === "error" || !state.data.ok || state.data.entries.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
        <Ash size={56} pose="thinking" />
        <p className="text-sm text-neutral-500">No journal entries yet.</p>
        <p className="max-w-xs text-xs text-neutral-400">
          Add .mdx files to content/journal to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto p-4">
      <div className="space-y-2">
        {state.data.entries.map((entry) => (
          <button
            key={entry.slug}
            type="button"
            onClick={() => onSelect(entry.slug)}
            className="block w-full rounded-lg border border-neutral-200 p-3 text-left transition hover:border-emerald-300 hover:bg-emerald-50/50 dark:border-neutral-800 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/20"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {entry.title}
              </h3>
              <span className="shrink-0 text-[11px] text-neutral-400">
                {formatDate(entry.date)}
              </span>
            </div>
            <p className="mt-1 text-xs text-neutral-500">{entry.excerpt}</p>
            {entry.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function JournalApp() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  if (selectedSlug) {
    return <EntryReader slug={selectedSlug} onBack={() => setSelectedSlug(null)} />;
  }

  return <EntryList onSelect={setSelectedSlug} />;
}
