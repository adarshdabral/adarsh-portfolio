import { create } from "zustand";
import type { AppId, Bounds, WindowInstance } from "./types";
import { getApp } from "./apps";

let windowCounter = 0;
const nextWindowId = () => `win-${++windowCounter}-${Date.now()}`;

function cascadeOffset(index: number) {
  const step = 28;
  const max = 6;
  const n = index % max;
  return { dx: n * step, dy: n * step };
}

interface WindowStore {
  windows: WindowInstance[];
  topZIndex: number;
  openWindow: (appId: AppId) => void;
  closeWindow: (windowId: string) => void;
  focusWindow: (windowId: string) => void;
  minimizeWindow: (windowId: string) => void;
  toggleMaximize: (windowId: string) => void;
  updateBounds: (windowId: string, bounds: Bounds) => void;
  restoreWindow: (windowId: string) => void;
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [],
  topZIndex: 1,

  openWindow: (appId) => {
    const existing = get().windows.find((w) => w.appId === appId);
    if (existing) {
      set((state) => ({
        topZIndex: state.topZIndex + 1,
        windows: state.windows.map((w) =>
          w.windowId === existing.windowId
            ? { ...w, minimized: false, zIndex: state.topZIndex + 1 }
            : w
        ),
      }));
      return;
    }

    const app = getApp(appId);
    if (!app) return;

    const openCount = get().windows.length;
    const { dx, dy } = cascadeOffset(openCount);
    const baseX =
      typeof window !== "undefined"
        ? Math.max(24, window.innerWidth / 2 - app.defaultSize.width / 2)
        : 120;
    const baseY =
      typeof window !== "undefined"
        ? Math.max(48, window.innerHeight / 2 - app.defaultSize.height / 2 - 20)
        : 80;

    const instance: WindowInstance = {
      windowId: nextWindowId(),
      appId: app.id,
      title: app.title,
      bounds: {
        x: baseX + dx,
        y: baseY + dy,
        width: app.defaultSize.width,
        height: app.defaultSize.height,
      },
      prevBounds: null,
      minimized: false,
      maximized: false,
      zIndex: get().topZIndex + 1,
    };

    set((state) => ({
      windows: [...state.windows, instance],
      topZIndex: state.topZIndex + 1,
    }));
  },

  closeWindow: (windowId) => {
    set((state) => ({
      windows: state.windows.filter((w) => w.windowId !== windowId),
    }));
  },

  focusWindow: (windowId) => {
    set((state) => ({
      topZIndex: state.topZIndex + 1,
      windows: state.windows.map((w) =>
        w.windowId === windowId ? { ...w, zIndex: state.topZIndex + 1 } : w
      ),
    }));
  },

  minimizeWindow: (windowId) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.windowId === windowId ? { ...w, minimized: true } : w
      ),
    }));
  },

  restoreWindow: (windowId) => {
    set((state) => ({
      topZIndex: state.topZIndex + 1,
      windows: state.windows.map((w) =>
        w.windowId === windowId
          ? { ...w, minimized: false, zIndex: state.topZIndex + 1 }
          : w
      ),
    }));
  },

  toggleMaximize: (windowId) => {
    set((state) => ({
      windows: state.windows.map((w) => {
        if (w.windowId !== windowId) return w;
        if (w.maximized) {
          return {
            ...w,
            maximized: false,
            bounds: w.prevBounds ?? w.bounds,
            prevBounds: null,
          };
        }
        const width =
          typeof window !== "undefined" ? window.innerWidth - 32 : w.bounds.width;
        const height =
          typeof window !== "undefined"
            ? window.innerHeight - 96
            : w.bounds.height;
        return {
          ...w,
          maximized: true,
          prevBounds: w.bounds,
          bounds: { x: 16, y: 40, width, height },
        };
      }),
    }));
  },

  updateBounds: (windowId, bounds) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.windowId === windowId ? { ...w, bounds } : w
      ),
    }));
  },
}));
