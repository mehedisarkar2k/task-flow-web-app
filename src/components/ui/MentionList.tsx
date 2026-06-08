import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getImageUrl } from "@/utils/image";

interface MentionListProps {
  items: { id: string; name: string; avatar: string | null }[];
  command: (item: { id: string; label: string }) => void;
}

const getInitial = (name: string) => name.charAt(0).toUpperCase();

export const MentionList = forwardRef((props: MentionListProps, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: number) => {
    const item = props.items[index];
    if (item) {
      props.command({ id: item.id, label: item.name });
    }
  };

  const upHandler = () => {
    setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length);
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: KeyboardEvent }) => {
      if (event.key === "ArrowUp") {
        upHandler();
        return true;
      }

      if (event.key === "ArrowDown") {
        downHandler();
        return true;
      }

      if (event.key === "Enter") {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  return (
    <div className="bg-popover border border-border shadow-lg rounded-lg overflow-hidden py-1 min-w-[200px] z-50">
      {props.items.length > 0 ? (
        props.items.map((item, index) => (
          <button
            key={index}
            className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-muted transition-colors ${
              index === selectedIndex ? "bg-muted text-primary font-medium" : "text-popover-foreground"
            }`}
            onClick={() => selectItem(index)}
          >
            <Avatar className="w-5 h-5">
              {item.avatar && (
                <AvatarImage src={getImageUrl(item.avatar)} alt={item.name} />
              )}
              <AvatarFallback className="bg-primary text-white text-[10px]">
                {getInitial(item.name)}
              </AvatarFallback>
            </Avatar>
            <span className="truncate">{item.name}</span>
          </button>
        ))
      ) : (
        <div className="px-3 py-2 text-sm text-muted-foreground">No result</div>
      )}
    </div>
  );
});

MentionList.displayName = "MentionList";
