import Link from "next/link";
import { ArrowUpRight, Calendar, ChevronRight, ListTodo } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusBadge } from "@/screens/projects/_components/status-badge";
import { MemberAvatarGroup } from "@/screens/projects/_components/member-avatar-group";
import type { Project } from "@/screens/projects/types";

interface ProjectTableRowProps {
  project: Project;
}

const ProjectTableRow = ({ project }: ProjectTableRowProps) => {
  const progressColor =
    project.status === "COMPLETED"
      ? "bg-emerald-500"
      : project.progress < 30
        ? "bg-muted-foreground/50"
        : "bg-primary";

  return (
    <Link
      href={`/projects/${project.id}`}
      className="flex items-center gap-4 px-5 py-3.5 border-b border-border last:border-0 hover:bg-muted/50 transition-colors group"
    >
      {/* Name */}
      <div className="flex-1 min-w-0">
        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate block">
          {project.name}
        </span>
        <span className="text-xs text-muted-foreground font-mono">
          {project.taskCount} tasks
        </span>
      </div>

      {/* Status */}
      <div className="hidden sm:block shrink-0">
        <StatusBadge status={project.status} />
      </div>

      {/* Progress */}
      <div className="hidden md:flex flex-col gap-1 w-24 shrink-0">
        <div className="flex justify-between">
          <span className="font-mono text-xs text-muted-foreground">
            {project.progress}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
          <div
            className={cn("h-full rounded-full", progressColor)}
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      {/* Members */}
      <div className="hidden lg:block shrink-0">
        <MemberAvatarGroup members={project.members} maxVisible={3} />
      </div>

      {/* Due date */}
      <div className="hidden md:flex items-center gap-1.5 text-muted-foreground shrink-0">
        <Calendar className="size-3.5" />
        <span className="font-mono text-xs">{project.dueDate}</span>
      </div>

      {/* Arrow */}
      <ChevronRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
    </Link>
  );
};

interface ProjectTableProps {
  projects: Project[];
}

export const ProjectTable = ({ projects }: ProjectTableProps) => (
  <div className="bg-card rounded-xl border border-border overflow-hidden">
    {/* Column headers */}
    <div className="hidden md:flex items-center gap-4 px-5 py-2.5 bg-muted/50 border-b border-border text-xs font-medium text-muted-foreground uppercase tracking-wide">
      <span className="flex-1">Project</span>
      <span className="hidden sm:block w-24">Status</span>
      <span className="hidden md:block w-24">Progress</span>
      <span className="hidden lg:block w-20">Team</span>
      <span className="hidden md:block w-20">Due</span>
      <span className="w-4" />
    </div>

    {projects.map((project) => (
      <ProjectTableRow key={project.id} project={project} />
    ))}
  </div>
);
