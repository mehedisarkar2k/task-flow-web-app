"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Loader2, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useDebounce } from "@/hooks/use-debounce";
import { useTasks } from "@/services/query/use-tasks";
import { TaskFilters } from "@/screens/tasks/_components/task-filters";
import { TaskTable } from "@/screens/tasks/_components/task-table";
import { TasksEmptyState } from "@/screens/tasks/_components/tasks-empty-state";
import { TaskFormSheet } from "@/screens/tasks/_components/task-form-sheet";
import type { TaskPriority, TaskStatus } from "@/screens/tasks/types";

const PAGE_SIZE = 20;

export const TasksScreen = () => {
  const router = useRouter();
  const { user, isAdmin, role } = useAuth();
  const canCreate = isAdmin || role === "PM";

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [assigneeFilter, setAssigneeFilter] = useState("ANY");
  const [page, setPage] = useState(1);
  const [createOpen, setCreateOpen] = useState(false);

  const debouncedSearch = useDebounce(searchQuery);

  const { data, isLoading, isError, error } = useTasks({
    page,
    limit: PAGE_SIZE,
    search: debouncedSearch,
    status: statusFilter === "ALL" ? "" : (statusFilter as TaskStatus),
    priority: priorityFilter === "ALL" ? "" : (priorityFilter as TaskPriority),
    assignee: assigneeFilter === "ME" ? user?.id : undefined,
    sort: "latest",
  });

  const tasks = data?.tasks ?? [];
  const meta = data?.meta;

  const resetPage = <T,>(setter: (v: T) => void) => (value: T) => {
    setter(value);
    setPage(1);
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-col gap-6 mb-8 max-w-[1200px] mx-auto w-full">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
              All Tasks
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">
              Manage and track your editorial workflow.
            </p>
          </div>
          {canCreate && (
            <Button
              onClick={() => setCreateOpen(true)}
              className="rounded-full bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary font-label-md"
            >
              <Plus className="size-4 mr-2" />
              Create Task
            </Button>
          )}
        </div>
      </div>

      <div className="flex-1 max-w-[1200px] mx-auto w-full flex flex-col">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-[0_4px_12px_rgba(28,26,23,0.02)] flex flex-col overflow-hidden mb-8">
          <TaskFilters
            searchQuery={searchQuery}
            setSearchQuery={resetPage(setSearchQuery)}
            statusFilter={statusFilter}
            setStatusFilter={resetPage(setStatusFilter)}
            priorityFilter={priorityFilter}
            setPriorityFilter={resetPage(setPriorityFilter)}
            assigneeFilter={assigneeFilter}
            setAssigneeFilter={resetPage(setAssigneeFilter)}
          />

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-muted-foreground">
              <Loader2 className="size-6 animate-spin" />
              <p className="text-sm">Loading tasks…</p>
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <TriangleAlert className="size-8 text-destructive" />
              <p className="text-sm text-muted-foreground">
                {(error as Error)?.message ?? "Couldn't load tasks."}
              </p>
            </div>
          ) : tasks.length === 0 ? (
            <TasksEmptyState onCreateClick={canCreate ? () => setCreateOpen(true) : undefined} />
          ) : (
            <TaskTable
              tasks={tasks}
              onRowClick={(task) => router.push(`/tasks/${task.id}`)}
              pagination={
                meta
                  ? {
                      page: meta.page,
                      total: meta.total,
                      totalPages: meta.totalPages,
                      onPageChange: setPage,
                    }
                  : undefined
              }
            />
          )}
        </div>
      </div>

      {canCreate && (
        <TaskFormSheet open={createOpen} onOpenChange={setCreateOpen} mode="create" />
      )}
    </div>
  );
};
