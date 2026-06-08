import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DeadlineItem } from "@/screens/dashboard/types";

const DOT_COLOR: Record<DeadlineItem["urgency"], string> = {
  overdue: "bg-destructive",
  soon: "bg-primary",
  normal: "bg-muted-foreground",
};

const DUE_BADGE: Record<DeadlineItem["urgency"], string> = {
  overdue:
    "bg-destructive/10 text-destructive border border-destructive/20 font-mono text-xs",
  soon: "text-muted-foreground font-mono text-xs",
  normal: "text-muted-foreground font-mono text-xs",
};

const DeadlineRow = ({ item }: { item: DeadlineItem }) => (
  <li className="flex items-center justify-between px-5 py-3 border-b border-border last:border-0 hover:bg-muted/50 transition-colors group">
    <div className="flex items-center gap-3">
      <span
        className={cn("w-2 h-2 rounded-full shrink-0", DOT_COLOR[item.urgency])}
      />
      <span className="text-sm text-foreground group-hover:text-primary transition-colors cursor-pointer">
        {item.title}
      </span>
    </div>
    <span
      className={cn(
        "shrink-0 px-2 py-0.5 rounded",
        DUE_BADGE[item.urgency]
      )}
    >
      {item.due}
    </span>
  </li>
);

export const UpcomingDeadlines = ({ items }: { items: DeadlineItem[] }) => (
  <div className="bg-card rounded-xl border border-border overflow-hidden">
    {/* Header */}
    <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-muted/30">
      <h3 className="text-sm font-semibold text-foreground">
        Upcoming Deadlines
      </h3>
      <CalendarDays className="size-4 text-muted-foreground" />
    </div>

    {items.length === 0 ? (
      <p className="text-sm text-muted-foreground px-5 py-6 text-center">
        No upcoming deadlines.
      </p>
    ) : (
      <ul>
        {items.map((item) => (
          <DeadlineRow key={item.id} item={item} />
        ))}
      </ul>
    )}
  </div>
);
