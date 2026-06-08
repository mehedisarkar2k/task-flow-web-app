"use client";

import { useSession } from "@/lib/auth-client";
import type { Role, SessionUser } from "@/types/auth.types";

interface UseAuthReturn {
  user: SessionUser | null;
  role: Role | null;
  isLoading: boolean;
  isAdmin: boolean;
  isPM: boolean;
  isMember: boolean;
  hasRole: (...roles: Role[]) => boolean;
}

export const useAuth = (): UseAuthReturn => {
  const { data: session, isPending } = useSession();

  type RawSessionUser = NonNullable<typeof session>["user"] & {
    role?: Role;
    firstName?: string | null;
    lastName?: string | null;
  };

  const rawUser = session?.user as RawSessionUser | undefined;

  const user: SessionUser | null = rawUser
    ? {
        id: rawUser.id,
        name: rawUser.name,
        firstName: rawUser.firstName ?? null,
        lastName: rawUser.lastName ?? null,
        email: rawUser.email,
        role: rawUser.role ?? "MEMBER",
        image: rawUser.image,
      }
    : null;

  const role = user?.role ?? null;

  return {
    user,
    role,
    isLoading: isPending,
    isAdmin: role === "ADMIN",
    isPM: role === "PM",
    isMember: role === "MEMBER",
    hasRole: (...roles: Role[]) => (role ? roles.includes(role) : false),
  };
};
