export type SourceId =
  | "sam-gov"
  | "grants-gov"
  | "usaspending"
  | "ted-eu"
  | "uk-contracts-finder"
  | "world-bank"
  | "eu-funding-tenders";

export type Opportunity = {
  id: string;
  source: SourceId;
  sourceLabel: string;
  title: string;
  agency?: string;
  office?: string;
  type?: string;
  postedDate?: string;
  closeDate?: string;
  location?: string;
  amount?: string;
  url?: string;
  description?: string;
  raw?: unknown;
};

export type SearchInput = {
  keywords: string;
  state?: string;
  country?: string;
  limit?: number;
  daysBack?: number;
  sources?: SourceId[];
};

export type SourceSearchResult = {
  source: SourceId;
  sourceLabel: string;
  status: "live" | "mock" | "error" | "skipped";
  message?: string;
  opportunities: Opportunity[];
};

export function asString(value: unknown): string | undefined {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return undefined;
}

export function truncate(value: string | undefined, max = 420): string | undefined {
  if (!value) return undefined;
  return value.length > max ? `${value.slice(0, max).trim()}…` : value;
}

export function mmddyyyy(date: Date): string {
  return `${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}/${date.getFullYear()}`;
}

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
