import { Draggable } from "@hello-pangea/dnd";
import { MoreHorizontal, CheckCircle, Edit2, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { KanbanTask } from "@/screens/project-details/types";

interface KanbanTaskCardProps {
  task: KanbanTask;
  index: number;
  isCompleted?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
}

const PriorityIcon = ({ priority }: { priority: KanbanTask["priority"] }) => {
  switch (priority) {
    case "HIGH":
      return <span className="text-primary text-base font-bold">↑</span>;
    case "MEDIUM":
      return <span className="text-secondary text-base font-bold">=</span>;
    case "LOW":
      return <span className="text-outline text-base font-bold">↓</span>;
  }
};

export const KanbanTaskCard = ({
  task,
  index,
  isCompleted,
  onEdit,
  onDelete,
  onView,
}: KanbanTaskCardProps) => {
  const assignees = task.assignees || (task.assignee ? [task.assignee] : []);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <article
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={onView}
          className={cn(
            "rounded-xl p-4 flex flex-col gap-3 group relative cursor-grab active:cursor-grabbing",
            "border border-border transition-all duration-200",
            snapshot.isDragging
              ? "bg-card shadow-lg ring-1 ring-primary/20 scale-[1.02] rotate-1 z-50"
              : "bg-card/50 hover:bg-card shadow-sm hover:shadow-md",
            task.isOverdue && !isCompleted ? "border-destructive/30" : "",
            isCompleted ? "opacity-75" : ""
          )}
          style={provided.draggableProps.style as React.CSSProperties}
        >
          {/* Overdue indicator line */}
          {task.isOverdue && !isCompleted && (
            <div className="absolute top-0 left-0 w-1 h-full bg-destructive rounded-l-xl" />
          )}

          <div className="flex justify-between items-start gap-4">
            <h4
              className={cn(
                "text-base font-medium leading-tight",
                isCompleted
                  ? "text-muted-foreground line-through decoration-border"
                  : "text-foreground"
              )}
            >
              {task.title}
            </h4>
            {isCompleted ? (
              <CheckCircle className="size-4 text-primary shrink-0" />
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
                    aria-label="Task options"
                    onPointerDown={(e) => e.stopPropagation()} // Fix: prevent dnd from blocking click
                  >
                    <MoreHorizontal className="size-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                  <DropdownMenuItem onClick={onEdit} className="cursor-pointer gap-2">
                    <Edit2 className="size-4 text-muted-foreground" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={onDelete}
                    className="cursor-pointer gap-2 text-destructive focus:bg-destructive/10 focus:text-destructive"
                  >
                    <Trash2 className="size-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <div className="flex justify-between items-end mt-1">
            <div className="flex items-center gap-3">
              {!isCompleted && (
                <span className="flex items-center gap-1 font-medium text-xs text-muted-foreground">
                  <PriorityIcon priority={task.priority} />
                  <span className="capitalize">{task.priority.toLowerCase()}</span>
                </span>
              )}
              <span
                className={cn(
                  "font-mono text-xs",
                  task.isOverdue && !isCompleted
                    ? "text-destructive font-medium"
                    : "text-muted-foreground"
                )}
              >
                {task.dueDate}
              </span>
            </div>

            {assignees.length > 0 && (
              <div className="flex -space-x-2">
                {assignees.map((user) => (
                  <Avatar
                    key={user.id}
                    className={cn(
                      "size-7 border-2 border-card",
                      isCompleted ? "grayscale" : ""
                    )}
                  >
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback className="text-[10px]">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
            )}
          </div>
        </article>
      )}
    </Draggable>
  );
};
