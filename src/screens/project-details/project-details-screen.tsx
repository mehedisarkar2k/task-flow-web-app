"use client";

import Link from "next/link";
import { ChevronRight, Calendar, Edit2, Trash2, Plus, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KanbanBoard } from "@/screens/project-details/_components/kanban-board";
import { MembersWidget } from "@/screens/project-details/_components/members-widget";
import { AttachmentsWidget } from "@/screens/project-details/_components/attachments-widget";
import { MOCK_PROJECT_DETAILS } from "@/screens/project-details/types";
import { cn } from "@/lib/utils";

interface ProjectDetailsScreenProps {
  projectId: string;
}

export const ProjectDetailsScreen = ({ projectId }: ProjectDetailsScreenProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _id = projectId; // To be used when API is ready
  // In reality, we would fetch data using projectId.
  // We'll use the mock data for now.
  const project = MOCK_PROJECT_DETAILS;

  if (!project) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <h2 className="text-xl font-semibold">Project not found</h2>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/projects">Back to Projects</Link>
        </Button>
      </div>
    );
  }

  const isCompleted = project.status === "COMPLETED";

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
                  : "bg-primary/10 text-primary border border-primary/20"
              )}
            >
              <span
                className={cn(
                  "size-1.5 rounded-full",
                  isCompleted ? "bg-emerald-500" : "bg-primary"
                )}
              />
              {isCompleted ? "Completed" : "In Progress"}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>{project.team}</span>
            <span className="size-1 bg-border rounded-full" />
            <span className="flex items-center gap-1.5 font-mono">
              <Calendar className="size-4" />
              Due {project.dueDate}
            </span>
          </div>
        </div>

        {/* Header Actions & Progress */}
        <div className="flex flex-col items-start lg:items-end gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" title="Edit Project">
              <Edit2 className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              title="Delete Project"
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 hover:border-destructive/30"
            >
              <Trash2 className="size-4" />
            </Button>
            <Button className="ml-2 gap-2 shadow-sm">
              <Plus className="size-4" />
              New Task
            </Button>
          </div>

          <div className="flex items-center gap-3 w-48">
            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  isCompleted ? "bg-emerald-500" : "bg-primary"
                )}
                style={{ width: `${project.progress}%` }}
              />
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              {project.progress}%
            </span>
          </div>
        </div>
      </header>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Kanban Board Area */}
        <div className="xl:col-span-9 overflow-hidden">
          <KanbanBoard initialColumns={project.columns} />
        </div>

        {/* Right Sidebar Widgets */}
        <aside className="xl:col-span-3 flex flex-col gap-6">
          <MembersWidget members={project.members} />
          <AttachmentsWidget attachments={project.attachments} />
        </aside>
      </div>

      {/* Footer / Activity Feed Snippet */}
      <footer className="mt-10 border-t border-border pt-4 flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-3">
          <span className="font-medium text-foreground flex items-center gap-1.5">
            <History className="size-4" />
            Recent Activity:
          </span>
          <span className="hidden sm:inline">
            Sarah J. moved &quot;Stakeholder Interview&quot; to Completed.
          </span>
        </div>
        <span className="font-mono text-xs">2 hours ago</span>
      </footer>
    </div>
  );
};
