export type SamOpportunity = {
  noticeId: string;
  title: string;
  solicitationNumber?: string;
  type?: string;
  postedDate?: string;
  responseDeadLine?: string;
  department?: string;
  subTier?: string;
  office?: string;
  placeOfPerformance?: string;
  uiLink?: string;
  raw?: unknown;
};

export type SamSearchInput = { keywords: string; state?: string; limit?: number; daysBack?: number };

const fallbackOpportunities: SamOpportunity[] = [{
  noticeId: "DEMO-SAM-001",
  title: "Demo Federal Software Support Opportunity",
  solicitationNumber: "DEMO-2026-001",
  type: "Solicitation",
  postedDate: new Date().toISOString().slice(0, 10),
  responseDeadLine: "Demo deadline — connect SAM.gov API key for live dates",
  department: "Demo Agency",
  office: "Demo Contracting Office",
  placeOfPerformance: "United States",
  uiLink: "https://sam.gov/"
}];

function formatSamDate(date: Date): string {
  return `${String(date.getMonth()+1).padStart(2,"0")}/${String(date.getDate()).padStart(2,"0")}/${date.getFullYear()}`;
}
function pickString(value: unknown): string | undefined { return typeof value === "string" && value.trim() ? value : undefined; }
function normalizeOpportunity(item: any): SamOpportunity {
  const place = item?.placeOfPerformance;
  const pop = [place?.city?.name, place?.state?.name || place?.state?.code, place?.country?.name].filter(Boolean).join(", ");
  return {
    noticeId: pickString(item?.noticeId) || pickString(item?._id) || "unknown",
    title: pickString(item?.title) || "Untitled SAM.gov Opportunity",
    solicitationNumber: pickString(item?.solicitationNumber),
    type: pickString(item?.type) || pickString(item?.typeOfSetAsideDescription),
    postedDate: pickString(item?.postedDate),
    responseDeadLine: pickString(item?.responseDeadLine),
    department: pickString(item?.department) || pickString(item?.fullParentPathName),
    subTier: pickString(item?.subTier), office: pickString(item?.office),
    placeOfPerformance: pop || undefined,
    uiLink: pickString(item?.uiLink) || pickString(item?.links?.self?.href), raw: item
  };
}
export async function searchSamOpportunities(input: SamSearchInput): Promise<{ source: "sam.gov" | "mock"; opportunities: SamOpportunity[] }> {
  const apiKey = process.env.SAM_GOV_API_KEY;
  const base = process.env.SAM_GOV_API_BASE || "https://api.sam.gov/opportunities/v2/search";
  const limit = input.limit || Number(process.env.SAM_GOV_DEFAULT_LIMIT || 10);
  const daysBack = input.daysBack || Number(process.env.SAM_GOV_DEFAULT_DAYS_BACK || 30);
  if (!apiKey || apiKey === "replace_with_your_sam_gov_public_api_key") return { source: "mock", opportunities: fallbackOpportunities };
  const postedTo = new Date(); const postedFrom = new Date(); postedFrom.setDate(postedTo.getDate() - daysBack);
  const params = new URLSearchParams({ api_key: apiKey, limit: String(limit), offset: "0", postedFrom: formatSamDate(postedFrom), postedTo: formatSamDate(postedTo), ptype: "o,k,p,r" });
  if (input.keywords?.trim()) params.set("keyword", input.keywords.trim());
  if (input.state?.trim()) params.set("state", input.state.trim().toUpperCase());
  const response = await fetch(`${base}?${params.toString()}`, { method: "GET", headers: { Accept: "application/json" }, next: { revalidate: 3600 } });
  if (!response.ok) throw new Error(`SAM.gov request failed: ${response.status} ${await response.text().catch(()=>"")}`);
  const data = await response.json();
  const raw = Array.isArray(data?.opportunitiesData) ? data.opportunitiesData : [];
  return { source: "sam.gov", opportunities: raw.map(normalizeOpportunity) };
}
