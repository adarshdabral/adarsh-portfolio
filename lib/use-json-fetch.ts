"use client";

import { useEffect, useState } from "react";

type FetchState<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error" };

export function useJsonFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        return res.json() as Promise<T>;
      })
      .then((data) => {
        if (!cancelled) setState({ status: "success", data });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error" });
      });

    return () => {
      cancelled = true;
    };
  }, [url]);

  return state;
}
