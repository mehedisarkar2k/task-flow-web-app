export type TaskPriority = "HIGH" | "MEDIUM" | "LOW";

export interface UserSnippet {
  id: string;
  name: string;
  avatarUrl?: string; // We can use placeholder avatars like the HTML reference
}

export interface Attachment {
  id: string;
  name: string;
  size: string;
  type: "image" | "document";
}

export type TaskStatus = "TODO" | "IN_PROGRESS" | "COMPLETED";

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  status?: TaskStatus; // Global status or derived from project column

  // Bound fields (when added to a project)
  project?: { id: string; name: string };
  dueDate?: string; // formatted for display, e.g. "Oct 12, 2026"
  estimatedTime?: string; // formatted, e.g. "4h", "2d"
  assignee?: UserSnippet;
  assignees?: UserSnippet[]; // Some tasks have multiple
  isOverdue?: boolean;
  attachments?: Attachment[];

  // Raw values retained for edit forms (not for display).
  dueDateRaw?: string | null; // ISO yyyy-mm-dd
  estimatedMinutes?: number | null;
  createdAt?: string;
  commentCount?: number;
  attachmentCount?: number;

  // Board placement.
  columnId?: string | null;
  position?: number;
}

export type KanbanTask = Task; // Alias for backward compatibility if needed, though we should prefer Task
