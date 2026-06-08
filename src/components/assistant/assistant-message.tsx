import { cn } from "@/lib/utils";
import type { AssistantMessage as Message } from "@/types/assistant.types";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { AssistantChart } from "./assistant-chart";
import { AssistantCards } from "./assistant-cards";

interface AssistantMessageBubbleProps {
  message: Message;
  onSuggestionClick?: (text: string, href: string) => void;
}

export const AssistantMessageBubble = ({ message, onSuggestionClick }: AssistantMessageBubbleProps) => {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
          isUser
            ? "whitespace-pre-wrap rounded-br-sm bg-primary text-primary-foreground"
            : "rounded-bl-sm bg-muted text-foreground break-words",
        )}
      >
        {isUser ? (
          message.content
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: (props) => <p className="mb-2 last:mb-0" {...props} />,
              ul: (props) => <ul className="mb-2 list-disc pl-4 last:mb-0" {...props} />,
              ol: (props) => <ol className="mb-2 list-decimal pl-4 last:mb-0" {...props} />,
              li: (props) => <li className="mb-1" {...props} />,
              h1: (props) => <h1 className="mb-2 text-lg font-bold" {...props} />,
              h2: (props) => <h2 className="mb-2 text-base font-bold" {...props} />,
              h3: (props) => <h3 className="mb-2 text-sm font-bold" {...props} />,
              a: ({ href, children, ...props }) => {
                if (href?.startsWith("#action")) {
                  return (
                    <button
                      type="button"
                      onClick={() => onSuggestionClick?.(String(children).replace(/^["“]|["”]$/g, ""), href)}
                      className="inline-block mt-1 mb-1 mr-2 cursor-pointer rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs text-primary transition-colors hover:bg-primary/20"
                    >
                      {children}
                    </button>
                  );
                }
                return <a href={href} className="underline underline-offset-4" {...props} />;
              },
              strong: (props) => <strong className="font-semibold" {...props} />,
              code: ({ className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || "");
                const isInline = !match && !className?.includes("language-");
                
                if (match && match[1] === "cards") {
                  try {
                    const parsed = JSON.parse(String(children).replace(/\n$/, ""));
                    const data = Array.isArray(parsed) ? parsed : parsed.data || [];
                    return <AssistantCards data={data} />;
                  } catch (e) {
                    return <div className="text-red-500 text-xs mb-2">Failed to render cards: Invalid JSON</div>;
                  }
                }

                if (match && match[1] === "recharts") {
                  try {
                    const parsed = JSON.parse(String(children).replace(/\n$/, ""));
                    // Handle both old format (array) and new format {type, data}
                    const data = Array.isArray(parsed) ? parsed : parsed.data;
                    const type = Array.isArray(parsed) ? "bar" : (parsed.type || "bar");
                    return <AssistantChart data={data} type={type} />;
                  } catch (e) {
                    return <div className="text-red-500 text-xs">Failed to render chart: Invalid JSON</div>;
                  }
                }

                return isInline ? (
                  <code className="rounded bg-background/50 px-1 py-0.5 text-[0.8em] font-mono" {...props}>
                    {children}
                  </code>
                ) : (
                  <div className="mb-2 overflow-hidden rounded-md bg-background/80">
                    <div className="flex items-center justify-between bg-background/90 px-3 py-1 text-xs text-muted-foreground">
                      <span>{match?.[1] || "code"}</span>
                    </div>
                    <pre className="overflow-x-auto p-3 text-[0.85em] font-mono leading-tight">
                      <code className={className} {...props}>
                        {children}
                      </code>
                    </pre>
                  </div>
                );
              },
              blockquote: (props) => (
                <blockquote className="mb-2 border-l-2 border-primary/50 pl-3 italic text-muted-foreground last:mb-0" {...props} />
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
};

export const AssistantTypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-muted px-3.5 py-3">
        {[0, 150, 300].map((delay) => (
          <span
            key={delay}
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </div>
    </div>
  );
};
