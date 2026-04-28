import OpenAI from "openai";
import { MatchResult } from "./types";

export type ProposalGenerationResult = {
  mode: "openai" | "mock";
  proposal: string;
};

export async function generateProposalWithOpenAI(match: MatchResult): Promise<ProposalGenerationResult> {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";
  const orgName = process.env.CIVISOURCE_ORG_NAME || "Saga Dog Corp";
  const contactEmail = process.env.CIVISOURCE_CONTACT_EMAIL || "jrodrig@ecoquipr.com";
  const homepage = process.env.CIVISOURCE_HOMEPAGE || "https://www.ecoquipr.com";

  if (!apiKey || apiKey === "your_openai_api_key_here") {
    return { mode: "mock", proposal: match.proposalPreview };
  }

  const client = new OpenAI({ apiKey });
  const topOpportunity = match.results[0];

  const prompt = `Generate a concise, business-facing proposal preview for a prospect using Civisource.

Organization: ${orgName}
Contact: ${contactEmail}
Homepage: ${homepage}

Business description:
${match.query}

Matched sector:
${match.sector.name}

Sector summary:
${match.sector.summary}

Matched keywords:
${match.matchedKeywords.join(", ")}

Top opportunity:
${JSON.stringify(topOpportunity, null, 2)}

Requirements checklist:
${match.requirements.map((r) => `- ${r}`).join("\n")}

Rules:
- Do not claim this is an official submission.
- Do not invent certifications, award amounts, past performance, or eligibility.
- Make it useful as a first-draft proposal preview.
- Include sections: Executive Opportunity Summary, Why This Business Fits, Proposed Approach, Draft Deliverables, Submission Readiness Checklist, Recommended Next Step.`;

  const completion = await client.chat.completions.create({
    model,
    temperature: 0.35,
    messages: [
      { role: "system", content: "You are a careful grant and contract proposal drafting assistant. You create conservative first-draft previews and never fabricate qualifications or official requirements." },
      { role: "user", content: prompt }
    ]
  });

  return {
    mode: "openai",
    proposal: completion.choices[0]?.message?.content || match.proposalPreview
  };
}
