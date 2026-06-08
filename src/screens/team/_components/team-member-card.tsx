import Link from "next/link";
import { cn } from "@/lib/utils";
import type { TeamMemberSummary } from "../types";

interface TeamMemberCardProps {
  member: TeamMemberSummary;
  avatarUrl?: string;
}

const roleLabel: Record<string, string> = {
  ADMIN: "Admin",
  PM: "Project Manager",
  MEMBER: "Member",
};

const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");

export const TeamMemberCard = ({ member, avatarUrl }: TeamMemberCardProps) => {
  const workload = member.workload.percentage;
  const isHighWorkload = workload >= 90;
  const subtitle = member.jobTitle || roleLabel[member.role] || "Member";

  return (
    <Link
      href={`/team/${member.id}`}
      className="group bg-card border border-border rounded-xl p-6 hover:bg-muted/50 transition-colors duration-300 relative overflow-hidden block"
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full border-2 border-background bg-muted mb-4 overflow-hidden relative shadow-sm flex items-center justify-center">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img alt={member.name} className="w-full h-full object-cover" src={avatarUrl} />
          ) : (
            <span className="font-heading text-xl font-semibold text-muted-foreground">
              {initials(member.name)}
            </span>
          )}
        </div>
        <h3 className="font-heading text-xl font-semibold text-foreground mb-1">{member.name}</h3>
        <p className="font-sans text-base text-muted-foreground mb-4">{subtitle}</p>
        <div className="w-full flex justify-between items-center px-4 py-2 bg-muted/30 rounded-lg">
          <span className="font-sans text-xs text-muted-foreground uppercase tracking-wider">
            Workload
          </span>
          <span
            className={cn(
              "font-mono text-sm font-bold",
              isHighWorkload ? "text-accent" : "text-primary",
            )}
          >
            {workload}%
          </span>
        </div>
      </div>
    </Link>
  );
};
