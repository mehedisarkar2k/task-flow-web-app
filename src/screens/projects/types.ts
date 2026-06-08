export type ProjectStatus = "ACTIVE" | "COMPLETED" | "ON_HOLD";
export type ViewMode = "grid" | "table";
export type SortOption = "latest" | "deadline" | "updated";

export interface ProjectMember {
  id: string;
  name: string;
  initials: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number; // 0–100
  dueDate: string;
  members: ProjectMember[];
  taskCount: number;
}
