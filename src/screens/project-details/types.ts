import type { Task, TaskStatus } from "@/screens/tasks/types";

export type KanbanTask = Task;
export type { UserSnippet, Attachment } from "@/screens/tasks/types";

export interface KanbanColumnData {
  id: string;
  title: string;
  color?: string; // token: muted | primary | secondary | destructive | emerald | blue
  mappedStatus?: TaskStatus | null;
  tasks: KanbanTask[];
}

export interface ProjectMemberDisplay {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
  role?: "Lead" | "Member";
}

export interface ProjectDetails {
  id: string;
  name: string;
  description?: string;
  status: "ACTIVE" | "COMPLETED" | "ON_HOLD";
  progress: number;
  dueDate: string;
  deadlineRaw?: string | null;
  members: ProjectMemberDisplay[];
  columns: KanbanColumnData[];
}
