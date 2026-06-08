import { useQuery } from '@tanstack/react-query';
import { configApi } from '@/services/api/config';

export function useSystemConfig() {
  return useQuery({
    queryKey: ['system-config'],
    queryFn: () => configApi.getSystemConfig(),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}
