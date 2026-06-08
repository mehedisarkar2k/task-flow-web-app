export type NotificationType = 
  | 'PROJECT_MEMBER_ADDED' 
  | 'PROJECT_MEMBER_REMOVED' 
  | 'PROJECT_STATUS_CHANGED' 
  | 'TASK_ASSIGNED' 
  | 'TASK_UNASSIGNED' 
  | 'TASK_STATUS_CHANGED';

export type NotificationEntityType = 'PROJECT' | 'TASK';

export interface Notification {
  id: string;
  userId: string;
  actorId?: string | null;
  actor?: {
    id: string;
    name: string;
    image?: string | null;
  } | null;
  type: NotificationType;
  entityType: NotificationEntityType;
  entityId: string;
  message: string;
  isRead: boolean;
  archivedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}
