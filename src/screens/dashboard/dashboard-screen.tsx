"use client";

import {
  FolderKanban,
  ListTodo,
  CheckCircle,
  Clock,
  AlertCircle,
  Shield,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const KPI_CARDS = [
  { label: "Total Projects", value: "—", Icon: FolderKanban, highlight: false },
  { label: "Total Tasks", value: "—", Icon: ListTodo, highlight: false },
  { label: "Completed", value: "—", Icon: CheckCircle, highlight: false },
  { label: "Pending", value: "—", Icon: Clock, highlight: false },
  { label: "Overdue", value: "—", Icon: AlertCircle, highlight: true },
] as const;

export const DashboardScreen = () => {
  const { user, role, isAdmin } = useAuth();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="font-heading text-2xl font-semibold text-foreground tracking-tight">
          Overview
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Welcome back,{" "}
          <span className="font-medium text-foreground">
            {user?.name ?? "..."}
          </span>{" "}
          — here&apos;s what&apos;s happening in your workspace.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {KPI_CARDS.map(({ label, value, Icon, highlight }) => (
          <div
            key={label}
            className="bg-card rounded-xl p-5 border border-border flex flex-col gap-3 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">
                {label}
              </span>
              <Icon
                className={`size-4 ${highlight ? "text-destructive" : "text-muted-foreground"}`}
              />
            </div>
            <div
              className={`font-mono text-2xl font-semibold ${highlight ? "text-destructive" : "text-foreground"}`}
            >
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* Admin-only section */}
      {isAdmin && (
        <div className="bg-accent/5 border border-accent/20 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="size-4 text-accent" />
            <span className="text-sm font-semibold text-accent">
              Admin View
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            System-wide analytics and all project data visible to admins will
            appear here.
          </p>
        </div>
      )}

      {/* Role info */}
      <div className="bg-card rounded-xl border border-border p-5">
        <p className="text-sm text-muted-foreground">
          You are signed in as{" "}
          <span className="font-mono font-medium text-primary">{role}</span>.
          Dashboard content will be scoped to your permissions.
        </p>
      </div>
    </div>
  );
};
