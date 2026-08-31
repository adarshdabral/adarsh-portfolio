"use client";

import { useState, type FormEvent } from "react";
import { Lock } from "lucide-react";

import Ash from "@/components/os/Ash";

export default function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: String(data.get("username") ?? ""),
          password: String(data.get("password") ?? ""),
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error ?? "Login failed.");
      }
      onSuccess();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Login failed.");
    }
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-6">
      <Ash size={56} pose="thinking" />
      <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-3">
        <div className="flex items-center justify-center gap-1.5 text-xs text-neutral-500">
          <Lock className="h-3.5 w-3.5" /> Admin sign-in
        </div>
        <input
          name="username"
          placeholder="Username"
          autoComplete="username"
          required
          className="w-full rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-800 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          required
          className="w-full rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-800 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
        />
        {status === "error" && <p className="text-xs text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded-md bg-slate-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
        >
          {status === "submitting" ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
