import "server-only";
import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

import type { JournalEntryMeta } from "./content-types";

const JOURNAL_DIR = path.join(process.cwd(), "content", "journal");

interface JournalFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
}

async function listMdxFiles(): Promise<string[]> {
  try {
    const files = await fs.readdir(JOURNAL_DIR);
    return files.filter((f) => f.endsWith(".mdx"));
  } catch {
    return [];
  }
}

export async function getJournalEntries(): Promise<JournalEntryMeta[]> {
  const files = await listMdxFiles();

  const entries = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(path.join(JOURNAL_DIR, file), "utf-8");
      const { data } = matter(raw);
      const fm = data as JournalFrontmatter;
      return {
        slug: file.replace(/\.mdx$/, ""),
        title: fm.title,
        date: fm.date,
        excerpt: fm.excerpt,
        tags: fm.tags ?? [],
      };
    })
  );

  return entries.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getJournalEntry(slug: string): Promise<{
  meta: JournalEntryMeta;
  source: MDXRemoteSerializeResult;
} | null> {
  const safeSlug = slug.replace(/[^a-z0-9-]/gi, "");
  const filePath = path.join(JOURNAL_DIR, `${safeSlug}.mdx`);

  let raw: string;
  try {
    raw = await fs.readFile(filePath, "utf-8");
  } catch {
    return null;
  }

  const { content, data } = matter(raw);
  const fm = data as JournalFrontmatter;
  const source = await serialize(content);

  return {
    meta: {
      slug: safeSlug,
      title: fm.title,
      date: fm.date,
      excerpt: fm.excerpt,
      tags: fm.tags ?? [],
    },
    source,
  };
}
