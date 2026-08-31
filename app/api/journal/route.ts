import { getJournalEntries } from "@/lib/journal";

export async function GET() {
  const entries = await getJournalEntries();
  return Response.json({ ok: true, entries });
}
