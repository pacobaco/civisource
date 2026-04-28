import { asString, Opportunity, SearchInput, SourceSearchResult, truncate } from "./types";
const SOURCE = "ted-eu" as const;
const LABEL = "TED EU Procurement Notices";
function normalize(item: any): Opportunity {
  const id = asString(item?.publicationNumber) || asString(item?.noticeIdentifier) || asString(item?.noticeId) || asString(item?.id) || crypto.randomUUID();
  const titleObj = item?.noticeTitle || item?.title;
  const title = typeof titleObj === "object" ? (titleObj.eng || titleObj.en || Object.values(titleObj)[0]) : titleObj;
  return { id, source: SOURCE, sourceLabel: LABEL, title: asString(title) || "TED Procurement Notice", agency: asString(item?.buyerName) || asString(item?.organisationName), type: asString(item?.noticeType) || asString(item?.procedureType), postedDate: asString(item?.publicationDate), closeDate: asString(item?.deadline), location: asString(item?.placeOfPerformance), url: `https://ted.europa.eu/en/notice/-/detail/${id}`, description: truncate(asString(item?.description)), raw: item };
}
export async function searchTed(input: SearchInput): Promise<SourceSearchResult> {
  const base = process.env.TED_API_BASE || "https://api.ted.europa.eu/v3/notices/search";
  const query = input.keywords ? `text~\"${input.keywords.replace(/\"/g, "")}\"` : "";
  const response = await fetch(base, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ query, limit: input.limit || 10, page: 1, fields: ["publication-number", "notice-title", "publication-date", "buyer-name", "notice-type", "place-of-performance"] }), next: { revalidate: 3600 } });
  if (!response.ok) throw new Error(`TED failed: ${response.status}`);
  const data = await response.json();
  const raw = Array.isArray(data?.notices) ? data.notices : Array.isArray(data?.results) ? data.results : [];
  return { source: SOURCE, sourceLabel: LABEL, status: "live", opportunities: raw.map(normalize) };
}
