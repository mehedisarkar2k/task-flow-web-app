import { apiClient } from "@/clients/api-client";
import { ApiResponse } from "@/types/api.types";
import type { TaskStatus } from "@/screens/tasks/types";

export type ColumnColor =
  | "muted"
  | "primary"
  | "secondary"
  | "destructive"
  | "emerald"
  | "blue";

export interface BoardColumn {
  id: string;
  name: string;
  color: string;
  position: number;
  mappedStatus: TaskStatus | null;
  taskCount?: number;
}

export const columnsApi = {
  list: async (projectId: string): Promise<BoardColumn[]> => {
    const response = await apiClient.get<ApiResponse<BoardColumn[]>>(
      `/projects/${projectId}/columns`,
    );
    return response.data.data ?? [];
  },

  create: async (
    projectId: string,
    data: { name: string; color: ColumnColor },
  ): Promise<BoardColumn> => {
    const response = await apiClient.post<ApiResponse<BoardColumn>>(
      `/projects/${projectId}/columns`,
      data,
    );
    return response.data.data!;
  },

  reorder: async (projectId: string, orderedColumnIds: string[]): Promise<BoardColumn[]> => {
    const response = await apiClient.patch<ApiResponse<BoardColumn[]>>(
      `/projects/${projectId}/columns/reorder`,
      { orderedColumnIds },
    );
    return response.data.data ?? [];
  },
};
