"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Ash from "./Ash";

const BOOT_LINES = [
  "Initializing kernel...",
  "Mounting /projects...",
  "Loading personality module...",
  "Starting AshOS...",
];

const BOOT_DURATION_MS = 2200;
const GREETING_DURATION_MS = 1400;

export default function Boot({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"boot" | "greet">("boot");

  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / BOOT_DURATION_MS) * 100));
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(id);
        setPhase("greet");
      }
    }, 40);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (phase !== "greet") return;
    const t = setTimeout(onDone, GREETING_DURATION_MS);
    return () => clearTimeout(t);
  }, [phase, onDone]);

  const lineIndex = Math.min(
    BOOT_LINES.length - 1,
    Math.floor((progress / 100) * BOOT_LINES.length)
  );

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6 bg-neutral-950 text-neutral-100"
    >
      <AnimatePresence mode="wait">
        {phase === "boot" ? (
          <motion.div
            key="boot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex w-72 flex-col items-center gap-4"
          >
            <p className="font-pixel text-sm tracking-wide text-blue-400">
              AshOS
            </p>
            <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-800">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-violet-500 to-rose-400 transition-[width] duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="font-mono text-xs text-neutral-400">
              {BOOT_LINES[lineIndex]}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="greet"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-3"
          >
            <Ash size={96} pose="wave" />
            <p className="font-pixel text-xs text-blue-300">
              hey, I&apos;m Ash - welcome in.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
