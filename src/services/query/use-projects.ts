import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { projectsApi, type ListProjectsParams } from "@/services/api/projects";
import { projectKeys } from "@/services/keys/project-keys";

export const useProjects = (params: ListProjectsParams) => {
  return useQuery({
    queryKey: projectKeys.list(params),
    queryFn: () => projectsApi.list(params),
    placeholderData: keepPreviousData,
  });
};
