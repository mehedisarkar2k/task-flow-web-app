"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, Bell, Archive } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNotificationsQuery } from "@/services/query/use-notifications-query";
import { useMarkAsReadMutation, useArchiveNotificationMutation } from "@/services/mutation/use-notification-mutations";
import { formatDistanceToNow } from "date-fns";
import { useSystemConfig } from "@/hooks/queries/use-system-config";
import { getImageUrl } from "@/utils/image";
import type { Notification } from "@/types/notification.types";

export const NotificationsScreen = () => {
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "archived">("all");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useNotificationsQuery({ page, limit, filter: activeTab });
  const notifications = data?.data || [];

  const { data: config } = useSystemConfig();
  const { mutate: markAsRead } = useMarkAsReadMutation();
  const { mutate: archive } = useArchiveNotificationMutation();

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto py-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight mb-1">
            Notifications
          </h2>
          <p className="text-sm text-muted-foreground">
            Stay updated on your workspace activities.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-border">
          <button
            onClick={() => { setActiveTab("all"); setPage(1); }}
            className={cn(
              "text-sm font-medium pb-2 px-2 transition-colors",
              activeTab === "all"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-primary"
            )}
          >
            All
          </button>
          <button
            onClick={() => { setActiveTab("unread"); setPage(1); }}
            className={cn(
              "text-sm font-medium pb-2 px-2 transition-colors",
              activeTab === "unread"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-primary"
            )}
          >
            Unread
          </button>
          <button
            onClick={() => { setActiveTab("archived"); setPage(1); }}
            className={cn(
              "text-sm font-medium pb-2 px-2 transition-colors",
              activeTab === "archived"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-primary"
            )}
          >
            Archived
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">Loading notifications...</div>
        ) : notifications && notifications.length > 0 ? (
          notifications.map((notification: Notification) => (
            <div key={notification.id} className={`bg-card border border-border rounded-xl p-6 transition-colors duration-200 relative group ${!notification.isRead ? 'hover:bg-muted/50' : 'opacity-80 hover:opacity-100'}`}>
              {!notification.isRead && (
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full"></div>
              )}
              <div className="ml-2 pl-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 overflow-hidden">
                    {notification.actor?.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={getImageUrl(notification.actor.image, config?.profileImageBaseUrl) || undefined} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <Bell className="size-5" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-foreground mb-1">
                      {notification.message}
                    </p>
                    <span className="text-xs font-mono text-muted-foreground">
                      {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 sm:flex-col lg:flex-row shrink-0">
                  {/* <Button size="sm">View</Button> */}
                  {!notification.isRead && (
                    <Button onClick={() => markAsRead(notification.id)} size="icon" variant="ghost" className="h-9 w-9 rounded-full border border-transparent hover:border-border text-muted-foreground hover:bg-muted">
                      <Check className="size-4" />
                    </Button>
                  )}
                  {activeTab !== 'archived' && (
                    <Button onClick={() => archive(notification.id)} size="icon" variant="ghost" className="h-9 w-9 rounded-full border border-transparent hover:border-border text-muted-foreground hover:bg-muted">
                      <Archive className="size-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-muted-foreground bg-card border border-border rounded-xl">
            No notifications found.
          </div>
        )}
      </div>

      {data?.meta && data.meta.page < data.meta.totalPages && (
        <div className="mt-8 flex justify-center">
          <Button 
            onClick={() => setPage((p) => p + 1)}
            variant="ghost" 
            className="text-primary hover:text-primary/80 gap-1"
          >
            Load More <ChevronDown className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
