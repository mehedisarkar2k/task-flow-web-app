import { useQuery } from "@tanstack/react-query";
import { usersApi } from "@/services/api/users";
import { useDebounce } from "@/hooks/use-debounce";

// Searchable user lookup backed by the any-auth GET /users/search endpoint
// (min 2 chars). Used by the user-picker combobox for PM / lead selection.
export const useUserSearch = (q: string) => {
  const debounced = useDebounce(q.trim(), 300);
  const enabled = debounced.length >= 2;
  return useQuery({
    queryKey: ["users", "search", debounced],
    queryFn: () => usersApi.search({ q: debounced }),
    enabled,
  });
};
