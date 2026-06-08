"use client";

import { Loader2, TriangleAlert } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { KpiCards } from "@/screens/dashboard/_components/kpi-cards";
import { AnalyticsCharts } from "@/screens/dashboard/_components/analytics-charts";
import { RecentActivity } from "@/screens/dashboard/_components/recent-activity";
import { UpcomingDeadlines } from "@/screens/dashboard/_components/upcoming-deadlines";
import { MemberWorkload } from "@/screens/dashboard/_components/member-workload";
import { useActivitiesQuery, useDashboardQuery } from "@/services/query/use-dashboard-query";
import {
  buildDeadlines,
  buildKpis,
  buildWorkload,
  mapActivities,
} from "@/screens/dashboard/dashboard-mappers";

export const DashboardScreen = () => {
  const { user } = useAuth();
  const { data: stats, isLoading, isError } = useDashboardQuery();
  const { data: activities } = useActivitiesQuery({ limit: 8 });

  return (
    <div className="flex flex-col gap-6 pb-10">
      {/* Page header */}
      <header>
        <h2 className="font-heading text-2xl font-semibold text-foreground tracking-tight">
          Overview
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Welcome back,{" "}
          <span className="font-medium text-foreground">{user?.name ?? "..."}</span>
          {" — here's a summary of your workspace activities."}
        </p>
      </header>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center gap-3 py-24 text-muted-foreground">
          <Loader2 className="size-6 animate-spin" />
          <p className="text-sm">Loading dashboard…</p>
        </div>
      ) : isError || !stats ? (
        <div className="flex flex-col items-center justify-center gap-3 py-24">
          <TriangleAlert className="size-8 text-destructive" />
          <p className="text-sm text-muted-foreground">Could not load dashboard data.</p>
        </div>
      ) : (
        <>
          {/* 1. KPI row */}
          <KpiCards stats={buildKpis(stats)} />

          {/* 2. Analytics: charts (left 2/3) + activity (right 1/3) */}
          <section
            className="grid grid-cols-1 xl:grid-cols-3 gap-4 xl:gap-6"
            aria-label="Analytics"
          >
            <div className="xl:col-span-2">
              <AnalyticsCharts stats={stats} />
            </div>
            <div className="xl:col-span-1 min-h-[300px]">
              <RecentActivity items={mapActivities(activities ?? [])} />
            </div>
          </section>

          {/* 3. Bottom strip: deadlines + workload */}
          <section
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6"
            aria-label="Deadlines and workload"
          >
            <UpcomingDeadlines items={buildDeadlines(stats)} />
            <MemberWorkload items={buildWorkload(stats)} />
          </section>
        </>
      )}
    </div>
  );
};
