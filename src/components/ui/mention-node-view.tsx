import { NodeViewWrapper, NodeViewProps } from "@tiptap/react";
import { UserHoverCard } from "@/screens/tasks/_components/user-hover-card";

export const MentionNodeView = ({ node, extension }: NodeViewProps) => {
  const userId = String(node.attrs.id);
  const label = String(node.attrs.label || userId);
  const projectId = extension.options.projectId;

  return (
    <NodeViewWrapper as="span" className="mention inline-block">
      <UserHoverCard userId={userId} name={label} projectId={projectId}>
        <span className="text-primary font-medium bg-primary/10 px-1 rounded-md cursor-pointer hover:underline">
          @{label}
        </span>
      </UserHoverCard>
    </NodeViewWrapper>
  );
};
