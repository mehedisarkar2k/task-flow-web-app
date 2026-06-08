export const teamKeys = {
  all: ["team"] as const,
  members: (params: { search?: string; department?: string }) =>
    [...teamKeys.all, "members", params] as const,
  member: (id: string) => [...teamKeys.all, "member", id] as const,
  memberTasks: (id: string) => [...teamKeys.all, "member", id, "tasks"] as const,
};

export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
};
