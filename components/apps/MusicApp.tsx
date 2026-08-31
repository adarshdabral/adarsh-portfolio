import Ash from "@/components/os/Ash";
import musicContent from "@/content/music.json";
import { toSpotifyEmbedUrl } from "@/lib/spotify";
import type { MusicContent } from "@/lib/content-types";

const { tracks } = musicContent as MusicContent;

export default function MusicApp() {
  if (tracks.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
        <Ash size={64} pose="thinking" />
        <p className="font-pixel text-xs text-neutral-500">Music</p>
        <p className="max-w-xs text-sm text-neutral-400">
          No tracks yet — add Spotify links in the Admin CMS.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full space-y-3 overflow-auto p-4">
      {tracks.map((track) => {
        const embedUrl = toSpotifyEmbedUrl(track.spotifyUrl);
        return (
          <div key={track.id}>
            {(track.title || track.artist) && (
              <p className="mb-1 truncate text-xs font-medium text-neutral-500">
                {track.title}
                {track.title && track.artist ? " — " : ""}
                {track.artist}
              </p>
            )}
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={track.title || "Spotify player"}
                width="100%"
                height="152"
                style={{ borderRadius: 12 }}
                sandbox="allow-scripts allow-same-origin allow-popups"
                loading="lazy"
              />
            ) : (
              <p className="text-xs text-red-500">Invalid Spotify link.</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
