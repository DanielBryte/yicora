import { cn } from "@/lib/utils/cn";

export type StatusType = 'draft' | 'queued' | 'processing' | 'completed' | 'failed';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const styles: Record<StatusType, { label: string; bg: string; text: string; dot: string }> = {
    draft: { label: "Draft", bg: "bg-neutral-100", text: "text-neutral-700", dot: "bg-neutral-400" },
    queued: { label: "Queued", bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500 animate-pulse" },
    processing: { label: "Processing", bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500 animate-spin" },
    completed: { label: "Completed", bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
    failed: { label: "Failed", bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
  };

  const current = styles[status] || styles.draft;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide",
        current.bg,
        current.text,
        className
      )}
    >
      <span className={cn("w-2 h-2 rounded-full", current.dot)} />
      <span>{current.label}</span>
    </span>
  );
}
