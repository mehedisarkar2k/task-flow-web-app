export type TaskPriority = "HIGH" | "MEDIUM" | "LOW";

export interface UserSnippet {
  id: string;
  name: string;
  avatarUrl?: string; // We can use placeholder avatars like the HTML reference
}

export interface KanbanTask {
  id: string;
  title: string;
  priority: TaskPriority;
  dueDate: string;
  assignee?: UserSnippet;
  assignees?: UserSnippet[]; // Some tasks have multiple
  isOverdue?: boolean;
}

export interface KanbanColumnData {
  id: string; // e.g., "todo", "in_progress", "completed"
  title: string;
  tasks: KanbanTask[];
}

export interface Attachment {
  id: string;
  name: string;
  size: string;
  type: "image" | "document";
}

export interface ProjectDetails {
  id: string;
  name: string;
  status: "ACTIVE" | "COMPLETED" | "ON_HOLD";
  progress: number;
  dueDate: string;
  team: string; // e.g., "Marketing Team"
  members: (UserSnippet & { role?: "Lead" | "Member" })[];
  attachments: Attachment[];
  columns: KanbanColumnData[];
}

// --- Mock Data ---

const MOCK_USERS = {
  sarah: {
    id: "u1",
    name: "Sarah J.",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAjBJuSNf5HMdj4zZwv5cHqrmnQOWHu_I_XIouuHej1fMz6G2SC5UjJ8qhak619ER6Ms1NF6u1SQLzrwG7Sw6fxH-JTXtVg_j-Y_j3blDjmrmmx27BHoYW_Yi_BIbJYF6Fh6kr6eC8eojnHYi-EO7n7Bok8E59P-DXXD25fri0HipnS4fYDE4pPbB2stT-jgkLaYTuz8FOeM8_69Y_8Lj29yKhmq7KLcW2G_mDx9tTihaQTm4En_HT3vZl6KSv4hkbYZszDSSPcpSM",
  },
  mike: {
    id: "u2",
    name: "Mike T.",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBmZUliJnyS87OOS-3Y9WB69NE6pJt4g-YA37z55gBhKrBAXo_lNLa9giFvUv95IF_uj4h47Db5Z4MG0gFbtWO88LA6KUgcG3HHOS9Qt_2datqNezeI7-sogcbB7HmyKByYAONwF7D0V1iabvdudd-8Rx4Il3rUmx_eCUyNXffb4BS7Al_I5Pg-0OaM7OrFwoMpkJOO9IxKKCQ-m3ZoWfyWhzMW5XkWq5LDdA7Tn66-ybU2kuKfePLJL7dKcmo1BLcX8DBF_9EHtas",
  },
  alex: {
    id: "u3",
    name: "Alex W.",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDSAwGlZUhBsYV02senQ65eQJOX-0fsEqsxiroL-V-RV5CqVNWSHQf-4N20yPNbDs4PyJih0yvIaUIY5biaBrcJvm3vC5h2Wq9N1GZ11pXIuZ-OLvQRwJvTeBQTnISrWYfYNlVyAkX8J1n_Ynou4oHsUFvKD2sunmY_gnZmcf6p3Iyrs7AuQGGCzuxqjMuue-noL2owRno723ibYUM-pUiBRweT2wWmPtcPwgYj0f8f_fgkBZwxHm_ammcO9PzbD5x5u2iM9f10juM",
  },
};

export const MOCK_PROJECT_DETAILS: ProjectDetails = {
  id: "1",
  name: "Brand Refresh",
  status: "ACTIVE",
  progress: 65,
  dueDate: "Oct 15",
  team: "Marketing Team",
  members: [
    { ...MOCK_USERS.sarah, role: "Lead" },
    { ...MOCK_USERS.mike, role: "Member" },
    { ...MOCK_USERS.alex, role: "Member" },
  ],
  attachments: [
    { id: "a1", name: "moodboard_v1.png", size: "2.4 MB", type: "image" },
    { id: "a2", name: "brief_final.pdf", size: "850 KB", type: "document" },
  ],
  columns: [
    {
      id: "todo",
      title: "Todo",
      tasks: [
        {
          id: "t1",
          title: "Initial Sketches",
          priority: "HIGH",
          dueDate: "Sep 28",
          assignee: MOCK_USERS.mike,
        },
        {
          id: "t2",
          title: "Color Palette Research",
          priority: "LOW",
          dueDate: "Oct 02",
          assignee: MOCK_USERS.alex,
        },
      ],
    },
    {
      id: "in_progress",
      title: "In Progress",
      tasks: [
        {
          id: "t3",
          title: "Logo Concepts",
          priority: "MEDIUM",
          dueDate: "Sep 20",
          assignee: MOCK_USERS.sarah,
          isOverdue: true,
        },
        {
          id: "t4",
          title: "Typography Selection",
          priority: "HIGH",
          dueDate: "Sep 30",
          assignees: [MOCK_USERS.mike, MOCK_USERS.alex],
        },
      ],
    },
    {
      id: "completed",
      title: "Completed",
      tasks: [
        {
          id: "t5",
          title: "Stakeholder Interview",
          priority: "MEDIUM",
          dueDate: "Sep 15",
          assignee: MOCK_USERS.sarah,
        },
      ],
    },
  ],
};
