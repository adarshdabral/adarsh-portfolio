import type { ComponentType, CSSProperties } from "react";

export type AppId =
  | "professional"
  | "publications"
  | "projects"
  | "music"
  | "gallery"
  | "books"
  | "journal"
  | "about"
  | "contact"
  | "admin";

export interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface AppDefinition {
  id: AppId;
  title: string;
  icon: ComponentType<{ className?: string; style?: CSSProperties }>;
  component: ComponentType;
  defaultSize: { width: number; height: number };
  minSize?: { width: number; height: number };
  /** Per-app accent color (hex). Drives icon tint and the window's accent bar. */
  accent: string;
}

export interface WindowInstance {
  windowId: string;
  appId: AppId;
  title: string;
  bounds: Bounds;
  prevBounds: Bounds | null;
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
}
