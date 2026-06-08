"use client";

import { Calendar, ChevronUp, ChevronDown, Minus } from "lucide-react";
import type { Task } from "@/screens/tasks/types";

interface TaskMetaStripProps {
  task: Task;
  onStatusChange: (status: Task["status"]) => void;
}

export const TaskMetaStrip = ({ task, onStatusChange }: TaskMetaStripProps) => {
  return (
    <div className="flex flex-wrap items-center gap-4 py-2 border-y border-outline-variant/50">
      {/* Segmented Status Control */}
      <div className="flex bg-surface-container-low p-1 rounded-lg border border-outline-variant inline-flex items-center">
        <button
          onClick={() => onStatusChange("TODO")}
          className={`px-4 py-1.5 font-label-md transition-colors rounded-md ${
            task.status === "TODO" 
            ? "bg-surface-variant text-on-surface border border-outline-variant/30 shadow-sm" 
            : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          Todo
        </button>
        <button
          onClick={() => onStatusChange("IN_PROGRESS")}
          className={`px-4 py-1.5 font-label-md transition-colors rounded-md flex items-center gap-2 ${
            task.status === "IN_PROGRESS" 
            ? "text-on-primary-container bg-primary-container shadow-sm border border-primary/20" 
            : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          {task.status === "IN_PROGRESS" && (
            <span className="w-1.5 h-1.5 rounded-full bg-on-primary-container animate-pulse"></span>
          )}
          In Progress
        </button>
        <button
          onClick={() => onStatusChange("COMPLETED")}
          className={`px-4 py-1.5 font-label-md transition-colors rounded-md ${
            task.status === "COMPLETED" 
            ? "bg-tertiary-container text-on-tertiary-container border border-tertiary/20 shadow-sm" 
            : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          Completed
        </button>
      </div>

      <div className="w-[1px] h-6 bg-outline-variant hidden sm:block"></div>

      {/* Priority Badge */}
      {task.priority === "HIGH" ? (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant border border-secondary-fixed-dim">
          <ChevronUp className="size-3.5" />
          <span className="font-label-md text-[12px] uppercase tracking-wider">High</span>
        </div>
      ) : task.priority === "LOW" ? (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-outline border border-outline-variant">
          <ChevronDown className="size-3.5" />
          <span className="font-label-md text-[12px] uppercase tracking-wider">Low</span>
        </div>
      ) : (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant border border-outline-variant">
          <Minus className="size-3.5" />
          <span className="font-label-md text-[12px] uppercase tracking-wider">Medium</span>
        </div>
      )}

      <div className="w-[1px] h-6 bg-outline-variant hidden sm:block"></div>

      {/* Assignee */}
      <div className="flex items-center gap-2 hover:bg-surface-container-low p-1.5 rounded-md cursor-pointer transition-colors border border-transparent hover:border-outline-variant">
        {task.assignee ? (
          <>
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[10px] font-medium text-on-primary">
              {task.assignee.name.charAt(0)}
            </div>
            <span className="font-label-md text-on-surface">{task.assignee.name}</span>
          </>
        ) : task.assignees && task.assignees.length > 0 ? (
          <>
             <div className="flex -space-x-2">
              {task.assignees.map((a, i) => (
                <div 
                  key={a.id} 
                  className="w-6 h-6 rounded-full border-2 border-surface-container-lowest bg-primary flex items-center justify-center text-[10px] font-medium text-white"
                  style={{ zIndex: task.assignees!.length - i }}
                >
                  {a.name.charAt(0)}
                </div>
              ))}
            </div>
            <span className="font-label-md text-on-surface">{task.assignees.length} Assignees</span>
          </>
        ) : (
          <span className="font-label-md text-outline">Unassigned</span>
        )}
      </div>

      {/* Due Date */}
      <div className="flex items-center gap-2 ml-auto text-on-surface-variant hover:text-on-surface cursor-pointer p-1.5 rounded-md transition-colors border border-transparent hover:border-outline-variant">
        <Calendar className="size-4" />
        <span className={`font-data-mono ${task.isOverdue ? "text-error font-medium" : ""}`}>
          {task.dueDate || "No deadline"}
        </span>
      </div>
    </div>
  );
};
