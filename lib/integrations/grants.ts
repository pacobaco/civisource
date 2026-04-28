import { asString, Opportunity, SearchInput, SourceSearchResult, truncate } from "./types";
const SOURCE = "grants-gov" as const;
const LABEL = "Grants.gov";
function normalize(item: any): Opportunity {
  const id = asString(item?.id) || asString(item?.opportunityId) || asString(item?.number) || asString(item?.opportunityNumber) || crypto.randomUUID();
  return { id, source: SOURCE, sourceLabel: LABEL, title: asString(item?.title) || asString(item?.opportunityTitle) || "Untitled Grants.gov Opportunity", agency: asString(item?.agency) || asString(item?.agencyName), type: asString(item?.category) || asString(item?.fundingInstrumentType), postedDate: asString(item?.openDate) || asString(item?.postedDate), closeDate: asString(item?.closeDate), url: `https://www.grants.gov/search-results-detail/${id}`, description: truncate(asString(item?.description) || asString(item?.synopsis)), raw: item };
}
export async function searchGrantsGov(input: SearchInput): Promise<SourceSearchResult> {
  const base = process.env.GRANTS_GOV_API_BASE || "https://www.grants.gov/grantsws/rest/opportunities/search";
  const body = { keyword: input.keywords, oppStatuses: "forecasted|posted", rows: input.limit || Number(process.env.DEFAULT_SEARCH_LIMIT || 10) };
  const response = await fetch(base, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(body), next: { revalidate: 1800 } });
  if (!response.ok) throw new Error(`Grants.gov failed: ${response.status}`);
  const data = await response.json();
  const list = data?.oppHits || data?.opportunities || data?.data || data?.result || [];
  const raw = Array.isArray(list) ? list : [];
  return { source: SOURCE, sourceLabel: LABEL, status: "live", opportunities: raw.map(normalize) };
}
