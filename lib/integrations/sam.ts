import { asString, mmddyyyy, Opportunity, SearchInput, SourceSearchResult } from "./types";

const SOURCE = "sam-gov" as const;
const LABEL = "SAM.gov Contract Opportunities";

function normalize(item: any): Opportunity {
  const place = item?.placeOfPerformance;
  const location = [place?.city?.name, place?.state?.name || place?.state?.code, place?.country?.name].filter(Boolean).join(", ");
  return {
    id: asString(item?.noticeId) || asString(item?._id) || asString(item?.solicitationNumber) || crypto.randomUUID(),
    source: SOURCE,
    sourceLabel: LABEL,
    title: asString(item?.title) || "Untitled SAM.gov Opportunity",
    agency: asString(item?.department) || asString(item?.fullParentPathName),
    office: asString(item?.office) || asString(item?.subTier),
    type: asString(item?.type) || asString(item?.typeOfSetAsideDescription),
    postedDate: asString(item?.postedDate),
    closeDate: asString(item?.responseDeadLine),
    location: location || undefined,
    url: asString(item?.uiLink) || asString(item?.links?.self?.href),
    description: asString(item?.description),
    raw: item
  };
}

export async function searchSam(input: SearchInput): Promise<SourceSearchResult> {
  const apiKey = process.env.SAM_GOV_API_KEY;
  const limit = input.limit || Number(process.env.DEFAULT_SEARCH_LIMIT || 10);
  if (!apiKey) {
    return { source: SOURCE, sourceLabel: LABEL, status: "mock", message: "Set SAM_GOV_API_KEY for live SAM.gov results.", opportunities: [{ id: "DEMO-SAM-001", source: SOURCE, sourceLabel: LABEL, title: "Demo Federal Software Support Opportunity", agency: "Demo Agency", type: "Solicitation", postedDate: new Date().toISOString().slice(0,10), closeDate: "Connect SAM.gov API key for live deadline", url: "https://sam.gov/" }] };
  }
  const postedTo = new Date();
  const postedFrom = new Date();
  postedFrom.setDate(postedTo.getDate() - (input.daysBack || Number(process.env.DEFAULT_DAYS_BACK || 30)));
  const params = new URLSearchParams({
    api_key: apiKey,
    limit: String(limit),
    offset: "0",
    postedFrom: mmddyyyy(postedFrom),
    postedTo: mmddyyyy(postedTo),
    ptype: "o,k,p,r"
  });
  if (input.keywords) params.set("keyword", input.keywords);
  if (input.state) params.set("state", input.state.toUpperCase());
  const base = process.env.SAM_GOV_API_BASE || "https://api.sam.gov/opportunities/v2/search";
  const response = await fetch(`${base}?${params}`, { headers: { Accept: "application/json" }, next: { revalidate: 1800 } });
  if (!response.ok) throw new Error(`SAM.gov failed: ${response.status}`);
  const data = await response.json();
  const raw = Array.isArray(data?.opportunitiesData) ? data.opportunitiesData : [];
  return { source: SOURCE, sourceLabel: LABEL, status: "live", opportunities: raw.map(normalize) };
}
