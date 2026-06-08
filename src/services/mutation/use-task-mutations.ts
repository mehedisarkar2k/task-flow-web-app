import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  tasksApi,
  type CreateTaskData,
  type UpdateTaskData,
} from "@/services/api/tasks";
import type { TaskStatus } from "@/screens/tasks/types";
import { taskKeys } from "@/services/keys/task-keys";
import { projectKeys } from "@/services/keys/project-keys";

export const useCreateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, data }: { projectId: string; data: CreateTaskData }) =>
      tasksApi.create(projectId, data),
    onSuccess: (_task, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(projectId) });
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      toast.success("Task created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create task");
    },
  });
};

export const useUpdateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTaskData }) => tasksApi.update(id, data),
    onSuccess: (_task, { id }) => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
      queryClient.invalidateQueries({ queryKey: taskKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: projectKeys.details() });
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      toast.success("Task updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update task");
    },
  });
};

export const useUpdateTaskStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: TaskStatus }) =>
      tasksApi.updateStatus(id, status),
    onSuccess: (_task, { id }) => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
      queryClient.invalidateQueries({ queryKey: taskKeys.detail(id) });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update status");
    },
  });
};

/**
 * Moves a task to a column/position (Kanban drag-and-drop). The board updates
 * optimistically, so on settle we just resync the affected project's board.
 */
export const useMoveTaskMutation = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, columnId, position }: { id: string; columnId: string; position: number }) =>
      tasksApi.move(id, { columnId, position }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.boardTasks(projectId) });
      queryClient.invalidateQueries({ queryKey: projectKeys.columns(projectId) });
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to move task");
    },
  });
};

export const useDeleteTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => tasksApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
      queryClient.invalidateQueries({ queryKey: projectKeys.details() });
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      toast.success("Task deleted");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete task");
    },
  });
};
