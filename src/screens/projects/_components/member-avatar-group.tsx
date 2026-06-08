import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { ProjectMember } from "@/screens/projects/types";

const AVATAR_COLORS = [
  "bg-primary/20 text-primary",
  "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
];

interface MemberAvatarGroupProps {
  members: ProjectMember[];
  maxVisible?: number;
}

export const MemberAvatarGroup = ({
  members,
  maxVisible = 3,
}: MemberAvatarGroupProps) => {
  const visible = members.slice(0, maxVisible);
  const overflow = members.length - maxVisible;

  return (
    <div className="flex -space-x-2">
      {visible.map((member, i) => (
        <Avatar
          key={member.id}
          className="h-7 w-7 border-2 border-card shrink-0"
          title={member.name}
        >
          <AvatarFallback
            className={cn("text-xs font-semibold", AVATAR_COLORS[i % AVATAR_COLORS.length])}
          >
            {member.initials}
          </AvatarFallback>
        </Avatar>
      ))}
      {overflow > 0 && (
        <div className="h-7 w-7 rounded-full border-2 border-card bg-muted flex items-center justify-center shrink-0">
          <span className="text-xs font-medium text-muted-foreground">
            +{overflow}
          </span>
        </div>
      )}
    </div>
  );
};
