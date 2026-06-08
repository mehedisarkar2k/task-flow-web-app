export interface SearchTaskResult {
  id: string;
  title: string;
  status: "TODO" | "IN_PROGRESS" | "COMPLETED";
  priority: "HIGH" | "MEDIUM" | "LOW";
  project: { id: string; name: string } | null;
}

export interface SearchProjectResult {
  id: string;
  name: string;
  status: "ACTIVE" | "COMPLETED" | "ON_HOLD";
}

export interface SearchUserResult {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "PM" | "MEMBER";
  image?: string | null;
  jobTitle?: string | null;
}

export interface SearchNotificationResult {
  id: string;
  message: string;
  entityType: "TASK" | "PROJECT" | "COMMENT";
  entityId: string;
  isRead: boolean;
  createdAt: string;
}

export interface SearchResults {
  tasks: SearchTaskResult[];
  projects: SearchProjectResult[];
  users: SearchUserResult[];
  notifications: SearchNotificationResult[];
}
