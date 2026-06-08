"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AssistantPanel } from "./assistant-panel";

export const AssistantWidget = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <div className="fixed inset-x-3 bottom-3 top-16 z-50 sm:inset-x-auto sm:bottom-24 sm:right-5 sm:top-auto sm:h-[600px] sm:max-h-[80vh] sm:w-[380px]">
          <AssistantPanel onClose={() => setOpen(false)} />
        </div>
      )}

      {!open && (
        <Button
          size="icon"
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-50 h-12 w-12 rounded-full shadow-lg"
          aria-label="Open assistant"
        >
          <MessageCircle className="h-5 w-5" />
        </Button>
      )}
    </>
  );
};
