"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TaskFiltersProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  priorityFilter: string;
  setPriorityFilter: (val: string) => void;
  assigneeFilter: string;
  setAssigneeFilter: (val: string) => void;
}

export const TaskFilters = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  assigneeFilter,
  setAssigneeFilter
}: TaskFiltersProps) => {
  return (
    <div className="p-4 flex flex-wrap gap-4 items-center">
      <div className="flex-1 min-w-[200px] relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input 
          placeholder="Search..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 bg-background rounded-full"
        />
      </div>
      
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-[140px] bg-background rounded-full">
          <SelectValue placeholder="Status: All" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">Status: All</SelectItem>
          <SelectItem value="TODO">To Do</SelectItem>
          <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
          <SelectItem value="COMPLETED">Done</SelectItem>
        </SelectContent>
      </Select>

      <Select value={priorityFilter} onValueChange={setPriorityFilter}>
        <SelectTrigger className="w-[140px] bg-background rounded-full">
          <SelectValue placeholder="Priority: All" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">Priority: All</SelectItem>
          <SelectItem value="HIGH">High</SelectItem>
          <SelectItem value="MEDIUM">Medium</SelectItem>
          <SelectItem value="LOW">Low</SelectItem>
        </SelectContent>
      </Select>

      <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
        <SelectTrigger className="w-[140px] bg-background rounded-full">
          <SelectValue placeholder="Assignee: Any" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ANY">Assignee: Any</SelectItem>
          <SelectItem value="ME">Me</SelectItem>
          <SelectItem value="UNASSIGNED">Unassigned</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
