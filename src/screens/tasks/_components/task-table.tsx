"use client";

import Link from "next/link";
import { ChevronUp, ChevronDown, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Task } from "@/screens/tasks/types";

interface TaskTablePagination {
  page: number;
  total: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

interface TaskTableProps {
  tasks: Task[];
  onRowClick: (task: Task) => void;
  pagination?: TaskTablePagination;
}

export const TaskTable = ({ tasks, onRowClick, pagination }: TaskTableProps) => {
  return (
    <div className="flex flex-col flex-1">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/50 border-b border-border">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-12 pl-4">
                <Checkbox className="text-primary" />
              </TableHead>
              <TableHead className="min-w-[250px] font-medium text-muted-foreground font-label-md">Task Title</TableHead>
              <TableHead className="hidden sm:table-cell font-medium text-muted-foreground font-label-md">Project</TableHead>
              <TableHead className="font-medium text-muted-foreground font-label-md">Status</TableHead>
              <TableHead className="hidden md:table-cell font-medium text-muted-foreground font-label-md">Priority</TableHead>
              <TableHead className="font-medium text-muted-foreground font-label-md">Assignee</TableHead>
              <TableHead className="text-right pr-4 font-medium text-muted-foreground font-label-md">Deadline</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow 
                key={task.id}
                className={`group cursor-pointer border-b border-border transition-colors ${task.status === "COMPLETED" ? "bg-muted/30" : "hover:bg-muted/50"}`}
                onClick={() => onRowClick(task)}
              >
                <TableCell className="pl-4" onClick={(e) => e.stopPropagation()}>
                  <Checkbox 
                    className="text-primary" 
                    checked={task.status === "COMPLETED"} 
                  />
                </TableCell>
                <TableCell className={`font-medium transition-colors ${task.status === "COMPLETED" ? "line-through text-muted-foreground" : "group-hover:text-primary text-foreground"}`}>
                  {task.title}
                </TableCell>
                <TableCell className="hidden sm:table-cell text-muted-foreground" onClick={(e) => e.stopPropagation()}>
                  {task.project ? (
                    <span className="text-muted-foreground">{task.project.name}</span>
                  ) : (
                    <span className="text-muted-foreground italic">No Project</span>
                  )}
                </TableCell>
                <TableCell>
                  {task.status === "COMPLETED" ? (
                    <span className="inline-flex items-center gap-1 font-label-md text-xs text-foreground">
                       Done
                    </span>
                  ) : task.status === "IN_PROGRESS" ? (
                    <span className="inline-flex items-center gap-1.5 font-label-md text-xs text-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span> In Progress
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 font-label-md text-xs text-foreground">
                       Todo
                    </span>
                  )}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {task.priority === "HIGH" ? (
                    <span className="flex items-center gap-1 text-accent font-medium">
                      <ChevronUp className="size-4" /> High
                    </span>
                  ) : task.priority === "LOW" ? (
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <ChevronDown className="size-4" /> Low
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-foreground">
                      <Minus className="size-4" /> Medium
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {task.assignees && task.assignees.length > 0 ? (
                    <div className="flex -space-x-2">
                      {task.assignees.map((a, i) => (
                        <div 
                          key={a.id} 
                          className={`w-7 h-7 rounded-full border-2 border-card bg-primary flex items-center justify-center text-[10px] font-medium text-primary-foreground ${task.status === "COMPLETED" ? "grayscale opacity-70" : ""}`}
                          style={{ zIndex: task.assignees!.length - i }}
                        >
                          {a.name.charAt(0)}
                        </div>
                      ))}
                    </div>
                  ) : task.assignee ? (
                    <div className={`w-7 h-7 rounded-full border-2 border-card bg-primary flex items-center justify-center text-[10px] font-medium text-primary-foreground ${task.status === "COMPLETED" ? "grayscale opacity-70" : ""}`}>
                      {task.assignee.name.charAt(0)}
                    </div>
                  ) : (
                    <span className="text-muted-foreground text-sm">Unassigned</span>
                  )}
                </TableCell>
                <TableCell className={`text-right pr-4 font-mono text-sm ${task.isOverdue ? "text-accent font-medium" : "text-muted-foreground"}`}>
                  {task.dueDate || "--"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination Bar */}
      <div className="px-4 py-3 border-t border-outline-variant bg-surface-container-lowest flex items-center justify-between font-label-md text-sm text-on-surface-variant">
        <span>
          {pagination
            ? `Page ${pagination.page} of ${pagination.totalPages} · ${pagination.total} ${pagination.total === 1 ? "task" : "tasks"}`
            : `${tasks.length} ${tasks.length === 1 ? "task" : "tasks"}`}
        </span>
        <div className="flex gap-2">
          <button
            disabled={!pagination || pagination.page <= 1}
            onClick={() => pagination?.onPageChange(pagination.page - 1)}
            className="px-3 py-1 border border-outline-variant rounded hover:bg-surface-container transition-colors disabled:opacity-50"
          >
            Prev
          </button>
          <button
            disabled={!pagination || pagination.page >= pagination.totalPages}
            onClick={() => pagination?.onPageChange(pagination.page + 1)}
            className="px-3 py-1 border border-outline-variant rounded hover:bg-surface-container transition-colors disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
