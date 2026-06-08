export type Role = "ADMIN" | "PM" | "MEMBER";

export interface SessionUser {
  id: string;
  name: string;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  role: Role;
  image?: string | null;
  updatedAt?: string | Date;
  emailSummaries?: boolean;
  mentionAlerts?: boolean;
  marketingUpdates?: boolean;
}
