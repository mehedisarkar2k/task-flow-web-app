import { CheckCircle, Circle, Loader2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Task } from "@/screens/tasks/types";

interface MemberTasksProps {
  tasks: Task[];
  isLoading?: boolean;
}

const statusIcon = (status?: Task["status"]) => {
  if (status === "COMPLETED") return <CheckCircle className="size-5 text-primary" />;
  if (status === "IN_PROGRESS") return <CheckCircle className="size-5 text-muted-foreground" />;
  return <Circle className="size-5 text-muted-foreground" />;
};

export const MemberTasks = ({ tasks, isLoading }: MemberTasksProps) => {
  return (
    <section className="bg-card border border-border rounded-xl p-6 transition-colors duration-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-heading text-2xl font-semibold text-foreground">Current Tasks</h2>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-10 text-muted-foreground">
          <Loader2 className="size-5 animate-spin" />
        </div>
      ) : tasks.length === 0 ? (
        <p className="font-sans text-sm text-muted-foreground py-6 text-center">
          No assigned tasks.
        </p>
      ) : (
        <div className="flex flex-col">
          {tasks.map((task, index) => {
            const isCompleted = task.status === "COMPLETED";
            return (
              <Link
                key={task.id}
                href={`/tasks/${task.id}`}
                className={cn(
                  "py-4 flex items-start gap-4 hover:bg-muted/50 transition-colors rounded-md -mx-2 px-2 cursor-pointer",
                  index !== tasks.length - 1 && "border-b border-border",
                )}
              >
                <div className="pt-1">{statusIcon(task.status)}</div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-muted-foreground">
                      TSK-{task.id.substring(0, 4).toUpperCase()}
                    </span>
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded-full font-sans text-xs",
                        isCompleted
                          ? "bg-muted text-muted-foreground"
                          : task.priority === "HIGH"
                            ? "bg-secondary text-secondary-foreground"
                            : "bg-accent/10 text-accent-foreground",
                      )}
                    >
                      {isCompleted ? "Completed" : `${task.priority} Priority`}
                    </span>
                  </div>
                  <h3
                    className={cn(
                      "font-sans text-base font-medium truncate",
                      isCompleted ? "text-muted-foreground line-through" : "text-foreground",
                    )}
                  >
                    {task.title}
                  </h3>
                  <p className="font-sans text-xs text-muted-foreground mt-1">
                    {task.dueDate ? `Due ${task.dueDate}` : "No deadline"}
                    {task.project ? ` • ${task.project.name}` : ""}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};
