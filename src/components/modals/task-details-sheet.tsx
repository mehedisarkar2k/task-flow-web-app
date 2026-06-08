"use client";

import { useState, useEffect } from "react";
import { Calendar as CalendarIcon, Link as LinkIcon, Paperclip, Plus, MessageSquare } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Task } from "@/screens/tasks/types";

interface TaskDetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: Task;
  columnTitle?: string;
  columnId?: string;
  mode?: "view" | "edit" | "create";
  onSubmit?: (task: Partial<Task>, columnId: string) => void;
}

export const TaskDetailsSheet = ({
  open,
  onOpenChange,
  task,
  columnTitle,
  columnId,
  mode = "view",
  onSubmit,
}: TaskDetailsSheetProps) => {
  const [isEditing, setIsEditing] = useState(mode === "create" || mode === "edit");
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [priority, setPriority] = useState<Task["priority"]>(task?.priority || "MEDIUM");
  const [estimatedTime, setEstimatedTime] = useState(task?.estimatedTime || "");

  // Reset state when task or mode changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitle(task?.title || "");
      setDescription(task?.description || "");
      setPriority(task?.priority || "MEDIUM");
      setEstimatedTime(task?.estimatedTime || "");
      setIsEditing(mode === "create" || mode === "edit");
    }
  }, [open, task, mode]);

  const handleSave = () => {
    if (!title.trim() || !columnId) return;

    onSubmit?.(
      {
        id: task?.id,
        title,
        description,
        priority,
        dueDate: task?.dueDate || "TBD", // Mock due date
        estimatedTime,
        assignees: task?.assignees,
        attachments: task?.attachments,
      },
      columnId
    );

    setIsEditing(false);
    if (mode === "create") {
      onOpenChange(false);
    }
  };

  const assignees = task?.assignees || (task?.assignee ? [task.assignee] : []);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto bg-background border-border p-0 sm:p-0">
        <SheetHeader className="px-6 py-6 border-b border-border sticky top-0 bg-background/95 backdrop-blur z-10">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary" className="font-mono uppercase tracking-wider">
              {columnTitle || "Task"}
            </Badge>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {isEditing && mode !== "create" && (
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>Cancel</Button>
              )}
              {isEditing ? (
                <Button size="sm" onClick={handleSave}>Save</Button>
              ) : (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>Edit Task</Button>
              )}
            </div>
          </div>
          <SheetTitle className="text-2xl font-heading font-bold text-foreground leading-tight">
            {isEditing ? (
              <Input 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="text-2xl font-heading font-bold h-12"
                placeholder="Task title..."
              />
            ) : (
              title || "Untitled Task"
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="p-6 flex flex-col gap-8">
          {/* Properties Grid */}
          <div className="grid grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Assignees
              </span>
              <div className="flex items-center gap-2">
                {assignees.length > 0 ? (
                  <div className="flex -space-x-2">
                    {assignees.map((user) => (
                      <Avatar key={user.id} className="size-8 border-2 border-background">
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground italic">Unassigned</span>
                )}
                {isEditing && (
                  <Button variant="ghost" size="icon" className="size-8 rounded-full ml-1">
                    <Plus className="size-4 text-muted-foreground" />
                  </Button>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Priority
              </span>
              {isEditing ? (
                <div className="flex gap-2">
                  <Badge 
                    variant={priority === "HIGH" ? "default" : "outline"} 
                    className="cursor-pointer"
                    onClick={() => setPriority("HIGH")}
                  >HIGH</Badge>
                  <Badge 
                    variant={priority === "MEDIUM" ? "secondary" : "outline"} 
                    className="cursor-pointer"
                    onClick={() => setPriority("MEDIUM")}
                  >MEDIUM</Badge>
                  <Badge 
                    variant={priority === "LOW" ? "outline" : "outline"} 
                    className="cursor-pointer"
                    onClick={() => setPriority("LOW")}
                  >LOW</Badge>
                </div>
              ) : (
                <Badge variant="outline" className="w-fit bg-surface">
                  {priority}
                </Badge>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Est. Time
              </span>
              {isEditing ? (
                <Input
                  value={estimatedTime}
                  onChange={(e) => setEstimatedTime(e.target.value)}
                  placeholder="e.g., 4h, 2d"
                  className="h-8 w-24"
                />
              ) : (
                <span className="text-sm font-medium">
                  {estimatedTime || "Not set"}
                </span>
              )}
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-foreground">Description</h3>
            {isEditing ? (
              <Textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a more detailed description..."
                className="min-h-[120px]"
              />
            ) : (
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {description || "No description provided."}
              </p>
            )}
          </div>

          <Separator />

          {/* Attachments */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Paperclip className="size-4" />
                Attachments
              </h3>
              {isEditing && (
                <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5">
                  <Plus className="size-3" />
                  Add File
                </Button>
              )}
            </div>
            
            {/* Mock Attachment List */}
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-border rounded-lg p-3 flex items-start gap-3 hover:bg-muted/50 transition-colors cursor-pointer group">
                <div className="size-8 rounded bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <LinkIcon className="size-4" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium truncate">Figma Design File</span>
                  <span className="text-xs text-muted-foreground">Added by Sarah</span>
                </div>
              </div>
            </div>
          </div>

          {!isEditing && (
            <>
              <Separator />

              {/* Activity / Comments */}
              <div className="flex flex-col gap-4 pb-10">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <MessageSquare className="size-4" />
                  Activity
                </h3>
                <div className="flex gap-3 items-start">
                  <Avatar className="size-8">
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 bg-surface border border-border rounded-lg p-3 text-sm text-muted-foreground">
                    Write a comment...
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
