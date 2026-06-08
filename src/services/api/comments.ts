import { apiClient } from "@/clients/api-client";
import type { ApiResponse, PaginationMeta } from "@/types/api.types";
import type { Comment, CommentVersionHistory } from "@/types/comment.types";

export interface ListCommentsParams {
  page?: number;
  limit?: number;
}

export interface CommentListResult {
  comments: Comment[];
  meta: PaginationMeta;
}

export interface CommentInput {
  body: string;
  mentions?: string[];
}

export const commentsApi = {
  list: async (taskId: string, params: ListCommentsParams = {}): Promise<CommentListResult> => {
    const res = await apiClient.get<ApiResponse<Comment[]>>(`/tasks/${taskId}/comments`, {
      params: { page: params.page ?? 1, limit: params.limit ?? 50 },
    });
    const meta = res.data.meta ?? {
      page: 1,
      limit: params.limit ?? 50,
      total: 0,
      totalPages: 1,
    };
    return { comments: res.data.data ?? [], meta };
  },

  create: async (taskId: string, data: CommentInput): Promise<Comment> => {
    const res = await apiClient.post<ApiResponse<Comment>>(`/tasks/${taskId}/comments`, data);
    return res.data.data!;
  },

  update: async (taskId: string, commentId: string, data: CommentInput): Promise<Comment> => {
    const res = await apiClient.put<ApiResponse<Comment>>(
      `/tasks/${taskId}/comments/${commentId}`,
      data,
    );
    return res.data.data!;
  },

  versions: async (taskId: string, commentId: string): Promise<CommentVersionHistory> => {
    const res = await apiClient.get<ApiResponse<CommentVersionHistory>>(
      `/tasks/${taskId}/comments/${commentId}/versions`,
    );
    return res.data.data!;
  },

  remove: async (taskId: string, commentId: string): Promise<boolean> => {
    const res = await apiClient.delete<ApiResponse>(`/tasks/${taskId}/comments/${commentId}`);
    return res.data.success;
  },
};
