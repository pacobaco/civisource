import Link from "next/link";
import { LeadRecord } from "@/lib/leadTypes";
import { LeadStatusBadge } from "./LeadStatusBadge";

export function LeadTable({ leads }: { leads: LeadRecord[] }) {
  if (!leads.length) return <div className="card"><p className="muted">No leads captured yet.</p></div>;

  return (
    <div className="card">
      <table>
        <thead><tr><th>Lead</th><th>Company</th><th>Sector</th><th>Opportunity</th><th>Status</th><th>Created</th></tr></thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td><Link href={`/leads/${lead.id}`} style={{ color: "#f1d48a", fontWeight: 800 }}>{lead.name || lead.email}</Link><br/><span className="muted">{lead.email}</span></td>
              <td>{lead.company || "—"}</td>
              <td>{lead.sector || lead.industry || "—"}</td>
              <td>{lead.topOpportunityTitle || "—"}</td>
              <td><LeadStatusBadge status={lead.status} /></td>
              <td>{new Date(lead.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
