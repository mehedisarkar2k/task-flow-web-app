"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskDetailsSheet } from "@/components/modals/task-details-sheet";
import { TaskFilters } from "@/screens/tasks/_components/task-filters";
import { TaskTable } from "@/screens/tasks/_components/task-table";
import { TasksEmptyState } from "@/screens/tasks/_components/tasks-empty-state";
import type { Task } from "@/screens/tasks/types";

// Mock global backlog with project linking
const MOCK_TASKS: Task[] = [
  {
    id: "task-100",
    title: "Draft Q3 Strategy Brief",
    description: "Create wireframes and high-fidelity mockups for the new landing page.",
    priority: "HIGH",
    status: "IN_PROGRESS",
    project: { id: "proj-1", name: "Marketing Campaign" },
    dueDate: "Oct 12, 2023",
    assignee: { id: "user-1", name: "Alex Mercer" },
  },
  {
    id: "task-101",
    title: "Review Design System Updates",
    description: "Set up login, signup, and password reset flows.",
    priority: "MEDIUM",
    status: "TODO",
    project: { id: "proj-2", name: "Core UI" },
    dueDate: "Oct 05, 2023",
    isOverdue: true,
    assignees: [{ id: "user-2", name: "Sarah J" }, { id: "user-3", name: "Mike T" }],
  },
  {
    id: "task-102",
    title: "Compile Weekly Analytics Report",
    description: "Document all REST endpoints in Swagger format.",
    priority: "LOW",
    status: "COMPLETED",
    project: { id: "proj-3", name: "Operations" },
    dueDate: "Oct 10, 2023",
    assignee: { id: "user-1", name: "Alex Mercer" },
  },
  {
    id: "task-103",
    title: "Unassigned Global Task",
    description: "This task has no project yet.",
    priority: "MEDIUM",
  },
];

export const TasksScreen = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [assigneeFilter, setAssigneeFilter] = useState("ALL");

  const [detailsSheet, setDetailsSheet] = useState<{ open: boolean; task?: Task; mode: "view" | "edit" | "create" }>({
    open: false,
    mode: "create"
  });

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "ALL" || (t.status || "TODO") === statusFilter;
      const matchesPriority = priorityFilter === "ALL" || t.priority === priorityFilter;
      const matchesAssignee = assigneeFilter === "ALL" || 
        (assigneeFilter === "UNASSIGNED" ? !t.assignee && (!t.assignees || t.assignees.length === 0) : true); // Mock logic for assignee
      
      return matchesSearch && matchesStatus && matchesPriority && matchesAssignee;
    });
  }, [tasks, searchQuery, statusFilter, priorityFilter, assigneeFilter]);

  const handleTaskSubmit = (taskData: Partial<Task>) => {
    if (detailsSheet.mode === "create") {
      const newId = `task-${Date.now()}`;
      const newTask: Task = {
        id: newId,
        title: taskData.title || "Untitled Task",
        description: taskData.description,
        priority: taskData.priority || "MEDIUM",
        status: "TODO",
        dueDate: taskData.dueDate,
        estimatedTime: taskData.estimatedTime,
        assignees: taskData.assignees,
      };
      setTasks([newTask, ...tasks]);
      setDetailsSheet({ open: false, mode: "create" });
      router.push(`/tasks/${newId}`); // Redirect to full page to fill details
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-col gap-6 mb-8 max-w-[1200px] mx-auto w-full">
        {/* Header */}
        <div className="flex justify-between items-end">
          <div>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
              All Tasks
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">
              Manage and track your editorial workflow.
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="hidden sm:flex rounded-full text-primary hover:text-primary-foreground hover:bg-primary border-primary/20 bg-surface-container-lowest"
            >
              <Filter className="size-4 mr-2" />
              Filters
            </Button>
            <Button 
              onClick={() => setDetailsSheet({ open: true, mode: "create" })}
              className="rounded-full bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary font-label-md"
            >
              <Plus className="size-4 mr-2" />
              Create Task
            </Button>
          </div>
        </div>

      </div>

      <div className="flex-1 max-w-[1200px] mx-auto w-full flex flex-col">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-[0_4px_12px_rgba(28,26,23,0.02)] flex flex-col overflow-hidden mb-8">
          {/* Filters */}
          <TaskFilters 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            assigneeFilter={assigneeFilter}
            setAssigneeFilter={setAssigneeFilter}
          />
          
          {filteredTasks.length === 0 ? (
            <TasksEmptyState onCreateClick={() => setDetailsSheet({ open: true, mode: "create" })} />
          ) : (
            <TaskTable 
              tasks={filteredTasks} 
              onRowClick={(task) => router.push(`/tasks/${task.id}`)} 
            />
          )}
        </div>
      </div>

      <TaskDetailsSheet
        open={detailsSheet.open}
        onOpenChange={(open) => setDetailsSheet(prev => ({ ...prev, open }))}
        task={undefined}
        mode="create"
        onSubmit={(taskData) => handleTaskSubmit(taskData)}
      />
    </div>
  );
};
