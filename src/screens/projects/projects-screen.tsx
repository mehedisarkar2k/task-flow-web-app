"use client";

import { useEffect, useState } from "react";
import { Plus, FolderKanban, Loader2, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useDebounce } from "@/hooks/use-debounce";
import { useProjects } from "@/services/query/use-projects";
import { ProjectFilters } from "@/screens/projects/_components/project-filters";
import { ProjectCard } from "@/screens/projects/_components/project-card";
import { ProjectTable } from "@/screens/projects/_components/project-table";
import { Pagination } from "@/screens/projects/_components/pagination";
import { CreateProjectModal } from "@/screens/projects/_components/create-project-modal";
import {
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

export const ProjectsScreen = () => {
  const { isAdmin, role } = useAuth();
  const canCreate = isAdmin || role === "PM";

  const [filters, setFilters] = useState<FiltersState>({
    search: "",
    status: "",
    sort: "latest",
    view: "grid",
  });
  const [page, setPage] = useState(1);
  const [createOpen, setCreateOpen] = useState(false);

  // Open the create modal when arriving via the global-search "New project"
  // quick action (/projects?new=1), then strip the param so it doesn't re-open.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("new") === "1" && canCreate) {
      setCreateOpen(true);
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [canCreate]);

  const debouncedSearch = useDebounce(filters.search);

  const { data, isLoading, isError, error } = useProjects({
    page,
    limit: PAGE_SIZE,
    search: debouncedSearch,
    status: filters.status,
    sort: filters.sort,
  });

  const projects = data?.projects ?? [];
  const total = data?.meta.total ?? 0;
  const totalPages = data?.meta.totalPages ?? 1;

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
            <span className="font-mono font-medium text-foreground">{total}</span>{" "}
            {total === 1 ? "project" : "projects"} found
          </p>
        </div>
        {canCreate && (
          <Button
            id="btn-new-project-header"
            className="gap-2 shrink-0"
            onClick={() => setCreateOpen(true)}
          >
            <Plus className="size-4" />
            New Project
          </Button>
        )}
      </div>

      {/* Filter bar */}
      <ProjectFilters filters={filters} onChange={handleFiltersChange} />

      {/* Loading state */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-muted-foreground">
          <Loader2 className="size-6 animate-spin" />
          <p className="text-sm">Loading projects...</p>
        </div>
      )}

      {/* Error state */}
      {isError && !isLoading && (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <TriangleAlert className="size-8 text-destructive" />
          </div>
          <div className="text-center">
            <p className="font-medium text-foreground">Couldn&apos;t load projects</p>
            <p className="text-sm text-muted-foreground mt-1">
              {(error as Error)?.message ?? "Please try again in a moment."}
            </p>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !isError && projects.length === 0 && (
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
            <Button size="sm" variant="outline" onClick={() => setCreateOpen(true)}>
              <Plus className="size-4 mr-2" />
              Create project
            </Button>
          )}
        </div>
      )}

      {/* Grid view */}
      {!isLoading && !isError && projects.length > 0 && filters.view === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      {/* Table view */}
      {!isLoading && !isError && projects.length > 0 && filters.view === "table" && (
        <ProjectTable projects={projects} />
      )}

      {/* Pagination */}
      {!isLoading && !isError && totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      )}

      {canCreate && (
        <CreateProjectModal open={createOpen} onOpenChange={setCreateOpen} />
      )}
    </div>
  );
};
