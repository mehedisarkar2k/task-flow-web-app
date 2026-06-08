import { useQuery } from '@tanstack/react-query';
import { notificationsApi } from '../api/notifications.api';
import { notificationKeys } from '../keys/notification.keys';

export const useUnreadCountQuery = () => {
  return useQuery({
    queryKey: notificationKeys.unreadCount(),
    queryFn: () => notificationsApi.getUnreadCount(),
    refetchInterval: 30000, // Poll every 30 seconds
  });
};
