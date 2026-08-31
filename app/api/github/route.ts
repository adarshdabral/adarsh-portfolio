import { getGithubData, type GithubData } from "@/lib/github";

export const revalidate = 3600;

let lastGood: GithubData | null = null;

export async function GET() {
  const result = await getGithubData();

  if (result.ok) {
    lastGood = result;
    return Response.json(result);
  }

  // Live fetch failed (rate limit, network blip, upstream outage). Serve the
  // last successful in-memory response rather than showing a broken state.
  if (lastGood) {
    return Response.json(lastGood);
  }

  return Response.json(result);
}
