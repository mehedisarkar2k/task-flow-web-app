import { apiClient } from "@/clients/api-client";
import { ApiResponse, PaginationMeta } from "@/types/api.types";
import type {
  Project,
  ProjectStatus,
  SortOption,
} from "@/screens/projects/types";

// ─── Server response shapes ──────────────────────────────────────────────────

interface ServerProjectMember {
  id: string;
  name: string;
  avatar: string | null;
}

interface ServerProjectListItem {
  id: string;
  name: string;
  description: string | null;
  deadline: string | null;
  status: ProjectStatus;
  createdBy: { id: string; name: string };
  progress: { total: number; completed: number; percentage: number };
  memberCount: number;
  members: ServerProjectMember[];
  createdAt: string;
  updatedAt: string;
}

export interface ListProjectsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: ProjectStatus | "";
  sort?: SortOption;
}

export interface CreateProjectData {
  name: string;
  description?: string;
  deadline: string; // ISO date (yyyy-mm-dd)
  status: ProjectStatus;
  pmId?: string; // required when an admin creates (the chosen PM)
  leadId: string; // the chosen team lead
}

export interface UpdateProjectData {
  name?: string;
  description?: string | null;
  deadline?: string;
  status?: ProjectStatus;
}

export interface ProjectListResult {
  projects: Project[];
  meta: PaginationMeta;
}

interface ServerProjectDetailMember {
  id: string;
  name: string;
  email: string;
  role: string;
  projectRole: "LEAD" | "MEMBER";
  addedAt: string;
}

interface ServerProjectDetail {
  id: string;
  name: string;
  description: string | null;
  deadline: string | null;
  status: ProjectStatus;
  createdBy: { id: string; name: string };
  progress: { total: number; completed: number; percentage: number };
  members: ServerProjectDetailMember[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectDetail {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  deadline: string | null;
  dueDate: string;
  progress: number;
  createdBy: { id: string; name: string };
  members: {
    id: string;
    name: string;
    email: string;
    projectRole: "LEAD" | "MEMBER";
  }[];
}

// ─── Mappers ──────────────────────────────────────────────────────────────────

const initialsOf = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

const formatDueDate = (deadline: string | null) => {
  if (!deadline) return "No deadline";
  const date = new Date(deadline);
  if (Number.isNaN(date.getTime())) return "No deadline";
  return date.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
};

const toProject = (p: ServerProjectListItem): Project => ({
  id: p.id,
  name: p.name,
  description: p.description ?? "",
  status: p.status,
  progress: p.progress.percentage,
  dueDate: formatDueDate(p.deadline),
  taskCount: p.progress.total,
  members: p.members.map((m) => ({
    id: m.id,
    name: m.name,
    initials: initialsOf(m.name),
  })),
});

// ─── API ──────────────────────────────────────────────────────────────────────

export const projectsApi = {
  list: async (params: ListProjectsParams): Promise<ProjectListResult> => {
    const response = await apiClient.get<ApiResponse<ServerProjectListItem[]>>("/projects", {
      params: {
        page: params.page,
        limit: params.limit,
        search: params.search || undefined,
        status: params.status || undefined,
        sort: params.sort,
      },
    });
    const meta = response.data.meta ?? {
      page: 1,
      limit: params.limit ?? 12,
      total: 0,
      totalPages: 1,
    };
    return { projects: (response.data.data ?? []).map(toProject), meta };
  },

  getById: async (id: string): Promise<ProjectDetail> => {
    const response = await apiClient.get<ApiResponse<ServerProjectDetail>>(`/projects/${id}`);
    const p = response.data.data!;
    return {
      id: p.id,
      name: p.name,
      description: p.description ?? "",
      status: p.status,
      deadline: p.deadline,
      dueDate: p.deadline ? formatDueDate(p.deadline) : "No deadline",
      progress: p.progress.percentage,
      createdBy: p.createdBy,
      members: p.members.map((m) => ({
        id: m.id,
        name: m.name,
        email: m.email,
        projectRole: m.projectRole,
      })),
    };
  },

  create: async (data: CreateProjectData) => {
    const response = await apiClient.post<ApiResponse<ServerProjectListItem>>("/projects", data);
    return response.data.data!;
  },

  update: async (id: string, data: UpdateProjectData) => {
    const response = await apiClient.put<ApiResponse<ServerProjectListItem>>(
      `/projects/${id}`,
      data,
    );
    return response.data.data!;
  },

  remove: async (id: string) => {
    const response = await apiClient.delete<ApiResponse>(`/projects/${id}`);
    return response.data.success;
  },
};
