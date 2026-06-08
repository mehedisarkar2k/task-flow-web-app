export type Role = "ADMIN" | "PM" | "MEMBER";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  image?: string | null;
}
