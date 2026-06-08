"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, AtSign, CheckCircle2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export const NotificationsScreen = () => {
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "archived">("all");

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
            onClick={() => setActiveTab("all")}
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
            onClick={() => setActiveTab("unread")}
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
            onClick={() => setActiveTab("archived")}
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

      {/* Notifications List */}
      <div className="flex flex-col gap-4">
        {/* Unread Notification (Mention) */}
        <div className="bg-card border border-border rounded-xl p-6 hover:bg-muted/50 transition-colors duration-200 relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full"></div>
          <div className="ml-2 pl-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <AtSign className="size-5" />
              </div>
              <div>
                <p className="text-sm text-foreground mb-1">
                  <strong className="font-medium">Sarah Jenkins</strong> mentioned you in{" "}
                  <span className="font-medium">Q3 Marketing Launch</span>
                </p>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                  &quot;Can you review the latest draft of the landing page copy? I need your sign-off
                  before we push to staging.&quot;
                </p>
                <span className="text-xs font-mono text-muted-foreground">10m ago</span>
              </div>
            </div>
            <div className="flex gap-2 sm:flex-col lg:flex-row shrink-0">
              <Button size="sm">View Task</Button>
              <Button size="icon" variant="ghost" className="h-9 w-9 rounded-full border border-transparent hover:border-border text-muted-foreground hover:bg-muted">
                <Check className="size-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Unread Notification (Project Update) */}
        <div className="bg-card border border-border rounded-xl p-6 hover:bg-muted/50 transition-colors duration-200 relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full"></div>
          <div className="ml-2 pl-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <CheckCircle2 className="size-5" />
              </div>
              <div>
                <p className="text-sm text-foreground mb-1">
                  <strong className="font-medium">Design System v2.0</strong> status changed to{" "}
                  <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-sm font-medium text-xs">
                    Completed
                  </span>
                </p>
                <span className="text-xs font-mono text-muted-foreground">2h ago</span>
              </div>
            </div>
            <div className="flex gap-2 sm:flex-col lg:flex-row shrink-0">
              <Button variant="outline" size="sm" className="text-primary border-border">
                View Project
              </Button>
              <Button size="icon" variant="ghost" className="h-9 w-9 rounded-full border border-transparent hover:border-border text-muted-foreground hover:bg-muted">
                <Check className="size-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Read Notification (System Alert) */}
        <div className="bg-background border border-border rounded-xl p-6 hover:bg-muted/50 transition-colors duration-200 relative group opacity-80">
          <div className="ml-2 pl-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-destructive/10 text-destructive flex items-center justify-center shrink-0">
                <AlertTriangle className="size-5" />
              </div>
              <div>
                <p className="text-sm text-foreground mb-1">
                  <strong className="font-medium">System Maintenance</strong> scheduled for tonight
                </p>
                <p className="text-xs text-muted-foreground mb-2">
                  TaskFlow will be down for roughly 30 minutes at 2:00 AM UTC.
                </p>
                <span className="text-xs font-mono text-muted-foreground">1d ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Read Notification (Assignment) */}
        <div className="bg-background border border-border rounded-xl p-6 hover:bg-muted/50 transition-colors duration-200 relative group opacity-80">
          <div className="ml-2 pl-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Marcus Chen"
                className="w-10 h-10 rounded-full shrink-0 border border-border object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCls9HwgpH6p7AAkKW_pISKMMUV-OsiwJsZzD-YaWvqH4ZwJN1rXjnmErOUyJB4amMGkdSzw8R81w0SThthHM3dVgYnL-x-lvvI3zBSM9geayMLVJkmdbZkxoiC5kNeaWOfZuLIGjU2P68JtvzJcc7SS_UrCff14oRbQaocH9n7K5bDdaUmbtW8WZSusUWip7L7pbqMGBWgjVzRJz02DbXpJhzJHhQOEuy2tbmcNoCxocWkNTvbdVhalSDW5Gpb-KAeUYLvy_NMKD4"
              />
              <div>
                <p className="text-sm text-foreground mb-1">
                  <strong className="font-medium">Marcus Chen</strong> assigned you a task in{" "}
                  <span className="font-medium">Website Redesign</span>
                </p>
                <p className="text-xs text-muted-foreground mb-2">
                  &quot;Finalize typography scale configuration&quot;
                </p>
                <span className="text-xs font-mono text-muted-foreground">2d ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Button variant="ghost" className="text-primary hover:text-primary/80 gap-1">
          Load More <ChevronDown className="size-4" />
        </Button>
      </div>
    </div>
  );
};
