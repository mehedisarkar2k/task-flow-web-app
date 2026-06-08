import {
  FolderKanban,
  ListTodo,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  Minus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { KpiStat } from "@/screens/dashboard/types";
import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  projects: FolderKanban,
  tasks: ListTodo,
  completed: CheckCircle2,
  pending: Clock,
  overdue: AlertCircle,
};

const KpiCard = ({ stat }: { stat: KpiStat }) => {
  const Icon = ICON_MAP[stat.id] ?? ListTodo;
  const TrendIcon = stat.trendDirection === "up" ? TrendingUp : Minus;

  return (
    <div
      className={cn(
        "bg-card rounded-xl p-4 border border-border flex flex-col justify-between gap-2 hover:shadow-sm transition-shadow duration-200 relative overflow-hidden min-w-0",
        stat.highlight && "border-l-4 border-l-destructive"
      )}
    >
      {stat.id === "completed" && (
        <div className="absolute -right-6 -top-6 w-20 h-20 bg-primary/10 rounded-full blur-xl pointer-events-none" />
      )}

      <div className="flex items-start justify-between gap-1 relative z-10">
        <span
          className={cn(
            "text-xs font-medium leading-tight",
            stat.highlight ? "text-destructive" : "text-muted-foreground"
          )}
        >
          {stat.label}
        </span>
        <Icon
          className={cn(
            "size-3.5 shrink-0 mt-0.5",
            stat.highlight ? "text-destructive" : "text-muted-foreground"
          )}
        />
      </div>

      <div className="relative z-10">
        <div
          className={cn(
            "font-mono text-2xl font-semibold tracking-tight",
            stat.highlight ? "text-destructive" : "text-foreground"
          )}
        >
          {stat.value}
        </div>
        <div
          className={cn(
            "flex items-center gap-1 mt-0.5 text-xs",
            stat.highlight
              ? "text-destructive"
              : stat.trendDirection === "up"
                ? "text-primary"
                : "text-muted-foreground"
          )}
        >
          <TrendIcon className="size-3 shrink-0" />
          <span className="font-mono truncate">{stat.trend}</span>
        </div>
      </div>
    </div>
  );
};

export const KpiCards = ({ stats }: { stats: KpiStat[] }) => (
  <section
    aria-label="Key performance indicators"
    className="grid grid-cols-2 xl:grid-cols-5 gap-3"
  >
    {stats.map((stat, i) => (
      /* Last card spans 2 cols on the 2-col mobile grid so it's centred */
      <div
        key={stat.id}
        className={cn(i === 4 && "col-span-2 xl:col-span-1")}
      >
        <KpiCard stat={stat} />
      </div>
    ))}
  </section>
);
