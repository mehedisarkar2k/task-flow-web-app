"use client";

import { useMemo, useState } from "react";
import { Search, Loader2, TriangleAlert, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { useSystemConfig } from "@/hooks/queries/use-system-config";
import { useTeamMembers } from "@/services/query/use-team";
import { getImageUrl } from "@/utils/image";
import { TeamFilters } from "./_components/team-filters";
import { TeamMemberCard } from "./_components/team-member-card";

const ALL = "All";

export const TeamScreen = () => {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState<string>(ALL);
  const debouncedSearch = useDebounce(search);

  const { data: config } = useSystemConfig();
  const { data: members, isLoading, isError, error } = useTeamMembers({ search: debouncedSearch });

  const departments = useMemo(() => {
    const set = new Set<string>();
    (members ?? []).forEach((m) => m.department && set.add(m.department));
    return [ALL, ...[...set].sort()];
  }, [members]);

  const filtered = useMemo(
    () => (members ?? []).filter((m) => department === ALL || m.department === department),
    [members, department],
  );

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 max-w-[1200px] mx-auto w-full">
        <div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-2 tracking-tight">
            Team Directory
          </h1>
          <p className="font-sans text-lg text-muted-foreground">
            Workload overview across your teammates.
          </p>
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search teammates…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-background"
            />
          </div>
          <TeamFilters
            filters={departments}
            activeFilter={department}
            onFilterChange={setDepartment}
          />
        </div>
      </div>

      <div className="flex-1 max-w-[1200px] mx-auto w-full">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-muted-foreground">
            <Loader2 className="size-6 animate-spin" />
            <p className="text-sm">Loading team…</p>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <TriangleAlert className="size-8 text-destructive" />
            <p className="text-sm text-muted-foreground">
              {(error as Error)?.message ?? "Couldn't load the team."}
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-muted-foreground">
            <Users className="size-8" />
            <p className="text-sm">No teammates found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((member) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                avatarUrl={getImageUrl(member.image, config?.profileImageBaseUrl)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
