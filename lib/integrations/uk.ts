import { asString, Opportunity, SearchInput, SourceSearchResult, truncate } from "./types";
const SOURCE = "uk-contracts-finder" as const;
const LABEL = "UK Contracts Finder";
function normalize(item: any): Opportunity {
  const id = asString(item?.id) || asString(item?.noticeIdentifier) || crypto.randomUUID();
  return { id, source: SOURCE, sourceLabel: LABEL, title: asString(item?.title) || "UK Contract Notice", agency: asString(item?.buyerName) || asString(item?.organisationName), type: asString(item?.noticeType), postedDate: asString(item?.datePublished), closeDate: asString(item?.deadlineDate), location: asString(item?.region), amount: asString(item?.valueLow) || asString(item?.value), url: asString(item?.links?.[0]?.href) || asString(item?.url) || `https://www.contractsfinder.service.gov.uk/Notice/${id}`, description: truncate(asString(item?.description)), raw: item };
}
export async function searchUkContracts(input: SearchInput): Promise<SourceSearchResult> {
  const base = process.env.UK_CONTRACTS_FINDER_API_BASE || "https://www.contractsfinder.service.gov.uk/Published/Notices/ODataV4/Notices";
  const top = input.limit || 10;
  const filter = input.keywords ? `contains(tolower(Title),'${input.keywords.toLowerCase().replace(/'/g, "''")}') or contains(tolower(Description),'${input.keywords.toLowerCase().replace(/'/g, "''")}')` : "";
  const params = new URLSearchParams({ "$top": String(top), "$orderby": "datePublished desc" });
  if (filter) params.set("$filter", filter);
  const response = await fetch(`${base}?${params}`, { headers: { Accept: "application/json" }, next: { revalidate: 3600 } });
  if (!response.ok) throw new Error(`UK Contracts Finder failed: ${response.status}`);
  const data = await response.json();
  const raw = Array.isArray(data?.value) ? data.value : Array.isArray(data?.notices) ? data.notices : [];
  return { source: SOURCE, sourceLabel: LABEL, status: "live", opportunities: raw.map(normalize) };
}
