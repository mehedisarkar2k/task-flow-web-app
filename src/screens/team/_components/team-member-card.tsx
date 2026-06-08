import { cn } from "@/lib/utils";
import Link from "next/link";
import { TeamMember } from "../types";

interface TeamMemberCardProps {
  member: TeamMember;
}

export const TeamMemberCard = ({ member }: TeamMemberCardProps) => {
  // If workload is high (> 90%), highlight it with the accent color
  const isHighWorkload = member.workload >= 90;

  return (
    <Link 
      href={`/team/${member.id}`}
      className="group bg-card border border-border rounded-xl p-6 hover:bg-muted/50 transition-colors duration-300 relative overflow-hidden block"
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full border-2 border-background bg-muted mb-4 overflow-hidden relative shadow-sm">
          <img
            alt={member.avatarAlt}
            className="w-full h-full object-cover"
            src={member.avatarUrl}
          />
        </div>
        <h3 className="font-heading text-xl font-semibold text-foreground mb-1">
          {member.name}
        </h3>
        <p className="font-sans text-base text-muted-foreground mb-4">
          {member.role}
        </p>
        <div className="w-full flex justify-between items-center px-4 py-2 bg-muted/30 rounded-lg">
          <span className="font-sans text-xs text-muted-foreground uppercase tracking-wider">
            Workload
          </span>
          <span
            className={cn(
              "font-mono text-sm font-bold",
              isHighWorkload ? "text-accent" : "text-primary"
            )}
          >
            {member.workload}%
          </span>
        </div>
      </div>
    </Link>
  );
};
