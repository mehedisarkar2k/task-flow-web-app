import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/screens/projects/types";

const STATUS_CONFIG: Record<
  ProjectStatus,
  { label: string; className: string }
> = {
  ACTIVE: {
    label: "In Progress",
    className: "bg-primary/15 text-primary border border-primary/20",
  },
  COMPLETED: {
    label: "Completed",
    className: "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400",
  },
  ON_HOLD: {
    label: "On Hold",
    className: "bg-muted text-muted-foreground border border-border",
  },
};

interface StatusBadgeProps {
  status: ProjectStatus;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const { label, className: statusClass } = STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium shrink-0",
        statusClass,
        className
      )}
    >
      {label}
    </span>
  );
};
