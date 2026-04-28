import { LeadRecord, LeadStatus } from "./leadTypes";

let leads: LeadRecord[] = [];

export function createLead(input: Partial<LeadRecord>): LeadRecord {
  const now = new Date().toISOString();
  const lead: LeadRecord = {
    id: makeLeadId(input.email || "lead"),
    name: input.name || "",
    email: input.email || "",
    company: input.company || "",
    phone: input.phone || "",
    industry: input.industry || "",
    business: input.business || "",
    source: input.source || "landing-page",
    eventName: input.eventName || "event-demo",
    sector: input.sector || "",
    topOpportunityTitle: input.topOpportunityTitle || "",
    topOpportunityId: input.topOpportunityId || "",
    priority: input.priority || "",
    score: input.score || 0,
    proposalPreview: input.proposalPreview || "",
    requirements: input.requirements || [],
    status: input.status || "new",
    notes: input.notes || [],
    createdAt: now,
    updatedAt: now
  };
  leads.unshift(lead);
  return lead;
}

export function listLeads(): LeadRecord[] {
  return [...leads].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getLead(id: string): LeadRecord | undefined {
  return leads.find((lead) => lead.id === id);
}

export function updateLead(id: string, patch: Partial<LeadRecord>): LeadRecord | null {
  const lead = getLead(id);
  if (!lead) return null;
  Object.assign(lead, patch, { updatedAt: new Date().toISOString() });
  return lead;
}

export function updateLeadStatus(id: string, status: LeadStatus): LeadRecord | null {
  return updateLead(id, { status });
}

export function addLeadNote(id: string, note: string): LeadRecord | null {
  const lead = getLead(id);
  if (!lead) return null;
  lead.notes.unshift(`${new Date().toISOString()} — ${note}`);
  lead.updatedAt = new Date().toISOString();
  return lead;
}

export function leadsToCsv(): string {
  const rows = [
    ["id","name","email","company","phone","industry","sector","topOpportunityTitle","priority","score","status","source","eventName","createdAt","updatedAt"],
    ...listLeads().map((lead) => [
      lead.id, lead.name, lead.email, lead.company || "", lead.phone || "", lead.industry || "",
      lead.sector || "", lead.topOpportunityTitle || "", lead.priority || "", lead.score || 0,
      lead.status, lead.source || "", lead.eventName || "", lead.createdAt, lead.updatedAt
    ])
  ];
  return rows.map((row) => row.map(csvEscape).join(",")).join("\n");
}

function makeLeadId(seed: string): string {
  const base = seed.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `lead-${base || "contact"}-${Date.now().toString(36)}`;
}

function csvEscape(value: unknown): string {
  const s = String(value ?? "");
  return `"${s.replace(/"/g, '""')}"`;
}
