import { useMutation, useQueryClient } from "@tanstack/react-query";
import { commentsApi, type CommentInput } from "@/services/api/comments";
import { commentKeys } from "@/services/keys/comment-keys";
import { taskKeys } from "@/services/keys/task-keys";
import { toast } from "sonner";

export const useCreateCommentMutation = (taskId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CommentInput) => commentsApi.create(taskId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys.list(taskId) });
      queryClient.invalidateQueries({ queryKey: taskKeys.detail(taskId) });
      toast.success("Comment posted");
    },
    onError: (error: { message?: string }) => {
      toast.error(error?.message ?? "Failed to post comment");
    },
  });
};

export const useUpdateCommentMutation = (taskId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, data }: { commentId: string; data: CommentInput }) =>
      commentsApi.update(taskId, commentId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys.list(taskId) });
      toast.success("Comment updated");
    },
    onError: (error: { message?: string }) => {
      toast.error(error?.message ?? "Failed to update comment");
    },
  });
};

export const useDeleteCommentMutation = (taskId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => commentsApi.remove(taskId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys.list(taskId) });
      queryClient.invalidateQueries({ queryKey: taskKeys.detail(taskId) });
      toast.success("Comment deleted");
    },
    onError: (error: { message?: string }) => {
      toast.error(error?.message ?? "Failed to delete comment");
    },
  });
};
