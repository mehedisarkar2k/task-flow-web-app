"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Plus, FolderKanban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { ProjectFilters } from "@/screens/projects/_components/project-filters";
import { ProjectCard } from "@/screens/projects/_components/project-card";
import { ProjectTable } from "@/screens/projects/_components/project-table";
import { Pagination } from "@/screens/projects/_components/pagination";
import {
  MOCK_PROJECTS,
  type ProjectStatus,
  type ViewMode,
  type SortOption,
} from "@/screens/projects/types";

interface FiltersState {
  search: string;
  status: ProjectStatus | "";
  sort: SortOption;
  view: ViewMode;
}

const PAGE_SIZE = 6;

const sortProjects = (
  projects: typeof MOCK_PROJECTS,
  sort: SortOption
) => {
  return [...projects].sort((a, b) => {
    if (sort === "name_asc") return a.name.localeCompare(b.name);
    if (sort === "name_desc") return b.name.localeCompare(a.name);
    // newest/oldest: use id as proxy for creation order
    if (sort === "oldest") return Number(a.id) - Number(b.id);
    return Number(b.id) - Number(a.id);
  });
};

export const ProjectsScreen = () => {
  const { isAdmin, role } = useAuth();
  const canCreate = isAdmin || role === "PM";

  const [filters, setFilters] = useState<FiltersState>({
    search: "",
    status: "",
    sort: "newest",
    view: "grid",
  });
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = MOCK_PROJECTS;
    if (filters.status) {
      result = result.filter((p) => p.status === filters.status);
    }
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    return sortProjects(result, filters.sort);
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFiltersChange = (next: FiltersState) => {
    setFilters(next);
    setPage(1); // reset page on filter change
  };

  return (
    <div className="flex flex-col gap-6 pb-10">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-semibold text-foreground tracking-tight">
            Projects
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            <span className="font-mono font-medium text-foreground">
              {filtered.length}
            </span>{" "}
            {filtered.length === 1 ? "project" : "projects"} found
          </p>
        </div>
        {canCreate && (
          <Button
            asChild
            id="btn-new-project-header"
            className="gap-2 shrink-0"
          >
            <Link href="/projects/new">
              <Plus className="size-4" />
              New Project
            </Link>
          </Button>
        )}
      </div>

      {/* Filter bar */}
      <ProjectFilters filters={filters} onChange={handleFiltersChange} />

      {/* Empty state */}
      {paginated.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
            <FolderKanban className="size-8 text-muted-foreground" />
          </div>
          <div className="text-center">
            <p className="font-medium text-foreground">No projects found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Try adjusting your filters or create a new project.
            </p>
          </div>
          {canCreate && (
            <Button asChild size="sm" variant="outline">
              <Link href="/projects/new">
                <Plus className="size-4 mr-2" />
                Create project
              </Link>
            </Button>
          )}
        </div>
      )}

      {/* Grid view */}
      {paginated.length > 0 && filters.view === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {paginated.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      {/* Table view */}
      {paginated.length > 0 && filters.view === "table" && (
        <ProjectTable projects={paginated} />
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};
