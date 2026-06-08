import parse, { Element, attributesToProps } from "html-react-parser";
import { UserHoverCard } from "@/screens/tasks/_components/user-hover-card";

export const renderHtmlWithMentions = (html: string, projectId?: string) => {
  if (!html) return null;
  return parse(html, {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.name === "mention") {
        const props = attributesToProps(domNode.attribs);
        let userId = props["data-id"] ? String(props["data-id"]) : undefined;
        let label = props["data-label"] ? String(props["data-label"]) : userId;

        // Handle legacy mention format: <mention>@Name</mention>
        if (!userId && domNode.children && domNode.children[0]?.type === "text") {
          const textNode = domNode.children[0] as unknown as { data?: string };
          const text = textNode.data;
          if (text) {
            label = text.startsWith("@") ? text.substring(1) : text;
            userId = label; // Fallback to label since we don't have ID
          }
        }

        if (!label) label = "Unknown";
        if (!userId) userId = "unknown";

        return (
          <UserHoverCard userId={userId} name={label} projectId={projectId}>
            <span className="text-primary font-medium bg-primary/10 px-1 rounded-md cursor-pointer hover:underline">
              @{label}
            </span>
          </UserHoverCard>
        );
      }
    },
  });
};
