import { useState } from "react";
import { UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AddMemberModal } from "@/screens/project-details/_components/modals/add-member-modal";
import type { ProjectDetails } from "@/screens/project-details/types";

interface MembersWidgetProps {
  members: ProjectDetails["members"];
}

export const MembersWidget = ({ members }: MembersWidgetProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-card rounded-xl border border-border p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading text-lg font-semibold text-foreground">
            Members
          </h3>
          <span className="font-mono text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
            {members.length}
          </span>
        </div>

        <ul className="flex flex-col gap-3 mb-5">
          {members.map((member) => (
            <li
              key={member.id}
              className="flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <Avatar className="size-8">
                  <AvatarImage src={member.avatarUrl} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="font-medium text-sm text-foreground">
                  {member.name}
                </span>
              </div>
              {member.role === "Lead" && (
                <span className="text-xs font-medium text-muted-foreground border border-border px-1.5 py-0.5 rounded">
                  Lead
                </span>
              )}
            </li>
          ))}
        </ul>

        <Button
          variant="outline"
          onClick={() => setIsModalOpen(true)}
          className="w-full border-dashed text-muted-foreground hover:text-primary hover:border-primary transition-colors gap-2"
        >
          <UserPlus className="size-4" />
          Add member
        </Button>
      </div>

      <AddMemberModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
};
