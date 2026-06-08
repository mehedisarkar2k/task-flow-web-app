import { format } from "date-fns";

/** Formats an ISO date (yyyy-mm-dd) for display, e.g. "Oct 12, 2026". */
export const formatDueDate = (iso: string | null | undefined): string => {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return format(date, "MMM dd, yyyy");
};

/** Formats an estimate in minutes as a compact label, e.g. "30m", "4h", "2d 4h". */
export const formatEstimatedTime = (minutes: number | null | undefined): string => {
  if (!minutes || minutes <= 0) return "";
  const days = Math.floor(minutes / (60 * 24));
  const hours = Math.floor((minutes % (60 * 24)) / 60);
  const mins = minutes % 60;

  const parts: string[] = [];
  if (days) parts.push(`${days}d`);
  if (hours) parts.push(`${hours}h`);
  if (mins) parts.push(`${mins}m`);
  return parts.join(" ");
};
