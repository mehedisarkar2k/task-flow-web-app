"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, Edit2, Loader2, Trash2, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useTask } from "@/services/query/use-tasks";
import {
  useUpdateTaskStatusMutation,
  useDeleteTaskMutation,
} from "@/services/mutation/use-task-mutations";
import { TaskMetaStrip } from "@/screens/tasks/_components/task-meta-strip";
import { CommentThread } from "@/screens/tasks/_components/comment-thread";
import { TaskDetailsCard } from "@/screens/tasks/_components/task-details-card";
import { AttachmentList } from "@/screens/tasks/_components/attachment-list";
import { TaskFormSheet } from "@/screens/tasks/_components/task-form-sheet";
import { DeleteConfirmationModal } from "@/components/modal/delete-confirmation-modal";
import { renderHtmlWithMentions } from "@/utils/render-html-with-mentions";
import type { Task } from "@/screens/tasks/types";

export const TaskDetailScreen = ({ taskId }: { taskId: string }) => {
  const router = useRouter();
  const { isAdmin, role } = useAuth();
  const canManage = isAdmin || role === "PM";

  const { data: task, isLoading, isError, error } = useTask(taskId);
  const updateStatus = useUpdateTaskStatusMutation();
  const deleteTask = useDeleteTaskMutation();

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleStatusChange = (status: Task["status"]) => {
    if (!status) return;
    updateStatus.mutate({ id: taskId, status });
  };

  const handleDelete = () => {
    deleteTask.mutate(taskId, { onSuccess: () => router.push("/tasks") });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-24 gap-3 text-on-surface-variant">
        <Loader2 className="size-6 animate-spin" />
        <p className="text-sm">Loading task…</p>
      </div>
    );
  }

  if (isError || !task) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-24 gap-3">
        <TriangleAlert className="size-8 text-destructive" />
        <p className="text-sm text-on-surface-variant">
          {(error as Error)?.message ?? "This task could not be found."}
        </p>
        <Button variant="outline" onClick={() => router.push("/tasks")}>
          Back to all tasks
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full">
      {/* Breadcrumb + actions */}
      <div className="flex items-center justify-between gap-2 mb-6">
        <div className="flex items-center gap-2 text-on-surface-variant min-w-0">
          {task.project ? (
            <Link
              href={`/projects/${task.project.id}`}
              className="font-data-mono hover:text-primary transition-colors truncate"
            >
              {task.project.name}
            </Link>
          ) : (
            <Link href="/tasks" className="font-data-mono hover:text-primary transition-colors">
              All Tasks
            </Link>
          )}
          <ChevronRight className="size-4 shrink-0" />
          <span className="font-data-mono text-primary uppercase">TSK-{taskId.substring(0, 4)}</span>
        </div>

        {canManage && (
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="outline" size="sm" onClick={() => setEditOpen(true)}>
              <Edit2 className="size-4 mr-1.5" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-destructive hover:text-destructive"
              onClick={() => setDeleteOpen(true)}
            >
              <Trash2 className="size-4 mr-1.5" />
              Delete
            </Button>
          </div>
        )}
      </div>

      {/* 2-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-24">
        {/* Left Column */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-on-surface">
            {task.title}
          </h2>

          <TaskMetaStrip task={task} onStatusChange={handleStatusChange} />

          <div className="mt-4">
            <h3 className="font-label-md text-on-surface-variant mb-3 uppercase tracking-wider">
              Description
            </h3>
            <div className="font-body-md text-on-surface leading-relaxed whitespace-pre-wrap break-words [&_p]:m-0">
              {task.description ? renderHtmlWithMentions(task.description, task.project?.id) : "No description provided."}
            </div>
          </div>

          <hr className="border-outline-variant/60 my-4" />

          {/* Comments — task discussion thread */}
          <CommentThread taskId={taskId} projectId={task.project?.id} />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <TaskDetailsCard task={task} />
          <AttachmentList attachments={[]} />
        </div>
      </div>

      {canManage && (
        <TaskFormSheet open={editOpen} onOpenChange={setEditOpen} mode="edit" task={task} />
      )}

      <DeleteConfirmationModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete task"
        description="This task will be removed. This action cannot be undone."
        itemName={task.title}
        onConfirm={handleDelete}
      />
    </div>
  );
};
