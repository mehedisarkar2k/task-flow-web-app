"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, Calendar, Edit2, Trash2, Plus, Loader2, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import {
  useProjectDetail,
  useProjectColumns,
  useProjectBoardTasks,
} from "@/services/query/use-project-board";
import { useDeleteProjectMutation } from "@/services/mutation/use-project-mutations";
import { KanbanBoard } from "@/screens/project-details/_components/kanban-board";
import { MembersWidget } from "@/screens/project-details/_components/members-widget";
import { CreateProjectModal } from "@/screens/projects/_components/create-project-modal";
import { TaskFormSheet } from "@/screens/tasks/_components/task-form-sheet";
import { DeleteConfirmationModal } from "@/components/modal/delete-confirmation-modal";
import type { KanbanColumnData, ProjectMemberDisplay } from "@/screens/project-details/types";

interface ProjectDetailsScreenProps {
  projectId: string;
}

export const ProjectDetailsScreen = ({ projectId }: ProjectDetailsScreenProps) => {
  const router = useRouter();
  const { isAdmin, role } = useAuth();
  const canManage = isAdmin || role === "PM";

  const { data: project, isLoading: projectLoading, isError } = useProjectDetail(projectId);
  const { data: columns, isLoading: columnsLoading } = useProjectColumns(projectId);
  const { data: tasks, isLoading: tasksLoading } = useProjectBoardTasks(projectId);
  const deleteProject = useDeleteProjectMutation();

  const [newTaskOpen, setNewTaskOpen] = useState(false);
  const [editProjectOpen, setEditProjectOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const boardColumns: KanbanColumnData[] = useMemo(() => {
    if (!columns) return [];
    const allTasks = tasks ?? [];
    return columns.map((col) => ({
      id: col.id,
      title: col.name,
      color: col.color,
      mappedStatus: col.mappedStatus,
      tasks: allTasks
        .filter((t) => t.columnId === col.id)
        .sort((a, b) => (a.position ?? 0) - (b.position ?? 0)),
    }));
  }, [columns, tasks]);

  const members: ProjectMemberDisplay[] = useMemo(
    () =>
      (project?.members ?? []).map((m) => ({
        id: m.id,
        name: m.name,
        email: m.email,
        role: m.projectRole === "LEAD" ? "Lead" : "Member",
      })),
    [project],
  );

  if (projectLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full py-24 gap-3 text-muted-foreground">
        <Loader2 className="size-6 animate-spin" />
        <p className="text-sm">Loading project…</p>
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full py-24 gap-3">
        <TriangleAlert className="size-8 text-destructive" />
        <h2 className="text-xl font-semibold">Project not found</h2>
        <Button variant="outline" onClick={() => router.push("/projects")}>
          Back to Projects
        </Button>
      </div>
    );
  }

  const isCompleted = project.status === "COMPLETED";
  const boardLoading = columnsLoading || tasksLoading;

  return (
    <div className="flex flex-col min-h-full pb-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/projects" className="hover:text-primary transition-colors">
          Projects
        </Link>
        <ChevronRight className="size-4" />
        <span className="text-foreground font-medium">{project.name}</span>
      </nav>

      {/* Header */}
      <header className="flex flex-col lg:flex-row justify-between lg:items-end gap-6 mb-8 pb-6 border-b border-border">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <h1 className="font-heading text-3xl font-bold text-foreground tracking-tight">
              {project.name}
            </h1>
            <span
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5",
                isCompleted
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400"
                  : "bg-primary/10 text-primary border border-primary/20",
              )}
            >
              <span
                className={cn("size-1.5 rounded-full", isCompleted ? "bg-emerald-500" : "bg-primary")}
              />
              {isCompleted ? "Completed" : project.status === "ON_HOLD" ? "On Hold" : "In Progress"}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>
              {members.length} {members.length === 1 ? "member" : "members"}
            </span>
            <span className="size-1 bg-border rounded-full" />
            <span className="flex items-center gap-1.5 font-mono">
              <Calendar className="size-4" />
              Due {project.dueDate}
            </span>
          </div>
        </div>

        {/* Header Actions & Progress */}
        <div className="flex flex-col items-start lg:items-end gap-4">
          {canManage && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                title="Edit Project"
                onClick={() => setEditProjectOpen(true)}
              >
                <Edit2 className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                title="Delete Project"
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 hover:border-destructive/30"
                onClick={() => setDeleteOpen(true)}
              >
                <Trash2 className="size-4" />
              </Button>
              <Button className="ml-2 gap-2 shadow-sm" onClick={() => setNewTaskOpen(true)}>
                <Plus className="size-4" />
                New Task
              </Button>
            </div>
          )}

          <div className="flex items-center gap-3 w-48">
            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  isCompleted ? "bg-emerald-500" : "bg-primary",
                )}
                style={{ width: `${project.progress}%` }}
              />
            </div>
            <span className="font-mono text-xs text-muted-foreground">{project.progress}%</span>
          </div>
        </div>
      </header>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <div className="xl:col-span-9 overflow-hidden">
          {boardLoading ? (
            <div className="flex items-center justify-center py-20 text-muted-foreground gap-3">
              <Loader2 className="size-5 animate-spin" />
              <span className="text-sm">Loading board…</span>
            </div>
          ) : (
            <KanbanBoard projectId={projectId} columns={boardColumns} canManage={canManage} />
          )}
        </div>

        <aside className="xl:col-span-3 flex flex-col gap-6">
          <MembersWidget members={members} />
        </aside>
      </div>

      {canManage && (
        <>
          <TaskFormSheet
            open={newTaskOpen}
            onOpenChange={setNewTaskOpen}
            mode="create"
            defaultProjectId={projectId}
          />
          <CreateProjectModal
            open={editProjectOpen}
            onOpenChange={setEditProjectOpen}
            mode="edit"
            project={{
              id: project.id,
              name: project.name,
              description: project.description,
              deadline: project.deadline,
              status: project.status,
            }}
          />
          <DeleteConfirmationModal
            open={deleteOpen}
            onOpenChange={setDeleteOpen}
            title="Delete project"
            description="This project and its board will be removed. This action cannot be undone."
            itemName={project.name}
            onConfirm={() =>
              deleteProject.mutate(project.id, { onSuccess: () => router.push("/projects") })
            }
          />
        </>
      )}
    </div>
  );
};
