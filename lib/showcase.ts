import { matchBusiness } from "./matcher";
import { generateProposalWithOpenAI } from "./openaiProposal";

export type ShowcaseInput = {
  email: string;
  name?: string;
  company?: string;
  keywords: string;
  business?: string;
  source?: string;
};

export async function generateShowcaseReport(input: ShowcaseInput) {
  const query = [input.business, input.keywords].filter(Boolean).join(" ");
  const match = matchBusiness(query);
  const proposal = await generateProposalWithOpenAI(match);
  const top = match.results[0];

  const report = `CIVISOURCE FREE SHOWCASE REPORT

Prepared for:
${input.name || "Convention Prospect"}
${input.company || ""}
${input.email}

KEYWORD INPUT
${input.keywords}

MATCHED SECTOR
${match.sector.name}

MATCHED KEYWORDS
${match.matchedKeywords.join(", ")}

TOP NOTICE / OPPORTUNITY
${top.title}
Agency/Body: ${top.agency}
Priority: ${top.priority}
Score: ${top.score}/100
Type: ${top.type}
Deadline: ${top.deadline}

SUMMARY
${top.summary}

------------------------------------------------------------

SAMPLE PROPOSAL PREVIEW

${proposal.proposal}

------------------------------------------------------------

REQUIREMENTS CHECKLIST

${match.requirements.map((r) => "• " + r).join("\n")}

------------------------------------------------------------

WHAT YOU RECEIVED FREE

• One bulk keyword search simulation
• One top opportunity match
• One sample proposal preview
• One requirements checklist
• One follow-up report

UPGRADE OPTIONS

Starter — $299/month
Best for testing opportunity intelligence.
Includes 3 reports/month, 3 proposal previews/month, lead dashboard, and CSV export.

Professional — $1,500/month
Best for active consultants and firms pursuing grants, contracts, and RFPs.
Includes 25 reports/month, 25 proposal drafts/month, expanded source registry, priority scoring, and pipeline review.

Enterprise — $7,500/month
Best for high-volume business development, multi-client workflows, and strategic opportunity pipelines.
Includes custom report volume, custom proposal generation volume, API source registry, and strategic support.

NEXT STEP

Upgrade to turn this one free search into an ongoing opportunity pipeline.

Contact:
${process.env.CIVISOURCE_CONTACT_EMAIL || "jrodrig@ecoquipr.com"}
${process.env.CIVISOURCE_HOMEPAGE || "https://www.ecoquipr.com"}/pricing
`;

  return {
    match,
    proposal,
    topOpportunity: top,
    report
  };
}
