import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createLead } from "@/lib/leadStore";
import { generateShowcaseReport } from "@/lib/showcase";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, company, keywords, business } = body;

    if (!email || !keywords) {
      return NextResponse.json(
        { ok: false, error: "Business email and keywords are required." },
        { status: 400 }
      );
    }

    const generated = await generateShowcaseReport({
      email,
      name,
      company,
      keywords,
      business,
      source: "convention-free-showcase"
    });

    const lead = createLead({
      name,
      email,
      company,
      industry: generated.match.sector.name,
      business: business || keywords,
      source: "convention-free-showcase",
      eventName: "business-convention",
      sector: generated.match.sector.name,
      topOpportunityTitle: generated.topOpportunity.title,
      topOpportunityId: generated.topOpportunity.id,
      priority: generated.topOpportunity.priority,
      score: generated.topOpportunity.score,
      proposalPreview: generated.proposal.proposal,
      requirements: generated.match.requirements,
      status: "report_sent",
      notes: [
        "Free showcase report generated and emailed.",
        `Keywords: ${keywords}`,
        `Proposal mode: ${generated.proposal.mode}`
      ]
    });

    if (process.env.RESEND_API_KEY && process.env.FROM_EMAIL) {
      await resend.emails.send({
        from: process.env.FROM_EMAIL,
        to: email,
        subject: "Your Civisource Free Opportunity Report + Sample Proposal",
        text: generated.report
      });

      if (process.env.CIVISOURCE_CONTACT_EMAIL) {
        await resend.emails.send({
          from: process.env.FROM_EMAIL,
          to: process.env.CIVISOURCE_CONTACT_EMAIL,
          subject: `New Civisource Showcase Lead: ${email}`,
          text: generated.report
        });
      }
    }

    return NextResponse.json({
      ok: true,
      message: process.env.RESEND_API_KEY ? "Report generated and emailed." : "Report generated. Email not sent because RESEND_API_KEY is missing.",
      lead,
      report: generated.report,
      upgradeUrl: `${process.env.CIVISOURCE_HOMEPAGE || ""}/pricing`
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message || "Showcase generation failed." },
      { status: 500 }
    );
  }
}
