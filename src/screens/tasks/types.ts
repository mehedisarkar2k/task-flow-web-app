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
  dueDate?: string;
  estimatedTime?: string; // e.g., "4h", "2d"
  assignee?: UserSnippet;
  assignees?: UserSnippet[]; // Some tasks have multiple
  isOverdue?: boolean;
  attachments?: Attachment[];
}

export type KanbanTask = Task; // Alias for backward compatibility if needed, though we should prefer Task
