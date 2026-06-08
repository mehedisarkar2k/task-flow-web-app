"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, Moon, Bell, User, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { signOut } from "@/lib/auth-client";

const getPageTitle = (pathname: string): string => {
  const segment = pathname.split("/").filter(Boolean)[0] ?? "dashboard";
  const titles: Record<string, string> = {
    dashboard: "Dashboard",
    projects: "Projects",
    tasks: "Tasks",
    team: "Team",
    notifications: "Notifications",
    profile: "Profile",
    admin: "Admin",
  };
  return titles[segment] ?? "TaskFlow";
};

interface DashboardTopBarProps {
  onMenuClick: () => void;
}

export const DashboardTopBar = ({ onMenuClick }: DashboardTopBarProps) => {
  const pathname = usePathname();
  const { user } = useAuth();
  const pageTitle = getPageTitle(pathname ?? "");

  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-6 border-b border-border bg-card shrink-0 sticky top-0 z-30">
      {/* Left */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {/* Mobile hamburger */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden shrink-0 text-muted-foreground"
          onClick={onMenuClick}
          id="btn-mobile-menu"
          aria-label="Open navigation menu"
        >
          <Menu className="size-5" />
        </Button>

        {/* Page title — desktop */}
        <h1 className="hidden md:block font-heading text-lg font-semibold text-foreground tracking-tight">
          {pageTitle}
        </h1>

        {/* Global search */}
        <div className="relative max-w-xs w-full hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <Input
            id="global-search"
            placeholder="Search projects, tasks..."
            className="pl-9 h-9 bg-background border-border rounded-full text-sm w-full"
            aria-label="Global search"
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1 md:gap-2 shrink-0">
        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground"
          id="btn-theme-toggle"
          aria-label="Toggle theme"
        >
          <Moon className="size-5" />
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative text-muted-foreground hover:text-foreground"
          id="btn-notifications"
          aria-label="View notifications"
          asChild
        >
          <Link href="/notifications">
            <Bell className="size-5" />
            <span
              className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-card"
              aria-label="Unread notifications"
            />
          </Link>
        </Button>

        {/* User dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              id="btn-user-menu"
              aria-label="User menu"
              className="ml-1 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Avatar className="h-8 w-8 border-2 border-border hover:border-primary transition-colors cursor-pointer">
                <AvatarImage src={user?.image ?? undefined} alt={user?.name} />
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col gap-0.5">
                <span className="font-medium text-foreground truncate">
                  {user?.name}
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  {user?.email}
                </span>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex items-center gap-2" id="menu-profile">
                <User className="size-4" />
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href="/notifications" className="flex items-center gap-2" id="menu-notifications">
                <Bell className="size-4" />
                Notifications
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleSignOut}
              className="flex items-center gap-2 text-destructive focus:text-destructive"
              id="menu-signout"
            >
              <LogOut className="size-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
