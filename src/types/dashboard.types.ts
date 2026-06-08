export interface MemberWorkloadStat {
  id: string;
  name: string;
  total: number;
  completed: number;
  pending: number;
}

export interface UpcomingDeadlineStat {
  id: string;
  title: string;
  dueDate: string | null;
  project: { id: string; name: string } | null;
  priority: "HIGH" | "MEDIUM" | "LOW";
}

export interface ProjectSummaryStat {
  id: string;
  name: string;
  status: "ACTIVE" | "COMPLETED" | "ON_HOLD";
  progress: number;
  pendingTasks: number;
  deadline: string | null;
}

export interface DashboardStats {
  totalProjects: number;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  overdueTasks: number;
  tasksByStatus: { todo: number; inProgress: number; completed: number };
  tasksByPriority: { high: number; medium: number; low: number };
  memberWorkload: MemberWorkloadStat[];
  upcomingDeadlines: UpcomingDeadlineStat[];
  projectSummary: ProjectSummaryStat[];
}

export interface Activity {
  id: string;
  action: string;
  entityType: "TASK" | "PROJECT" | "COMMENT" | "ATTACHMENT";
  entityId: string;
  message: string;
  actor: { id: string; name: string; image?: string | null } | null;
  createdAt: string;
}
