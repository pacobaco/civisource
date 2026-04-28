import { NextResponse } from "next/server";
import { searchAllSources, SourceId } from "@/lib/integrations";

function proposalPreview(company: string, keywords: string, title: string, source: string) {
  return `${company || "Your organization"} can pursue ${title} through a focused capability statement around ${keywords}.\n\nRecommended response package:\n1. Qualification summary aligned to the notice language.\n2. Prior work or portfolio examples mapped to agency needs.\n3. Compliance checklist, deadline tracker, and clarifying questions.\n4. Budget narrative and implementation timeline.\n\nSource: ${source}\nUpgrade to Civisource Professional for bulk search, saved alerts, full proposal drafts, and CRM handoff.`;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = String(body.email || "").trim();
  const company = String(body.company || "").trim();
  const keywords = String(body.keywords || "").trim();
  if (!email || !keywords) return NextResponse.json({ error: "email and keywords required" }, { status: 400 });
  const sources = Array.isArray(body.sources) && body.sources.length ? body.sources as SourceId[] : ["sam-gov", "grants-gov", "usaspending", "ted-eu", "uk-contracts-finder", "world-bank", "eu-funding-tenders"];
  const results = await searchAllSources({ keywords, state: body.state, limit: 5, daysBack: 45, sources });
  const opportunities = results.flatMap((r) => r.opportunities);
  const top = opportunities[0];
  return NextResponse.json({
    capturedLead: { email, company, keywords, createdAt: new Date().toISOString() },
    source: results.map((r) => `${r.sourceLabel}:${r.status}`).join(", "),
    results,
    opportunities,
    proposalPreview: top ? proposalPreview(company, keywords, top.title, top.sourceLabel) : proposalPreview(company, keywords, "a matching opportunity", "No live matches returned")
  });
}
