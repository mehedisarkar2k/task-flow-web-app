export type ProjectStatus = "ACTIVE" | "COMPLETED" | "ON_HOLD";
export type ViewMode = "grid" | "table";
export type SortOption = "newest" | "oldest" | "name_asc" | "name_desc";

export interface ProjectMember {
  id: string;
  name: string;
  initials: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number; // 0–100
  dueDate: string;
  members: ProjectMember[];
  taskCount: number;
}

// ─── Static mock data (replaced by API when ready) ─────────────────────────

export const MOCK_PROJECTS: Project[] = [
  {
    id: "1",
    name: "Brand Refresh",
    description:
      "Complete overhaul of the visual identity, including new color palettes, typography, and logo assets for Q3 launch.",
    status: "ACTIVE",
    progress: 65,
    dueDate: "Oct 15",
    taskCount: 24,
    members: [
      { id: "u1", name: "Sarah Jenkins", initials: "SJ" },
      { id: "u2", name: "Marcus Chen", initials: "MC" },
      { id: "u3", name: "Elena Vasquez", initials: "EV" },
      { id: "u4", name: "Alex Rivera", initials: "AR" },
    ],
  },
  {
    id: "2",
    name: "Q4 Marketing Campaign",
    description:
      "Planning and execution of the end-of-year holiday promotional campaign across all social channels.",
    status: "ON_HOLD",
    progress: 10,
    dueDate: "Nov 01",
    taskCount: 18,
    members: [
      { id: "u1", name: "Sarah Jenkins", initials: "SJ" },
    ],
  },
  {
    id: "3",
    name: "Platform Migration",
    description:
      "Migrate legacy user data to the new cloud infrastructure. Ensure zero downtime during the switch.",
    status: "COMPLETED",
    progress: 100,
    dueDate: "Sep 30",
    taskCount: 41,
    members: [
      { id: "u2", name: "Marcus Chen", initials: "MC" },
      { id: "u3", name: "Elena Vasquez", initials: "EV" },
    ],
  },
  {
    id: "4",
    name: "API Integration Suite",
    description:
      "Build out the third-party integrations layer for Slack, GitHub, and Jira to streamline team workflows.",
    status: "ACTIVE",
    progress: 42,
    dueDate: "Nov 20",
    taskCount: 33,
    members: [
      { id: "u4", name: "Alex Rivera", initials: "AR" },
      { id: "u2", name: "Marcus Chen", initials: "MC" },
    ],
  },
  {
    id: "5",
    name: "Onboarding Redesign",
    description:
      "Revamp the new-user onboarding flow to reduce time-to-value and improve activation rates.",
    status: "ACTIVE",
    progress: 78,
    dueDate: "Oct 28",
    taskCount: 15,
    members: [
      { id: "u3", name: "Elena Vasquez", initials: "EV" },
      { id: "u1", name: "Sarah Jenkins", initials: "SJ" },
      { id: "u4", name: "Alex Rivera", initials: "AR" },
    ],
  },
  {
    id: "6",
    name: "Data Analytics Dashboard",
    description:
      "Build a real-time analytics dashboard for internal stakeholders with exportable reports.",
    status: "ON_HOLD",
    progress: 30,
    dueDate: "Dec 10",
    taskCount: 27,
    members: [
      { id: "u2", name: "Marcus Chen", initials: "MC" },
    ],
  },
];
