export const dashboardKeys = {
  all: ["dashboard"] as const,
  stats: () => [...dashboardKeys.all, "stats"] as const,
  activities: (params: Record<string, unknown> = {}) =>
    [...dashboardKeys.all, "activities", params] as const,
};
