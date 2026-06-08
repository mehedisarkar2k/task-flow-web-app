// SVG donut chart showing task status distribution.
// Segments are disjoint: Completed + Pending (non-overdue) + Overdue = total.

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

export interface TaskStatusChartProps {
  completed: number;
  pending: number;
  overdue: number;
}

const buildSegments = (segments: Segment[], total: number) => {
  const quarterTurn = CIRCUMFERENCE / 4;
  let consumed = 0;
  return segments.map((seg) => {
    const length = total === 0 ? 0 : (seg.value / total) * CIRCUMFERENCE;
    const dashoffset = quarterTurn - consumed;
    consumed += length;
    return { ...seg, length, dashoffset };
  });
};

export const TaskStatusChart = ({ completed, pending, overdue }: TaskStatusChartProps) => {
  const segments: Segment[] = [
    { label: "Completed", value: completed, colorClass: "stroke-primary", legendColorClass: "bg-primary" },
    { label: "Pending", value: pending, colorClass: "stroke-muted-foreground", legendColorClass: "bg-muted-foreground" },
    { label: "Overdue", value: overdue, colorClass: "stroke-destructive", legendColorClass: "bg-destructive" },
  ];
  const total = completed + pending + overdue;
  const computed = buildSegments(segments, total);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold text-foreground">Task Status Distribution</h3>

      <div className="flex flex-col items-center gap-4">
        {/* SVG Donut */}
        <div className="relative w-36 h-36">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            {/* Track */}
            <circle cx={CX} cy={CY} r={RADIUS} fill="none" strokeWidth={14} className="stroke-border" />
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
            <span className="font-mono text-2xl font-semibold text-foreground">{total}</span>
            <span className="text-xs text-muted-foreground">Total</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-4 flex-wrap">
          {segments.map((seg) => (
            <div key={seg.label} className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-sm shrink-0 ${seg.legendColorClass}`} />
              <span className="text-xs text-muted-foreground">
                {seg.label} <span className="font-mono">{seg.value}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
