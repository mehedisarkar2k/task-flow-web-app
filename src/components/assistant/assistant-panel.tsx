"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Send, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AssistantMessageBubble, AssistantTypingIndicator } from "./assistant-message";
import { useAssistantChat } from "./use-assistant-chat";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export const AssistantPanel = ({ onClose }: { onClose: () => void }) => {
  const { messages, send, isPending } = useAssistantChat();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isPending]);

  const handleSend = () => {
    const text = input;
    setInput("");
    void send(text);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border bg-background shadow-2xl">
      <header className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Sparkles className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-semibold leading-none">TaskFlow Assistant</p>
            <p className="mt-0.5 text-xs text-muted-foreground">Ask about your work</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onClose}
          aria-label="Close assistant"
        >
          <X className="h-4 w-4" />
        </Button>
      </header>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((message) => (
          <AssistantMessageBubble 
            key={message.id} 
            message={message} 
            onSuggestionClick={(text, href) => {
              if (href.startsWith("#action:login:")) {
                const parts = href.split(":");
                const email = parts[2];
                const password = parts.slice(3).join(":");
                authClient.signIn.email({ email, password }).then((res) => {
                  if (res.error) {
                    toast.error("Failed to login. Please check your credentials.");
                  } else {
                    toast.success("Logged in successfully!");
                    window.location.href = "/dashboard";
                  }
                }).catch(() => toast.error("Failed to login. Please check your credentials."));
                return;
              }
              
              if (href.startsWith("#action:signup:")) {
                const parts = href.split(":");
                const name = parts[2];
                const email = parts[3];
                const password = parts.slice(4).join(":");
                authClient.signUp.email({ name, email, password }).then((res) => {
                  if (res.error) {
                    toast.error(res.error.message || "Failed to create account.");
                  } else {
                    toast.success("Account created successfully!");
                    window.location.href = "/dashboard";
                  }
                }).catch(() => toast.error("Failed to create account."));
                return;
              }
              
              void send(text);
            }}
          />
        ))}
        {isPending && <AssistantTypingIndicator />}
      </div>

      <div className="border-t p-3">
        <div className="flex items-end gap-2">
          <Textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything…"
            rows={1}
            className="max-h-32 min-h-[40px] resize-none"
          />
          <Button
            size="icon"
            className="h-10 w-10 shrink-0"
            onClick={handleSend}
            disabled={isPending || !input.trim()}
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
