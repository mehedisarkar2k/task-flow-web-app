"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Edit2 } from "lucide-react";
import { TaskMetaStrip } from "@/screens/tasks/_components/task-meta-strip";
import { CommentThread } from "@/screens/tasks/_components/comment-thread";
import { TaskDetailsCard } from "@/screens/tasks/_components/task-details-card";
import { AttachmentList } from "@/screens/tasks/_components/attachment-list";
import type { Task } from "@/screens/tasks/types";

// Mock comments
const MOCK_COMMENTS = [
  {
    id: "c-1",
    author: { name: "David Chen", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRc1bQXdS_0T4LqCRWMMdjyUvP2M2jQssCnFU11QjkHtCVgALLbBKLERRsUQEqK_WNBc_1K5TKoK3MjE_qEwlIHOr7PGgEQ1LAqTIDGB7EWgE5FwR_zWUFEdOC2Ztn_knWrx-LL0DWyTqd9VFiJFS4Raab1O53JynobfhoqZZOTCTczsrYgHaB-9JFs4SiT1nFUDukl7Wb8fl5SvObM1VWBV6lEVaRn4r3s_-IpsJz-agunjtzUzjIyZE8Ykt5crBmI33lLz8j4_E" },
    content: "I've added the initial draft for the typography hierarchy to the shared drive. Let me know if the 'Bricolage Grotesque' weights feel right.",
    timestamp: "10:42 AM"
  },
  {
    id: "c-2",
    author: { name: "Sarah Jenkins", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBA-2C3JEMQcj0z6Rkgdjgc4yoB8loIjVCKMPFYCwbB3I6IInRMqDv1YPl_Cq7L7UTywb-rjN5PMOu7Fo0HIfIY9nj8rQ8yiY5cZWBEWvoBJU6t6YXrjJ-V3_iSd7vVbDTh7CZYPEtnYL7rYzu0ydlXq9gb1LXCfFzqVp5lQlQHCS8mB41DLaoXV5LNH0yr5ucP2zeo4HnrsO_lUjoYdA7kX-PzVQa4xG3jWCex5zgoixGNYIhWGAIKlt6JHQxWcIVnWDr5cZCFvng" },
    content: "Great progress. Can we make sure the mobile specific font-sizes (-mobile suffix) are explicitly detailed in a separate table?",
    timestamp: "Yesterday"
  }
];

// Mock attachments
const MOCK_ATTACHMENTS = [
  { id: "a-1", name: "Color_Palette_V2.pdf", size: "2.4 MB", type: "document" as const },
  { id: "a-2", name: "hero_banner_draft.png", size: "856 KB", type: "image" as const }
];

export const TaskDetailScreen = ({ taskId }: { taskId: string }) => {
  // In a real app, fetch task by taskId. For now, we use a rich mock task based on the HTML.
  const [task, setTask] = useState<Task>({
    id: taskId,
    title: "Draft comprehensive design system guidelines for the new 'Calm Editorial' theme",
    description: "We need to finalize the documentation for the new visual language. This documentation will serve as the single source of truth for both the design and engineering teams moving forward. The focus must be on reducing cognitive load and establishing the \"stationery\" aesthetic.",
    priority: "HIGH",
    status: "IN_PROGRESS",
    project: { id: "proj-1", name: "Editorial Q3" },
    assignee: { id: "user-1", name: "Alex Mercer" },
    dueDate: "Oct 24, 2023",
  });

  const handleStatusChange = (status: Task["status"]) => {
    setTask(prev => ({ ...prev, status }));
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-on-surface-variant mb-6">
        {task.project ? (
          <Link href={`/projects/${task.project.id}`} className="font-data-mono hover:text-primary transition-colors">
            {task.project.name}
          </Link>
        ) : (
          <Link href="/tasks" className="font-data-mono hover:text-primary transition-colors">
            All Tasks
          </Link>
        )}
        <ChevronRight className="size-4" />
        <span className="font-data-mono text-primary uppercase">TSK-{taskId.substring(0, 4)}</span>
      </div>

      {/* 2-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-24">
        
        {/* Left Column: Primary Task Content */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Editable Title Area */}
          <div className="group relative rounded-lg -ml-3 p-3 hover:bg-surface-container-low transition-colors border border-transparent hover:border-outline-variant">
            <h2 
              className="font-headline-lg-mobile md:font-headline-lg text-on-surface focus:outline-none"
              contentEditable
              suppressContentEditableWarning
              spellCheck="false"
              onBlur={(e) => setTask(prev => ({ ...prev, title: e.currentTarget.textContent || "Untitled Task" }))}
            >
              {task.title}
            </h2>
            <Edit2 className="absolute right-4 top-4 text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none size-5" />
          </div>

          {/* Meta Strip */}
          <TaskMetaStrip task={task} onStatusChange={handleStatusChange} />

          {/* Description Area */}
          <div className="mt-4">
            <h3 className="font-label-md text-on-surface-variant mb-3 uppercase tracking-wider">
              Description
            </h3>
            <div className="prose prose-p:font-body-md prose-p:text-on-surface prose-p:leading-relaxed max-w-none space-y-4">
              <p>{task.description}</p>
              <ul className="list-disc pl-5 space-y-2 font-body-md text-on-surface">
                <li>Define exact tonal layers (Level 0 through Level 3).</li>
                <li>Document the spacing grid (8px square grid system).</li>
                <li>Create examples of the 'Low-contrast Outlines' approach vs traditional shadows.</li>
              </ul>
              <p className="text-on-surface-variant italic">
                Note: Ensure we include the Tailwind config snippet directly in the doc.
              </p>
            </div>
          </div>

          <hr className="border-outline-variant/60 my-4" />

          {/* Comments Section */}
          <CommentThread comments={MOCK_COMMENTS} />
        </div>

        {/* Right Column: Meta & Attachments */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <TaskDetailsCard task={task} />
          <AttachmentList attachments={MOCK_ATTACHMENTS} />
        </div>
        
      </div>
    </div>
  );
};
