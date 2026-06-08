import { useQuery } from "@tanstack/react-query";
import { membersApi } from "@/services/api/members";
import { projectKeys } from "@/services/keys/project-keys";

export const useProjectMembers = (projectId: string | undefined) => {
  return useQuery({
    queryKey: [...projectKeys.detail(projectId ?? ""), "members"],
    queryFn: () => membersApi.list(projectId!),
    enabled: Boolean(projectId),
  });
};
