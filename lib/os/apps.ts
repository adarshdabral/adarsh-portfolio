import {
  ProfessionalIcon,
  PublicationsIcon,
  ProjectsIcon,
  MusicIcon,
  GalleryIcon,
  BooksIcon,
  JournalIcon,
  AboutIcon,
  ContactIcon,
  AdminIcon,
} from "@/components/os/icons/AppPixelIcons";

import ProfessionalApp from "@/components/apps/ProfessionalApp";
import PublicationsApp from "@/components/apps/PublicationsApp";
import ProjectsApp from "@/components/apps/ProjectsApp";
import MusicApp from "@/components/apps/MusicApp";
import GalleryApp from "@/components/apps/GalleryApp";
import BooksApp from "@/components/apps/BooksApp";
import JournalApp from "@/components/apps/JournalApp";
import AboutApp from "@/components/apps/AboutApp";
import ContactApp from "@/components/apps/ContactApp";
import AdminApp from "@/components/apps/admin/AdminApp";

import type { AppDefinition, AppId } from "./types";

export const APPS: AppDefinition[] = [
  {
    id: "professional",
    title: "Professional",
    icon: ProfessionalIcon,
    component: ProfessionalApp,
    defaultSize: { width: 720, height: 480 },
    minSize: { width: 420, height: 320 },
    accent: "#2563eb",
  },
  {
    id: "publications",
    title: "Publications / Authored",
    icon: PublicationsIcon,
    component: PublicationsApp,
    defaultSize: { width: 660, height: 560 },
    minSize: { width: 380, height: 320 },
    accent: "#7c3aed",
  },
  {
    id: "projects",
    title: "Projects",
    icon: ProjectsIcon,
    component: ProjectsApp,
    defaultSize: { width: 700, height: 540 },
    minSize: { width: 400, height: 320 },
    accent: "#ea580c",
  },
  {
    id: "music",
    title: "Music",
    icon: MusicIcon,
    component: MusicApp,
    defaultSize: { width: 480, height: 440 },
    minSize: { width: 340, height: 320 },
    accent: "#db2777",
  },
  {
    id: "gallery",
    title: "Gallery",
    icon: GalleryIcon,
    component: GalleryApp,
    defaultSize: { width: 640, height: 460 },
    minSize: { width: 380, height: 320 },
    accent: "#0d9488",
  },
  {
    id: "books",
    title: "Books",
    icon: BooksIcon,
    component: BooksApp,
    defaultSize: { width: 560, height: 460 },
    minSize: { width: 360, height: 320 },
    accent: "#d97706",
  },
  {
    id: "journal",
    title: "Journal",
    icon: JournalIcon,
    component: JournalApp,
    defaultSize: { width: 640, height: 580 },
    minSize: { width: 380, height: 320 },
    accent: "#059669",
  },
  {
    id: "about",
    title: "About Me",
    icon: AboutIcon,
    component: AboutApp,
    defaultSize: { width: 520, height: 440 },
    minSize: { width: 340, height: 320 },
    accent: "#4f46e5",
  },
  {
    id: "contact",
    title: "Contact",
    icon: ContactIcon,
    component: ContactApp,
    defaultSize: { width: 480, height: 420 },
    minSize: { width: 340, height: 300 },
    accent: "#e11d48",
  },
];

// Utility app, deliberately left out of APPS: it should not appear in the
// desktop icon grid or the main dock launcher row. Dock.tsx wires up its own
// dedicated lock-icon trigger for it.
export const ADMIN_APP: AppDefinition = {
  id: "admin",
  title: "Admin",
  icon: AdminIcon,
  component: AdminApp,
  defaultSize: { width: 760, height: 560 },
  minSize: { width: 440, height: 380 },
  accent: "#475569",
};

export function getApp(id: AppId): AppDefinition | undefined {
  if (id === "admin") return ADMIN_APP;
  return APPS.find((app) => app.id === id);
}

// The dock stays to a handful of apps so it doesn't turn into a second copy
// of the desktop. Every app (including the ones left out here) still has a
// colorful icon + label on the desktop itself.
const DOCK_APP_IDS: AppId[] = ["professional", "projects", "publications", "journal", "music"];

export const DOCK_APPS: AppDefinition[] = DOCK_APP_IDS.map(
  (id) => APPS.find((app) => app.id === id)!
);
