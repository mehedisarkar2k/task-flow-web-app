"use client";

import { useState } from "react";
import { BaseModal } from "@/components/modal/base-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface CreateColumnModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (title: string, colorClass: string) => void;
}

const COLUMN_COLORS = [
  { id: "muted", class: "bg-muted text-muted-foreground", label: "Gray" },
  { id: "primary", class: "bg-primary/20 text-primary", label: "Teal" },
  { id: "secondary", class: "bg-secondary/20 text-secondary", label: "Orange" },
  { id: "destructive", class: "bg-destructive/20 text-destructive", label: "Red" },
  { id: "emerald", class: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-400", label: "Green" },
  { id: "blue", class: "bg-blue-500/20 text-blue-700 dark:text-blue-400", label: "Blue" },
];

export const CreateColumnModal = ({
  open,
  onOpenChange,
  onSubmit,
}: CreateColumnModalProps) => {
  const [title, setTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLUMN_COLORS[0]);

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSubmit(title.trim(), selectedColor.class);
    setTitle("");
    setSelectedColor(COLUMN_COLORS[0]);
    onOpenChange(false);
  };

  return (
    <BaseModal
      open={open}
      onOpenChange={onOpenChange}
      title="Add Column"
      description="Create a new board column to organize your tasks."
      footer={
        <>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!title.trim()}>
            Create Column
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="column-title">Column Title</Label>
          <Input
            id="column-title"
            placeholder="e.g. Backlog, Review, QA..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-surface"
          />
        </div>

        <div className="space-y-3">
          <Label>Label Color</Label>
          <div className="flex flex-wrap gap-3">
            {COLUMN_COLORS.map((color) => (
              <button
                key={color.id}
                onClick={() => setSelectedColor(color)}
                className={cn(
                  "h-8 px-3 rounded-md text-xs font-medium font-mono border transition-all",
                  color.class,
                  selectedColor.id === color.id
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-surface border-transparent"
                    : "border-transparent opacity-70 hover:opacity-100"
                )}
                aria-label={`Select ${color.label} color`}
              >
                12
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            This color will be used for the task counter badge.
          </p>
        </div>
      </div>
    </BaseModal>
  );
};
