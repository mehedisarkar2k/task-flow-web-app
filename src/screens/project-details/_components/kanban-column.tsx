import { Droppable } from "@hello-pangea/dnd";
import type { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";
import { Plus, GripHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { KanbanTaskCard } from "@/screens/project-details/_components/kanban-task-card";
import type { KanbanColumnData, KanbanTask } from "@/screens/project-details/types";

interface KanbanColumnProps {
  column: KanbanColumnData;
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
  canManage?: boolean;
  onAddTask: () => void;
  onEditTask: (task: KanbanTask) => void;
  onDeleteTask: (task: KanbanTask) => void;
  onViewTask?: (task: KanbanTask) => void;
}

export const KanbanColumn = ({
  column,
  dragHandleProps,
  canManage = false,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onViewTask,
}: KanbanColumnProps) => {
  const isCompleted = column.mappedStatus === "COMPLETED";
  const isInProgress = column.mappedStatus === "IN_PROGRESS";

  return (
    <div
      className={cn(
        "flex-1 min-w-[300px] w-[300px] flex flex-col gap-4 rounded-xl",
        isCompleted ? "opacity-80" : "",
      )}
    >
      {/* Column Header */}
      <div
        className="flex items-center justify-between pb-2 border-b border-border/50 mx-1 cursor-grab active:cursor-grabbing group/header"
        {...dragHandleProps}
      >
        <h3 className="font-heading text-lg font-semibold text-foreground flex items-center gap-2">
          <GripHorizontal className="size-4 text-muted-foreground/50 opacity-0 group-hover/header:opacity-100 transition-opacity" />
          {column.title}
          <span
            className={cn(
              "font-mono text-xs px-2 py-0.5 rounded-full",
              isInProgress
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground",
            )}
          >
            {column.tasks.length}
          </span>
        </h3>
        {canManage && (
          <button
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label={`Add task to ${column.title}`}
            onClick={onAddTask}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <Plus className="size-5" />
          </button>
        )}
      </div>

      {/* Droppable Area */}
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              "flex-1 flex flex-col gap-3 min-h-[150px] p-1.5 -mx-1.5 rounded-xl transition-colors duration-200",
              snapshot.isDraggingOver ? "bg-muted/50" : "",
            )}
          >
            {column.tasks.map((task, index) => (
              <KanbanTaskCard
                key={task.id}
                task={task}
                index={index}
                isCompleted={isCompleted}
                canManage={canManage}
                onEdit={() => onEditTask(task)}
                onDelete={() => onDeleteTask(task)}
                onView={() => onViewTask?.(task)}
              />
            ))}
            {provided.placeholder}

            {column.tasks.length === 0 && !snapshot.isDraggingOver && (
              <div className="h-24 border-2 border-dashed border-border rounded-xl flex items-center justify-center text-sm text-muted-foreground">
                {canManage ? "Drop tasks here" : "No tasks"}
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};
