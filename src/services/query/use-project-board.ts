import { useQuery } from "@tanstack/react-query";
import { projectsApi } from "@/services/api/projects";
import { columnsApi } from "@/services/api/columns";
import { tasksApi } from "@/services/api/tasks";
import { projectKeys } from "@/services/keys/project-keys";

export const useProjectDetail = (projectId: string) =>
  useQuery({
    queryKey: projectKeys.detail(projectId),
    queryFn: () => projectsApi.getById(projectId),
    enabled: Boolean(projectId),
  });

export const useProjectColumns = (projectId: string) =>
  useQuery({
    queryKey: projectKeys.columns(projectId),
    queryFn: () => columnsApi.list(projectId),
    enabled: Boolean(projectId),
  });

export const useProjectBoardTasks = (projectId: string) =>
  useQuery({
    queryKey: projectKeys.boardTasks(projectId),
    queryFn: () => tasksApi.listByProject(projectId),
    enabled: Boolean(projectId),
  });
