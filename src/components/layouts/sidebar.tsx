"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  FolderKanban,
  ListTodo,
  Users,
  Bell,
  ShieldCheck,
  Plus,
  Shield,
  UserCog,
  User,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Role } from "@/types/auth.types";
import type { LucideIcon } from "lucide-react";
import { useSystemConfig } from "@/hooks/queries/use-system-config";
import { getImageUrl } from "@/utils/image";

interface NavItem {
  label: string;
  href: string;
  Icon: LucideIcon;
  allowedRoles?: Role[];
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", Icon: LayoutDashboard },
  { label: "Projects", href: "/projects", Icon: FolderKanban },
  { label: "Tasks", href: "/tasks", Icon: ListTodo },
  { label: "Team", href: "/team", Icon: Users },
  { label: "Notifications", href: "/notifications", Icon: Bell },
];

const ROLE_META: Record<Role, { label: string; Icon: LucideIcon }> = {
  ADMIN: { label: "Admin", Icon: Shield },
  PM: { label: "Project Manager", Icon: UserCog },
  MEMBER: { label: "Team Member", Icon: User },
};

interface DashboardSidebarProps {
  className?: string;
}

export const DashboardSidebar = ({ className }: DashboardSidebarProps) => {
  const pathname = usePathname();
  const { user, role, isAdmin } = useAuth();
  const { data: config } = useSystemConfig();

  const router = useRouter()

  const visibleNavItems = NAV_ITEMS.filter((item) => {
    if (!item.allowedRoles) return true;
    return role && item.allowedRoles.includes(role);
  });

  const handleSignOut = async () => {
    await signOut();
    router.replace("/auth/login")
  };

  const userInitials = user?.name
    ? user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
    : "?";

  const roleMeta = role ? ROLE_META[role] : null;

  return (
    <aside
      className={cn(
        "flex flex-col h-full w-64 bg-card border-r border-border",
        className
      )}
    >
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b border-border gap-3 shrink-0">
        <Image src="/logo.svg" alt="TaskFlow Logo" width={28} height={28} />
        <span className="font-heading text-xl font-bold tracking-tight text-foreground">
          TaskFlow
        </span>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {visibleNavItems.map(({ label, href, Icon }) => {
          const isActive =
            href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname?.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              id={`nav-${label.toLowerCase()}`}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon
                className={cn(
                  "size-4 shrink-0 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                )}
              />
              <span>{label}</span>

              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* New Project CTA — Admin and PM only */}
      {(isAdmin || role === "PM") && (
        <div className="px-3 pb-3 shrink-0">
          <Button className="w-full gap-2" size="sm" id="btn-new-project" asChild>
            <Link href="/projects/new">
              <Plus className="size-4" />
              New Project
            </Link>
          </Button>
        </div>
      )}

      {/* User Profile Footer */}
      <div className="px-3 py-4 border-t border-border shrink-0">
        {/* Role Badge */}
        {roleMeta && (
          <div className="mb-3 px-1">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full",
                role === "ADMIN" &&
                "bg-accent/10 text-accent border border-accent/20",
                role === "PM" &&
                "bg-primary/10 text-primary border border-primary/20",
                role === "MEMBER" &&
                "bg-muted text-muted-foreground border border-border"
              )}
            >
              <roleMeta.Icon className="size-3" />
              {roleMeta.label}
            </span>
          </div>
        )}

        {/* User Info */}
        <Link
          href="/profile"
          className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-muted transition-colors group"
          id="nav-profile"
        >
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarImage src={getImageUrl(user?.image, config?.profileImageBaseUrl) || undefined} alt={user?.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-sm font-medium text-foreground truncate">
              {user?.name ?? "Loading..."}
            </span>
            <span className="text-xs text-muted-foreground truncate">
              {user?.email ?? ""}
            </span>
          </div>
          <ChevronRight className="size-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
        </Link>

        {/* Logout */}
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 w-full px-3 py-2 mt-1 rounded-lg text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
          id="btn-logout"
        >
          <LogOut className="size-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
};
