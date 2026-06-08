import { BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WorkloadItem } from "@/screens/dashboard/types";

const WorkloadRow = ({ item }: { item: WorkloadItem }) => (
  <div className="flex items-center gap-3">
    <span className="text-sm text-foreground w-20 shrink-0 truncate">
      {item.name}
    </span>

    <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
      <div
        className={cn(
          "h-full rounded-full transition-all duration-500",
          item.overloaded ? "bg-destructive" : "bg-primary"
        )}
        style={{ width: `${item.percentage}%` }}
      />
    </div>

    <span
      className={cn(
        "font-mono text-xs w-9 text-right shrink-0",
        item.overloaded ? "text-destructive" : "text-muted-foreground"
      )}
    >
      {item.percentage}%
    </span>
  </div>
);

export const MemberWorkload = ({ items }: { items: WorkloadItem[] }) => (
  <div className="bg-card rounded-xl border border-border overflow-hidden">
    {/* Header */}
    <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-muted/30">
      <h3 className="text-sm font-semibold text-foreground">Member Workload</h3>
      <BarChart2 className="size-4 text-muted-foreground" />
    </div>

    {items.length === 0 ? (
      <p className="text-sm text-muted-foreground px-5 py-6 text-center">
        No assigned work yet.
      </p>
    ) : (
      <div className="px-5 py-5 flex flex-col gap-4">
        {items.map((item) => (
          <WorkloadRow key={item.id} item={item} />
        ))}
      </div>
    )}
  </div>
);
