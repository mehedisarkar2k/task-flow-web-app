export type GlobalRole = "ADMIN" | "PM" | "MEMBER";

export interface Workload {
  total: number;
  completed: number;
  pending: number;
  percentage: number;
}

export interface TeamMemberSummary {
  id: string;
  name: string;
  role: GlobalRole;
  jobTitle: string | null;
  department: string | null;
  image: string | null;
  workload: Workload;
}

export interface TeamMemberDetail {
  id: string;
  name: string;
  email: string;
  role: GlobalRole;
  jobTitle: string | null;
  department: string | null;
  location: string | null;
  phone: string | null;
  bio: string | null;
  skills: string[];
  image: string | null;
  workload: Workload;
  sharedProjects: { id: string; name: string }[];
}
