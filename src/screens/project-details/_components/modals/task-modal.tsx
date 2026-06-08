"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { BaseModal } from "@/components/modal/base-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { KanbanTask, TaskPriority } from "@/screens/project-details/types";

interface TaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: KanbanTask; // If provided, we are in Edit mode
  columnId: string;
  onSubmit: (taskData: Partial<KanbanTask>, columnId: string) => void;
}

export const TaskModal = ({
  open,
  onOpenChange,
  task,
  columnId,
  onSubmit,
}: TaskModalProps) => {
  const isEdit = !!task;

  const [title, setTitle] = useState(task?.title || "");
  const [priority, setPriority] = useState<TaskPriority>(task?.priority || "MEDIUM");
  const [date, setDate] = useState<Date | undefined>(
    task?.dueDate ? new Date(task.dueDate + " 2024") : undefined // Mock parsing
  );

  // Reset local state when modal opens/closes or task changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitle(task?.title || "");
      setPriority(task?.priority || "MEDIUM");
      // Basic mock parsing for dates like "Sep 28"
      if (task?.dueDate) {
        setDate(new Date(`${task.dueDate} 2024`));
      } else {
        setDate(undefined);
      }
    }
  }, [open, task]);

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSubmit(
      {
        id: task?.id, // undefined means create new
        title: title.trim(),
        priority,
        dueDate: date ? format(date, "MMM dd") : "No date",
      },
      columnId
    );
    onOpenChange(false);
  };

  return (
    <BaseModal
      open={open}
      onOpenChange={onOpenChange}
      title={isEdit ? "Edit Task" : "New Task"}
      description={
        isEdit
          ? "Update the details of this task."
          : "Add a new task to your board."
      }
      footer={
        <>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!title.trim()}>
            {isEdit ? "Save Changes" : "Create Task"}
          </Button>
        </>
      }
    >
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="task-title">Task Title</Label>
          <Input
            id="task-title"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-surface"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Priority</Label>
            <Select
              value={priority}
              onValueChange={(v) => setPriority(v as TaskPriority)}
            >
              <SelectTrigger className="bg-surface">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="LOW">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal bg-surface",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};
