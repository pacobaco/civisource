import { asString, Opportunity, SearchInput, SourceSearchResult, truncate } from "./types";
const SOURCE = "world-bank" as const;
const LABEL = "World Bank Procurement";
function normalize(item: any): Opportunity {
  const id = asString(item?.id) || asString(item?.procurement_notice_id) || asString(item?.project_id) || crypto.randomUUID();
  return { id, source: SOURCE, sourceLabel: LABEL, title: asString(item?.notice_title) || asString(item?.title) || "World Bank Procurement Notice", agency: asString(item?.borrower_country) || asString(item?.agency), type: asString(item?.procurement_method) || asString(item?.notice_type), postedDate: asString(item?.publication_date), closeDate: asString(item?.submission_deadline_date), location: asString(item?.country_name), url: asString(item?.url) || "https://projects.worldbank.org/en/projects-operations/procurement", description: truncate(asString(item?.description)), raw: item };
}
export async function searchWorldBank(input: SearchInput): Promise<SourceSearchResult> {
  const base = process.env.WORLD_BANK_PROCUREMENT_API_BASE || "https://search.worldbank.org/api/v2/procnotices";
  const params = new URLSearchParams({ format: "json", rows: String(input.limit || 10), qterm: input.keywords || "" });
  const response = await fetch(`${base}?${params}`, { headers: { Accept: "application/json" }, next: { revalidate: 3600 } });
  if (!response.ok) throw new Error(`World Bank failed: ${response.status}`);
  const data = await response.json();
  const rawObj = data?.procnotices || data?.documents || data?.results || {};
  const raw = Array.isArray(rawObj) ? rawObj : Object.values(rawObj);
  return { source: SOURCE, sourceLabel: LABEL, status: "live", opportunities: raw.map(normalize) };
}
