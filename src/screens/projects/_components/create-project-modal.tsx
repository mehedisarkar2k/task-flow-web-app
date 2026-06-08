"use client";

import { useState, FormEvent } from "react";
import { z } from "zod";
import { BaseModal } from "@/components/modal/base-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { useCreateProjectMutation } from "@/services/mutation/use-project-mutations";
import type { ProjectStatus } from "@/screens/projects/types";

interface CreateProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const todayIso = () => new Date().toISOString().split("T")[0];

const createProjectSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(200),
  description: z.string().trim().max(2000).optional(),
  deadline: z
    .string()
    .min(1, "Deadline is required")
    .refine((value) => value > todayIso(), "Deadline must be a future date"),
  status: z.enum(["ACTIVE", "COMPLETED", "ON_HOLD"]),
});

const EMPTY_FORM = {
  name: "",
  description: "",
  deadline: "",
  status: "ACTIVE" as ProjectStatus,
};

type FieldErrors = Partial<Record<keyof typeof EMPTY_FORM, string>>;

export const CreateProjectModal = ({ open, onOpenChange }: CreateProjectModalProps) => {
  const createProject = useCreateProjectMutation();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});

  const set = <K extends keyof typeof EMPTY_FORM>(key: K, value: (typeof EMPTY_FORM)[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const close = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    onOpenChange(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const parsed = createProjectSchema.safeParse(form);

    if (!parsed.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof typeof EMPTY_FORM;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    createProject.mutate(
      { ...parsed.data, description: parsed.data.description || undefined },
      { onSuccess: close },
    );
  };

  return (
    <BaseModal
      open={open}
      onOpenChange={(next) => (next ? onOpenChange(true) : close())}
      title="New Project"
      description="Create a project to start organizing tasks and your team."
      footer={
        <>
          <Button variant="outline" onClick={close} disabled={createProject.isPending}>
            Cancel
          </Button>
          <Button form="create-project-form" type="submit" disabled={createProject.isPending}>
            {createProject.isPending ? "Creating..." : "Create Project"}
          </Button>
        </>
      }
    >
      <form id="create-project-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          {errors.description && (
            <p className="text-xs text-destructive">{errors.description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="project-deadline">Deadline</Label>
            <Input
              id="project-deadline"
              type="date"
              min={todayIso()}
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
