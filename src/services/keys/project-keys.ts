import type { ListProjectsParams } from "@/services/api/projects";

export const projectKeys = {
  all: ["projects"] as const,
  lists: () => [...projectKeys.all, "list"] as const,
  list: (params: ListProjectsParams) => [...projectKeys.lists(), params] as const,
  details: () => [...projectKeys.all, "detail"] as const,
  detail: (id: string) => [...projectKeys.details(), id] as const,
  columns: (id: string) => [...projectKeys.detail(id), "columns"] as const,
  boardTasks: (id: string) => [...projectKeys.detail(id), "tasks"] as const,
};
