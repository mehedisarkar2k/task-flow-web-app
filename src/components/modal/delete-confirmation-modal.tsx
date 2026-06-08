"use client";

import { TriangleAlert } from "lucide-react";
import { BaseModal } from "@/components/modal/base-modal";
import { Button } from "@/components/ui/button";

interface DeleteConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => void;
  itemName?: string;
}

export const DeleteConfirmationModal = ({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  itemName,
}: DeleteConfirmationModalProps) => {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <BaseModal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      footer={
        <>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Delete
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-4 items-center text-center py-4">
        <div className="size-12 rounded-full bg-destructive/10 flex items-center justify-center text-destructive mb-2">
          <TriangleAlert className="size-6" />
        </div>
        <p className="text-on-surface-variant text-sm max-w-sm">
          {description}
          {itemName && (
            <span className="block mt-2 font-medium text-foreground">
              &quot;{itemName}&quot;
            </span>
          )}
        </p>
      </div>
    </BaseModal>
  );
};
