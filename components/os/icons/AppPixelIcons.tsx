import type { CSSProperties } from "react";
import { createGrid, fillRect, outlineRect, setPixel, type PixelGrid } from "@/lib/os/pixel-grid";
import { PixelIcon } from "./PixelIcon";

const INK = "#1f2937";
const GRID_SIZE = 12;

type IconProps = { className?: string; style?: CSSProperties };

function wrap(grid: PixelGrid) {
  return function Icon({ className, style }: IconProps) {
    return <PixelIcon grid={grid} className={className} style={style} />;
  };
}

// Professional — briefcase
const professionalGrid = (() => {
  const g = createGrid(GRID_SIZE);
  fillRect(g, 4, 2, 4, 1, INK);
  setPixel(g, 4, 3, INK);
  setPixel(g, 7, 3, INK);
  fillRect(g, 1, 4, 10, 7, "#2563eb");
  outlineRect(g, 1, 4, 10, 7, INK);
  fillRect(g, 2, 5, 8, 1, "#60a5fa");
  fillRect(g, 1, 7, 10, 1, "#1e3a8a");
  fillRect(g, 5, 6, 2, 2, "#fbbf24");
  return g;
})();

// Publications — book with a bookmark ribbon
const publicationsGrid = (() => {
  const g = createGrid(GRID_SIZE);
  fillRect(g, 2, 1, 8, 10, "#7c3aed");
  outlineRect(g, 2, 1, 8, 10, INK);
  fillRect(g, 9, 2, 1, 8, "#f5f3ff");
  fillRect(g, 2, 1, 1, 10, "#4c1d95");
  fillRect(g, 6, 0, 1, 4, "#e11d48");
  fillRect(g, 4, 4, 4, 1, "#c4b5fd");
  fillRect(g, 4, 6, 4, 1, "#c4b5fd");
  return g;
})();

// Projects — toolbox (stubby handle + silver tray band, distinct from the briefcase)
const projectsGrid = (() => {
  const g = createGrid(GRID_SIZE);
  fillRect(g, 5, 2, 2, 2, INK);
  fillRect(g, 1, 4, 10, 7, "#ea580c");
  outlineRect(g, 1, 4, 10, 7, INK);
  fillRect(g, 1, 7, 10, 1, "#e5e7eb");
  setPixel(g, 3, 7, "#78716c");
  setPixel(g, 8, 7, "#78716c");
  fillRect(g, 1, 10, 10, 1, "#9a3412");
  return g;
})();

// Music — cassette tape
const musicGrid = (() => {
  const g = createGrid(GRID_SIZE);
  fillRect(g, 1, 2, 10, 8, "#db2777");
  outlineRect(g, 1, 2, 10, 8, INK);
  fillRect(g, 3, 4, 6, 3, "#fbcfe8");
  setPixel(g, 4, 5, INK);
  setPixel(g, 7, 5, INK);
  fillRect(g, 2, 8, 8, 1, "#f9a8d4");
  return g;
})();

// Gallery — polaroid photo (deliberately margined so the white frame reads)
const galleryGrid = (() => {
  const g = createGrid(GRID_SIZE);
  fillRect(g, 1, 1, 10, 10, "#f8fafc");
  outlineRect(g, 1, 1, 10, 10, INK);
  fillRect(g, 3, 3, 6, 4, "#5eead4");
  outlineRect(g, 3, 3, 6, 4, "#0f766e");
  fillRect(g, 5, 5, 2, 1, "#0d9488");
  fillRect(g, 4, 6, 4, 1, "#0d9488");
  setPixel(g, 4, 4, "#fbbf24");
  return g;
})();

