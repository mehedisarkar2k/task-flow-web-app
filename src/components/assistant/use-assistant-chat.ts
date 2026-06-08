"use client";

import { useCallback, useState, useEffect } from "react";
import { useSendAssistantMessage } from "@/services/mutation/use-assistant-mutations";
import type { AssistantMessage } from "@/types/assistant.types";
import { useSession } from "@/lib/auth-client";

const WELCOME_ID = "welcome";

const HISTORY_LIMIT = 10;

const createId = () => Math.random().toString(36).slice(2);

export const useAssistantChat = () => {
  const { data: session, isPending: isSessionPending } = useSession();
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const { mutateAsync, isPending } = useSendAssistantMessage();

  useEffect(() => {
    if (!isSessionPending && messages.length === 0) {
      const content = session
        ? `Hi! I'm your TaskFlow assistant.\n\nYou can ask me things like:\n\n[Show my pending tasks](#action)\n[How am I doing this week?](#action)\n[Give me a dashboard summary](#action)\n[What tasks are overdue?](#action)`
        : `Hi! I'm your TaskFlow assistant.\n\nI can help you get started with TaskFlow. What would you like to do?\n\n[I want to log in](#action)\n[Create an account](#action)\n[What is TaskFlow?](#action)`;
      
      setMessages([{ id: WELCOME_ID, role: "assistant", content }]);
    }
  }, [isSessionPending, session, messages.length]);

  const send = useCallback(
    async (text: string) => {
      const content = text.trim();
      if (!content || isPending) return;

      const history = messages
        .filter((message) => message.id !== WELCOME_ID)
        .slice(-HISTORY_LIMIT)
        .map(({ role, content: turnContent }) => ({ role, content: turnContent }));

      setMessages((prev) => [...prev, { id: createId(), role: "user", content }]);

      try {
        const { reply } = await mutateAsync({ message: content, history });
        setMessages((prev) => [...prev, { id: createId(), role: "assistant", content: reply }]);
      } catch (error) {
        const message =
          (error as { message?: string })?.message ?? "Something went wrong. Please try again.";
        setMessages((prev) => [...prev, { id: createId(), role: "assistant", content: message }]);
      }
    },
    [isPending, messages, mutateAsync],
  );

  return { messages, send, isPending };
};
