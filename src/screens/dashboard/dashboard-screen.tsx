"use client";

import { useAuth } from "@/hooks/use-auth";
import { KpiCards } from "@/screens/dashboard/_components/kpi-cards";
import { AnalyticsCharts } from "@/screens/dashboard/_components/analytics-charts";
import { RecentActivity } from "@/screens/dashboard/_components/recent-activity";
import { UpcomingDeadlines } from "@/screens/dashboard/_components/upcoming-deadlines";
import { MemberWorkload } from "@/screens/dashboard/_components/member-workload";

export const DashboardScreen = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-6 pb-10">
      {/* Page header */}
      <header>
        <h2 className="font-heading text-2xl font-semibold text-foreground tracking-tight">
          Overview
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Welcome back,{" "}
          <span className="font-medium text-foreground">
            {user?.name ?? "..."}
          </span>{" "}
          — here&apos;s a summary of your workspace activities.
        </p>
      </header>

      {/* 1. KPI row */}
      <KpiCards />

      {/* 2. Analytics: charts (left 2/3) + activity (right 1/3) */}
      {/* Stack until xl to avoid cramped 2-col at md/lg with sidebar */}
      <section
        className="grid grid-cols-1 xl:grid-cols-3 gap-4 xl:gap-6"
        aria-label="Analytics"
      >
        <div className="xl:col-span-2">
          <AnalyticsCharts />
        </div>
        <div className="xl:col-span-1 min-h-[300px]">
          <RecentActivity />
        </div>
      </section>

      {/* 3. Bottom strip: deadlines + workload */}
      <section
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6"
        aria-label="Deadlines and workload"
      >
        <UpcomingDeadlines />
        <MemberWorkload />
      </section>
    </div>
  );
};
