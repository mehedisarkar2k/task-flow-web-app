import { Notification } from '@/types/notification.types';
import { apiClient } from '../../clients/api-client';
import type { ApiResponse } from '../../types/api.types';

export const notificationsApi = {
  getNotifications: async (params: { page: number; limit: number; filter?: 'all' | 'unread' | 'archived' }) => {
    const res = await apiClient.get<ApiResponse<Notification[]>>('/notifications', { params });
    return res.data;
  },

  getUnreadCount: async () => {
    const res = await apiClient.get<ApiResponse<{ count: number }>>('/notifications/unread-count');
    return res.data;
  },

  markAsRead: async (id: string) => {
    const res = await apiClient.patch<ApiResponse<{ message: string }>>(`/notifications/${id}/read`);
    return res.data;
  },

  markAllAsRead: async () => {
    const res = await apiClient.patch<ApiResponse<{ message: string }>>('/notifications/read-all');
    return res.data;
  },

  archive: async (id: string) => {
    const res = await apiClient.patch<ApiResponse<{ message: string }>>(`/notifications/${id}/archive`);
    return res.data;
  },
};
