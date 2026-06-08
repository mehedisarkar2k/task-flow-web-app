"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useUserSearch } from "@/services/query/use-user-search";
import type { GlobalRole } from "@/screens/team/types";
import type { UserSearchResult } from "@/services/api/users";

interface UserComboboxProps {
  value: string | null;
  selectedLabel?: string | null;
  onSelect: (user: UserSearchResult) => void;
  placeholder?: string;
  /** Restrict the pickable users to a single global role (e.g. only PMs). */
  roleFilter?: GlobalRole;
  id?: string;
  invalid?: boolean;
}

export const UserCombobox = ({
  value,
  selectedLabel,
  onSelect,
  placeholder = "Search people…",
  roleFilter,
  id,
  invalid,
}: UserComboboxProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const { data, isFetching } = useUserSearch(query);
  const results = (data ?? []).filter((u) => !roleFilter || u.role === roleFilter);
  const tooShort = query.trim().length < 2;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          id={id}
          type="button"
          aria-invalid={invalid}
          className={cn(
            "flex items-center justify-between gap-2 h-9 w-full rounded-lg border border-input bg-transparent px-3 text-sm cursor-pointer hover:border-ring/50 transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
            "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
          )}
        >
          <span className={cn("truncate", !selectedLabel && "text-muted-foreground")}>
            {selectedLabel ?? placeholder}
          </span>
          <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="p-0 w-[var(--radix-popover-trigger-width)] min-w-[260px]"
      >
        <Command shouldFilter={false}>
          <CommandInput
            value={query}
            onValueChange={setQuery}
            placeholder={roleFilter === "PM" ? "Search project managers…" : "Search people…"}
          />
          <CommandList>
            {tooShort ? (
              <div className="px-3 py-3 text-xs text-muted-foreground">
                Type at least 2 characters to search.
              </div>
            ) : isFetching && results.length === 0 ? (
              <div className="flex items-center gap-2 px-3 py-3 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin" />
                Searching…
              </div>
            ) : results.length === 0 ? (
              <div className="px-3 py-3 text-xs text-muted-foreground">No matching users.</div>
            ) : (
              <CommandGroup>
                {results.map((u) => (
                  <CommandItem
                    key={u.id}
                    value={u.id}
                    onSelect={() => {
                      onSelect(u);
                      setQuery("");
                      setOpen(false);
                    }}
                  >
                    <span className="truncate">{u.name}</span>
                    <span className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
                      {u.role}
                      {value === u.id && <Check className="size-4 text-primary" />}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
