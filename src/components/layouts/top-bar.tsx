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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "@/hooks/use-auth";
import { signOut } from "@/lib/auth-client";
import { CheckCircle2, AtSign, Package, UserPlus } from "lucide-react";

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
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-muted-foreground hover:text-foreground"
              id="btn-notifications"
              aria-label="View notifications"
            >
              <Bell className="size-5" />
              <span
                className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-card"
                aria-label="Unread notifications"
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-[380px] p-0 border-border bg-card shadow-md flex flex-col z-50">
            {/* Popover Header */}
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
              <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors bg-transparent border-none cursor-pointer">
                Mark all as read
              </button>
            </div>
            {/* Popover List */}
            <div className="max-h-[400px] overflow-y-auto flex flex-col">
              {/* Item: Mention (Unread) */}
              <div className="p-4 border-b border-border bg-muted/20 hover:bg-muted/50 transition-colors cursor-pointer flex gap-3 relative group">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"></div>
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <AtSign className="size-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground leading-tight">
                    <span className="font-medium">Sarah Jenkins</span> mentioned you in <span className="font-medium text-primary">Q3 Campaign Launch</span>.
                  </p>
                  <p className="font-mono text-muted-foreground text-xs mt-1">10 min ago</p>
                </div>
              </div>
              {/* Item: Task Assignment (Unread) */}
              <div className="p-4 border-b border-border bg-muted/20 hover:bg-muted/50 transition-colors cursor-pointer flex gap-3 relative group">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"></div>
                <div className="w-8 h-8 rounded-full bg-secondary shrink-0 mt-0.5 overflow-hidden">
                  <img
                    alt="Avatar"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwyJvZ-Yheh3Gh9SMrJCoVI4rfLR42kq7w1U70HFW4A-pANCy04qo4vTyi_4zwGtkuXvr6EiIEves_f9ea_X-yPMuWwith0HR0fxA3hKLMS-GS_MKknWcljHneyWqjNUxlap5yZoPfYAv_TN_01hve8bnYwXA3qsIJ1qBsHUwh36a9pYwY6ew5CN5JVlqDaPxnfzNDoSDW0fk-C-9Dp1xyv0IqmwRd0wMa9k-f37oapdYOitVqyl9FUwM7s6M8OUOgWqGewnc6ogs"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground leading-tight">
                    <span className="font-medium">David Chen</span> assigned a new task: <span className="font-medium text-primary">Draft Executive Summary</span>.
                  </p>
                  <p className="font-mono text-muted-foreground text-xs mt-1">1 hour ago</p>
                </div>
              </div>
              {/* Item: Status Change (Read) */}
              <div className="p-4 border-b border-border hover:bg-muted/50 transition-colors cursor-pointer flex gap-3">
                <div className="w-8 h-8 rounded-full border border-border bg-muted/30 text-muted-foreground flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="size-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground leading-tight">
                    Status changed to <span className="inline-block px-2 py-0.5 rounded-full bg-muted text-foreground text-xs font-medium">Completed</span> for task <span className="text-foreground">Update Brand Assets</span>.
                  </p>
                  <p className="font-mono text-muted-foreground text-xs mt-1">Yesterday</p>
                </div>
              </div>
              {/* Item: System Alert (Read) */}
              <div className="p-4 hover:bg-muted/50 transition-colors cursor-pointer flex gap-3">
                <div className="w-8 h-8 rounded-full border border-border bg-muted/30 text-muted-foreground flex items-center justify-center shrink-0 mt-0.5">
                  <Package className="size-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground leading-tight">
                    Weekly workspace backup completed successfully.
                  </p>
                  <p className="font-mono text-muted-foreground text-xs mt-1">Oct 24, 2023</p>
                </div>
              </div>
            </div>
            {/* Popover Footer */}
            <div className="px-4 py-2 bg-muted/30 rounded-b-xl border-t border-border text-center">
              <Link href="/notifications" className="text-sm font-medium text-primary hover:text-primary/80 inline-block w-full py-1">
                View all notifications
              </Link>
            </div>
          </PopoverContent>
        </Popover>

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
