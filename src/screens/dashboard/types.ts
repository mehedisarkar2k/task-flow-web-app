// View-model shapes consumed by the dashboard presentational components.
// Real data comes from /api/dashboard/stats + /api/activities and is mapped
// into these shapes by dashboard-mappers.ts.

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
