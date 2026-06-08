import { TaskStatusChart } from "@/screens/dashboard/_components/task-status-chart";
import { TasksByPriorityChart } from "@/screens/dashboard/_components/tasks-by-priority-chart";

export const AnalyticsCharts = () => (
  <div className="bg-card rounded-xl border border-border p-5 flex flex-col sm:flex-row gap-6">
    {/* Donut chart */}
    <div className="flex-1 min-w-0">
      <TaskStatusChart />
    </div>

    {/* Divider */}
    <div className="hidden sm:block w-px bg-border self-stretch" />
    <div className="block sm:hidden h-px bg-border" />

    {/* Bar chart */}
    <div className="flex-1 min-w-0 flex flex-col">
      <TasksByPriorityChart />
    </div>
  </div>
);
