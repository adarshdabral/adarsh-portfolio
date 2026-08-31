import "server-only";

export interface LeetcodeDifficultyCount {
  difficulty: "Easy" | "Medium" | "Hard";
  count: number;
}

export type LeetcodeData =
  | {
      ok: true;
      username: string;
      ranking: number | null;
      totalSolved: number;
      byDifficulty: LeetcodeDifficultyCount[];
      streak: number | null;
      totalActiveDays: number | null;
      contestRating: number | null;
      contestGlobalRanking: number | null;
      fetchedAt: string;
    }
  | { ok: false; error: string };

const REVALIDATE_SECONDS = 3600;

const QUERY = /* GraphQL */ `
  query PortfolioLeetcode($username: String!) {
    matchedUser(username: $username) {
      username
      profile {
        ranking
      }
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
      userCalendar {
        streak
        totalActiveDays
      }
    }
    userContestRanking(username: $username) {
      rating
      globalRanking
    }
  }
`;

interface GraphqlResponse {
  data?: {
    matchedUser: {
      username: string;
      profile: { ranking: number | null };
      submitStatsGlobal: {
        acSubmissionNum: { difficulty: string; count: number }[];
      };
      userCalendar: {
        streak: number | null;
        totalActiveDays: number | null;
      } | null;
    } | null;
    userContestRanking: {
      rating: number | null;
      globalRanking: number | null;
    } | null;
  };
  errors?: { message: string }[];
}

export async function getLeetcodeData(): Promise<LeetcodeData> {
  const username = process.env.LEETCODE_USERNAME;
  if (!username) {
    return { ok: false, error: "LEETCODE_USERNAME is not configured." };
  }

  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { username },
      }),
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      throw new Error(`LeetCode request failed (${res.status})`);
    }

    const json: GraphqlResponse = await res.json();
    if (json.errors?.length || !json.data?.matchedUser) {
      throw new Error(
        json.errors?.[0]?.message ?? "LeetCode returned no matching user."
      );
    }

    const user = json.data.matchedUser;
    const byDifficulty = user.submitStatsGlobal.acSubmissionNum.filter(
      (d): d is LeetcodeDifficultyCount =>
        d.difficulty === "Easy" || d.difficulty === "Medium" || d.difficulty === "Hard"
    );
    const totalSolved = byDifficulty.reduce((sum, d) => sum + d.count, 0);

    return {
      ok: true,
      username: user.username,
      ranking: user.profile.ranking,
      totalSolved,
      byDifficulty,
      streak: user.userCalendar?.streak ?? null,
      totalActiveDays: user.userCalendar?.totalActiveDays ?? null,
      contestRating: json.data.userContestRanking?.rating ?? null,
      contestGlobalRanking: json.data.userContestRanking?.globalRanking ?? null,
      fetchedAt: new Date().toISOString(),
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "LeetCode fetch failed.",
    };
  }
}
