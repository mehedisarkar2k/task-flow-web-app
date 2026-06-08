"use client";

import { useState, useEffect, FormEvent } from "react";
import { z } from "zod";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { useProjects } from "@/services/query/use-projects";
import { useProjectMembers } from "@/services/query/use-project-members";
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from "@/services/mutation/use-task-mutations";
import type { Task, TaskPriority, TaskStatus } from "@/screens/tasks/types";

interface TaskFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  task?: Task; // required in edit mode
  /** Pre-selected project (e.g. when adding from a project board). */
  defaultProjectId?: string;
  /** Target board column for the new task (only honoured for defaultProjectId). */
  defaultColumnId?: string;
}

const todayIso = () => new Date().toISOString().split("T")[0];

const schema = z.object({
  projectId: z.string().min(1, "Select a project"),
  title: z.string().trim().min(2, "Title must be at least 2 characters").max(200),
  description: z.string().trim().max(5000).optional(),
  dueDate: z
    .string()
    .min(1, "Due date is required")
    .refine((v) => v >= todayIso(), "Due date cannot be in the past"),
  priority: z.enum(["HIGH", "MEDIUM", "LOW"]),
  status: z.enum(["TODO", "IN_PROGRESS", "COMPLETED"]),
  estimatedHours: z.string().optional(),
});

export const TaskFormSheet = ({
  open,
  onOpenChange,
  mode,
  task,
  defaultProjectId,
  defaultColumnId,
}: TaskFormSheetProps) => {
  const createTask = useCreateTaskMutation();
  const updateTask = useUpdateTaskMutation();
  const isPending = createTask.isPending || updateTask.isPending;

  const [projectId, setProjectId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("MEDIUM");
  const [status, setStatus] = useState<TaskStatus>("TODO");
  const [estimatedHours, setEstimatedHours] = useState("");
  const [assigneeIds, setAssigneeIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { data: projectsResult } = useProjects({ page: 1, limit: 100, sort: "latest" });
  const projects = projectsResult?.projects ?? [];

  const activeProjectId = mode === "edit" ? task?.project?.id : projectId;
  const { data: members } = useProjectMembers(activeProjectId);

  // Reset / prefill whenever the sheet opens.
  useEffect(() => {
    if (!open) return;
    if (mode === "edit" && task) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProjectId(task.project?.id ?? "");
      setTitle(task.title);
      setDescription(task.description ?? "");
      setDueDate(task.dueDateRaw ?? "");
      setPriority(task.priority);
      setStatus(task.status ?? "TODO");
      setEstimatedHours(
        task.estimatedMinutes ? String(Math.round((task.estimatedMinutes / 60) * 10) / 10) : "",
      );
      setAssigneeIds((task.assignees ?? []).map((a) => a.id));
    } else {
      setProjectId(defaultProjectId ?? "");
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("MEDIUM");
      setStatus("TODO");
      setEstimatedHours("");
      setAssigneeIds([]);
    }
    setError(null);
  }, [open, mode, task, defaultProjectId]);

  const toggleAssignee = (id: string) =>
    setAssigneeIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({
      projectId: mode === "edit" ? task?.project?.id ?? "" : projectId,
      title,
      description,
      dueDate,
      priority,
      status,
      estimatedHours,
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setError(null);

    const hours = parsed.data.estimatedHours ? Number(parsed.data.estimatedHours) : undefined;
    const estimatedMinutes =
      hours && !Number.isNaN(hours) && hours > 0 ? Math.round(hours * 60) : undefined;

    if (mode === "create") {
      createTask.mutate(
        {
          projectId: parsed.data.projectId,
          data: {
            title: parsed.data.title,
            description: parsed.data.description || undefined,
            dueDate: parsed.data.dueDate,
            priority: parsed.data.priority,
            status: parsed.data.status,
            estimatedMinutes,
            assigneeIds: assigneeIds.length ? assigneeIds : undefined,
            // Only honour the target column when creating within its own project.
            columnId:
              defaultColumnId && parsed.data.projectId === defaultProjectId
                ? defaultColumnId
                : undefined,
          },
        },
        { onSuccess: () => onOpenChange(false) },
      );
    } else if (task) {
      updateTask.mutate(
        {
          id: task.id,
          data: {
            title: parsed.data.title,
            description: parsed.data.description || null,
            dueDate: parsed.data.dueDate,
            priority: parsed.data.priority,
            status: parsed.data.status,
            estimatedMinutes: estimatedMinutes ?? null,
            assigneeIds,
          },
        },
        { onSuccess: () => onOpenChange(false) },
      );
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto bg-background border-border flex flex-col gap-0 p-0">
        <SheetHeader className="px-6 py-5 border-b border-border">
          <SheetTitle className="text-xl font-heading">
            {mode === "create" ? "Create Task" : "Edit Task"}
          </SheetTitle>
          <SheetDescription>
            {mode === "create"
              ? "Add a task to a project and assign teammates."
              : "Update the task details."}
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-6 py-6 flex-1">
          {mode === "create" && (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="task-project">Project</Label>
              <NativeSelect
                id="task-project"
                className="w-full"
                value={projectId}
                onChange={(e) => {
                  setProjectId(e.target.value);
                  setAssigneeIds([]); // members change with project
                }}
              >
                <NativeSelectOption value="">Select a project…</NativeSelectOption>
                {projects.map((p) => (
                  <NativeSelectOption key={p.id} value={p.id}>
                    {p.name}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="task-title">Title</Label>
            <Input
              id="task-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Design homepage mockup"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="task-description">Description</Label>
            <Textarea
              id="task-description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add more detail…"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="task-due">Due date</Label>
              <Input
                id="task-due"
                type="date"
                min={todayIso()}
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="task-est">Estimated time (hours)</Label>
              <Input
                id="task-est"
                type="number"
                min="0"
                step="0.5"
                value={estimatedHours}
                onChange={(e) => setEstimatedHours(e.target.value)}
                placeholder="e.g. 4"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="task-priority">Priority</Label>
              <NativeSelect
                id="task-priority"
                className="w-full"
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
              >
                <NativeSelectOption value="HIGH">High</NativeSelectOption>
                <NativeSelectOption value="MEDIUM">Medium</NativeSelectOption>
                <NativeSelectOption value="LOW">Low</NativeSelectOption>
              </NativeSelect>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="task-status">Status</Label>
              <NativeSelect
                id="task-status"
                className="w-full"
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
              >
                <NativeSelectOption value="TODO">Todo</NativeSelectOption>
                <NativeSelectOption value="IN_PROGRESS">In Progress</NativeSelectOption>
                <NativeSelectOption value="COMPLETED">Completed</NativeSelectOption>
              </NativeSelect>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Assignees</Label>
            {!activeProjectId ? (
              <p className="text-sm text-muted-foreground">Select a project to choose assignees.</p>
            ) : (members?.length ?? 0) === 0 ? (
              <p className="text-sm text-muted-foreground">This project has no members yet.</p>
            ) : (
              <div className="flex flex-col gap-1 rounded-lg border border-border p-2 max-h-44 overflow-y-auto">
                {members!.map((m) => (
                  <label
                    key={m.id}
                    className="flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-muted/50 cursor-pointer"
                  >
                    <Checkbox
                      checked={assigneeIds.includes(m.id)}
                      onCheckedChange={() => toggleAssignee(m.id)}
                    />
                    <span className="text-sm text-foreground">{m.name}</span>
                    <span className="text-xs text-muted-foreground ml-auto">{m.projectRole}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="mt-auto flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving…" : mode === "create" ? "Create Task" : "Save Changes"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};
