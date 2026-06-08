"use client";

import { Info } from "lucide-react";
import Link from "next/link";
import type { Task } from "@/screens/tasks/types";

interface TaskDetailsCardProps {
  task: Task;
}

export const TaskDetailsCard = ({ task }: TaskDetailsCardProps) => {
  return (
    <div className="bg-surface border border-outline-variant rounded-xl p-5 shadow-sm">
      <h3 className="font-label-md text-on-surface font-medium mb-4 pb-2 border-b border-outline-variant flex items-center gap-2">
        <Info className="size-4.5 text-on-surface-variant" />
        Details
      </h3>
      
      <div className="grid grid-cols-1 gap-y-4">
        {/* Project Link */}
        <div className="flex justify-between items-center group">
          <span className="font-label-md text-on-surface-variant">Project</span>
          {task.project ? (
            <Link 
              href={`/projects/${task.project.id}`}
              className="font-body-md text-[14px] text-on-surface bg-surface-container px-2 py-0.5 rounded border border-outline-variant/40 group-hover:bg-surface-variant transition-colors cursor-pointer"
            >
              {task.project.name}
            </Link>
          ) : (
            <span className="font-body-md text-[14px] text-outline italic">None</span>
          )}
        </div>

        {/* Creator */}
        <div className="flex justify-between items-center">
          <span className="font-label-md text-on-surface-variant">Creator</span>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[8px] font-medium text-white">
              Y
            </div>
            <span className="font-body-md text-[14px] text-on-surface">You</span>
          </div>
        </div>

        {/* Created Date */}
        <div className="flex justify-between items-center">
          <span className="font-label-md text-on-surface-variant">Created</span>
          <span className="font-data-mono text-[13px] text-on-surface">Oct 12, 2023</span>
        </div>

        {/* Tags */}
        <div className="flex justify-between items-start mt-2">
          <span className="font-label-md text-on-surface-variant mt-1">Tags</span>
          <div className="flex flex-wrap justify-end gap-1.5 w-2/3">
            <span className="font-data-mono text-[11px] bg-tertiary-container/10 text-tertiary-container border border-tertiary-container/20 px-1.5 py-0.5 rounded">
              design-system
            </span>
            <span className="font-data-mono text-[11px] bg-surface-container-high text-on-surface-variant border border-outline-variant px-1.5 py-0.5 rounded">
              documentation
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
