import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationsApi } from '../api/notifications.api';
import { notificationKeys } from '../keys/notification.keys';
import { toast } from 'sonner';

export const useMarkAsReadMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notificationsApi.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
  });
};

export const useMarkAllAsReadMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationsApi.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
      toast.success('All notifications marked as read');
    },
    onError: () => {
      toast.error('Failed to mark notifications as read');
    },
  });
};

export const useArchiveNotificationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notificationsApi.archive(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
  });
};