// Books — stack of three. Thin (2px) bands would get fully eaten by a 4-side
// ink outline, so these use shaded top/bottom edges instead of outlineRect.
const booksGrid = (() => {
  const g = createGrid(GRID_SIZE);
  fillRect(g, 1, 8, 10, 3, "#d97706");
  fillRect(g, 1, 8, 10, 1, "#fbbf24");
  fillRect(g, 1, 10, 10, 1, "#92400e");
  fillRect(g, 2, 5, 8, 3, "#0d9488");
  fillRect(g, 2, 5, 8, 1, "#5eead4");
  fillRect(g, 2, 7, 8, 1, "#0f766e");
  fillRect(g, 3, 2, 6, 3, "#e11d48");
  fillRect(g, 3, 2, 6, 1, "#fb7185");
  fillRect(g, 3, 4, 6, 1, "#9f1239");
  return g;
})();

// Journal — rolled scroll with a quill
const journalGrid = (() => {
  const g = createGrid(GRID_SIZE);
  fillRect(g, 2, 4, 8, 5, "#f5deb0");
  outlineRect(g, 2, 4, 8, 5, INK);
  fillRect(g, 2, 4, 1, 5, "#c9a86a");
  fillRect(g, 9, 4, 1, 5, "#c9a86a");
  fillRect(g, 3, 6, 6, 1, "#d8c08a");
  setPixel(g, 3, 9, "#059669");
  setPixel(g, 4, 8, "#059669");
  setPixel(g, 5, 7, "#059669");
  setPixel(g, 6, 6, "#059669");
  setPixel(g, 7, 5, "#059669");
  setPixel(g, 8, 4, "#059669");
  setPixel(g, 9, 3, "#059669");
  setPixel(g, 10, 2, "#059669");
  setPixel(g, 3, 10, INK);
  return g;
})();

// About — a small portrait bust
const aboutGrid = (() => {
  const g = createGrid(GRID_SIZE);
  fillRect(g, 4, 2, 4, 4, "#f5c6a0");
  outlineRect(g, 4, 2, 4, 4, INK);
  fillRect(g, 4, 1, 4, 1, "#3b2a1a");
  fillRect(g, 2, 7, 8, 4, "#4f46e5");
  outlineRect(g, 2, 7, 8, 4, INK);
  setPixel(g, 5, 7, "#ffffff");
  setPixel(g, 6, 7, "#ffffff");
  return g;
})();

// Contact — envelope
const contactGrid = (() => {
  const g = createGrid(GRID_SIZE);
  fillRect(g, 1, 3, 10, 7, "#fff1f2");
  outlineRect(g, 1, 3, 10, 7, INK);
  fillRect(g, 1, 3, 10, 1, "#e11d48");
  fillRect(g, 2, 4, 8, 1, "#e11d48");
  fillRect(g, 3, 5, 6, 1, "#e11d48");
  fillRect(g, 4, 6, 4, 1, "#e11d48");
  fillRect(g, 5, 7, 2, 1, "#e11d48");
  setPixel(g, 5, 7, "#fbbf24");
  setPixel(g, 6, 7, "#fbbf24");
  return g;
})();

// Admin — locked cabinet
const adminGrid = (() => {
  const g = createGrid(GRID_SIZE);
  fillRect(g, 2, 1, 8, 10, "#475569");
  outlineRect(g, 2, 1, 8, 10, INK);
  fillRect(g, 2, 4, 8, 1, INK);
  fillRect(g, 2, 7, 8, 1, INK);
  setPixel(g, 5, 3, "#cbd5e1");
  setPixel(g, 6, 3, "#cbd5e1");
  setPixel(g, 5, 6, "#cbd5e1");
  setPixel(g, 6, 6, "#cbd5e1");
  fillRect(g, 5, 8, 2, 2, "#fbbf24");
  outlineRect(g, 5, 8, 2, 2, INK);
  return g;
})();

export const ProfessionalIcon = wrap(professionalGrid);
export const PublicationsIcon = wrap(publicationsGrid);
export const ProjectsIcon = wrap(projectsGrid);
export const MusicIcon = wrap(musicGrid);
export const GalleryIcon = wrap(galleryGrid);
export const BooksIcon = wrap(booksGrid);
export const JournalIcon = wrap(journalGrid);
export const AboutIcon = wrap(aboutGrid);
export const ContactIcon = wrap(contactGrid);
export const AdminIcon = wrap(adminGrid);
