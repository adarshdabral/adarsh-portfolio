"use client";

import { Download, Mail } from "lucide-react";

import { DOCK_APPS, ADMIN_APP } from "@/lib/os/apps";
import { useWindowStore } from "@/lib/os/window-store";
import socialLinks from "@/content/social-links.json";
import iconVisibility from "@/content/icons.json";
import { SOCIAL_ICONS } from "@/lib/social-icons";
import type { SocialLinksContent, IconVisibilityContent } from "@/lib/content-types";

const { links: allLinks, resumeUrl } = socialLinks as SocialLinksContent;
const links = allLinks.filter((link) => link.visible !== false);
const { apps: appVisibility } = iconVisibility as IconVisibilityContent;
const VISIBLE_DOCK_APPS = DOCK_APPS.filter((app) => appVisibility[app.id] !== false);

const chip =
  "flex h-11 w-11 items-center justify-center rounded-xl bg-white/70 shadow-sm ring-1 ring-black/5 transition group-hover:bg-white/90 dark:bg-neutral-800/60 dark:ring-white/10 dark:group-hover:bg-neutral-800/90";

export default function Dock() {
  const windows = useWindowStore((s) => s.windows);
  const openWindow = useWindowStore((s) => s.openWindow);

  return (
    <nav
      aria-label="Dock"
      className="fixed inset-x-0 bottom-3 z-[9999] flex justify-center px-2"
    >
      <div className="flex items-end gap-1.5 overflow-x-auto rounded-2xl border border-white/40 bg-indigo-100/60 px-3 py-2 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-neutral-900/70">
        {VISIBLE_DOCK_APPS.map((app) => {
          const isOpen = windows.some((w) => w.appId === app.id);
          const Icon = app.icon;
          return (
            <button
              key={app.id}
              type="button"
              onClick={() => openWindow(app.id)}
              aria-label={`Open ${app.title}`}
              className="group flex flex-col items-center gap-1 rounded-xl px-1 py-1 transition hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              <span className={chip}>
                <Icon className="h-8 w-8" />
              </span>
              <span
                aria-hidden="true"
                className="h-1 w-1 rounded-full transition"
                style={{ backgroundColor: isOpen ? app.accent : "transparent" }}
              />
            </button>
          );
        })}

        <div
          aria-hidden="true"
          className="mx-1 mb-1.5 h-9 w-px shrink-0 self-center bg-white/60 dark:bg-white/10"
        />

        {links.map((link) => {
          const Icon = SOCIAL_ICONS[link.icon];
          return (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="group flex items-center justify-center rounded-xl px-1 py-1 transition hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              <span className={chip}>
                <Icon className="h-7 w-7" />
              </span>
            </a>
          );
        })}

        <a
          href={resumeUrl}
          download
          aria-label="Download resume"
          className="group flex items-center justify-center rounded-xl px-1 py-1 transition hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          <span className={chip}>
            <Download className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
          </span>
        </a>

        <button
          type="button"
          onClick={() => openWindow("contact")}
          aria-label="Contact quick link"
          className="group flex items-center justify-center rounded-xl px-1 py-1 transition hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          <span className={chip}>
            <Mail className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
          </span>
        </button>

        <button
          type="button"
          onClick={() => openWindow("admin")}
          aria-label="Open Admin"
          className="group flex items-center justify-center rounded-xl px-1 py-1 transition hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          <span className={chip}>
            <ADMIN_APP.icon className="h-7 w-7 opacity-80" />
          </span>
        </button>
      </div>
    </nav>
  );
}
