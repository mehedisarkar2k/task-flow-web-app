// CSS bar chart showing tasks by priority

interface PriorityBar {
  label: string;
  value: number;
  colorClass: string;
}

export interface TasksByPriorityChartProps {
  high: number;
  medium: number;
  low: number;
}

export const TasksByPriorityChart = ({ high, medium, low }: TasksByPriorityChartProps) => {
  const bars: PriorityBar[] = [
    { label: "High", value: high, colorClass: "bg-destructive/70" },
    { label: "Medium", value: medium, colorClass: "bg-primary" },
    { label: "Low", value: low, colorClass: "bg-muted-foreground/40" },
  ];
  const max = Math.max(high, medium, low, 1);

  return (
    <div className="flex flex-col gap-4 flex-1">
      <h3 className="text-sm font-semibold text-foreground">Tasks by Priority</h3>

      {/* Fixed-height chart area so h-full works on bars */}
      <div className="relative h-48">
        {/* Y-axis grid lines — drawn as horizontal rules */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-7 gap-0">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="border-t border-border/40 w-full" />
          ))}
        </div>

        {/* Bars + labels */}
        <div className="absolute inset-0 flex items-end justify-around pb-0 px-4 gap-4">
          {bars.map(({ label, value, colorClass }) => {
            // Scale to the tallest bar; keep a small floor so non-zero bars stay visible.
            const heightPercent = value === 0 ? 0 : Math.max(8, (value / max) * 100);
            return (
              <div
                key={label}
                className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end"
              >
                <span className="font-mono text-xs text-muted-foreground">{value}</span>
                <div
                  className={`w-full rounded-t-md transition-all duration-500 ${colorClass}`}
                  style={{ height: `calc(${heightPercent}% - 1.75rem)` }}
                />
                <span className="font-mono text-xs text-muted-foreground shrink-0 pb-1">
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
