import { formatDistanceToNow } from "date-fns";
import type { Activity, DashboardStats } from "@/types/dashboard.types";
import type { ActivityItem, DeadlineItem, KpiStat, WorkloadItem } from "@/screens/dashboard/types";

// Reference capacity used to turn a member's pending-task count into a 0-100%
// workload bar. Mirrors the team module's "pending / 10" load indicator.
const CAPACITY = 10;

export const buildKpis = (stats: DashboardStats): KpiStat[] => [
  { id: "projects", label: "Total Projects", value: stats.totalProjects, trend: "Across workspace", trendDirection: "neutral" },
  { id: "tasks", label: "Total Tasks", value: stats.totalTasks, trend: "All tasks", trendDirection: "neutral" },
  { id: "completed", label: "Completed", value: stats.completedTasks, trend: `${stats.totalTasks ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0}% done`, trendDirection: "up" },
  { id: "pending", label: "Pending", value: stats.pendingTasks, trend: "In progress queue", trendDirection: "neutral" },
  { id: "overdue", label: "Overdue", value: stats.overdueTasks, trend: stats.overdueTasks > 0 ? "Needs attention" : "All on track", trendDirection: stats.overdueTasks > 0 ? "up" : "neutral", highlight: stats.overdueTasks > 0 },
];

const formatDue = (dueDate: string | null): { due: string; urgency: DeadlineItem["urgency"] } => {
  if (!dueDate) return { due: "No date", urgency: "normal" };
  const due = new Date(dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffDays = Math.round((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  const label = due.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  if (diffDays < 0) return { due: `${label} (overdue)`, urgency: "overdue" };
  if (diffDays === 0) return { due: "Today", urgency: "soon" };
  if (diffDays <= 3) return { due: diffDays === 1 ? "Tomorrow" : label, urgency: "soon" };
  return { due: label, urgency: "normal" };
};

export const buildDeadlines = (stats: DashboardStats): DeadlineItem[] =>
  stats.upcomingDeadlines.map((d) => {
    const { due, urgency } = formatDue(d.dueDate);
    return { id: d.id, title: d.title, due, urgency };
  });

export const buildWorkload = (stats: DashboardStats): WorkloadItem[] =>
  stats.memberWorkload.map((m) => {
    const percentage = Math.min(100, Math.round((m.pending / CAPACITY) * 100));
    return { id: m.id, name: m.name, percentage, overloaded: percentage >= 90 };
  });

export const mapActivities = (activities: Activity[]): ActivityItem[] =>
  activities.map((a) => ({
    id: a.id,
    actorName: a.actor?.name,
    message: a.message,
    time: formatDistanceToNow(new Date(a.createdAt), { addSuffix: true }),
    isWarning: a.action.includes("OVERDUE") || a.action.includes("REMOVED"),
  }));
