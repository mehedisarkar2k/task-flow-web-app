export type AssistantRole = "user" | "assistant";

export interface AssistantMessage {
  id: string;
  role: AssistantRole;
  content: string;
}

export interface ChatTurn {
  role: AssistantRole;
  content: string;
}

export interface ChatRequest {
  message: string;
  history?: ChatTurn[];
}

export interface ChatResponse {
  reply: string;
}
