"use client";

import { useState, useCallback } from "react";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { KanbanColumn } from "@/screens/project-details/_components/kanban-column";
import { CreateColumnModal } from "@/screens/project-details/_components/modals/create-column-modal";
import { SelectTaskModal } from "@/screens/project-details/_components/modals/select-task-modal";
import { TaskDetailsSheet } from "@/components/modals/task-details-sheet";
import { DeleteConfirmationModal } from "@/components/modal/delete-confirmation-modal";
import { Button } from "@/components/ui/button";
import type { KanbanColumnData, KanbanTask } from "@/screens/project-details/types";

interface KanbanBoardProps {
  initialColumns: KanbanColumnData[];
}

export const KanbanBoard = ({ initialColumns }: KanbanBoardProps) => {
  const router = useRouter();
  const [columns, setColumns] = useState<KanbanColumnData[]>(initialColumns);

  // Modal States
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  
  const [selectTaskModal, setSelectTaskModal] = useState<{ open: boolean; columnId: string }>({
    open: false,
    columnId: "",
  });

  const [detailsSheet, setDetailsSheet] = useState<{ 
    open: boolean; 
    task?: KanbanTask; 
    columnTitle?: string;
    columnId?: string;
    mode?: "view" | "edit" | "create";
  }>({
    open: false,
  });

  const [deleteModal, setDeleteModal] = useState<{ open: boolean; type: "task" | "column"; id: string; name: string; columnId?: string }>({
    open: false,
    type: "task",
    id: "",
    name: "",
  });

  const onDragEnd = useCallback((result: DropResult) => {
    const { source, destination, type } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    if (type === "column") {
      setColumns((prev) => {
        const newCols = [...prev];
        const [movedCol] = newCols.splice(source.index, 1);
        newCols.splice(destination.index, 0, movedCol);
        return newCols;
      });
      return;
    }

    setColumns((prev) => {
      const sourceColIndex = prev.findIndex((c) => c.id === source.droppableId);
      const destColIndex = prev.findIndex((c) => c.id === destination.droppableId);
      if (sourceColIndex === -1 || destColIndex === -1) return prev;

      const newColumns = [...prev];
      const sourceCol = { ...newColumns[sourceColIndex] };
      const destCol = { ...newColumns[destColIndex] };

      sourceCol.tasks = [...sourceCol.tasks];
      destCol.tasks = sourceColIndex === destColIndex ? sourceCol.tasks : [...destCol.tasks];

      const [movedTask] = sourceCol.tasks.splice(source.index, 1);
      destCol.tasks.splice(destination.index, 0, movedTask);

      newColumns[sourceColIndex] = sourceCol;
      newColumns[destColIndex] = destCol;
      return newColumns;
    });
  }, []);

  // Handlers
  const handleAddColumn = (title: string) => {
    setColumns((prev) => [
      ...prev,
      { id: `col-${Date.now()}`, title, tasks: [] },
    ]);
  };

  const handleTaskSubmit = (taskData: Partial<KanbanTask>, columnId: string) => {
    setColumns((prev) => {
      const newCols = [...prev];
      const colIndex = newCols.findIndex((c) => c.id === columnId);
      if (colIndex === -1) return prev;

      const col = { ...newCols[colIndex], tasks: [...newCols[colIndex].tasks] };

      if (taskData.id) {
        // Edit
        const taskIndex = col.tasks.findIndex((t) => t.id === taskData.id);
        if (taskIndex !== -1) {
          col.tasks[taskIndex] = { ...col.tasks[taskIndex], ...taskData } as KanbanTask;
        }
      } else {
        // Create
        col.tasks.push({
          ...taskData,
          id: `t-${Date.now()}`,
        } as KanbanTask);
      }

      newCols[colIndex] = col;
      return newCols;
    });
  };

  const handleDeleteConfirm = () => {
    setColumns((prev) => {
      if (deleteModal.type === "column") {
        return prev.filter((c) => c.id !== deleteModal.id);
      } else if (deleteModal.type === "task" && deleteModal.columnId) {
        const newCols = [...prev];
        const colIndex = newCols.findIndex((c) => c.id === deleteModal.columnId);
        if (colIndex !== -1) {
          const col = { ...newCols[colIndex] };
          col.tasks = col.tasks.filter((t) => t.id !== deleteModal.id);
          newCols[colIndex] = col;
        }
        return newCols;
      }
      return prev;
    });
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
                <Draggable key={col.id} draggableId={col.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={cn("snap-start shrink-0", snapshot.isDragging ? "opacity-60 z-50 scale-[1.02] shadow-xl rotate-1" : "")}
                      style={provided.draggableProps.style as React.CSSProperties}
                    >
                      <KanbanColumn
                        column={col}
                        dragHandleProps={provided.dragHandleProps}
                        onAddTask={() => setSelectTaskModal({ open: true, columnId: col.id })}
                        onEditTask={(task) => setDetailsSheet({ open: true, task, columnId: col.id, mode: "edit" })}
                        onDeleteTask={(task) =>
                          setDeleteModal({ open: true, type: "task", id: task.id, name: task.title, columnId: col.id })
                        }
                        onViewTask={(task) => router.push(`/tasks/${task.id}`)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              
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
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <CreateColumnModal
        open={isColumnModalOpen}
        onOpenChange={setIsColumnModalOpen}
        onSubmit={handleAddColumn}
      />

      <SelectTaskModal
        open={selectTaskModal.open}
        onOpenChange={(open) => setSelectTaskModal((prev) => ({ ...prev, open }))}
        columnId={selectTaskModal.columnId}
        onSubmit={handleTaskSubmit}
        availableTasks={[]} // Would fetch global backlog here
      />

      <TaskDetailsSheet
        open={detailsSheet.open}
        onOpenChange={(open) => setDetailsSheet((prev) => ({ ...prev, open }))}
        task={detailsSheet.task}
        columnTitle={detailsSheet.columnTitle}
        columnId={detailsSheet.columnId}
        mode={detailsSheet.mode}
        onSubmit={handleTaskSubmit}
      />

      <DeleteConfirmationModal
        open={deleteModal.open}
        onOpenChange={(open) => setDeleteModal((prev) => ({ ...prev, open }))}
        title={deleteModal.type === "task" ? "Delete Task" : "Delete Column"}
        description={
          deleteModal.type === "task"
            ? "Are you sure you want to delete this task? This action cannot be undone."
            : "Are you sure you want to delete this column and all its tasks?"
        }
        itemName={deleteModal.name}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};
