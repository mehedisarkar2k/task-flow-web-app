import { apiClient } from "@/clients/api-client";
import type { ApiResponse } from "@/types/api.types";
import type { ChatRequest, ChatResponse } from "@/types/assistant.types";

export const assistantApi = {
  chat: async (payload: ChatRequest): Promise<ChatResponse> => {
    const res = await apiClient.post<ApiResponse<ChatResponse>>("/assistant/chat", payload);
    return res.data.data!;
  },
};
