import Mention from "@tiptap/extension-mention";
import { ReactRenderer } from "@tiptap/react";
import tippy, { Instance as TippyInstance } from "tippy.js";
import { MentionList } from "./MentionList";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { MentionNodeView } from "./mention-node-view";

export const getMentionExtension = (getMembers: () => { id: string; name: string; avatar: string | null }[], projectId?: string) => {
  return Mention.extend({
    addOptions() {
      return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(this.parent?.() as any),
        projectId,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any;
    },
    addNodeView() {
      return ReactNodeViewRenderer(MentionNodeView);
    },
  }).configure({
    HTMLAttributes: {
      class: "mention",
    },
    renderHTML({ node }) {
      return [
        "mention",
        this.HTMLAttributes,
        `@${node.attrs.label ?? node.attrs.id}`,
      ];
    },
    suggestion: {
      items: ({ query }) => {
        return getMembers()
          .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
          .slice(0, 5);
      },
      render: () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let component: ReactRenderer<any>;
        let popup: TippyInstance[];

        return {
          onStart: (props) => {
            component = new ReactRenderer(MentionList, {
              props,
              editor: props.editor,
            });

            if (!props.clientRect) {
              return;
            }

            popup = tippy("body", {
              getReferenceClientRect: props.clientRect as () => DOMRect,
              appendTo: () => document.body,
              content: component.element,
              showOnCreate: true,
              interactive: true,
              trigger: "manual",
              placement: "bottom-start",
            });
          },

          onUpdate(props) {
            component.updateProps(props);

            if (!props.clientRect) {
              return;
            }

            popup[0].setProps({
              getReferenceClientRect: props.clientRect as () => DOMRect,
            });
          },

          onKeyDown(props) {
            if (props.event.key === "Escape") {
              popup[0].hide();
              return true;
            }

            return component.ref?.onKeyDown(props);
          },

          onExit() {
            popup[0].destroy();
            component.destroy();
          },
        };
      },
    },
  });
};
