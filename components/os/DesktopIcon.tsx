"use client";

import { useRef, useState } from "react";

import type { AppDefinition } from "@/lib/os/types";
import { useWindowStore } from "@/lib/os/window-store";
import { useIconLayoutStore, defaultIconPosition } from "@/lib/os/icon-layout-store";

const ICON_FOOTPRINT_WIDTH = 104;
const ICON_FOOTPRINT_HEIGHT = 116;
const DRAG_THRESHOLD = 3;

export default function DesktopIcon({
  app,
  index,
  bounds,
}: {
  app: AppDefinition;
  index: number;
  bounds: { width: number; height: number };
}) {
  const openWindow = useWindowStore((s) => s.openWindow);
  const storedPosition = useIconLayoutStore((s) => s.positions[app.id]);
  const setPosition = useIconLayoutStore((s) => s.setPosition);
  const position = storedPosition ?? defaultIconPosition(index);
  const Icon = app.icon;

  const dragState = useRef<{
    startX: number;
    startY: number;
    origX: number;
    origY: number;
    moved: boolean;
  } | null>(null);
  const [dragging, setDragging] = useState(false);

  function clamp(x: number, y: number) {
    return {
      x: Math.min(Math.max(x, 4), Math.max(4, bounds.width - ICON_FOOTPRINT_WIDTH)),
      y: Math.min(Math.max(y, 4), Math.max(4, bounds.height - ICON_FOOTPRINT_HEIGHT)),
    };
  }

  function handlePointerDown(e: React.PointerEvent<HTMLButtonElement>) {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragState.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: position.x,
      origY: position.y,
      moved: false,
    };
  }

  function handlePointerMove(e: React.PointerEvent<HTMLButtonElement>) {
    const drag = dragState.current;
    if (!drag) return;
    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    if (!drag.moved && Math.hypot(dx, dy) > DRAG_THRESHOLD) {
      drag.moved = true;
      setDragging(true);
    }
    if (drag.moved) {
      setPosition(app.id, clamp(drag.origX + dx, drag.origY + dy));
    }
  }

  function handlePointerUp(e: React.PointerEvent<HTMLButtonElement>) {
    e.currentTarget.releasePointerCapture(e.pointerId);
    dragState.current = null;
    setDragging(false);
  }

  return (
    <button
      type="button"
      onDoubleClick={() => openWindow(app.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter") openWindow(app.id);
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        touchAction: "none",
      }}
      className={`flex w-24 select-none flex-col items-center gap-1.5 rounded-lg p-2 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
        dragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      aria-label={`${app.title} - drag to move, double-click or press Enter to open`}
    >
      <span
        className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/90 shadow-md ring-1 ring-black/5 dark:bg-neutral-800/90"
        style={{ boxShadow: `0 0 0 1px ${app.accent}22, 0 2px 6px rgba(0,0,0,0.15)` }}
      >
        <Icon className="h-10 w-10" />
      </span>
      <span
        className="line-clamp-2 text-xs font-medium text-white"
        style={{ textShadow: "0 1px 2px rgba(0,0,0,0.55), 0 0 6px rgba(0,0,0,0.25)" }}
      >
        {app.title}
      </span>
    </button>
  );
}
