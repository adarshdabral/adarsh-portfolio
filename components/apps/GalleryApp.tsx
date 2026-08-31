"use client";

import { useState } from "react";
import { X } from "lucide-react";

import Ash from "@/components/os/Ash";
import galleryContent from "@/content/gallery.json";
import type { GalleryContent } from "@/lib/content-types";

const { images } = galleryContent as GalleryContent;

export default function GalleryApp() {
  const [selected, setSelected] = useState<number | null>(null);

  if (images.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
        <Ash size={64} pose="thinking" />
        <p className="font-pixel text-xs text-neutral-500">Gallery</p>
        <p className="max-w-xs text-sm text-neutral-400">
          No images yet — upload some in the Admin CMS.
        </p>
      </div>
    );
  }

  const active = selected !== null ? images[selected] : null;

  return (
    <div className="relative h-full overflow-auto p-3">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {images.map((image, i) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setSelected(i)}
            className="group relative aspect-square overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-800"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.src}
              alt={image.caption || "Gallery image"}
              className="h-full w-full object-cover transition group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {active && (
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-black/85 p-4"
          onClick={() => setSelected(null)}
        >
          <button
            type="button"
            onClick={() => setSelected(null)}
            className="absolute right-3 top-3 text-white/70 hover:text-white"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={active.src}
            alt={active.caption || "Gallery image"}
            className="max-h-[80%] max-w-full rounded-md object-contain"
          />
          {active.caption && (
            <p className="text-center text-xs text-white/80">{active.caption}</p>
          )}
        </div>
      )}
    </div>
  );
}
