export const notificationKeys = {
  all: ['notifications'] as const,
  list: (params: Record<string, unknown>) => [...notificationKeys.all, 'list', params] as const,
  unreadCount: () => [...notificationKeys.all, 'unreadCount'] as const,
};
