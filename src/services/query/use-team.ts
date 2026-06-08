import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { teamApi, type TeamMemberTasksParams } from "@/services/api/team";
import { teamKeys } from "@/services/keys/team-keys";

export const useTeamMembers = (params: { search?: string; department?: string }) =>
  useQuery({
    queryKey: teamKeys.members(params),
    queryFn: () => teamApi.listMembers(params),
    placeholderData: keepPreviousData,
  });

export const useTeamMember = (userId: string) =>
  useQuery({
    queryKey: teamKeys.member(userId),
    queryFn: () => teamApi.getMember(userId),
    enabled: Boolean(userId),
  });

export const useTeamMemberTasks = (userId: string, params: TeamMemberTasksParams = {}) =>
  useQuery({
    queryKey: [...teamKeys.memberTasks(userId), params],
    queryFn: () => teamApi.getMemberTasks(userId, params),
    enabled: Boolean(userId),
  });
