"use client";

import { useEffect, useState } from "react";

export default function MenuBar({ activeTitle }: { activeTitle?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[9999] flex h-8 items-center justify-between border-b border-neutral-300/60 bg-white/80 px-4 backdrop-blur-md dark:border-neutral-700/60 dark:bg-neutral-900/80">
      <div className="flex items-center gap-2 font-pixel text-[10px] text-blue-700 dark:text-blue-400">
        <span className="h-2 w-2 rounded-full bg-blue-600" aria-hidden="true" />
        AshOS
      </div>
      <p className="truncate text-xs text-neutral-500 dark:text-neutral-400">
        {activeTitle ?? ""}
      </p>
      <p className="font-mono text-xs tabular-nums text-neutral-600 dark:text-neutral-300">
        {time ?? "--:--"}
      </p>
    </div>
  );
}
