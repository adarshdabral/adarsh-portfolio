const SPOTIFY_URL_RE =
  /open\.spotify\.com\/(?:intl-[a-z-]+\/)?(track|album|playlist|artist|episode|show)\/([a-zA-Z0-9]+)/;

/** Turns any open.spotify.com link into its embeddable iframe URL, or null if unrecognized. */
export function toSpotifyEmbedUrl(url: string): string | null {
  const match = url.match(SPOTIFY_URL_RE);
  if (!match) return null;
  const [, type, id] = match;
  return `https://open.spotify.com/embed/${type}/${id}?utm_source=generate&theme=0`;
}
