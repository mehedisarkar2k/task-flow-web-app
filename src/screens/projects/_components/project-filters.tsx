"use client";

import { Search, LayoutGrid, List, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ProjectStatus, ViewMode, SortOption } from "@/screens/projects/types";

interface FiltersState {
  search: string;
  status: ProjectStatus | "";
  sort: SortOption;
  view: ViewMode;
}

interface ProjectFiltersProps {
  filters: FiltersState;
  onChange: (filters: FiltersState) => void;
}

export const ProjectFilters = ({ filters, onChange }: ProjectFiltersProps) => {
  const set = <K extends keyof FiltersState>(key: K, value: FiltersState[K]) =>
    onChange({ ...filters, [key]: value });

  return (
    <div className="bg-card rounded-xl border border-border p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3">
      {/* Left: search + dropdowns */}
      <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
        {/* Search */}
        <div className="relative w-full sm:w-56 min-w-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <Input
            id="project-search"
            placeholder="Filter projects..."
            value={filters.search}
            onChange={(e) => set("search", e.target.value)}
            className="pl-9 h-9 text-sm w-full bg-background"
            aria-label="Search projects"
          />
        </div>

        {/* Status filter */}
        <div className="relative">
          <select
            id="project-status-filter"
            value={filters.status}
            onChange={(e) => set("status", e.target.value as ProjectStatus | "")}
            className="h-9 appearance-none pl-3 pr-8 text-sm rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
            aria-label="Filter by status"
          >
            <option value="">Status: All</option>
            <option value="ACTIVE">In Progress</option>
            <option value="ON_HOLD">On Hold</option>
            <option value="COMPLETED">Completed</option>
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
        </div>

        {/* Sort */}
        <div className="relative">
          <select
            id="project-sort"
            value={filters.sort}
            onChange={(e) => set("sort", e.target.value as SortOption)}
            className="h-9 appearance-none pl-3 pr-8 text-sm rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
            aria-label="Sort projects"
          >
            <option value="latest">Sort: Newest</option>
            <option value="deadline">Sort: Deadline</option>
            <option value="updated">Sort: Recently Updated</option>
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {/* Right: view toggle */}
      <div className="flex items-center gap-1 border border-border rounded-lg p-1 bg-background shrink-0">
        <Button
          variant="ghost"
          size="icon"
          id="btn-view-grid"
          aria-label="Grid view"
          aria-pressed={filters.view === "grid"}
          onClick={() => set("view", "grid")}
          className={cn(
            "h-7 w-7",
            filters.view === "grid"
              ? "bg-muted text-foreground"
              : "text-muted-foreground"
          )}
        >
          <LayoutGrid className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          id="btn-view-table"
          aria-label="Table view"
          aria-pressed={filters.view === "table"}
          onClick={() => set("view", "table")}
          className={cn(
            "h-7 w-7",
            filters.view === "table"
              ? "bg-muted text-foreground"
              : "text-muted-foreground"
          )}
        >
          <List className="size-4" />
        </Button>
      </div>
    </div>
  );
};
