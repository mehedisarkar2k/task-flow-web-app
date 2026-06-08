import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "@/services/api/dashboard";
import { dashboardKeys } from "@/services/keys/dashboard-keys";

export const useDashboardQuery = () => {
  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: () => dashboardApi.getStats(),
  });
};

export const useActivitiesQuery = (params: { page?: number; limit?: number } = {}) => {
  return useQuery({
    queryKey: dashboardKeys.activities(params),
    queryFn: () => dashboardApi.getActivities(params),
  });
};
