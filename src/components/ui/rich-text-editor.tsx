"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { getMentionExtension } from "./mention-extension";
import { useEffect, useRef } from "react";
import { RichTextToolbar } from "./rich-text-toolbar";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  members?: { id: string; name: string; avatar: string | null }[];
  projectId?: string;
  className?: string;
}

export const RichTextEditor = ({
  value,
  onChange,
  placeholder = "Write something...",
  members = [],
  projectId,
  className = "",
}: RichTextEditorProps) => {
  const membersRef = useRef(members);

  useEffect(() => {
    membersRef.current = members;
  }, [members]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
        emptyEditorClass:
          "cursor-text before:content-[attr(data-placeholder)] before:absolute before:text-on-surface-variant before:opacity-50 before:pointer-events-none",
      }),
      // eslint-disable-next-line react-hooks/refs
      getMentionExtension(() => membersRef.current, projectId),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: `prose prose-sm dark:prose-invert max-w-none focus:outline-none min-h-[60px] text-on-surface [&_mention]:text-primary [&_mention]:font-medium [&_mention]:bg-primary/10 [&_mention]:px-1 [&_mention]:rounded-md ${className}`,
      },
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (!editor) return;
    const currentHTML = editor.getHTML();
    const isSame = currentHTML === value || (currentHTML === "<p></p>" && !value);
    
    if (!isSame) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div className="w-full bg-surface border border-outline-variant focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 rounded-lg p-2 transition-all relative">
      <RichTextToolbar editor={editor} />
      <EditorContent editor={editor} className="px-1" />
    </div>
  );
};
