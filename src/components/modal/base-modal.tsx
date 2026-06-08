import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface BaseModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string; // Additional classes for the dialog content
}

export const BaseModal = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  className,
}: BaseModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "max-w-lg p-0 gap-0 overflow-hidden bg-background border-border shadow-lg",
          className
        )}
      >
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <DialogTitle className="font-heading text-2xl tracking-tight text-foreground">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="font-body-md text-muted-foreground">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="px-6 pt-6 pb-8 flex flex-col gap-4 overflow-y-auto max-h-[70vh]">
          {children}
        </div>

        {footer && (
          <DialogFooter className="px-6 py-4 border-t border-border bg-muted/30 flex justify-end gap-2">
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
