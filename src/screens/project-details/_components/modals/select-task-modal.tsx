"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Task } from "@/screens/tasks/types";

interface SelectTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  columnId: string;
  onSubmit: (taskData: Partial<Task>, columnId: string) => void;
  availableTasks?: Task[]; // In a real app, fetched from global backlog
}

export const SelectTaskModal = ({
  open,
  onOpenChange,
  columnId,
  onSubmit,
  availableTasks = [],
}: SelectTaskModalProps) => {
  const [selectedTaskId, setSelectedTaskId] = useState<string>("new");
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  
  // Mock assignees selection for now
  const [assigneeId, setAssigneeId] = useState<string>("unassigned");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTaskId === "new" && !title.trim()) return;

    const taskPayload: Partial<Task> = {
      id: selectedTaskId === "new" ? undefined : selectedTaskId,
      title: selectedTaskId === "new" ? title : undefined,
      dueDate: dueDate || undefined,
      estimatedTime: estimatedTime || undefined,
      assignee: assigneeId !== "unassigned" ? { id: assigneeId, name: "Selected User" } : undefined,
    };

    onSubmit(taskPayload, columnId);
    onOpenChange(false);
    
    // Reset
    setSelectedTaskId("new");
    setTitle("");
    setDueDate("");
    setEstimatedTime("");
    setAssigneeId("unassigned");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Task to Board</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="task-select">Task</Label>
            <Select value={selectedTaskId} onValueChange={setSelectedTaskId}>
              <SelectTrigger id="task-select">
                <SelectValue placeholder="Select a task..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <Plus className="size-4" /> Create New Task
                  </div>
                </SelectItem>
                {availableTasks.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedTaskId === "new" && (
            <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-1">
              <Label htmlFor="title">New Task Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Update landing page copy"
                autoFocus
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="due-date">Due Date</Label>
              <Input
                id="due-date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <Label htmlFor="est-time">Estimated Time</Label>
              <Input
                id="est-time"
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(e.target.value)}
                placeholder="e.g., 4h, 2d"
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <Label htmlFor="assignee">Assignee</Label>
            <Select value={assigneeId} onValueChange={setAssigneeId}>
              <SelectTrigger id="assignee">
                <SelectValue placeholder="Select assignee..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unassigned">Unassigned</SelectItem>
                <SelectItem value="user-1">Alex Johnson</SelectItem>
                <SelectItem value="user-2">Sarah Smith</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={selectedTaskId === "new" && !title.trim()}>
              Add to Board
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
