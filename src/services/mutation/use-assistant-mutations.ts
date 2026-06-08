import { useMutation } from "@tanstack/react-query";
import { assistantApi } from "@/services/api/assistant";
import type { ChatRequest } from "@/types/assistant.types";

export const useSendAssistantMessage = () => {
  return useMutation({
    mutationFn: (payload: ChatRequest) => assistantApi.chat(payload),
  });
};
