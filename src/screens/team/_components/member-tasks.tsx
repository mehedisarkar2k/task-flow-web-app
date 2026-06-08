import { CheckCircle, Circle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface MockTask {
  id: string;
  code: string;
  title: string;
  dueInfo: string;
  priority: "High Priority" | "Normal";
  status: "todo" | "in_progress" | "completed";
  progress: number;
}

const MOCK_TASKS: MockTask[] = [
  {
    id: "task-1",
    code: "TSK-0842",
    title: "Implement new Bento Grid dashboard layout",
    dueInfo: "Due Oct 24 • Client Portal Redesign",
    priority: "High Priority",
    status: "in_progress",
    progress: 65,
  },
  {
    id: "task-2",
    code: "TSK-0855",
    title: "Audit design system typography scale",
    dueInfo: "Due Oct 28 • Internal Tooling",
    priority: "Normal",
    status: "todo",
    progress: 0,
  },
  {
    id: "task-3",
    code: "TSK-0831",
    title: "Fix Safari rendering bug on member profile",
    dueInfo: "Completed Oct 15 • Bug Fixes Q4",
    priority: "Normal",
    status: "completed",
    progress: 100,
  },
];

export const MemberTasks = () => {
  return (
    <section className="bg-card border border-border rounded-xl p-6 transition-colors duration-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-heading text-2xl font-semibold text-foreground">Current Tasks</h2>
        <button className="text-primary hover:text-primary/80 font-sans text-sm font-medium transition-colors">
          View All
        </button>
      </div>
      
      <div className="flex flex-col">
        {MOCK_TASKS.map((task, index) => {
          const isCompleted = task.status === "completed";
          
          return (
            <Link 
              key={task.id}
              href={`/tasks/${task.id}`}
              className={cn(
                "py-4 flex items-start gap-4 hover:bg-muted/50 transition-colors rounded-md -mx-2 px-2 cursor-pointer",
                index !== MOCK_TASKS.length - 1 && "border-b border-border"
              )}
            >
              <div className="pt-1">
                {isCompleted ? (
                  <CheckCircle className="size-5 text-primary" />
                ) : task.progress > 0 ? (
                  <CheckCircle className="size-5 text-muted-foreground" />
                ) : (
                  <Circle className="size-5 text-muted-foreground" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={cn("font-mono text-sm", isCompleted ? "text-muted-foreground line-through" : "text-muted-foreground")}>
                    {task.code}
                  </span>
                  <span className={cn(
                    "px-2 py-0.5 rounded-full font-sans text-xs",
                    isCompleted ? "bg-muted text-muted-foreground" :
                    task.priority === "High Priority" ? "bg-secondary text-secondary-foreground" : "bg-accent/10 text-accent-foreground"
                  )}>
                    {isCompleted ? "Completed" : task.priority}
                  </span>
                </div>
                <h3 className={cn(
                  "font-sans text-base font-medium truncate",
                  isCompleted ? "text-muted-foreground line-through" : "text-foreground"
                )}>
                  {task.title}
                </h3>
                <p className="font-sans text-xs text-muted-foreground mt-1">
                  {task.dueInfo}
                </p>
              </div>
              
              <div className="flex flex-col items-end gap-2">
                <span className={cn(
                  "font-mono text-sm",
                  isCompleted ? "text-primary" : task.progress > 0 ? "text-primary" : "text-muted-foreground"
                )}>
                  {task.progress}%
                </span>
                <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-500" 
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
