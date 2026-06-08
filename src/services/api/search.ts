import { apiClient } from "@/clients/api-client";
import type { ApiResponse } from "@/types/api.types";
import type { SearchResults } from "@/types/search.types";

export const searchApi = {
  search: async (q: string, limit = 5): Promise<SearchResults> => {
    const res = await apiClient.get<ApiResponse<SearchResults>>("/search", {
      params: { q, limit },
    });
    return (
      res.data.data ?? { tasks: [], projects: [], users: [], notifications: [] }
    );
  },
};
