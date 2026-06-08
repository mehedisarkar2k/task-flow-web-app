import { apiClient } from '@/clients/api-client';
import { ApiResponse } from '@/types/api.types';
import { User } from '@/types/user.types';

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  name?: string;
  jobTitle?: string;
  department?: string;
  location?: string;
  bio?: string;
  skills?: string[];
  theme?: "LIGHT" | "DARK" | "SYSTEM";
  emailSummaries?: boolean;
  mentionAlerts?: boolean;
  marketingUpdates?: boolean;
}

export const profileApi = {
  updateProfile: async (data: UpdateProfileData) => {
    const response = await apiClient.put<ApiResponse<User>>('/profile', data);
    return response.data.data;
  },

  requestAvatarUploadUrl: async (data: { fileName: string; mimeType: string; fileSize: number }) => {
    const response = await apiClient.post<ApiResponse<{ uploadUrl: string; fileKey: string; method: string; headers: Record<string, string> }>>(
      '/profile/avatar',
      data
    );
    return response.data.data;
  },

  confirmAvatarUpload: async (fileKey: string) => {
    const response = await apiClient.put<ApiResponse<{ image: string }>>('/profile/avatar/confirm', {
      fileKey,
    });
    return response.data.data;
  },

  removeAvatar: async () => {
    const response = await apiClient.delete<ApiResponse>('/profile/avatar');
    return response.data.success;
  },
};
