import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { columnsApi, type ColumnColor } from "@/services/api/columns";
import { projectKeys } from "@/services/keys/project-keys";

export const useCreateColumnMutation = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { name: string; color: ColumnColor }) =>
      columnsApi.create(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.columns(projectId) });
      toast.success("Column added");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to add column");
    },
  });
};

export const useReorderColumnsMutation = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderedColumnIds: string[]) => columnsApi.reorder(projectId, orderedColumnIds),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.columns(projectId) });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to reorder columns");
    },
  });
};
