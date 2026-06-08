import { apiClient } from "@/clients/api-client";
import type { ApiResponse } from "@/types/api.types";
import type { Activity, DashboardStats } from "@/types/dashboard.types";

export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    const res = await apiClient.get<ApiResponse<DashboardStats>>("/dashboard/stats");
    return res.data.data!;
  },

  getActivities: async (params: { page?: number; limit?: number } = {}): Promise<Activity[]> => {
    const res = await apiClient.get<ApiResponse<Activity[]>>("/activities", {
      params: { page: params.page ?? 1, limit: params.limit ?? 8 },
    });
    return res.data.data ?? [];
  },
};
