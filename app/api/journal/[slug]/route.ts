import { getJournalEntry } from "@/lib/journal";

export async function GET(
  _request: Request,
  ctx: { params: Promise<{ slug: string }> }
) {
  const { slug } = await ctx.params;
  const entry = await getJournalEntry(slug);

  if (!entry) {
    return Response.json({ ok: false, error: "Entry not found." }, { status: 404 });
  }

  return Response.json({ ok: true, ...entry });
}
