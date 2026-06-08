import { apiClient } from "@/clients/api-client";
import { ApiResponse, PaginationMeta } from "@/types/api.types";
import type { GlobalRole } from "@/screens/team/types";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: GlobalRole;
  jobTitle: string | null;
  department: string | null;
  image: string | null;
  createdAt: string;
}

export interface UserSearchResult {
  id: string;
  name: string;
  email: string;
  role: GlobalRole;
  image: string | null;
}

export const usersApi = {
  list: async (params: {
    page?: number;
    limit?: number;
    search?: string;
    role?: GlobalRole | "";
  }): Promise<{ users: AdminUser[]; meta: PaginationMeta }> => {
    const response = await apiClient.get<ApiResponse<AdminUser[]>>("/users", {
      params: {
        page: params.page,
        limit: params.limit,
        search: params.search || undefined,
        role: params.role || undefined,
      },
    });
    const meta = response.data.meta ?? {
      page: 1,
      limit: params.limit ?? 20,
      total: 0,
      totalPages: 1,
    };
    return { users: response.data.data ?? [], meta };
  },

  changeRole: async (userId: string, role: GlobalRole) => {
    const response = await apiClient.patch<ApiResponse<{ id: string; name: string; role: GlobalRole }>>(
      `/users/${userId}/role`,
      { role },
    );
    return response.data.data!;
  },

  search: async (params: {
    q: string;
    projectId?: string;
    excludeProjectId?: string;
  }): Promise<UserSearchResult[]> => {
    const response = await apiClient.get<ApiResponse<UserSearchResult[]>>("/users/search", {
      params,
    });
    return response.data.data ?? [];
  },
};
