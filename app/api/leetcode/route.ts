import { getLeetcodeData, type LeetcodeData } from "@/lib/leetcode";

export const revalidate = 3600;

let lastGood: LeetcodeData | null = null;

export async function GET() {
  const result = await getLeetcodeData();

  if (result.ok) {
    lastGood = result;
    return Response.json(result);
  }

  if (lastGood) {
    return Response.json(lastGood);
  }

  return Response.json(result);
}
