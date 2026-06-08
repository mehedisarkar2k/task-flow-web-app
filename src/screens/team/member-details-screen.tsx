"use client";

import { ChevronRight, Loader2, TriangleAlert, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { useAuth } from "@/hooks/use-auth";
import { useSystemConfig } from "@/hooks/queries/use-system-config";
import { useTeamMember, useTeamMemberTasks } from "@/services/query/use-team";
import { useChangeUserRoleMutation } from "@/services/mutation/use-user-mutations";
import { getImageUrl } from "@/utils/image";
import { MemberTasks } from "./_components/member-tasks";
import { MemberWorkloadChart } from "./_components/member-workload-chart";
import { MemberSkillset } from "./_components/member-skillset";
import { MemberActivity } from "./_components/member-activity";
import type { GlobalRole } from "./types";

const roleLabel: Record<GlobalRole, string> = {
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

export const MemberDetailsScreen = ({ memberId }: { memberId: string }) => {
  const router = useRouter();
  const { user, isAdmin } = useAuth();
  const { data: config } = useSystemConfig();
  const { data: member, isLoading, isError, error } = useTeamMember(memberId);
  const { data: tasksResult, isLoading: tasksLoading } = useTeamMemberTasks(memberId, { limit: 10 });
  const changeRole = useChangeUserRoleMutation();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-24 gap-3 text-muted-foreground">
        <Loader2 className="size-6 animate-spin" />
        <p className="text-sm">Loading member…</p>
      </div>
    );
  }

  if (isError || !member) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-24 gap-3">
        <TriangleAlert className="size-8 text-destructive" />
        <p className="text-sm text-muted-foreground">
          {(error as Error)?.message ?? "This member could not be found."}
        </p>
        <Button variant="outline" onClick={() => router.push("/team")}>
          Back to Team
        </Button>
      </div>
    );
  }

  const avatarUrl = getImageUrl(member.image, config?.profileImageBaseUrl);
  const canChangeRole = isAdmin && user?.id !== member.id;

  return (
    <div className="flex flex-col h-full w-full">
      <div className="max-w-[1200px] mx-auto w-full pb-10">
        {/* Breadcrumbs */}
        <div className="hidden md:flex items-center gap-2 text-xs font-sans text-muted-foreground mb-8">
          <Link href="/team" className="hover:text-primary transition-colors">
            Team
          </Link>
          <ChevronRight className="size-4" />
          <span className="text-foreground">{member.name}</span>
        </div>

        {/* Header */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-border bg-muted overflow-hidden flex items-center justify-center shrink-0">
              {avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img alt={member.name} className="w-full h-full object-cover" src={avatarUrl} />
              ) : (
                <span className="font-heading text-3xl font-semibold text-muted-foreground">
                  {initials(member.name)}
                </span>
              )}
            </div>
            <div>
              <h1 className="font-heading text-3xl md:text-4xl text-foreground font-bold mb-1 tracking-tight">
                {member.name}
              </h1>
              <p className="font-sans text-lg text-muted-foreground mb-2">
                {member.jobTitle || roleLabel[member.role]}
              </p>
              <div className="flex flex-wrap items-center gap-2 font-mono text-sm text-muted-foreground">
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {roleLabel[member.role]}
                </span>
                {member.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="size-3.5" />
                    {member.location}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Contact + admin role control */}
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
              <a
                href={`mailto:${member.email}`}
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Mail className="size-4" />
                {member.email}
              </a>
              {member.phone && (
                <span className="flex items-center gap-2">
                  <Phone className="size-4" />
                  {member.phone}
                </span>
              )}
            </div>

            {canChangeRole && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Role</span>
                <NativeSelect
                  className="w-40"
                  value={member.role}
                  disabled={changeRole.isPending}
                  onChange={(e) =>
                    changeRole.mutate({ userId: member.id, role: e.target.value as GlobalRole })
                  }
                >
                  <NativeSelectOption value="MEMBER">Member</NativeSelectOption>
                  <NativeSelectOption value="PM">Project Manager</NativeSelectOption>
                  <NativeSelectOption value="ADMIN">Admin</NativeSelectOption>
                </NativeSelect>
              </div>
            )}
          </div>
        </header>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <MemberTasks tasks={tasksResult?.tasks ?? []} isLoading={tasksLoading} />
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6">
            <MemberWorkloadChart workload={member.workload} />
            <MemberSkillset skills={member.skills} />
            <MemberActivity />
          </div>
        </div>
      </div>
    </div>
  );
};
