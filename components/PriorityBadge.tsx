import { Priority } from "@/lib/types";

export function PriorityBadge({ priority }: { priority: Priority }) {
  return <span className={`badge ${priority.toLowerCase()}`}>{priority}</span>;
}
