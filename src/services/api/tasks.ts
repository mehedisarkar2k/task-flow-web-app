import { apiClient } from "@/clients/api-client";
import { ApiResponse, PaginationMeta } from "@/types/api.types";
import type { Task, TaskPriority, TaskStatus } from "@/screens/tasks/types";
import { formatDueDate, formatEstimatedTime } from "@/utils/task-format";

// ─── Server shapes ───────────────────────────────────────────────────────────

interface ServerAssignee {
  id: string;
  name: string;
  email?: string;
  image: string | null;
}

interface ServerTask {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  estimatedMinutes: number | null;
  isOverdue: boolean;
  project: { id: string; name: string } | null;
  column?: { id: string; name: string; color: string } | null;
  columnId?: string | null;
  position?: number;
  assignees: ServerAssignee[];
  createdBy: { id: string; name: string };
  commentCount: number;
  attachmentCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ListTasksParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: TaskStatus | "";
  priority?: TaskPriority | "";
  assignee?: string;
  projectId?: string;
  sort?: "latest" | "deadline" | "priority" | "updated";
}

export interface CreateTaskData {
  title: string;
  description?: string;
  assigneeIds?: string[];
  dueDate: string;
  estimatedMinutes?: number;
  priority: TaskPriority;
  status?: TaskStatus;
  columnId?: string;
}

export interface UpdateTaskData {
  title?: string;
  description?: string | null;
  assigneeIds?: string[];
  dueDate?: string;
  estimatedMinutes?: number | null;
  priority?: TaskPriority;
  status?: TaskStatus;
}

export interface TaskListResult {
  tasks: Task[];
  meta: PaginationMeta;
}

// ─── Mapper ──────────────────────────────────────────────────────────────────

const toTask = (t: ServerTask): Task => ({
  id: t.id,
  title: t.title,
  description: t.description ?? undefined,
  priority: t.priority,
  status: t.status,
  project: t.project ?? undefined,
  dueDate: formatDueDate(t.dueDate),
  estimatedTime: formatEstimatedTime(t.estimatedMinutes),
  assignees: t.assignees.map((a) => ({
    id: a.id,
    name: a.name,
    avatarUrl: a.image ?? undefined,
  })),
  isOverdue: t.isOverdue,
  dueDateRaw: t.dueDate,
  estimatedMinutes: t.estimatedMinutes,
  createdAt: t.createdAt,
  commentCount: t.commentCount,
  attachmentCount: t.attachmentCount,
  columnId: t.columnId ?? null,
  position: t.position,
});

// ─── API ──────────────────────────────────────────────────────────────────────

export const tasksApi = {
  list: async (params: ListTasksParams): Promise<TaskListResult> => {
    const response = await apiClient.get<ApiResponse<ServerTask[]>>("/tasks", {
      params: {
        page: params.page,
        limit: params.limit,
        search: params.search || undefined,
        status: params.status || undefined,
        priority: params.priority || undefined,
        assignee: params.assignee || undefined,
        projectId: params.projectId || undefined,
        sort: params.sort,
      },
    });
    const meta = response.data.meta ?? {
      page: 1,
      limit: params.limit ?? 20,
      total: 0,
      totalPages: 1,
    };
    return { tasks: (response.data.data ?? []).map(toTask), meta };
  },

  listByProject: async (projectId: string): Promise<Task[]> => {
    const response = await apiClient.get<ApiResponse<ServerTask[]>>(
      `/projects/${projectId}/tasks`,
    );
    return (response.data.data ?? []).map(toTask);
  },

  getById: async (taskId: string): Promise<Task> => {
    const response = await apiClient.get<ApiResponse<ServerTask>>(`/tasks/${taskId}`);
    return toTask(response.data.data!);
  },

  create: async (projectId: string, data: CreateTaskData): Promise<Task> => {
    const response = await apiClient.post<ApiResponse<ServerTask>>(
      `/projects/${projectId}/tasks`,
      data,
    );
    return toTask(response.data.data!);
  },

  update: async (taskId: string, data: UpdateTaskData): Promise<Task> => {
    const response = await apiClient.put<ApiResponse<ServerTask>>(`/tasks/${taskId}`, data);
    return toTask(response.data.data!);
  },

  updateStatus: async (taskId: string, status: TaskStatus): Promise<Task> => {
    const response = await apiClient.patch<ApiResponse<ServerTask>>(`/tasks/${taskId}/status`, {
      status,
    });
    return toTask(response.data.data!);
  },

  move: async (
    taskId: string,
    data: { columnId: string; position: number },
  ): Promise<Task> => {
    const response = await apiClient.patch<ApiResponse<ServerTask>>(`/tasks/${taskId}/move`, data);
    return toTask(response.data.data!);
  },

  remove: async (taskId: string): Promise<boolean> => {
    const response = await apiClient.delete<ApiResponse>(`/tasks/${taskId}`);
    return response.data.success;
  },
};
