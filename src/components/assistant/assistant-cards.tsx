"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, AlertCircle, LayoutList, Activity, Users, Star, TrendingUp } from "lucide-react";

export interface CardData {
  title: string;
  value: string | number;
  description?: string;
  icon?: string;
  color?: "primary" | "accent" | "destructive" | "default";
}

const iconMap: Record<string, React.ElementType> = {
  check: CheckCircle2,
  clock: Clock,
  alert: AlertCircle,
  list: LayoutList,
  activity: Activity,
  users: Users,
  star: Star,
  trending: TrendingUp,
};

export function AssistantCards({ data }: { data: CardData[] }) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return null;
  }

  return (
    <div className="my-3 grid grid-cols-2 gap-2 w-full">
      {data.map((item, i) => {
        const IconName = item.icon ? iconMap[item.icon] || LayoutList : LayoutList;
        
        let colorClass = "text-primary bg-primary/10";
        if (item.color === "destructive" || item.title.toLowerCase().includes("overdue")) {
          colorClass = "text-destructive bg-destructive/10";
        } else if (item.color === "accent" || item.title.toLowerCase().includes("pending") || item.title.toLowerCase().includes("progress")) {
          colorClass = "text-amber-500 bg-amber-500/10";
        } else if (item.color === "primary" || item.title.toLowerCase().includes("completed") || item.title.toLowerCase().includes("done")) {
          colorClass = "text-emerald-500 bg-emerald-500/10";
        }

        return (
          <div
            key={i}
            className="flex flex-col rounded-xl border bg-card p-3 text-card-foreground shadow-sm transition-all hover:shadow-md overflow-hidden"
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className={cn("flex h-5 w-5 shrink-0 items-center justify-center rounded-full", colorClass)}>
                <IconName className="h-3 w-3" />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground leading-tight truncate" title={item.title}>
                {item.title}
              </span>
            </div>
            <div>
              <h4 className="text-xl font-bold tracking-tight">{item.value}</h4>
            </div>
            {item.description && (
              <p className="mt-1 text-[10px] text-muted-foreground leading-snug break-words">
                {item.description}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
