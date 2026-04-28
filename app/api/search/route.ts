import { NextResponse } from "next/server";
import { searchAllSources, SourceId } from "@/lib/integrations";

function parseSources(value: unknown): SourceId[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const allowed = new Set(["sam-gov", "grants-gov", "usaspending", "ted-eu", "uk-contracts-finder", "world-bank", "eu-funding-tenders"]);
  return value.filter((item): item is SourceId => typeof item === "string" && allowed.has(item));
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const keywords = String(body.keywords || "").trim();
  if (!keywords) return NextResponse.json({ error: "keywords required" }, { status: 400 });
  const results = await searchAllSources({
    keywords,
    state: body.state ? String(body.state) : undefined,
    country: body.country ? String(body.country) : undefined,
    limit: Math.min(Number(body.limit || process.env.DEFAULT_SEARCH_LIMIT || 10), 25),
    daysBack: Number(body.daysBack || process.env.DEFAULT_DAYS_BACK || 30),
    sources: parseSources(body.sources)
  });
  const opportunities = results.flatMap((r) => r.opportunities);
  return NextResponse.json({ query: { keywords }, results, opportunities, count: opportunities.length });
}
