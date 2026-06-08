"use client";

import { Paperclip, FileText, Image as ImageIcon, X, Plus } from "lucide-react";

interface Attachment {
  id: string;
  name: string;
  size: string;
  type: "document" | "image";
}

interface AttachmentListProps {
  attachments: Attachment[];
}

export const AttachmentList = ({ attachments }: AttachmentListProps) => {
  return (
    <div className="bg-surface border border-outline-variant rounded-xl p-5 shadow-sm">
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-outline-variant">
        <h3 className="font-label-md text-on-surface font-medium flex items-center gap-2">
          <Paperclip className="size-4.5 text-on-surface-variant" />
          Attachments
        </h3>
        <button 
          className="text-primary hover:bg-primary/10 p-1 rounded transition-colors"
          title="Upload File"
        >
          <Plus className="size-4.5" />
        </button>
      </div>

      <ul className="space-y-2">
        {attachments.map((attachment) => (
          <li key={attachment.id}>
            <a 
              href="#"
              className="group flex items-center gap-3 p-2 rounded-lg border border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low transition-colors"
            >
              <div className="w-8 h-8 rounded bg-surface-variant flex items-center justify-center text-on-surface-variant shrink-0">
                {attachment.type === "document" ? (
                  <FileText className="size-4" />
                ) : (
                  <ImageIcon className="size-4" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body-md text-[13px] text-on-surface truncate group-hover:text-primary transition-colors">
                  {attachment.name}
                </p>
                <p className="font-data-mono text-[11px] text-on-surface-variant">
                  {attachment.size}
                </p>
              </div>
              <button 
                className="text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-error"
                onClick={(e) => {
                  e.preventDefault();
                  // handle delete
                }}
              >
                <X className="size-4" />
              </button>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
