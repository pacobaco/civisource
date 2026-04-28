import { getSectors } from "./data";
import { MatchResult, Sector } from "./types";

export function matchBusiness(query: string): MatchResult {
  const q = query.toLowerCase();
  const sectors = getSectors();

  const scored = sectors.map((sector) => {
    const matchedKeywords = sector.keywords.filter((k) => {
      const lower = k.toLowerCase();
      return q.includes(lower) || lower.split(" ").some((part) => part.length > 4 && q.includes(part));
    });
    const nameHit = q.includes(sector.name.toLowerCase().split(" ")[0]);
    const score = matchedKeywords.length * 10 + (nameHit ? 15 : 0);
    return { sector, matchedKeywords, score };
  }).sort((a, b) => b.score - a.score);

  const selected = scored[0]?.score > 0 ? scored[0] : inferFallback(q, sectors);
  const results = [...selected.sector.opportunities].sort((a, b) => b.score - a.score);

  return {
    sector: selected.sector,
    query,
    matchedKeywords: selected.matchedKeywords.length ? selected.matchedKeywords : selected.sector.keywords.slice(0, 4),
    results,
    proposalPreview: proposalFor(query, selected.sector),
    requirements: requirementsFor(selected.sector)
  };
}

function inferFallback(query: string, sectors: Sector[]) {
  if (query.includes("clinic") || query.includes("medical") || query.includes("health")) return { sector: sectors.find(s => s.slug === "healthcare")!, matchedKeywords: ["health informatics"], score: 10 };
  if (query.includes("school") || query.includes("training") || query.includes("student")) return { sector: sectors.find(s => s.slug === "education")!, matchedKeywords: ["education technology"], score: 10 };
  if (query.includes("build") || query.includes("construction") || query.includes("facility")) return { sector: sectors.find(s => s.slug === "construction")!, matchedKeywords: ["construction"], score: 10 };
  if (query.includes("security") || query.includes("cyber")) return { sector: sectors.find(s => s.slug === "cybersecurity")!, matchedKeywords: ["cybersecurity"], score: 10 };
  if (query.includes("climate") || query.includes("water") || query.includes("energy")) return { sector: sectors.find(s => s.slug === "environment")!, matchedKeywords: ["sustainability"], score: 10 };
  return { sector: sectors.find(s => s.slug === "local-business")!, matchedKeywords: ["small business"], score: 5 };
}

function proposalFor(query: string, sector: Sector) {
  return `# Civisource Proposal Preview

## Executive Opportunity Summary
Based on the service profile "${query}", Civisource identifies alignment with the ${sector.name} opportunity category.

## Why This Business Fits
The stated capabilities map to sector language, buyer needs, and proposal-ready themes.

## Proposed Approach
1. Map service capabilities to procurement and funding language.
2. Identify high-priority notices.
3. Build a requirements checklist.
4. Draft a proposal offer and work plan.
5. Track submission readiness.

## Deliverables
- Opportunity shortlist
- Match rationale
- Proposal draft
- Requirements checklist
- Submission workflow

## Recommended Next Step
Request a full Civisource opportunity report and proposal package.`;
}

function requirementsFor(sector: Sector) {
  return [
    "Confirm entity eligibility and registration status",
    "Verify official notice deadline and submission method",
    "Download and review all attachments or amendments",
    "Prepare technical approach and project narrative",
    "Prepare cost or budget assumptions",
    "Create compliance checklist",
    `Validate sector-specific evidence for ${sector.name}`,
    "Review final package before submission"
  ];
}
