import { useQuery } from '@tanstack/react-query';
import { notificationsApi } from '../api/notifications.api';
import { notificationKeys } from '../keys/notification.keys';

export const useNotificationsQuery = (params: { page: number; limit: number; filter?: 'all' | 'unread' | 'archived' }) => {
  return useQuery({
    queryKey: notificationKeys.list(params),
    queryFn: () => notificationsApi.getNotifications(params),
  });
};
