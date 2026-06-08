import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { usersApi } from "@/services/api/users";
import type { GlobalRole } from "@/screens/team/types";
import { teamKeys, userKeys } from "@/services/keys/team-keys";

export const useChangeUserRoleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: GlobalRole }) =>
      usersApi.changeRole(userId, role),
    onSuccess: (_data, { userId }) => {
      queryClient.invalidateQueries({ queryKey: teamKeys.member(userId) });
      queryClient.invalidateQueries({ queryKey: teamKeys.all });
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      toast.success("Role updated");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update role");
    },
  });
};
