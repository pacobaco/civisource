import { asString, isoDate, Opportunity, SearchInput, SourceSearchResult } from "./types";
const SOURCE = "usaspending" as const;
const LABEL = "USAspending.gov Awards";
function normalize(item: any): Opportunity {
  return { id: asString(item?.Award?.generated_unique_award_id) || asString(item?.generated_unique_award_id) || asString(item?.Award?.piid) || crypto.randomUUID(), source: SOURCE, sourceLabel: LABEL, title: asString(item?.Award?.description) || asString(item?.description) || "USAspending Award", agency: asString(item?.Award?.awarding_agency_name) || asString(item?.awarding_agency_name), type: asString(item?.Award?.type) || asString(item?.award_type), postedDate: asString(item?.Award?.date_signed) || asString(item?.date_signed), amount: asString(item?.Award?.total_obligation) || asString(item?.total_obligation), url: asString(item?.Award?.generated_unique_award_id) ? `https://www.usaspending.gov/award/${item.Award.generated_unique_award_id}` : "https://www.usaspending.gov/", raw: item };
}
export async function searchUsaSpending(input: SearchInput): Promise<SourceSearchResult> {
  const base = process.env.USASPENDING_API_BASE || "https://api.usaspending.gov/api/v2/search/spending_by_award/";
  const to = new Date(); const from = new Date(); from.setDate(to.getDate() - (input.daysBack || 365));
  const body = { filters: { keywords: [input.keywords], time_period: [{ start_date: isoDate(from), end_date: isoDate(to) }] }, fields: ["Award ID", "Recipient Name", "Start Date", "End Date", "Award Amount", "Awarding Agency", "Description"], page: 1, limit: input.limit || 10, sort: "Award Amount", order: "desc" };
  const response = await fetch(base, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(body), next: { revalidate: 3600 } });
  if (!response.ok) throw new Error(`USAspending failed: ${response.status}`);
  const data = await response.json();
  const raw = Array.isArray(data?.results) ? data.results : [];
  return { source: SOURCE, sourceLabel: LABEL, status: "live", opportunities: raw.map(normalize) };
}
