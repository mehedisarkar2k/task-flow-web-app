"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, Moon, Sun, Bell, User, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
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

import { useSystemConfig } from "@/hooks/queries/use-system-config";
import { getImageUrl } from "@/utils/image";
import { useNotificationsQuery } from "@/services/query/use-notifications-query";
import { useUnreadCountQuery } from "@/services/query/use-unread-count-query";
import { useMarkAllAsReadMutation, useMarkAsReadMutation } from "@/services/mutation/use-notification-mutations";
import { formatDistanceToNow } from "date-fns";
import type { Notification } from "@/types/notification.types";

import { useEffect, useState } from "react";

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
  const { data: config } = useSystemConfig();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const { data: notificationsData } = useNotificationsQuery({ page: 1, limit: 5 });
  const { data: unreadData } = useUnreadCountQuery();
  const { mutate: markAllAsRead } = useMarkAllAsReadMutation();
  const { mutate: markAsRead } = useMarkAsReadMutation();

  const router = useRouter();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

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
    router.replace("/auth/login");
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
          className="text-muted-foreground hover:text-foreground cursor-pointer"
          id="btn-theme-toggle"
          aria-label="Toggle theme"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {mounted ? (
            theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />
          ) : (
            <div className="size-5" />
          )}
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
              {unreadData?.data?.count ? (
                <span
                  className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-card"
                  aria-label="Unread notifications"
                />
              ) : null}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-[380px] p-0 border-border bg-card shadow-md flex flex-col z-50">
            {/* Popover Header */}
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
              <button 
                onClick={() => markAllAsRead()}
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors bg-transparent border-none cursor-pointer"
              >
                Mark all as read
              </button>
            </div>
            {/* Popover List */}
            <div className="max-h-[400px] overflow-y-auto flex flex-col">
              {notificationsData?.data && notificationsData.data.length > 0 ? (
                notificationsData.data.map((notification: Notification) => (
                  <div 
                    key={notification.id}
                    onClick={() => {
                      if (!notification.isRead) markAsRead(notification.id);
                    }}
                    className={`p-4 border-b border-border hover:bg-muted/50 transition-colors cursor-pointer flex gap-3 relative group ${!notification.isRead ? 'bg-muted/20' : ''}`}
                  >
                    {!notification.isRead && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"></div>
                    )}
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5 overflow-hidden">
                      {notification.actor?.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={getImageUrl(notification.actor.image, config?.profileImageBaseUrl) || undefined} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <Bell className="size-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground leading-tight">
                        {notification.message}
                      </p>
                      <p className="font-mono text-muted-foreground text-xs mt-1">
                        {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-muted-foreground text-sm">
                  No notifications yet.
                </div>
              )}
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
                <AvatarImage src={getImageUrl(user?.image, config?.profileImageBaseUrl) || undefined} alt={user?.name} />
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
