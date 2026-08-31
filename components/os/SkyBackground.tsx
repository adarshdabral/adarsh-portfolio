function Cloud({ x, y, scale }: { x: number; y: number; scale: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <g fill="#bfe3fb" opacity={0.9}>
        <ellipse cx={40} cy={58} rx={72} ry={20} />
        <ellipse cx={95} cy={48} rx={48} ry={24} />
      </g>
      <g fill="#ffffff">
        <ellipse cx={0} cy={38} rx={44} ry={24} />
        <ellipse cx={45} cy={18} rx={56} ry={30} />
        <ellipse cx={100} cy={32} rx={44} ry={24} />
        <ellipse cx={58} cy={48} rx={72} ry={18} />
      </g>
    </g>
  );
}

export default function SkyBackground() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden dark:brightness-[0.35] dark:saturate-75"
    >
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        shapeRendering="crispEdges"
      >
        <defs>
          <linearGradient id="ashos-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="55%" stopColor="#7dd3fc" />
            <stop offset="100%" stopColor="#e0f2fe" />
          </linearGradient>
        </defs>
        <rect width="1600" height="900" fill="url(#ashos-sky)" />
        <Cloud x={460} y={110} scale={1.3} />
        <Cloud x={1220} y={80} scale={1.05} />
        <Cloud x={1380} y={560} scale={1.15} />
        <Cloud x={40} y={620} scale={0.85} />
        <Cloud x={650} y={650} scale={0.7} />
      </svg>
    </div>
  );
}
