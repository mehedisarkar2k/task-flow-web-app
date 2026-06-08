import { useQuery } from "@tanstack/react-query";
import { commentsApi } from "@/services/api/comments";
import { commentKeys } from "@/services/keys/comment-keys";

export const useCommentsQuery = (taskId: string) => {
  return useQuery({
    queryKey: commentKeys.list(taskId),
    queryFn: () => commentsApi.list(taskId),
    enabled: Boolean(taskId),
  });
};
