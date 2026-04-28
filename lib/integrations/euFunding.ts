import { Opportunity, SearchInput, SourceSearchResult } from "./types";
const SOURCE = "eu-funding-tenders" as const;
const LABEL = "EU Funding & Tenders";
export async function searchEuFundingTenders(input: SearchInput): Promise<SourceSearchResult> {
  const base = process.env.EU_FUNDING_TENDERS_API_BASE;
  if (!base) {
    return { source: SOURCE, sourceLabel: LABEL, status: "skipped", message: "EU Funding & Tenders uses portal-specific datasets; set EU_FUNDING_TENDERS_API_BASE if you have an approved endpoint or mirror.", opportunities: [] };
  }
  const params = new URLSearchParams({ q: input.keywords, limit: String(input.limit || 10) });
  const response = await fetch(`${base}?${params}`, { headers: { Accept: "application/json" }, next: { revalidate: 3600 } });
  if (!response.ok) throw new Error(`EU Funding & Tenders failed: ${response.status}`);
  const data = await response.json();
  const raw = Array.isArray(data?.results) ? data.results : Array.isArray(data?.items) ? data.items : [];
  const opportunities: Opportunity[] = raw.map((item: any) => ({ id: item.id || crypto.randomUUID(), source: SOURCE, sourceLabel: LABEL, title: item.title || "EU Funding Opportunity", agency: item.programme || item.agency, postedDate: item.publicationDate, closeDate: item.deadline, url: item.url, description: item.description, raw: item }));
  return { source: SOURCE, sourceLabel: LABEL, status: "live", opportunities };
}
