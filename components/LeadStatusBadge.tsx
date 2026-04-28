import { LeadStatus } from "@/lib/leadTypes";

const colors: Record<LeadStatus, string> = {
  new: "#1e3a8a",
  contacted: "#374151",
  report_sent: "#78350f",
  qualified: "#065f46",
  proposal_call: "#6d28d9",
  active: "#166534",
  closed_won: "#14532d",
  closed_lost: "#7f1d1d",
  archived: "#4b5563"
};

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "4px 10px",
      borderRadius: 999,
      fontSize: 12,
      fontWeight: 900,
      color: "white",
      background: colors[status] || "#374151"
    }}>
      {status.replace("_", " ")}
    </span>
  );
}
