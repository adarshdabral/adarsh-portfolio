"use client";

import { useState } from "react";
import { Rnd } from "react-rnd";
import { motion } from "framer-motion";

import { useWindowStore } from "@/lib/os/window-store";
import { getApp } from "@/lib/os/apps";
import type { WindowInstance } from "@/lib/os/types";

export default function Window({ instance }: { instance: WindowInstance }) {
  const app = getApp(instance.appId);
  const focusWindow = useWindowStore((s) => s.focusWindow);
  const closeWindow = useWindowStore((s) => s.closeWindow);
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow);
  const toggleMaximize = useWindowStore((s) => s.toggleMaximize);
  const updateBounds = useWindowStore((s) => s.updateBounds);
  const [closing, setClosing] = useState(false);

  if (!app || instance.minimized) return null;

  const Content = app.component;

  return (
    <Rnd
      size={{ width: instance.bounds.width, height: instance.bounds.height }}
      position={{ x: instance.bounds.x, y: instance.bounds.y }}
      minWidth={app.minSize?.width ?? 280}
      minHeight={app.minSize?.height ?? 200}
      bounds="parent"
      dragHandleClassName="window-drag-handle"
      disableDragging={instance.maximized}
      enableResizing={!instance.maximized}
      style={{ zIndex: instance.zIndex, pointerEvents: "auto" }}
      onDragStop={(_, data) =>
        updateBounds(instance.windowId, {
          ...instance.bounds,
          x: data.x,
          y: data.y,
        })
      }
      onResizeStop={(_e, _dir, ref, _delta, pos) => {
        updateBounds(instance.windowId, {
          x: pos.x,
          y: pos.y,
          width: ref.offsetWidth,
          height: ref.offsetHeight,
        });
      }}
      onMouseDown={() => focusWindow(instance.windowId)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 10 }}
        animate={
          closing
            ? { opacity: 0, scale: 0.94, y: 10 }
            : { opacity: 1, scale: 1, y: 0 }
        }
        transition={{ duration: 0.16, ease: "easeOut" }}
        onAnimationComplete={() => {
          if (closing) closeWindow(instance.windowId);
        }}
        className="flex h-full w-full flex-col overflow-hidden rounded-lg border border-neutral-300 bg-white shadow-2xl dark:border-neutral-700 dark:bg-neutral-900"
      >
        <div className="h-1 shrink-0" style={{ backgroundColor: app.accent }} />
        <div
          className="window-drag-handle flex shrink-0 cursor-grab items-center justify-between border-b border-neutral-300 bg-gradient-to-b from-neutral-100 to-neutral-200 px-3 py-2 active:cursor-grabbing dark:border-neutral-700 dark:from-neutral-800 dark:to-neutral-900"
          onDoubleClick={() => toggleMaximize(instance.windowId)}
        >
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Close window"
              onClick={() => setClosing(true)}
              className="h-3 w-3 rounded-full bg-red-500 transition hover:brightness-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            />
            <button
              type="button"
              aria-label="Minimize window"
              onClick={() => minimizeWindow(instance.windowId)}
              className="h-3 w-3 rounded-full bg-yellow-400 transition hover:brightness-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            />
            <button
              type="button"
              aria-label={instance.maximized ? "Restore window" : "Maximize window"}
              onClick={() => toggleMaximize(instance.windowId)}
              className="h-3 w-3 rounded-full bg-green-500 transition hover:brightness-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            />
          </div>
          <p className="font-pixel select-none truncate text-[10px] text-neutral-600 dark:text-neutral-300">
            {instance.title}
          </p>
          <div className="w-10 shrink-0" />
        </div>
        <div className="flex-1 overflow-auto">
          <Content />
        </div>
      </motion.div>
    </Rnd>
  );
}
