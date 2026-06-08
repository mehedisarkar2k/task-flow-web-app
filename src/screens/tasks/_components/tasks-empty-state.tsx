"use client";

import { ClipboardList, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TasksEmptyStateProps {
  onCreateClick: () => void;
}

export const TasksEmptyState = ({ onCreateClick }: TasksEmptyStateProps) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-[0_4px_12px_rgba(28,26,23,0.02)] min-h-[400px]">
      <div className="w-16 h-16 bg-primary-container/20 text-primary rounded-2xl flex items-center justify-center mb-6 transform -rotate-6">
        <ClipboardList className="size-8 transform rotate-6" />
      </div>
      
      <h3 className="font-headline-md text-2xl font-bold text-on-surface mb-2">
        No tasks found
      </h3>
      
      <p className="font-body-md text-on-surface-variant text-center max-w-sm mb-8">
        It looks like there are no tasks matching your current filters. You can create a new global task to get started.
      </p>
      
      <Button onClick={onCreateClick} size="lg" className="font-label-md px-6">
        <Plus className="size-5 mr-2" />
        Create New Task
      </Button>
    </div>
  );
};
