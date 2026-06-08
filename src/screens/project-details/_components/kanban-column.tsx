import { Droppable } from "@hello-pangea/dnd";
import { MoreHorizontal, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { KanbanTaskCard } from "@/screens/project-details/_components/kanban-task-card";
import type { KanbanColumnData, KanbanTask } from "@/screens/project-details/types";

interface KanbanColumnProps {
  column: KanbanColumnData;
  onAddTask: () => void;
  onEditTask: (task: KanbanTask) => void;
  onDeleteTask: (task: KanbanTask) => void;
  onViewTask?: (task: KanbanTask) => void;
}

export const KanbanColumn = ({
  column,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onViewTask,
}: KanbanColumnProps) => {
  const isCompleted = column.id === "completed";

  return (
    <div
      className={cn(
        "flex-1 min-w-[300px] w-[300px] flex flex-col gap-4 rounded-xl",
        isCompleted ? "opacity-80" : ""
      )}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between pb-2 border-b border-border/50 mx-1">
        <h3 className="font-heading text-lg font-semibold text-foreground flex items-center gap-2">
          {column.title}
          <span
            className={cn(
              "font-mono text-xs px-2 py-0.5 rounded-full",
              column.id === "in_progress"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            {column.tasks.length}
          </span>
        </h3>
        <button
          className="text-muted-foreground hover:text-primary transition-colors"
          aria-label={column.id === "todo" ? `Add task to ${column.title}` : `Column actions for ${column.title}`}
          onClick={column.id === "todo" ? onAddTask : undefined}
        >
          {column.id === "todo" ? (
            <Plus className="size-5" />
          ) : (
            <MoreHorizontal className="size-5" />
          )}
        </button>
      </div>

      {/* Droppable Area */}
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              "flex-1 flex flex-col gap-3 min-h-[150px] p-1.5 -mx-1.5 rounded-xl transition-colors duration-200",
              snapshot.isDraggingOver ? "bg-muted/50" : ""
            )}
          >
            {column.tasks.map((task, index) => (
              <KanbanTaskCard
                key={task.id}
                task={task}
                index={index}
                isCompleted={isCompleted}
                onEdit={() => onEditTask(task)}
                onDelete={() => onDeleteTask(task)}
                onView={() => onViewTask?.(task)}
              />
            ))}
            {provided.placeholder}

            {column.tasks.length === 0 && !snapshot.isDraggingOver && (
              <div className="h-24 border-2 border-dashed border-border rounded-xl flex items-center justify-center text-sm text-muted-foreground">
                Drop tasks here
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};
