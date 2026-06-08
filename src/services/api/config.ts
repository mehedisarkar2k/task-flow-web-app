import { apiClient } from '@/clients/api-client';
import { ApiResponse } from '@/types/api.types';

export interface SystemConfig {
  profileImageBaseUrl: string;
}

export const configApi = {
  getSystemConfig: async () => {
    const response = await apiClient.get<ApiResponse<SystemConfig>>('/config');
    return response.data.data!;
  },
};
