import { apiClient } from "@/clients/api-client";
import { ApiResponse } from "@/types/api.types";

export interface ProjectMemberSummary {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  projectRole: "LEAD" | "MEMBER";
}

interface ServerMember extends ProjectMemberSummary {
  role: string;
  addedAt: string;
  workload: { total: number; completed: number; pending: number };
}

export const membersApi = {
  list: async (projectId: string): Promise<ProjectMemberSummary[]> => {
    const response = await apiClient.get<ApiResponse<ServerMember[]>>(
      `/projects/${projectId}/members`,
    );
    return (response.data.data ?? []).map((m) => ({
      id: m.id,
      name: m.name,
      email: m.email,
      avatar: m.avatar,
      projectRole: m.projectRole,
    }));
  },
};
