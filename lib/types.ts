export type Priority = "P0" | "P1" | "P2" | "P3";

export type Opportunity = {
  id: string;
  title: string;
  agency: string;
  priority: Priority;
  score: number;
  deadline: string;
  type: string;
  summary: string;
};

export type Sector = {
  slug: string;
  name: string;
  summary: string;
  keywords: string[];
  sampleBusiness: string;
  opportunities: Opportunity[];
};

export type MatchResult = {
  sector: Sector;
  query: string;
  matchedKeywords: string[];
  results: Opportunity[];
  proposalPreview: string;
  requirements: string[];
};
