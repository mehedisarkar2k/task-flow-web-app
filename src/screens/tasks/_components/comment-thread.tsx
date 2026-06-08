"use client";

import { useState } from "react";
import { MessageSquare, Loader2, Trash2, Pencil } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useSystemConfig } from "@/hooks/queries/use-system-config";
import { getImageUrl } from "@/utils/image";
import { useCommentsQuery } from "@/services/query/use-comments-query";
import {
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} from "@/services/mutation/use-comment-mutations";
import type { Comment } from "@/types/comment.types";

const getInitial = (name: string) => name.charAt(0).toUpperCase();

// Wraps plain textarea input into the rich-text HTML the API stores, escaping
// any markup the user typed so it renders as text rather than injected HTML.
const toHtmlBody = (text: string) => {
  const escaped = text
    .trim()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return `<p>${escaped.replace(/\n/g, "<br/>")}</p>`;
};

const CommentItem = ({
  comment,
  taskId,
  baseUrl,
}: {
  comment: Comment;
  taskId: string;
  baseUrl?: string;
}) => {
  const { user } = useAuth();
  const isOwner = user?.id === comment.user.id;

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState("");

  const updateComment = useUpdateCommentMutation(taskId);
  const deleteComment = useDeleteCommentMutation(taskId);

  const avatarUrl = getImageUrl(comment.user.image, baseUrl);

  const handleSaveEdit = () => {
    if (!draft.trim()) return;
    updateComment.mutate(
      { commentId: comment.id, data: { body: toHtmlBody(draft) } },
      { onSuccess: () => setIsEditing(false) },
    );
  };

  return (
    <div className="flex gap-4">
      {avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={avatarUrl}
          alt={comment.user.name}
          className="w-8 h-8 rounded-full border border-outline-variant object-cover mt-1 shrink-0"
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-[10px] font-medium text-white shrink-0 mt-1">
          {getInitial(comment.user.name)}
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-label-md text-on-surface font-medium">{comment.user.name}</span>
          <span className="font-data-mono text-[12px] text-on-surface-variant">
            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
          </span>
          {comment.isEdited && (
            <span className="text-[11px] text-on-surface-variant italic">(edited)</span>
          )}
        </div>

        {isEditing ? (
          <div className="flex flex-col gap-2">
            <textarea
              autoFocus
              className="w-full bg-surface border border-outline-variant rounded-lg p-2 text-on-surface min-h-[60px] focus:outline-none focus:border-primary"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSaveEdit} disabled={updateComment.isPending}>
                {updateComment.isPending ? "Saving…" : "Save"}
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="group/comment flex items-start gap-2">
            <div
              className="font-body-md text-on-surface bg-surface-container-low p-3 rounded-lg border border-outline-variant/50 inline-block max-w-full [&_p]:m-0 [&_mention]:text-primary [&_mention]:font-medium break-words"
              dangerouslySetInnerHTML={{ __html: comment.body }}
            />
            {isOwner && (
              <div className="flex gap-1 opacity-0 group-hover/comment:opacity-100 transition-opacity shrink-0 pt-1">
                <button
                  className="p-1 text-on-surface-variant hover:text-primary"
                  onClick={() => {
                    setDraft(comment.body.replace(/<[^>]+>/g, " ").trim());
                    setIsEditing(true);
                  }}
                >
                  <Pencil className="size-3.5" />
                </button>
                <button
                  className="p-1 text-on-surface-variant hover:text-destructive"
                  onClick={() => deleteComment.mutate(comment.id)}
                  disabled={deleteComment.isPending}
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const CommentThread = ({ taskId }: { taskId: string }) => {
  const { user } = useAuth();
  const { data: config } = useSystemConfig();
  const baseUrl = config?.profileImageBaseUrl;

  const { data, isLoading } = useCommentsQuery(taskId);
  const createComment = useCreateCommentMutation(taskId);

  const [draft, setDraft] = useState("");
  const comments = data?.comments ?? [];

  const handlePost = () => {
    if (!draft.trim()) return;
    createComment.mutate({ body: toHtmlBody(draft) }, { onSuccess: () => setDraft("") });
  };

  return (
    <div className="space-y-6">
      <h3 className="font-headline-md text-[18px] text-on-surface flex items-center gap-2">
        <MessageSquare className="size-5 text-on-surface-variant" />
        Discussion
        {comments.length > 0 && (
          <span className="font-data-mono text-sm text-on-surface-variant">
            ({comments.length})
          </span>
        )}
      </h3>

      {/* Comment Input */}
      <div className="flex gap-4 items-start">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-[10px] font-medium text-white shrink-0 mt-1">
          {user ? getInitial(user.name) : "?"}
        </div>
        <div className="flex-1 bg-surface border border-outline-variant focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 rounded-lg p-3 transition-all">
          <textarea
            className="w-full bg-transparent border-none resize-none focus:outline-none font-body-md text-on-surface min-h-[60px]"
            placeholder="Add a comment..."
            rows={2}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
          <div className="flex justify-end items-center mt-2 pt-2 border-t border-outline-variant/30">
            <Button
              size="sm"
              onClick={handlePost}
              disabled={!draft.trim() || createComment.isPending}
            >
              {createComment.isPending ? "Posting…" : "Post"}
            </Button>
          </div>
        </div>
      </div>

      {/* Comment Thread */}
      <div className="space-y-5 mt-8">
        {isLoading ? (
          <div className="flex items-center gap-2 text-on-surface-variant text-sm py-4">
            <Loader2 className="size-4 animate-spin" />
            Loading discussion…
          </div>
        ) : comments.length === 0 ? (
          <p className="text-sm text-on-surface-variant py-4">
            No comments yet. Start the discussion.
          </p>
        ) : (
          comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} taskId={taskId} baseUrl={baseUrl} />
          ))
        )}
      </div>
    </div>
  );
};
