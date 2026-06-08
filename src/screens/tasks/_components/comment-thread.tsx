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

import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { renderHtmlWithMentions } from "@/utils/render-html-with-mentions";

const getInitial = (name?: string) => name ? name.charAt(0).toUpperCase() : "?";

const CommentItem = ({
  comment,
  taskId,
  projectId,
  baseUrl,
  members,
}: {
  comment: Comment;
  taskId: string;
  projectId?: string;
  baseUrl?: string;
  members: { id: string; name: string; avatar: string | null }[];
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
      { commentId: comment.id, data: { body: draft } },
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
            <RichTextEditor
              value={draft}
              onChange={setDraft}
              members={members}
              className="min-h-[60px]"
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
            <div className="font-body-md text-on-surface bg-surface-container-low p-3 rounded-lg border border-outline-variant/50 inline-block max-w-full [&_p]:m-0 break-words">
              {renderHtmlWithMentions(comment.body, projectId)}
            </div>
            {isOwner && (
              <div className="flex gap-1 opacity-0 group-hover/comment:opacity-100 transition-opacity shrink-0 pt-1">
                <button
                  className="p-1 text-on-surface-variant hover:text-primary"
                  onClick={() => {
                    setDraft(comment.body);
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

import { useProjectMembers } from "@/services/query/use-project-members";
import { useQuery } from "@tanstack/react-query";
import { teamApi } from "@/services/api/team";

export const CommentThread = ({ taskId, projectId }: { taskId: string; projectId?: string }) => {
  const { user } = useAuth();
  const { data: config } = useSystemConfig();
  const baseUrl = config?.profileImageBaseUrl;

  const { data, isLoading } = useCommentsQuery(taskId);
  const { data: projectMembers = [] } = useProjectMembers(projectId);
  const { data: teamMembers = [] } = useQuery({
    queryKey: ["team", "members"],
    queryFn: () => teamApi.listMembers({}),
    enabled: !projectId,
  });
  const createComment = useCreateCommentMutation(taskId);

  const [draft, setDraft] = useState("");
  const rawComments = data?.comments ?? [];
  const comments = [...rawComments].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const normalizedTeamMembers = teamMembers.map(m => ({ id: m.id, name: m.name, avatar: (m as any).image ?? null }));
  const members = projectId ? projectMembers : normalizedTeamMembers;

  const handlePost = () => {
    // RichTextEditor might output "<p></p>" when empty, handle it
    const isEmpty = draft.replace(/<[^>]*>?/gm, "").trim().length === 0;
    if (isEmpty) return;
    
    createComment.mutate(
      { body: draft },
      { onSuccess: () => {
          setDraft("");
        } 
      }
    );
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
        <div className="flex-1 flex flex-col gap-2">
          <RichTextEditor
            value={draft}
            onChange={setDraft}
            members={members}
          />
          <div className="flex justify-end">
            <Button
              size="sm"
              onClick={handlePost}
              disabled={draft.replace(/<[^>]*>?/gm, "").trim().length === 0 || createComment.isPending}
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
            <CommentItem 
              key={comment.id} 
              comment={comment} 
              taskId={taskId} 
              projectId={projectId}
              baseUrl={baseUrl} 
              members={members} 
            />
          ))
        )}
      </div>
    </div>
  );
};
