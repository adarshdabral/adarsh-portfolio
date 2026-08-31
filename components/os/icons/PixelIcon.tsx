import type { CSSProperties } from "react";
import type { PixelGrid } from "@/lib/os/pixel-grid";

export function PixelIcon({
  grid,
  className,
  style,
}: {
  grid: PixelGrid;
  className?: string;
  style?: CSSProperties;
}) {
  const size = grid.length;
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      style={{ shapeRendering: "crispEdges", ...style }}
      aria-hidden="true"
    >
      {grid.map((row, y) =>
        row.map((color, x) =>
          color ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={color} /> : null
        )
      )}
    </svg>
  );
}
