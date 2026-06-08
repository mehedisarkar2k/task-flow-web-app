// Static mock data for the dashboard (will be replaced by real API data)

export interface KpiStat {
  id: string;
  label: string;
  value: number;
  trend: string;
  trendDirection: "up" | "neutral";
  highlight?: boolean;
}

export interface ActivityItem {
  id: string;
  actorName?: string;
  message: string;
  linkText?: string;
  time: string;
  isSystem?: boolean;
  isWarning?: boolean;
}

export interface DeadlineItem {
  id: string;
  title: string;
  due: string;
  urgency: "overdue" | "soon" | "normal";
}

export interface WorkloadItem {
  id: string;
  name: string;
  percentage: number;
  overloaded?: boolean;
}

export const KPI_STATS: KpiStat[] = [
  { id: "projects", label: "Total Projects", value: 24, trend: "+3 this week", trendDirection: "up" },
  { id: "tasks", label: "Total Tasks", value: 142, trend: "+18 this week", trendDirection: "up" },
  { id: "completed", label: "Completed", value: 89, trend: "Steady", trendDirection: "neutral" },
  { id: "pending", label: "Pending", value: 41, trend: "Normal queue", trendDirection: "neutral" },
  { id: "overdue", label: "Overdue", value: 12, trend: "Needs attention", trendDirection: "up", highlight: true },
];

export const ACTIVITY_ITEMS: ActivityItem[] = [
  { id: "1", actorName: "Sarah Jenkins", message: "completed task", linkText: "Draft Q3 Report", time: "10:42 AM" },
  { id: "2", message: "System flagged", linkText: "Design System Audit", time: "09:15 AM", isSystem: true, isWarning: true },
  { id: "3", actorName: "Marcus Chen", message: "left a comment on", linkText: "API Integration", time: "Yesterday, 16:30" },
  { id: "4", message: "New project", linkText: "Marketing Site V2", time: "Yesterday, 14:00", isSystem: true },
  { id: "5", actorName: "Alex Rivera", message: "moved", linkText: "Setup CI/CD", time: "Yesterday, 11:20" },
  { id: "6", actorName: "Sarah Jenkins", message: "uploaded", linkText: "assets.zip", time: "Oct 24, 09:00" },
];

export const DEADLINE_ITEMS: DeadlineItem[] = [
  { id: "1", title: "Finalize Pitch Deck", due: "Today, 17:00", urgency: "overdue" },
  { id: "2", title: "Client Review Meeting", due: "Tomorrow, 10:00", urgency: "soon" },
  { id: "3", title: "Server Maintenance", due: "Oct 28, 02:00", urgency: "normal" },
];

export const WORKLOAD_ITEMS: WorkloadItem[] = [
  { id: "1", name: "Sarah J.", percentage: 85 },
  { id: "2", name: "Marcus C.", percentage: 60 },
  { id: "3", name: "Alex R.", percentage: 95, overloaded: true },
  { id: "4", name: "Elena V.", percentage: 40 },
];
