"use client";

import React, { useMemo } from "react";
import { Bar, BarChart, Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ChartData {
  name: string;
  value: number;
  fill?: string;
}

export function AssistantChart({ data, type = "bar" }: { data: ChartData[], type?: "bar" | "line" }) {
  // We'll give them pretty colors based on their name if possible
  const chartData = useMemo(() => {
    return data.map((item, index) => {
      let fill = "var(--primary)";
      
      if (item.name.toLowerCase().includes("completed") || item.name.toLowerCase().includes("done")) {
        fill = "var(--primary)"; 
      } else if (item.name.toLowerCase().includes("pending") || item.name.toLowerCase().includes("progress")) {
        fill = "var(--accent)"; 
      } else if (item.name.toLowerCase().includes("overdue") || item.name.toLowerCase().includes("late")) {
        fill = "var(--destructive)"; 
      } else {
        fill = "var(--primary)";
      }
      
      return {
        ...item,
        fill,
      };
    });
  }, [data]);

  const chartConfig = {
    value: {
      label: "Count",
    },
  } satisfies ChartConfig;

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="my-4 w-full overflow-hidden rounded-xl border bg-card p-4 text-card-foreground shadow-sm">
      <h4 className="mb-4 text-sm font-medium">Progress Overview</h4>
      <ChartContainer config={chartConfig} className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {type === "line" ? (
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                className="text-xs font-medium"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                className="text-xs font-medium"
                allowDecimals={false}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Line type="monotone" dataKey="value" stroke="var(--primary)" strokeWidth={2} dot={{ r: 4, fill: "var(--primary)" }} />
            </LineChart>
          ) : (
            <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                className="text-xs font-medium"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                className="text-xs font-medium"
                allowDecimals={false}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
