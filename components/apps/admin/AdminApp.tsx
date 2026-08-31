"use client";

import { useEffect, useState } from "react";

import LoginForm from "./LoginForm";
import AdminShell from "./AdminShell";

type AuthState = "checking" | "guest" | "authed";

export default function AdminApp() {
  const [authState, setAuthState] = useState<AuthState>("checking");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((json) => {
        if (!cancelled) setAuthState(json.authenticated ? "authed" : "guest");
      })
      .catch(() => {
        if (!cancelled) setAuthState("guest");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (authState === "checking") {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600" />
      </div>
    );
  }

  if (authState === "guest") {
    return <LoginForm onSuccess={() => setAuthState("authed")} />;
  }

  return <AdminShell onLogout={() => setAuthState("guest")} />;
}
