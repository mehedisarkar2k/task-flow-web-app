"use client";

import { useState } from "react";
import { Search, Plus, Link as LinkIcon } from "lucide-react";
import { BaseModal } from "@/components/modal/base-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddMemberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SUGGESTED_MEMBERS = [
  {
    id: "s1",
    name: "Elena Rodriguez",
    email: "elena@example.com",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCaiE7JapmZVu7ULXwnzVLh5XU12Z-udVBO3v5xet9J_o_2_cbBv2vsAqZZHaP5cpEqVpopax8xOpCeCdfE_aAKse9NUPmF2NjzCdKu9Qyag5qsV4Rds2vanD_KEe9u5vP7sVsI6S8NBu5ckBl641rHi5FGKgtGe_zHuOsZjwzPCQiNjI7SZiRbUmqMq53Q661M3LZh2KnRolma4XXBT5g2SrMrIzijpWQ8_uacj99fx3PvRBvpLtuC2AXGqM0bCwDtBnDgaZ0-86Y",
  },
  {
    id: "s2",
    name: "Marcus Johnson",
    email: "marcus@example.com",
  },
  {
    id: "s3",
    name: "David Chen",
    email: "david.c@example.com",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDqW_uUlHb06jboC1HkNMQB3MFbdH3gAoh_hUft0iGvb1njJAf5Q5i1fphN6P8fDjWez34wNUnPiNYeHhGFCfbWh6Sa_ClEzc0c4kZRBD0xjvoFv_QwcYAfwI7WVPc_4lFPiP1mb7r1qTTSTRKRPhjaHyLXfB9b_FDGL2sWFg0-cWejLBL5FPcAkZVKAZRlPhr4fJJsRvhZ01G7eQlHqet1THG_IFKynKoVcvOyeml2slfCmWrjifLtn5JX754iwRXVg5XG6hnP7Ro",
  },
];

export const AddMemberModal = ({ open, onOpenChange }: AddMemberModalProps) => {
  const [role, setRole] = useState("Viewer");

  return (
    <BaseModal
      open={open}
      onOpenChange={onOpenChange}
      title="Add Member"
      footer={
        <>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Add to Team</Button>
        </>
      }
    >
      <div className="flex gap-2 items-start">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            className="pl-9 bg-surface"
          />
        </div>
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger className="w-[120px] bg-surface">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Viewer">Viewer</SelectItem>
            <SelectItem value="Editor">Editor</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-2">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Suggested Members
        </h3>
        <ul className="flex flex-col">
          {SUGGESTED_MEMBERS.map((user) => (
            <li
              key={user.id}
              className="flex items-center justify-between py-2 border-b border-border last:border-0 group cursor-pointer hover:bg-muted/50 -mx-2 px-2 rounded-md transition-colors"
            >
              <div className="flex items-center gap-3">
                <Avatar className="size-10 border border-border">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">
                    {user.name}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 text-primary hover:text-primary hover:bg-primary/10 rounded-full"
                aria-label={`Add ${user.name}`}
              >
                <Plus className="size-5" />
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-2 p-4 bg-muted/50 rounded-lg border border-border flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground">
            Share Invite Link
          </span>
          <span className="text-xs text-muted-foreground">
            Anyone with the link can join as a Viewer.
          </span>
        </div>
        <Button variant="ghost" className="text-primary hover:text-primary gap-1.5 hover:bg-primary/5">
          <LinkIcon className="size-4" />
          Copy
        </Button>
      </div>
    </BaseModal>
  );
};
