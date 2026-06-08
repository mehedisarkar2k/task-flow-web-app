import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { searchApi } from "@/services/api/search";
import { searchKeys } from "@/services/keys/search-keys";

// Minimum characters before we hit the server — keeps single-letter noise down.
export const SEARCH_MIN_CHARS = 2;

export const useSearchQuery = (q: string) => {
  const enabled = q.trim().length >= SEARCH_MIN_CHARS;
  return useQuery({
    queryKey: searchKeys.query(q.trim()),
    queryFn: () => searchApi.search(q.trim()),
    enabled,
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
};
