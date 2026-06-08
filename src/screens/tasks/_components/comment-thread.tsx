"use client";

import { MessageSquare, Bold, Italic, Link as LinkIcon, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Comment {
  id: string;
  author: { name: string; avatar?: string };
  content: string;
  timestamp: string;
}

interface CommentThreadProps {
  comments: Comment[];
}

export const CommentThread = ({ comments }: CommentThreadProps) => {
  return (
    <div className="space-y-6">
      <h3 className="font-headline-md text-[18px] text-on-surface flex items-center gap-2">
        <MessageSquare className="size-5 text-on-surface-variant" />
        Discussion
      </h3>

      {/* Comment Input */}
      <div className="flex gap-4 items-start">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-[10px] font-medium text-white shrink-0 mt-1">
          Y
        </div>
        <div className="flex-1 bg-surface border border-outline-variant focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 rounded-lg p-3 transition-all">
          <textarea
            className="w-full bg-transparent border-none resize-none focus:outline-none font-body-md text-on-surface min-h-[60px]"
            placeholder="Add a comment..."
            rows={2}
          ></textarea>
          <div className="flex justify-between items-center mt-2 pt-2 border-t border-outline-variant/30">
            <div className="flex gap-1 text-on-surface-variant">
              <button className="p-1 hover:bg-surface-container rounded transition-colors">
                <Bold className="size-4" />
              </button>
              <button className="p-1 hover:bg-surface-container rounded transition-colors">
                <Italic className="size-4" />
              </button>
              <button className="p-1 hover:bg-surface-container rounded transition-colors">
                <LinkIcon className="size-4" />
              </button>
              <button className="p-1 hover:bg-surface-container rounded transition-colors">
                <Paperclip className="size-4" />
              </button>
            </div>
            <Button size="sm" className="bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md px-4 border border-outline-variant transition-colors shadow-none">
              Post
            </Button>
          </div>
        </div>
      </div>

      {/* Comment Thread */}
      <div className="space-y-5 mt-8">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            {comment.author.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={comment.author.avatar} 
                alt={comment.author.name}
                className="w-8 h-8 rounded-full border border-outline-variant object-cover mt-1 shrink-0" 
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-[10px] font-medium text-white shrink-0 mt-1">
                {comment.author.name.charAt(0)}
              </div>
            )}
            
            <div className="flex-1">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-label-md text-on-surface font-medium">{comment.author.name}</span>
                <span className="font-data-mono text-[12px] text-on-surface-variant">{comment.timestamp}</span>
              </div>
              <p className="font-body-md text-on-surface bg-surface-container-low p-3 rounded-lg border border-outline-variant/50 inline-block">
                {comment.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
