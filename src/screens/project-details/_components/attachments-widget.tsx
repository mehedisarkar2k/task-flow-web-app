import { FileText, Image as ImageIcon, Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Attachment } from "@/screens/project-details/types";

interface AttachmentsWidgetProps {
  attachments: Attachment[];
}

export const AttachmentsWidget = ({ attachments }: AttachmentsWidgetProps) => {
  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading text-lg font-semibold text-foreground">
          Attachments
        </h3>
        <Button variant="ghost" size="icon" className="size-8 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10">
          <Plus className="size-4" />
        </Button>
      </div>
      <ul className="flex flex-col gap-2">
        {attachments.map((attachment) => (
          <li
            key={attachment.id}
            className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer group border border-transparent hover:border-border"
          >
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                attachment.type === "image"
                  ? "bg-primary/10 text-primary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {attachment.type === "image" ? (
                <ImageIcon className="size-5" />
              ) : (
                <FileText className="size-5" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {attachment.name}
              </p>
              <p className="font-mono text-xs text-muted-foreground">
                {attachment.size}
              </p>
            </div>
            <button
              className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary p-1"
              aria-label={`Download ${attachment.name}`}
            >
              <Download className="size-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
