export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  workload: number;
  avatarUrl: string;
  avatarAlt: string;
}

export type RoleFilter = "All Roles" | "Editorial" | "Design" | "Leadership";
