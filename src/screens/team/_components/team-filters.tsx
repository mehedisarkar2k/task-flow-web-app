import { cn } from "@/lib/utils";

interface TeamFiltersProps {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const TeamFilters = ({ filters, activeFilter, onFilterChange }: TeamFiltersProps) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
      {filters.map((filter) => {
        const isActive = activeFilter === filter;

        return (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={cn(
              "px-4 py-2 rounded-full font-sans text-sm whitespace-nowrap transition-colors",
              isActive
                ? "border border-primary bg-primary/10 text-primary font-medium"
                : "border border-border bg-card hover:bg-muted text-muted-foreground",
            )}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
};
