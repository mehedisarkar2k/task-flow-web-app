"use client";

import { useState, useEffect, FormEvent } from "react";
import { z } from "zod";
import { BaseModal } from "@/components/modal/base-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from "@/services/mutation/use-project-mutations";
import type { ProjectStatus } from "@/screens/projects/types";

interface EditableProject {
  id: string;
  name: string;
  description?: string;
  deadline?: string | null;
  status: ProjectStatus;
}

interface CreateProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: "create" | "edit";
  project?: EditableProject;
}

const todayIso = () => new Date().toISOString().split("T")[0];

const baseSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(200),
  description: z.string().trim().max(2000).optional(),
  status: z.enum(["ACTIVE", "COMPLETED", "ON_HOLD"]),
});

const EMPTY_FORM = {
  name: "",
  description: "",
  deadline: "",
  status: "ACTIVE" as ProjectStatus,
};

type FieldErrors = Partial<Record<keyof typeof EMPTY_FORM, string>>;

export const CreateProjectModal = ({
  open,
  onOpenChange,
  mode = "create",
  project,
}: CreateProjectModalProps) => {
  const createProject = useCreateProjectMutation();
  const updateProject = useUpdateProjectMutation();
  const isEdit = mode === "edit";
  const isPending = createProject.isPending || updateProject.isPending;

  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});

  useEffect(() => {
    if (!open) return;
    if (isEdit && project) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        name: project.name,
        description: project.description ?? "",
        deadline: project.deadline ?? "",
        status: project.status,
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
  }, [open, isEdit, project]);

  const set = <K extends keyof typeof EMPTY_FORM>(key: K, value: (typeof EMPTY_FORM)[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const close = () => {
    setErrors({});
    onOpenChange(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const fieldErrors: FieldErrors = {};
    const base = baseSchema.safeParse(form);
    if (!base.success) {
      for (const issue of base.error.issues) {
        const key = issue.path[0] as keyof typeof EMPTY_FORM;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
    }

    const deadlineChanged = !isEdit || form.deadline !== (project?.deadline ?? "");
    if (!form.deadline) {
      fieldErrors.deadline = "Deadline is required";
    } else if (deadlineChanged && form.deadline <= todayIso()) {
      fieldErrors.deadline = "Deadline must be a future date";
    }

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setErrors({});

    if (isEdit && project) {
      updateProject.mutate(
        {
          id: project.id,
          data: {
            name: form.name,
            description: form.description || null,
            status: form.status,
            // Only send a (future-validated) deadline when it actually changed.
            ...(deadlineChanged ? { deadline: form.deadline } : {}),
          },
        },
        { onSuccess: close },
      );
    } else {
      createProject.mutate(
        {
          name: form.name,
          description: form.description || undefined,
          deadline: form.deadline,
          status: form.status,
        },
        { onSuccess: close },
      );
    }
  };

  return (
    <BaseModal
      open={open}
      onOpenChange={(next) => (next ? onOpenChange(true) : close())}
      title={isEdit ? "Edit Project" : "New Project"}
      description={
        isEdit
          ? "Update this project's details."
          : "Create a project to start organizing tasks and your team."
      }
      footer={
        <>
          <Button variant="outline" onClick={close} disabled={isPending}>
            Cancel
          </Button>
          <Button form="project-form" type="submit" disabled={isPending}>
            {isPending ? "Saving..." : isEdit ? "Save Changes" : "Create Project"}
          </Button>
        </>
      }
    >
      <form id="project-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="project-name">Name</Label>
          <Input
            id="project-name"
            placeholder="e.g. Website Redesign"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
          />
          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="project-description">Description</Label>
          <Textarea
            id="project-description"
            rows={3}
            placeholder="What is this project about?"
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
          />
          {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="project-deadline">Deadline</Label>
            <Input
              id="project-deadline"
              type="date"
              value={form.deadline}
              onChange={(e) => set("deadline", e.target.value)}
            />
            {errors.deadline && <p className="text-xs text-destructive">{errors.deadline}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="project-status">Status</Label>
            <NativeSelect
              id="project-status"
              className="w-full"
              value={form.status}
              onChange={(e) => set("status", e.target.value as ProjectStatus)}
            >
              <NativeSelectOption value="ACTIVE">Active</NativeSelectOption>
              <NativeSelectOption value="ON_HOLD">On Hold</NativeSelectOption>
              <NativeSelectOption value="COMPLETED">Completed</NativeSelectOption>
            </NativeSelect>
          </div>
        </div>
      </form>
    </BaseModal>
  );
};
