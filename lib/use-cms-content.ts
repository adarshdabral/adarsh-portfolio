"use client";

import { useCallback, useEffect, useState } from "react";

type LoadState<T> =
  | { status: "loading" }
  | { status: "ready"; data: T }
  | { status: "error"; error: string };

type SaveStatus = "idle" | "saving" | "saved" | "error";

export function useCmsContent<T>(type: string) {
  const [state, setState] = useState<LoadState<T>>({ status: "loading" });
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(`/api/cms/${type}`)
      .then((res) => res.json())
      .then((json) => {
        if (cancelled) return;
        if (json.ok) setState({ status: "ready", data: json.data as T });
        else setState({ status: "error", error: json.error ?? "Failed to load." });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error", error: "Failed to load." });
      });

    return () => {
      cancelled = true;
    };
  }, [type]);

  /** Edit the in-memory copy without hitting the network (e.g. as the user types). */
  const updateLocal = useCallback((updater: (prev: T) => T) => {
    setState((prev) =>
      prev.status === "ready" ? { status: "ready", data: updater(prev.data) } : prev
    );
  }, []);

  const save = useCallback(
    async (data: T) => {
      setSaveStatus("saving");
      setSaveError(null);
      try {
        const res = await fetch(`/api/cms/${type}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const json = await res.json();
        if (!res.ok || !json.ok) {
          throw new Error(json.error ?? "Save failed.");
        }
        setState({ status: "ready", data });
        setSaveStatus("saved");
        setTimeout(() => {
          setSaveStatus((s) => (s === "saved" ? "idle" : s));
        }, 2000);
      } catch (err) {
        setSaveStatus("error");
        setSaveError(err instanceof Error ? err.message : "Save failed.");
      }
    },
    [type]
  );

  return { state, updateLocal, save, saveStatus, saveError };
}
