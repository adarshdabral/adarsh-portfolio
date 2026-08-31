import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { AppId } from "./types";

export interface IconPosition {
  x: number;
  y: number;
}

const ROW_HEIGHT = 132;
const COL_WIDTH = 112;
const START_X = 24;
const START_Y = 16;
const ROWS_PER_COLUMN = 5;

export function defaultIconPosition(index: number): IconPosition {
  const col = Math.floor(index / ROWS_PER_COLUMN);
  const row = index % ROWS_PER_COLUMN;
  return { x: START_X + col * COL_WIDTH, y: START_Y + row * ROW_HEIGHT };
}

interface IconLayoutStore {
  positions: Partial<Record<AppId, IconPosition>>;
  setPosition: (appId: AppId, position: IconPosition) => void;
}

export const useIconLayoutStore = create<IconLayoutStore>()(
  persist(
    (set) => ({
      positions: {},
      setPosition: (appId, position) =>
        set((state) => ({ positions: { ...state.positions, [appId]: position } })),
    }),
    { name: "ashos-icon-layout" }
  )
);
