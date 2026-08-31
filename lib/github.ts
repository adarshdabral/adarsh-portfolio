import "server-only";

export interface GithubRepoSummary {
  name: string;
  description: string | null;
  url: string;
  stars: number;
  forks: number;
  language: string | null;
}

export interface GithubContributionDay {
  date: string;
  count: number;
}

export interface GithubProfile {
  login: string;
  name: string | null;
  bio: string | null;
  avatarUrl: string;
  htmlUrl: string;
  followers: number;
  following: number;
  publicRepos: number;
}

export interface GithubLanguageStat {
  name: string;
  percent: number;
}

export type GithubData =
  | {
      ok: true;
      profile: GithubProfile;
      topLanguages: GithubLanguageStat[];
      topRepos: GithubRepoSummary[];
      pinnedRepos: GithubRepoSummary[] | null;
      contributions: {
        total: number;
        days: GithubContributionDay[];
      } | null;
      fetchedAt: string;
    }
  | { ok: false; error: string };

const REVALIDATE_SECONDS = 3600;

function summarizeLanguages(languages: (string | null)[]): GithubLanguageStat[] {
  const counts = new Map<string, number>();
  for (const lang of languages) {
    if (!lang) continue;
    counts.set(lang, (counts.get(lang) ?? 0) + 1);
  }
  const total = [...counts.values()].reduce((a, b) => a + b, 0);
  if (total === 0) return [];
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({
      name,
      percent: Math.round((count / total) * 100),
    }));
}

interface RestRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  fork: boolean;
}

interface RestUser {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  followers: number;
  following: number;
  public_repos: number;
}

async function fetchViaRest(username: string): Promise<GithubData> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`, {
      headers,
      next: { revalidate: REVALIDATE_SECONDS },
    }),
    fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`,
      { headers, next: { revalidate: REVALIDATE_SECONDS } }
    ),
  ]);

  if (!userRes.ok) {
    throw new Error(`GitHub user lookup failed (${userRes.status})`);
  }

  const user: RestUser = await userRes.json();
  const repos: RestRepo[] = reposRes.ok ? await reposRes.json() : [];
  const ownRepos = repos.filter((r) => !r.fork);

  const topRepos: GithubRepoSummary[] = [...ownRepos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6)
    .map((r) => ({
      name: r.name,
      description: r.description,
      url: r.html_url,
      stars: r.stargazers_count,
      forks: r.forks_count,
      language: r.language,
    }));

  return {
    ok: true,
    profile: {
      login: user.login,
      name: user.name,
      bio: user.bio,
      avatarUrl: user.avatar_url,
      htmlUrl: user.html_url,
      followers: user.followers,
      following: user.following,
      publicRepos: user.public_repos,
    },
    topLanguages: summarizeLanguages(ownRepos.map((r) => r.language)),
    topRepos,
    pinnedRepos: null,
    contributions: null,
    fetchedAt: new Date().toISOString(),
  };
}

const GRAPHQL_QUERY = /* GraphQL */ `
  query PortfolioGithub($login: String!) {
    user(login: $login) {
      login
      name
      bio
      avatarUrl
      url
      followers {
        totalCount
      }
      following {
        totalCount
      }
      repositories(ownerAffiliations: OWNER, isFork: false) {
        totalCount
      }
      pinnedItems(first: 6, types: [REPOSITORY]) {
        nodes {
          ... on Repository {
            name
            description
            url
            stargazerCount
            forkCount
            primaryLanguage {
              name
            }
          }
        }
      }
      topRepos: repositories(
        first: 20
        ownerAffiliations: OWNER
        isFork: false
        privacy: PUBLIC
        orderBy: { field: STARGAZERS, direction: DESC }
      ) {
        nodes {
          name
          description
          url
          stargazerCount
          forkCount
          primaryLanguage {
            name
          }
        }
      }
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

interface GraphqlRepoNode {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: { name: string } | null;
}

interface GraphqlResponse {
  data?: {
    user: {
      login: string;
      name: string | null;
      bio: string | null;
      avatarUrl: string;
      url: string;
      followers: { totalCount: number };
      following: { totalCount: number };
      repositories: { totalCount: number };
      pinnedItems: { nodes: GraphqlRepoNode[] };
      topRepos: { nodes: GraphqlRepoNode[] };
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: {
            contributionDays: { date: string; contributionCount: number }[];
          }[];
        };
      };
    } | null;
  };
  errors?: { message: string }[];
}

function toRepoSummary(node: GraphqlRepoNode): GithubRepoSummary {
  return {
    name: node.name,
    description: node.description,
    url: node.url,
    stars: node.stargazerCount,
    forks: node.forkCount,
    language: node.primaryLanguage?.name ?? null,
  };
}

async function fetchViaGraphql(
  username: string,
  token: string
): Promise<GithubData> {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: GRAPHQL_QUERY,
      variables: { login: username },
    }),
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!res.ok) {
    throw new Error(`GitHub GraphQL request failed (${res.status})`);
  }

  const json: GraphqlResponse = await res.json();
  if (json.errors?.length || !json.data?.user) {
    throw new Error(json.errors?.[0]?.message ?? "GitHub GraphQL returned no user");
  }

  const user = json.data.user;
  const days = user.contributionsCollection.contributionCalendar.weeks.flatMap(
    (week) =>
      week.contributionDays.map((d) => ({
        date: d.date,
        count: d.contributionCount,
      }))
  );

  return {
    ok: true,
    profile: {
      login: user.login,
      name: user.name,
      bio: user.bio,
      avatarUrl: user.avatarUrl,
      htmlUrl: user.url,
      followers: user.followers.totalCount,
      following: user.following.totalCount,
      publicRepos: user.repositories.totalCount,
    },
    topLanguages: summarizeLanguages(
      user.topRepos.nodes.map((n) => n.primaryLanguage?.name ?? null)
    ),
    topRepos: user.topRepos.nodes.slice(0, 6).map(toRepoSummary),
    pinnedRepos: user.pinnedItems.nodes.map(toRepoSummary),
    contributions: {
      total: user.contributionsCollection.contributionCalendar.totalContributions,
      days,
    },
    fetchedAt: new Date().toISOString(),
  };
}

export async function getGithubData(): Promise<GithubData> {
  const username = process.env.GITHUB_USERNAME;
  if (!username) {
    return { ok: false, error: "GITHUB_USERNAME is not configured." };
  }

  const token = process.env.GITHUB_TOKEN;

  try {
    if (token) {
      return await fetchViaGraphql(username, token);
    }
    return await fetchViaRest(username);
  } catch (graphqlError) {
    if (token) {
      try {
        return await fetchViaRest(username);
      } catch (restError) {
        return {
          ok: false,
          error:
            restError instanceof Error ? restError.message : "GitHub fetch failed.",
        };
      }
    }
    return {
      ok: false,
      error:
        graphqlError instanceof Error
          ? graphqlError.message
          : "GitHub fetch failed.",
    };
  }
}
