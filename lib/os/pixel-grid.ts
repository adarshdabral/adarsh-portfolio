export type PixelGrid = (string | null)[][];

export function createGrid(size: number): PixelGrid {
  return Array.from({ length: size }, () => Array<string | null>(size).fill(null));
}

export function fillRect(
  grid: PixelGrid,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string
): PixelGrid {
  for (let row = y; row < y + h; row++) {
    if (!grid[row]) continue;
    for (let col = x; col < x + w; col++) {
      if (col >= 0 && col < grid[row].length) grid[row][col] = color;
    }
  }
  return grid;
}

export function setPixel(grid: PixelGrid, x: number, y: number, color: string): PixelGrid {
  if (grid[y] && x >= 0 && x < grid[y].length) grid[y][x] = color;
  return grid;
}

export function outlineRect(
  grid: PixelGrid,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string
): PixelGrid {
  fillRect(grid, x, y, w, 1, color);
  fillRect(grid, x, y + h - 1, w, 1, color);
  fillRect(grid, x, y, 1, h, color);
  fillRect(grid, x + w - 1, y, 1, h, color);
  return grid;
}
