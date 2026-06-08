import { AlertTriangle, PlusCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ACTIVITY_ITEMS, type ActivityItem } from "@/screens/dashboard/types";

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const ActivityRow = ({ item }: { item: ActivityItem }) => (
  <div className="flex gap-3 group">
    {/* Avatar / icon */}
    <div className="relative shrink-0">
      {item.actorName ? (
        <Avatar className="h-8 w-8 border-2 border-border group-hover:border-primary transition-colors">
          <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
            {getInitials(item.actorName)}
          </AvatarFallback>
        </Avatar>
      ) : (
        <div
          className={cn(
            "h-8 w-8 rounded-full border-2 border-border flex items-center justify-center",
            item.isWarning
              ? "text-destructive group-hover:border-destructive"
              : "text-primary group-hover:border-primary",
            "transition-colors"
          )}
        >
          {item.isWarning ? (
            <AlertTriangle className="size-3.5" />
          ) : (
            <PlusCircle className="size-3.5" />
          )}
        </div>
      )}
    </div>

    {/* Text */}
    <div className="flex flex-col gap-0.5 pt-0.5 min-w-0">
      <p className="text-sm text-foreground leading-snug">
        {item.actorName && (
          <span className="font-medium">{item.actorName} </span>
        )}
        {item.message}{" "}
        {item.linkText && (
          <span
            className={cn(
              "cursor-pointer hover:underline",
              item.isWarning ? "text-destructive font-medium" : "text-primary"
            )}
          >
            {item.linkText}
          </span>
        )}
      </p>
      <span className="font-mono text-xs text-muted-foreground">
        {item.time}
      </span>
    </div>
  </div>
);

export const RecentActivity = () => (
  <div className="bg-card rounded-xl border border-border flex flex-col h-full">
    {/* Header */}
    <div className="flex items-center justify-between px-5 py-4 border-b border-border">
      <h3 className="text-sm font-semibold text-foreground">Recent Activity</h3>
      <button className="text-xs font-medium text-primary hover:underline">
        View all
      </button>
    </div>

    {/* Timeline */}
    <div className="flex-1 overflow-y-auto px-5 py-4">
      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-3.5 top-0 bottom-0 w-px bg-border" />

        <div className="flex flex-col gap-5 relative z-10">
          {ACTIVITY_ITEMS.map((item) => (
            <ActivityRow key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  </div>
);
