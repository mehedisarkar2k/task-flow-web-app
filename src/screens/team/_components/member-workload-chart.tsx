import { cn } from "@/lib/utils";
import type { Workload } from "../types";

interface MemberWorkloadChartProps {
  workload: Workload;
}

export const MemberWorkloadChart = ({ workload }: MemberWorkloadChartProps) => {
  const { total, completed, pending, percentage } = workload;
  const isHigh = percentage >= 90;

  const stats = [
    { label: "Total", value: total },
    { label: "Completed", value: completed },
    { label: "Pending", value: pending },
  ];

  return (
    <section className="bg-card border border-border rounded-xl p-6 transition-colors duration-200">
      <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">Workload</h2>

      <div className="grid grid-cols-3 gap-2 mb-5">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center bg-muted/30 rounded-lg py-3">
            <span className="font-mono text-2xl font-bold text-foreground">{s.value}</span>
            <span className="font-sans text-xs text-muted-foreground mt-1">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center">
          <span className="font-sans text-sm text-muted-foreground">Load</span>
          <span
            className={cn(
              "font-mono text-sm font-medium",
              isHigh ? "text-accent" : "text-primary",
            )}
          >
            {percentage}%
          </span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              isHigh ? "bg-accent" : "bg-primary",
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </section>
  );
};
