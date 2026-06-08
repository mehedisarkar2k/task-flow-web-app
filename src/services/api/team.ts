import { apiClient } from "@/clients/api-client";
import { ApiResponse, PaginationMeta } from "@/types/api.types";
import type { Task } from "@/screens/tasks/types";
import type { ServerTask } from "@/services/api/tasks";
import { toTask } from "@/services/api/tasks";
import type { TeamMemberSummary, TeamMemberDetail } from "@/screens/team/types";

export interface TeamMemberTasksParams {
  page?: number;
  limit?: number;
  status?: string;
  priority?: string;
  projectId?: string;
}

export interface MemberTasksResult {
  tasks: Task[];
  meta: PaginationMeta;
}

export const teamApi = {
  listMembers: async (params: {
    search?: string;
    department?: string;
  }): Promise<TeamMemberSummary[]> => {
    const response = await apiClient.get<ApiResponse<TeamMemberSummary[]>>("/team/members", {
      params: {
        search: params.search || undefined,
        department: params.department || undefined,
      },
    });
    return response.data.data ?? [];
  },

  getMember: async (userId: string): Promise<TeamMemberDetail> => {
    const response = await apiClient.get<ApiResponse<TeamMemberDetail>>(`/team/${userId}`);
    return response.data.data!;
  },

  getMemberTasks: async (
    userId: string,
    params: TeamMemberTasksParams,
  ): Promise<MemberTasksResult> => {
    const response = await apiClient.get<ApiResponse<ServerTask[]>>(`/team/${userId}/tasks`, {
      params,
    });
    const meta = response.data.meta ?? {
      page: 1,
      limit: params.limit ?? 20,
      total: 0,
      totalPages: 1,
    };
    return { tasks: (response.data.data ?? []).map(toTask), meta };
  },
};
