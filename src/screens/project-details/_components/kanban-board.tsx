"use client";

import { useState, useEffect, useCallback } from "react";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { KanbanColumn } from "@/screens/project-details/_components/kanban-column";
import { CreateColumnModal } from "@/screens/project-details/_components/modals/create-column-modal";
import { TaskFormSheet } from "@/screens/tasks/_components/task-form-sheet";
import { DeleteConfirmationModal } from "@/components/modal/delete-confirmation-modal";
import { Button } from "@/components/ui/button";
import { useMoveTaskMutation, useDeleteTaskMutation } from "@/services/mutation/use-task-mutations";
import {
  useCreateColumnMutation,
  useReorderColumnsMutation,
} from "@/services/mutation/use-column-mutations";
import type { ColumnColor } from "@/services/api/columns";
import type { KanbanColumnData, KanbanTask } from "@/screens/project-details/types";

// hello-pangea/dnd warns about nested scroll containers we intentionally use.
if (typeof window !== "undefined") {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (typeof args[0] === "string" && args[0].includes("unsupported nested scroll container")) {
      return;
    }
    originalWarn(...args);
  };
}

interface KanbanBoardProps {
  projectId: string;
  columns: KanbanColumnData[];
  canManage?: boolean;
}

export const KanbanBoard = ({ projectId, columns: incoming, canManage = false }: KanbanBoardProps) => {
  const router = useRouter();
  const [columns, setColumns] = useState<KanbanColumnData[]>(incoming);

  const moveTask = useMoveTaskMutation(projectId);
  const deleteTask = useDeleteTaskMutation();
  const createColumn = useCreateColumnMutation(projectId);
  const reorderColumns = useReorderColumnsMutation(projectId);

  // Re-sync the local (optimistic) board whenever fresh server data arrives.
  const signature = incoming
    .map((c) => `${c.id}:${c.tasks.map((t) => t.id).join(",")}`)
    .join("|");
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setColumns(incoming);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature]);

  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const [taskSheet, setTaskSheet] = useState<{
    open: boolean;
    mode: "create" | "edit";
    task?: KanbanTask;
    columnId?: string;
  }>({ open: false, mode: "create" });
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; task?: KanbanTask }>({
    open: false,
  });

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination, type, draggableId } = result;
      if (!destination) return;
      if (source.droppableId === destination.droppableId && source.index === destination.index)
        return;

      if (type === "column") {
        const next = [...columns];
        const [moved] = next.splice(source.index, 1);
        next.splice(destination.index, 0, moved);
        setColumns(next);
        reorderColumns.mutate(next.map((c) => c.id));
        return;
      }

      // Task move — update local state optimistically, then persist.
      const next = columns.map((c) => ({ ...c, tasks: [...c.tasks] }));
      const sourceCol = next.find((c) => c.id === source.droppableId);
      const destCol = next.find((c) => c.id === destination.droppableId);
      if (!sourceCol || !destCol) return;

      const [movedTask] = sourceCol.tasks.splice(source.index, 1);
      destCol.tasks.splice(destination.index, 0, movedTask);
      setColumns(next);

      moveTask.mutate({
        id: draggableId,
        columnId: destination.droppableId,
        position: destination.index,
      });
    },
    [columns, moveTask, reorderColumns],
  );

  const handleAddColumn = (name: string, color: ColumnColor) => {
    createColumn.mutate({ name, color });
  };

  const handleDeleteTask = () => {
    if (deleteModal.task) deleteTask.mutate(deleteModal.task.id);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" type="column" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex gap-6 overflow-x-auto pb-6 w-full snap-x"
            >
              {columns.map((col, index) => (
                <Draggable
                  key={col.id}
                  draggableId={col.id}
                  index={index}
                  isDragDisabled={!canManage}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={cn(
                        "snap-start shrink-0",
                        snapshot.isDragging ? "opacity-60 z-50 scale-[1.02] shadow-xl rotate-1" : "",
                      )}
                      style={provided.draggableProps.style as React.CSSProperties}
                    >
                      <KanbanColumn
                        column={col}
                        dragHandleProps={provided.dragHandleProps}
                        canManage={canManage}
                        onAddTask={() =>
                          setTaskSheet({ open: true, mode: "create", columnId: col.id })
                        }
                        onEditTask={(task) =>
                          setTaskSheet({ open: true, mode: "edit", task })
                        }
                        onDeleteTask={(task) => setDeleteModal({ open: true, task })}
                        onViewTask={(task) => router.push(`/tasks/${task.id}`)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}

              {canManage && (
                <div className="snap-start shrink-0 w-[300px]">
                  <Button
                    variant="outline"
                    className="w-full h-[60px] border-dashed text-muted-foreground hover:text-primary hover:border-primary bg-card/50"
                    onClick={() => setIsColumnModalOpen(true)}
                  >
                    <Plus className="mr-2 size-5" />
                    Add Column
                  </Button>
                </div>
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <CreateColumnModal
        open={isColumnModalOpen}
        onOpenChange={setIsColumnModalOpen}
        onSubmit={handleAddColumn}
      />

      <TaskFormSheet
        open={taskSheet.open}
        onOpenChange={(open) => setTaskSheet((prev) => ({ ...prev, open }))}
        mode={taskSheet.mode}
        task={taskSheet.task}
        defaultProjectId={projectId}
        defaultColumnId={taskSheet.columnId}
      />

      <DeleteConfirmationModal
        open={deleteModal.open}
        onOpenChange={(open) => setDeleteModal((prev) => ({ ...prev, open }))}
        title="Delete Task"
        description="Are you sure you want to delete this task? This action cannot be undone."
        itemName={deleteModal.task?.title}
        onConfirm={handleDeleteTask}
      />
    </>
  );
};
