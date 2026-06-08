import Link from "next/link";
import { Calendar, ListTodo } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusBadge } from "@/screens/projects/_components/status-badge";
import { MemberAvatarGroup } from "@/screens/projects/_components/member-avatar-group";
import type { Project } from "@/screens/projects/types";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const progressColor =
    project.status === "COMPLETED"
      ? "bg-emerald-500"
      : project.progress < 30
        ? "bg-muted-foreground/50"
        : "bg-primary";

  return (
    <Link
      href={`/projects/${project.id}`}
      className={cn(
        "group bg-card rounded-xl p-5 border border-border flex flex-col gap-4",
        "hover:shadow-md hover:border-primary/30 transition-all duration-200 cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      )}
    >
      {/* Title + Status */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-heading text-base font-semibold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
          {project.name}
        </h3>
        <StatusBadge status={project.status} />
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed flex-1">
        {project.description}
      </p>

      {/* Progress + Footer */}
      <div className="mt-auto pt-4 border-t border-border/50 flex flex-col gap-3">
        {/* Progress bar */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <span className="font-mono text-xs text-muted-foreground">
              Progress
            </span>
            <span className="font-mono text-xs font-medium text-foreground">
              {project.progress}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all duration-500", progressColor)}
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        {/* Members + Due date */}
        <div className="flex items-center justify-between">
          <MemberAvatarGroup members={project.members} />
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="size-3.5 shrink-0" />
            <span className="font-mono text-xs">Due: {project.dueDate}</span>
          </div>
        </div>

        {/* Task count */}
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <ListTodo className="size-3.5 shrink-0" />
          <span className="text-xs font-mono">{project.taskCount} tasks</span>
        </div>
      </div>
    </Link>
  );
};
