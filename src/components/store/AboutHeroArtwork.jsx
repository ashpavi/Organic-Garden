const bubbles = [
  { cx: 8, cy: 12, rx: 6, ry: 8, rot: -20, op: 0.18 },
  { cx: 55, cy: 8, rx: 8, ry: 10, rot: 10, op: 0.14 },
  { cx: 28, cy: 28, rx: 5, ry: 7, rot: 0, op: 0.16 },
  { cx: 75, cy: 18, rx: 7, ry: 9, rot: -10, op: 0.15 },
  { cx: 88, cy: 55, rx: 6, ry: 8, rot: 20, op: 0.18 },
  { cx: 15, cy: 62, rx: 8, ry: 11, rot: -15, op: 0.2 },
  { cx: 42, cy: 72, rx: 5, ry: 7, rot: 5, op: 0.15 },
  { cx: 65, cy: 68, rx: 7, ry: 9, rot: -5, op: 0.17 },
  { cx: 92, cy: 82, rx: 6, ry: 8, rot: 15, op: 0.16 },
  { cx: 30, cy: 88, rx: 5, ry: 7, rot: -20, op: 0.14 },
  { cx: 78, cy: 90, rx: 7, ry: 9, rot: 10, op: 0.15 },
  { cx: 50, cy: 45, rx: 4, ry: 6, rot: 0, op: 0.1 },
];

export default function AboutHeroArtwork({ children, className = "" }) {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "400px",
        background:
          "radial-gradient(ellipse at 30% 40%, #2a6e35 0%, #1a5228 40%, #143d20 100%)",
        overflow: "hidden",
      }}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        {bubbles.map((b, i) => (
          <ellipse
            key={i}
            cx={b.cx}
            cy={b.cy}
            rx={b.rx}
            ry={b.ry}
            fill="#4a9e50"
            opacity={b.op}
            transform={`rotate(${b.rot} ${b.cx} ${b.cy})`}
          />
        ))}
      </svg>

      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}
