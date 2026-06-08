import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { tasksApi, type ListTasksParams } from "@/services/api/tasks";
import { taskKeys } from "@/services/keys/task-keys";

export const useTasks = (params: ListTasksParams) => {
  return useQuery({
    queryKey: taskKeys.list(params),
    queryFn: () => tasksApi.list(params),
    placeholderData: keepPreviousData,
  });
};

export const useTask = (taskId: string) => {
  return useQuery({
    queryKey: taskKeys.detail(taskId),
    queryFn: () => tasksApi.getById(taskId),
    enabled: Boolean(taskId),
  });
};
