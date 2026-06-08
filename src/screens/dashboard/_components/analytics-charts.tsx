import { TaskStatusChart } from "@/screens/dashboard/_components/task-status-chart";
import { TasksByPriorityChart } from "@/screens/dashboard/_components/tasks-by-priority-chart";
import type { DashboardStats } from "@/types/dashboard.types";

export const AnalyticsCharts = ({ stats }: { stats: DashboardStats }) => {
  // Donut segments are disjoint, so pending excludes the overdue slice.
  const overdue = stats.overdueTasks;
  const pendingNonOverdue = Math.max(0, stats.pendingTasks - overdue);

  return (
    <div className="bg-card rounded-xl border border-border p-5 flex flex-col sm:flex-row gap-6">
      {/* Donut chart */}
      <div className="flex-1 min-w-0">
        <TaskStatusChart
          completed={stats.completedTasks}
          pending={pendingNonOverdue}
          overdue={overdue}
        />
      </div>

      {/* Divider */}
      <div className="hidden sm:block w-px bg-border self-stretch" />
      <div className="block sm:hidden h-px bg-border" />

      {/* Bar chart */}
      <div className="flex-1 min-w-0 flex flex-col">
        <TasksByPriorityChart
          high={stats.tasksByPriority.high}
          medium={stats.tasksByPriority.medium}
          low={stats.tasksByPriority.low}
        />
      </div>
    </div>
  );
};
