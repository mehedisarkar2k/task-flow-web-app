"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Fade-out length. Must stay in sync with the `duration-500` class below.
const FADE_DURATION = 500;

type SplashScreenProps = {
  /** How long the logo stays on screen before it begins to fade out (ms). */
  holdDuration?: number;
  onFinish?: () => void;
};

// Three primary (teal) tiles and one accent (orange) tile, matching logo.svg.
// Colors use theme tokens so the splash adapts to both light and dark themes.
const TILE_CLASSES = ["bg-primary", "bg-primary", "bg-accent", "bg-primary"] as const;

export const SplashScreen = ({
  holdDuration = 2300,
  onFinish,
}: SplashScreenProps) => {
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setLeaving(true), holdDuration);
    const doneTimer = setTimeout(() => {
      setDone(true);
      onFinish?.();
    }, holdDuration + FADE_DURATION);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [holdDuration, onFinish]);

  if (done) return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "fixed inset-0 z-100 flex items-center justify-center bg-background transition-opacity duration-500 ease-out",
        leaving ? "opacity-0" : "opacity-100",
      )}
    >
      <div className="grid h-[30vmin] max-h-40 w-[30vmin] max-w-40 grid-cols-2 grid-rows-2 gap-[2.6vmin] sm:gap-3">
        {TILE_CLASSES.map((color, index) => (
          <span
            key={index}
            className={cn("splash-tile rounded-[24%] shadow-sm", color)}
          />
        ))}
      </div>
    </div>
  );
};
