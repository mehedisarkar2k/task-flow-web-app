"use client";

import { useState } from "react";
import { TeamFilters } from "./_components/team-filters";
import { TeamMemberCard } from "./_components/team-member-card";
import { RoleFilter, TeamMember } from "./types";

const FILTERS: RoleFilter[] = ["All Roles", "Editorial", "Design", "Leadership"];

const MOCK_TEAM_MEMBERS: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Jenkins",
    role: "Senior Editor",
    department: "Editorial",
    workload: 85,
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAotWbAX-CbaQazf8_TCio0PysDxuVIDgHROhKnQ7GwTXZPo2pBWvskrOAvLXCh2OXK6V9EeN3DYt0ETFysHoeNwpzk-0BAx9Nmte0uQkIsfoajy2Rv4DTJhyCVWd2URwxhI0luV9ov5hdrcSWk2hNdG81JWG3QVdZ2FxSJs5-GdtEw9umgPa-eSty3hZNeIoWue-H07vq3LOVjAkMoIbhsSiiF8MzAFyfjRDud9vsJ9eeNJYlARlNOaKZciSpFYgug8bNAA9pAXL4",
    avatarAlt: "Profile photo of Sarah Jenkins",
  },
  {
    id: "2",
    name: "Marcus Chen",
    role: "Lead Designer",
    department: "Design",
    workload: 92,
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKrbWn9GmGUBIPcbN63eguiMEQqGdvpNlMkQ99Z8TH8fjzv7VI6GZh9JtonOSfS_eUU36tk2Hw-02rwdIQ5LbbpWvAxY8OXncjLIGMH6eiML4mIBv86_maAqmUdQHKLYIys5T-CQHFiQhWSVNzVOqNUaT3gss2kxOj3M-G9HgXHKnWn6vOKPCfcRhwPetbNPmmpRWb5tNuhzdsSU-XxrXCATdQNEMBRkv8ox-zjJMe2P7Ia7RT-4t7Sj5_wCnexTCJ9YB5pEIP7A8",
    avatarAlt: "Profile photo of Marcus Chen",
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    role: "Copywriter",
    department: "Editorial",
    workload: 45,
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_G8PZa-RU_XZpyPihGwM0iGXsyz4fWzZduH-KUPOGWrjsc_ZK_QI7TkGfEY8Sw7zgYNDwPebYGXrz9pmMnrTT245AxGHHgJ4fUCaxBRJrC9sTLHqf8uA2IQLIXKVAxyUXtzp92FoyCUjJ9rjSFGNSNOTOwl7mYJu0qlZPn0tEVgqPHmnYfMdH0vYRguEUCGirFRX10BSJ0Ir8iB6DtAqAfDIABKNqxK9HgTuk0urZBX24QBj1yee4mT6WSdSlTq21Q70C-1qsyt0",
    avatarAlt: "Profile photo of Elena Rodriguez",
  },
  {
    id: "4",
    name: "David Kim",
    role: "Managing Editor",
    department: "Editorial",
    workload: 60,
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbBKSCPpvATnATJQZO_jOgBtSROqLkdci-gjTNwVZdq2-lfOykr2RJT2Hq0B6lYNitbTDkHnF45PZ3hs1pc3HfAgAWz6uhjdip57SlqN47hu2XFwrGgU9gNXpjfzGRSng9LbBAu1rCIjqwK0Fgu5no5vLAfwW7UxVZODBAAZdoAE4632UyxCQg4jislQsicscU3D4UUNeUglQS7Rmi-7zuK6EUy5a0IB5jdLYBnm2563sCCHG15vfH6IP7RDEsBTPOp4XJzCErQpU",
    avatarAlt: "Profile photo of David Kim",
  },
  {
    id: "5",
    name: "Aisha Patel",
    role: "UX Researcher",
    department: "Design",
    workload: 75,
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiRiQnqAWGdIdW3hhlOcalTXrCUeASvLNVxMEODyLKvXzkhgyZ5tYBF-SMn6pjpyghUNjodOLIzkXeyaGvyHpOpcR4y-99lgDq5ioPi2_-vlP9gynLAVRMJgkhYJPr5URqBJaaUTjy-AmY4gG2zjzfeWJO7WT3hmqu3_wL44RwxV4AEvxco_KRwlcy89swdMhXSVJ44YmY02FYReU6ddMxg_htKVTfKUuBp-Xxf_VPaOujEWoruINkL8ysFkRnDlk9TrSPCSZp538",
    avatarAlt: "Profile photo of Aisha Patel",
  },
];

export const TeamScreen = () => {
  const [activeFilter, setActiveFilter] = useState<RoleFilter>("All Roles");

  const filteredMembers = MOCK_TEAM_MEMBERS.filter((member) => {
    if (activeFilter === "All Roles") return true;
    return member.department === activeFilter;
  });

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 max-w-[1200px] mx-auto w-full">
        <div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-2 tracking-tight">
            Team Directory
          </h1>
          <p className="font-sans text-lg text-muted-foreground">
            Editorial and design staff workload overview.
          </p>
        </div>
        
        <TeamFilters 
          filters={FILTERS}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>

      <div className="flex-1 max-w-[1200px] mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
};
