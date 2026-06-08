import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useSystemConfig } from "@/hooks/queries/use-system-config";
import { getImageUrl } from "@/utils/image";
import { useProjectMembers } from "@/services/query/use-project-members";
import { Mail, Briefcase, User as UserIcon } from "lucide-react";
import Link from "next/link";

interface UserHoverCardProps {
  userId: string;
  name: string;
  projectId?: string;
  children: React.ReactNode;
}

const getInitial = (name?: string) => name ? name.charAt(0).toUpperCase() : "?";

import { useQuery } from "@tanstack/react-query";
import { teamApi } from "@/services/api/team";

export const UserHoverCard = ({ userId, name, projectId, children }: UserHoverCardProps) => {
  const { data: config } = useSystemConfig();
  const { data: projectMembers = [] } = useProjectMembers(projectId);
  const { data: teamMembers = [] } = useQuery({
    queryKey: ["team", "members"],
    queryFn: () => teamApi.listMembers({}),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const normalizedTeamMembers = teamMembers.map(m => ({ ...m, avatar: (m as any).image ?? null }));
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const matchMember = (m: any) => m.id === userId || m.name === userId || m.name.toLowerCase().startsWith(userId.toLowerCase());
  
  const member = 
    (projectId ? projectMembers.find(matchMember) : null) || 
    normalizedTeamMembers.find(matchMember);
  
  // Use the resolved member ID for the link.
  // If the member is not found in the current project context, we disable the profile link.
  const resolvedUserId = member?.id;

  return (
    <HoverCard openDelay={200} closeDelay={200}>
      <HoverCardTrigger asChild>
        {children}
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-4 bg-popover border border-border shadow-lg rounded-xl z-50" side="top" align="start">
        <div className="flex gap-4">
          <Avatar className="w-12 h-12 border border-outline-variant">
            {member?.avatar && (
              <AvatarImage src={getImageUrl(member.avatar, config?.profileImageBaseUrl)} />
            )}
            <AvatarFallback className="bg-primary text-white text-lg">
              {getInitial(name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col flex-1 min-w-0 space-y-1">
            <h4 className="font-headline-md text-base text-popover-foreground truncate">
              {name}
            </h4>
            {member && "projectRole" in member && member.projectRole && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Briefcase className="size-3.5 shrink-0" />
                <span className="truncate">{member.projectRole as string}</span>
              </div>
            )}
            {member && "email" in member && member.email && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Mail className="size-3.5 shrink-0" />
                <span className="truncate">{member.email as string}</span>
              </div>
            )}
            
            {member?.workload && (
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2 pt-2 border-t border-border/50">
                <div className="flex flex-col">
                  <span className="font-medium text-on-surface">{member.workload.pending}</span>
                  <span>Pending</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-on-surface">{member.workload.completed}</span>
                  <span>Done</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-on-surface">{member.workload.total}</span>
                  <span>Total</span>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border flex justify-end">
          {resolvedUserId ? (
            <Link href={`/team/${resolvedUserId}`}>
              <Button size="sm" variant="outline" className="w-full sm:w-auto">
                <UserIcon className="size-4 mr-2" />
                View Profile
              </Button>
            </Link>
          ) : (
            <Button size="sm" variant="outline" className="w-full sm:w-auto" disabled>
              <UserIcon className="size-4 mr-2" />
              Profile Unavailable
            </Button>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
