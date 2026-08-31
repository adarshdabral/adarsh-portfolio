"use client";

import { Plus, Trash2, Save } from "lucide-react";

import { useCmsContent } from "@/lib/use-cms-content";
import { toSpotifyEmbedUrl } from "@/lib/spotify";
import type { MusicContent, MusicTrack } from "@/lib/content-types";
import { inputClass, cardClass, primaryButtonClass, secondaryButtonClass } from "./shared";

export default function MusicEditor() {
  const { state, updateLocal, save, saveStatus, saveError } =
    useCmsContent<MusicContent>("music");

  if (state.status === "error") {
    return <div className="p-5 text-xs text-red-500">{state.error}</div>;
  }
  if (state.status === "loading") {
    return (
      <div className="flex h-full items-center justify-center text-xs text-neutral-400">
        Loading...
      </div>
    );
  }

  const content = state.data;

  function updateTrack(index: number, patch: Partial<MusicTrack>) {
    updateLocal((prev) => ({
      ...prev,
      tracks: prev.tracks.map((t, i) => (i === index ? { ...t, ...patch } : t)),
    }));
  }

  function removeTrack(index: number) {
    updateLocal((prev) => ({
      ...prev,
      tracks: prev.tracks.filter((_, i) => i !== index),
    }));
  }

  function addTrack() {
    updateLocal((prev) => ({
      ...prev,
      tracks: [
        ...prev.tracks,
        { id: `track-${Date.now()}`, title: "", artist: "", spotifyUrl: "" },
      ],
    }));
  }

  function handleSave() {
    save(content);
  }

  return (
    <div className="h-full overflow-auto p-4">
      <p className="mb-3 text-xs text-neutral-400">
        Paste any open.spotify.com track / album / playlist link — it plays inline
        in the Music app via Spotify&apos;s embed player.
      </p>

      <div className="space-y-3">
        {content.tracks.map((track, i) => {
          const embedUrl = toSpotifyEmbedUrl(track.spotifyUrl);
          return (
            <div key={track.id} className={cardClass}>
              <div className="grid grid-cols-2 gap-2">
                <input
                  value={track.title}
                  onChange={(e) => updateTrack(i, { title: e.target.value })}
                  placeholder="Title"
                  className={inputClass}
                />
                <input
                  value={track.artist}
                  onChange={(e) => updateTrack(i, { artist: e.target.value })}
                  placeholder="Artist"
                  className={inputClass}
                />
                <input
                  value={track.spotifyUrl}
                  onChange={(e) => updateTrack(i, { spotifyUrl: e.target.value })}
                  placeholder="https://open.spotify.com/track/..."
                  className={`${inputClass} col-span-2`}
                />
              </div>
              {track.spotifyUrl && !embedUrl && (
                <p className="mt-1.5 text-xs text-red-500">
                  Doesn&apos;t look like a valid open.spotify.com link.
                </p>
              )}
              <button
                type="button"
                onClick={() => removeTrack(i)}
                className="mt-2 flex items-center gap-1 text-xs text-red-500 hover:underline"
              >
                <Trash2 className="h-3.5 w-3.5" /> Remove
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button type="button" onClick={addTrack} className={secondaryButtonClass}>
          <Plus className="h-3.5 w-3.5" /> Add track
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={saveStatus === "saving"}
          className={primaryButtonClass}
        >
          <Save className="h-3.5 w-3.5" />
          {saveStatus === "saving" ? "Saving..." : "Save changes"}
        </button>
        {saveStatus === "saved" && (
          <span className="text-xs text-emerald-600">Saved</span>
        )}
        {saveStatus === "error" && (
          <span className="text-xs text-red-500">{saveError}</span>
        )}
      </div>
    </div>
  );
}
