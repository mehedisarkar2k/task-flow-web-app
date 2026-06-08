"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Plus,
  ListTodo,
  FolderKanban,
  Users,
  Bell,
  LayoutDashboard,
  Loader2,
} from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandShortcut,
} from "@/components/ui/command";
import { useDebounce } from "@/hooks/use-debounce";
import { useSearchQuery, SEARCH_MIN_CHARS } from "@/services/query/use-search-query";
import type { SearchNotificationResult } from "@/types/search.types";

const notificationHref = (n: SearchNotificationResult) => {
  if (n.entityType === "TASK") return `/tasks/${n.entityId}`;
  if (n.entityType === "PROJECT") return `/projects/${n.entityId}`;
  return "/notifications";
};

export const GlobalSearch = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 300);

  const { data, isFetching } = useSearchQuery(debounced);
  const hasQuery = debounced.trim().length >= SEARCH_MIN_CHARS;

  // ⌘K / Ctrl+K toggles the palette from anywhere.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Reset the query whenever the dialog closes so it reopens clean.
  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const results = data ?? { tasks: [], projects: [], users: [], notifications: [] };
  const hasResults =
    results.tasks.length +
      results.projects.length +
      results.users.length +
      results.notifications.length >
    0;

  const showResults = hasQuery && hasResults;
  const showLoading = hasQuery && isFetching && !hasResults;
  const showEmpty = hasQuery && !isFetching && !hasResults;
  // Quick actions appear only when there is nothing to navigate to: no keyword,
  // or a keyword that returned no results.
  const showQuickActions = !hasQuery || showEmpty;

  return (
    <>
      {/* Desktop trigger — looks like a search field */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        id="global-search"
        aria-label="Open global search"
        className="relative max-w-xs w-full hidden sm:flex items-center gap-2 h-9 pl-9 pr-2 bg-background border border-border rounded-full text-sm text-muted-foreground hover:border-primary/40 transition-colors cursor-pointer"
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
        <span className="flex-1 text-left truncate">Search projects, tasks, people…</span>
        <kbd className="hidden md:inline-flex items-center rounded border border-border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground">
          ⌘K
        </kbd>
      </button>

      {/* Mobile trigger — icon only */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open global search"
        className="sm:hidden flex items-center justify-center size-9 text-muted-foreground hover:text-foreground cursor-pointer"
      >
        <Search className="size-5" />
      </button>

      <CommandDialog open={open} onOpenChange={setOpen} className="w-[95vw] sm:max-w-2xl">
        <Command shouldFilter={false}>
        <CommandInput
          placeholder="Search tasks, projects, people, notifications…"
          value={query}
          onValueChange={setQuery}
        />
        <CommandList className="min-h-[55vh] max-h-[55vh] sm:min-h-[420px] sm:max-h-[60vh]">
          {showLoading && (
            <div className="flex items-center justify-center gap-2 py-10 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
              Searching…
            </div>
          )}

          {showEmpty && (
            <div className="px-3 pt-3 pb-1 text-xs text-muted-foreground">
              No results for “{debounced}”.
            </div>
          )}

          {showResults && (
            <>
              {results.tasks.length > 0 && (
                <CommandGroup heading="Tasks">
                  {results.tasks.map((t) => (
                    <CommandItem
                      key={t.id}
                      value={`task-${t.id}`}
                      onSelect={() => go(`/tasks/${t.id}`)}
                    >
                      <ListTodo className="size-4 shrink-0" />
                      <span className="truncate">{t.title}</span>
                      {t.project && (
                        <span className="ml-auto text-xs text-muted-foreground truncate max-w-[40%]">
                          {t.project.name}
                        </span>
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {results.projects.length > 0 && (
                <CommandGroup heading="Projects">
                  {results.projects.map((p) => (
                    <CommandItem
                      key={p.id}
                      value={`project-${p.id}`}
                      onSelect={() => go(`/projects/${p.id}`)}
                    >
                      <FolderKanban className="size-4 shrink-0" />
                      <span className="truncate">{p.name}</span>
                      <span className="ml-auto text-xs text-muted-foreground capitalize">
                        {p.status.toLowerCase().replace("_", " ")}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {results.users.length > 0 && (
                <CommandGroup heading="People">
                  {results.users.map((u) => (
                    <CommandItem
                      key={u.id}
                      value={`user-${u.id}`}
                      onSelect={() => go(`/team/${u.id}`)}
                    >
                      <Users className="size-4 shrink-0" />
                      <span className="truncate">{u.name}</span>
                      <span className="ml-auto text-xs text-muted-foreground truncate max-w-[50%]">
                        {u.email}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {results.notifications.length > 0 && (
                <CommandGroup heading="Notifications">
                  {results.notifications.map((n) => (
                    <CommandItem
                      key={n.id}
                      value={`notif-${n.id}`}
                      onSelect={() => go(notificationHref(n))}
                    >
                      <Bell className="size-4 shrink-0" />
                      <span className="truncate">{n.message}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </>
          )}

          {showQuickActions && (
            <CommandGroup heading="Quick actions">
              <CommandItem value="action-new-project" onSelect={() => go("/projects?new=1")}>
                <Plus className="size-4" />
                <span>New project</span>
              </CommandItem>
              <CommandItem value="action-tasks" onSelect={() => go("/tasks")}>
                <ListTodo className="size-4" />
                <span>Go to my tasks</span>
              </CommandItem>
              <CommandItem value="action-dashboard" onSelect={() => go("/dashboard")}>
                <LayoutDashboard className="size-4" />
                <span>Open dashboard</span>
              </CommandItem>
              <CommandItem value="action-notifications" onSelect={() => go("/notifications")}>
                <Bell className="size-4" />
                <span>View notifications</span>
              </CommandItem>
            </CommandGroup>
          )}

          {!hasQuery && (
            <div className="px-3 py-2 text-xs text-muted-foreground">
              Type at least {SEARCH_MIN_CHARS} characters to search across tasks, projects, people,
              and notifications.
            </div>
          )}
        </CommandList>
        </Command>
        <div className="hidden sm:flex items-center justify-end gap-2 border-t border-border px-3 py-2 text-[11px] text-muted-foreground">
          <span>Navigate</span>
          <CommandShortcut>↑↓</CommandShortcut>
          <span>Open</span>
          <CommandShortcut>↵</CommandShortcut>
        </div>
      </CommandDialog>
    </>
  );
};
