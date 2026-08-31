"use client";

import { useState } from "react";
import { ChevronDown, ExternalLink, FileText } from "lucide-react";

import researchPapersData from "@/content/research-papers.json";
import authoredBookData from "@/content/authored-book.json";
import type { AuthoredBook, ResearchPaper } from "@/lib/content-types";
import { PublicationsIcon } from "@/components/os/icons/AppPixelIcons";

const papers = researchPapersData.entries as ResearchPaper[];
const book = authoredBookData as AuthoredBook;

function formatMonth(value: string) {
  const [y, m] = value.split("-");
  return new Date(Number(y), Number(m) - 1).toLocaleDateString(undefined, {
    month: "short",
    year: "numeric",
  });
}

function PaperCard({ paper }: { paper: ResearchPaper }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-start justify-between gap-3 text-left"
      >
        <div>
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            {paper.title}
          </h3>
          <p className="mt-0.5 text-xs text-neutral-500">
            {paper.venue} · {formatMonth(paper.date)}
          </p>
          <p className="text-xs text-neutral-400">{paper.coAuthors.join(", ")}</p>
        </div>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-neutral-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="mt-3 space-y-2 border-t border-neutral-100 pt-3 dark:border-neutral-800">
          <p className="text-sm text-neutral-600 dark:text-neutral-300">{paper.abstract}</p>
          <div className="flex gap-2">
            {paper.doiUrl && (
              <a
                href={paper.doiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs font-medium text-violet-600 hover:underline dark:text-violet-400"
              >
                <ExternalLink className="h-3 w-3" /> DOI
              </a>
            )}
            {paper.pdfUrl && (
              <a
                href={paper.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs font-medium text-violet-600 hover:underline dark:text-violet-400"
              >
                <FileText className="h-3 w-3" /> PDF
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function BookShowcase({ book }: { book: AuthoredBook }) {
  return (
    <div className="flex gap-4 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
      {book.coverImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={book.coverImage}
          alt={`Cover of ${book.title}`}
          className="h-32 w-24 shrink-0 rounded-md object-cover shadow"
        />
      ) : (
        <div className="flex h-32 w-24 shrink-0 flex-col items-center justify-center gap-2 rounded-md bg-gradient-to-br from-violet-600 to-violet-800 p-2 text-center shadow">
          <PublicationsIcon className="h-10 w-10" />
        </div>
      )}
      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
          {book.title}
        </h3>
        <p className="mt-0.5 text-xs text-neutral-500">{book.publisher}</p>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{book.description}</p>
        {book.excerpt && (
          <blockquote className="mt-2 border-l-2 border-violet-300 pl-2 text-xs italic text-neutral-500 dark:border-violet-800">
            &ldquo;{book.excerpt}&rdquo;
          </blockquote>
        )}
        {book.buyUrl && (
          <a
            href={book.buyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-violet-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-violet-700"
          >
            <ExternalLink className="h-3.5 w-3.5" /> Get the book
          </a>
        )}
      </div>
    </div>
  );
}

export default function PublicationsApp() {
  return (
    <div className="h-full overflow-auto p-5">
      <section>
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
          Research Papers
        </h2>
        <div className="space-y-2">
          {papers.map((paper) => (
            <PaperCard key={paper.id} paper={paper} />
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
          Book
        </h2>
        <BookShowcase book={book} />
      </section>

      <p className="mt-6 text-xs text-neutral-400">
        Sample data — edit content/research-papers.json and content/authored-book.json to
        personalize.
      </p>
    </div>
  );
}
