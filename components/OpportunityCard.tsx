import { Opportunity } from "@/lib/types";
import { PriorityBadge } from "./PriorityBadge";

export function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  return (
    <div className="card">
      <PriorityBadge priority={opportunity.priority} />
      <h3>{opportunity.title}</h3>
      <p className="muted">{opportunity.agency} · {opportunity.type}</p>
      <p>{opportunity.summary}</p>
      <p><b className="gold">Score:</b> {opportunity.score}/100</p>
      <p><b className="gold">Deadline:</b> {opportunity.deadline}</p>
    </div>
  );
}
