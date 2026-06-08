// SVG donut chart showing task status distribution
// Data: Completed 89 / Pending 41 / Overdue 12 — total 142

const TOTAL = 142;
const RADIUS = 38;
const CX = 50;
const CY = 50;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // ≈ 238.76

interface Segment {
  label: string;
  value: number;
  colorClass: string;
  legendColorClass: string;
}

const SEGMENTS: Segment[] = [
  {
    label: "Completed",
    value: 89,
    colorClass: "stroke-primary",
    legendColorClass: "bg-primary",
  },
  {
    label: "Pending",
    value: 41,
    colorClass: "stroke-muted-foreground",
    legendColorClass: "bg-muted-foreground",
  },
  {
    label: "Overdue",
    value: 12,
    colorClass: "stroke-destructive",
    legendColorClass: "bg-destructive",
  },
];

const buildSegments = () => {
  // Start from top (subtract quarter turn from offset)
  const quarterTurn = CIRCUMFERENCE / 4;
  let consumed = 0;
  return SEGMENTS.map((seg) => {
    const length = (seg.value / TOTAL) * CIRCUMFERENCE;
    const dashoffset = quarterTurn - consumed;
    consumed += length;
    return { ...seg, length, dashoffset };
  });
};

const computed = buildSegments();

export const TaskStatusChart = () => (
  <div className="flex flex-col gap-4">
    <h3 className="text-sm font-semibold text-foreground">
      Task Status Distribution
    </h3>

    <div className="flex flex-col items-center gap-4">
      {/* SVG Donut */}
      <div className="relative w-36 h-36">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          {/* Track */}
          <circle
            cx={CX}
            cy={CY}
            r={RADIUS}
            fill="none"
            strokeWidth={14}
            className="stroke-border"
          />
          {/* Coloured segments */}
          {computed.map((seg) => (
            <circle
              key={seg.label}
              cx={CX}
              cy={CY}
              r={RADIUS}
              fill="none"
              strokeWidth={14}
              strokeLinecap="butt"
              className={seg.colorClass}
              strokeDasharray={`${seg.length} ${CIRCUMFERENCE}`}
              strokeDashoffset={seg.dashoffset}
            />
          ))}
        </svg>

        {/* Centre label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-2xl font-semibold text-foreground">
            {TOTAL}
          </span>
          <span className="text-xs text-muted-foreground">Total</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 flex-wrap">
        {SEGMENTS.map((seg) => (
          <div key={seg.label} className="flex items-center gap-1.5">
            <span
              className={`w-2.5 h-2.5 rounded-sm shrink-0 ${seg.legendColorClass}`}
            />
            <span className="text-xs text-muted-foreground">{seg.label}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);
