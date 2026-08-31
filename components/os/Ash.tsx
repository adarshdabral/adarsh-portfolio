"use client";

import { motion } from "framer-motion";

export type AshPose = "idle" | "wave" | "thinking" | "sleep" | "excited";

interface AshProps {
  size?: number;
  pose?: AshPose;
  className?: string;
  animate?: boolean;
}

/**
 * Ash — the site's mascot. A single reusable sprite so the same character
 * shows up at boot, in empty states, and as a helper elsewhere.
 */
export default function Ash({
  size = 96,
  pose = "idle",
  className,
  animate = true,
}: AshProps) {
  const eyesClosed = pose === "sleep";
  const eyesHappy = pose === "excited" || pose === "wave";

  return (
    <motion.svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={`Ash the mascot, ${pose}`}
      animate={
        animate
          ? { y: [0, -6, 0] }
          : undefined
      }
      transition={
        animate
          ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
          : undefined
      }
    >
      <defs>
        <linearGradient id="ash-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
      </defs>

      {/* body */}
      <path
        d="M60 12c26 0 44 18 44 42 0 20-10 34-16 46-4 8-14 8-18 8h-20c-4 0-14 0-18-8-6-12-16-26-16-46 0-24 18-42 44-42Z"
        fill="url(#ash-body)"
      />

      {/* cheeks */}
      <circle cx="34" cy="70" r="6" fill="#93c5fd" opacity="0.55" />
      <circle cx="86" cy="70" r="6" fill="#93c5fd" opacity="0.55" />

      {/* eyes */}
      {eyesClosed ? (
        <g stroke="#ffffff" strokeWidth={3} strokeLinecap="round">
          <path d="M38 56q6 6 12 0" fill="none" />
          <path d="M70 56q6 6 12 0" fill="none" />
        </g>
      ) : (
        <g fill="#ffffff">
          <circle cx="44" cy="56" r={eyesHappy ? 5.5 : 5} />
          <circle cx="76" cy="56" r={eyesHappy ? 5.5 : 5} />
        </g>
      )}

      {/* mouth */}
      {pose === "thinking" ? (
        <circle cx="60" cy="76" r="3.5" fill="#ffffff" />
      ) : (
        <path
          d={
            eyesHappy
              ? "M46 74q14 14 28 0"
              : "M48 76q12 8 24 0"
          }
          stroke="#ffffff"
          strokeWidth={3}
          strokeLinecap="round"
          fill="none"
        />
      )}

      {/* antenna */}
      <line x1="60" y1="12" x2="60" y2="2" stroke="#1e3a8a" strokeWidth={3} />
      <circle cx="60" cy="2" r="3.5" fill="#60a5fa" />

      {/* waving arm */}
      {pose === "wave" && (
        <motion.path
          d="M96 66c8-2 14-10 12-16"
          stroke="#1e3a8a"
          strokeWidth={5}
          strokeLinecap="round"
          fill="none"
          animate={{ rotate: [0, 18, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "96px 66px" }}
        />
      )}
    </motion.svg>
  );
}
