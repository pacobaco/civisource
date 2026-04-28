export type LeadStatus =
  | "new"
  | "contacted"
  | "report_sent"
  | "qualified"
  | "proposal_call"
  | "active"
  | "closed_won"
  | "closed_lost"
  | "archived";

export type LeadRecord = {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  industry?: string;
  business: string;
  source?: string;
  eventName?: string;
  sector?: string;
  topOpportunityTitle?: string;
  topOpportunityId?: string;
  priority?: string;
  score?: number;
  proposalPreview?: string;
  requirements?: string[];
  status: LeadStatus;
  notes: string[];
  createdAt: string;
  updatedAt: string;
};
