"use client";

import { Save } from "lucide-react";

import { useCmsContent } from "@/lib/use-cms-content";
import { APPS } from "@/lib/os/apps";
import { SOCIAL_ICONS } from "@/lib/social-icons";
import type { IconVisibilityContent, SocialLinksContent } from "@/lib/content-types";
import { cardClass, primaryButtonClass } from "./shared";

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-5 w-9 shrink-0 rounded-full transition ${
        checked ? "bg-emerald-500" : "bg-neutral-300 dark:bg-neutral-700"
      }`}
    >
      <span
        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition ${
          checked ? "left-4" : "left-0.5"
        }`}
      />
    </button>
  );
}

function AppIconsSection() {
  const { state, updateLocal, save, saveStatus, saveError } =
    useCmsContent<IconVisibilityContent>("icons");

  if (state.status === "error") {
    return <div className="p-3 text-xs text-red-500">{state.error}</div>;
  }
  if (state.status === "loading") {
    return <div className="p-3 text-xs text-neutral-400">Loading...</div>;
  }

  const { apps } = state.data;

  function setVisible(appId: string, visible: boolean) {
    updateLocal((prev) => ({ ...prev, apps: { ...prev.apps, [appId]: visible } }));
  }

  return (
    <div>
      <h3 className="mb-2 text-xs font-semibold text-neutral-600 dark:text-neutral-300">
        App icons (Desktop &amp; Dock)
      </h3>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {APPS.map((app) => {
          const Icon = app.icon;
          const visible = apps[app.id] !== false;
          return (
            <div
              key={app.id}
              className={`${cardClass} flex items-center justify-between gap-2`}
            >
              <div className="flex min-w-0 items-center gap-2">
                <Icon className="h-6 w-6 shrink-0" />
                <span className="truncate text-xs text-neutral-700 dark:text-neutral-200">
                  {app.title}
                </span>
              </div>
              <Toggle checked={visible} onChange={(v) => setVisible(app.id, v)} />
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={() => save(state.data)}
          disabled={saveStatus === "saving"}
          className={primaryButtonClass}
        >
          <Save className="h-3.5 w-3.5" />
          {saveStatus === "saving" ? "Saving..." : "Save app icons"}
        </button>
        {saveStatus === "saved" && <span className="text-xs text-emerald-600">Saved</span>}
        {saveStatus === "error" && <span className="text-xs text-red-500">{saveError}</span>}
      </div>
    </div>
  );
}

function SocialIconsSection() {
  const { state, updateLocal, save, saveStatus, saveError } =
    useCmsContent<SocialLinksContent>("social-links");

  if (state.status === "error") {
    return <div className="p-3 text-xs text-red-500">{state.error}</div>;
  }
  if (state.status === "loading") {
    return <div className="p-3 text-xs text-neutral-400">Loading...</div>;
  }

  const { links } = state.data;

  function setVisible(index: number, visible: boolean) {
    updateLocal((prev) => ({
      ...prev,
      links: prev.links.map((l, i) => (i === index ? { ...l, visible } : l)),
    }));
  }

  return (
    <div>
      <h3 className="mb-2 text-xs font-semibold text-neutral-600 dark:text-neutral-300">
        Social icons (Dock &amp; Contact)
      </h3>
      <div className="space-y-2">
        {links.map((link, i) => {
          const Icon = SOCIAL_ICONS[link.icon];
          const visible = link.visible !== false;
          return (
            <div
              key={link.id || i}
              className={`${cardClass} flex items-center justify-between gap-2`}
            >
              <div className="flex min-w-0 items-center gap-2">
                <Icon className="h-6 w-6 shrink-0" />
                <span className="truncate text-xs text-neutral-700 dark:text-neutral-200">
                  {link.label || link.icon}
                </span>
              </div>
              <Toggle checked={visible} onChange={(v) => setVisible(i, v)} />
            </div>
          );
        })}
        {links.length === 0 && (
          <p className="text-xs text-neutral-400">
            No social links yet — add some in the Social &amp; Resume tab.
          </p>
        )}
      </div>
      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={() => save(state.data)}
          disabled={saveStatus === "saving" || links.length === 0}
          className={primaryButtonClass}
        >
          <Save className="h-3.5 w-3.5" />
          {saveStatus === "saving" ? "Saving..." : "Save social icons"}
        </button>
        {saveStatus === "saved" && <span className="text-xs text-emerald-600">Saved</span>}
        {saveStatus === "error" && <span className="text-xs text-red-500">{saveError}</span>}
      </div>
    </div>
  );
}

export default function IconsEditor() {
  return (
    <div className="h-full space-y-5 overflow-auto p-4">
      <p className="text-xs text-neutral-400">
        Hide an icon to pull it off the Desktop/Dock without deleting it — flip it back on
        any time. To permanently remove a social link, delete it in Social &amp; Resume
        instead.
      </p>
      <AppIconsSection />
      <div className="border-t border-neutral-200 pt-4 dark:border-neutral-800">
        <SocialIconsSection />
      </div>
    </div>
  );
}
