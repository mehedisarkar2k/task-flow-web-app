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

  const user = session?.user
    ? {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: (session.user as SessionUser & { role: Role }).role ?? "MEMBER",
        image: session.user.image,
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
