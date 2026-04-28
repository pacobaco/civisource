# Civisource

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue)
![Vercel](https://img.shields.io/badge/Vercel-deployable-black)
![Stripe](https://img.shields.io/badge/Stripe-ready-635BFF)

Civisource is a procurement, grant, award, and public opportunity intelligence platform. It converts a business email, organization profile, and keyword input into live source matches, proposal-preview language, lead capture, and a subscription upgrade path.

## Live source integrations

| Source | Status | Auth |
|---|---:|---|
| SAM.gov Contract Opportunities | live + mock fallback | API key |
| Grants.gov | live | public |
| USAspending.gov | live | public |
| TED EU Procurement Notices | live | public for published notices |
| UK Contracts Finder | live | public |
| World Bank Procurement | live | public |
| EU Funding & Tenders | configurable | endpoint/mirror |

## Routes

```txt
/                  Landing page
/showcase          Free multi-source demo funnel
/pricing           Stripe tier page
/leads             Lead dashboard stub
/api/search        Normalized multi-source search API
/api/showcase      Lead capture + opportunity report + proposal preview
/api/stripe/*      Checkout, portal, webhook stubs
```

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open:

```txt
http://localhost:3000/showcase
```

## Environment

```env
SAM_GOV_API_KEY=your_sam_gov_public_api_key
SAM_GOV_API_BASE=https://api.sam.gov/opportunities/v2/search
GRANTS_GOV_API_BASE=https://www.grants.gov/grantsws/rest/opportunities/search
USASPENDING_API_BASE=https://api.usaspending.gov/api/v2/search/spending_by_award/
TED_API_BASE=https://api.ted.europa.eu/v3/notices/search
UK_CONTRACTS_FINDER_API_BASE=https://www.contractsfinder.service.gov.uk/Published/Notices/ODataV4/Notices
WORLD_BANK_PROCUREMENT_API_BASE=https://search.worldbank.org/api/v2/procnotices
EU_FUNDING_TENDERS_API_BASE=
```

## Unified search API

```bash
curl -X POST http://localhost:3000/api/search \
  -H "Content-Type: application/json" \
  -d '{"keywords":"software cybersecurity training","state":"FL"}'
```

Returns:

```ts
type Opportunity = {
  id: string;
  source: string;
  sourceLabel: string;
  title: string;
  agency?: string;
  postedDate?: string;
  closeDate?: string;
  url?: string;
};
```

## Deploy to Vercel

```bash
npm run build
vercel --prod
```

Set env vars in the Vercel dashboard or CLI:

```bash
vercel env add SAM_GOV_API_KEY
vercel env add NEXT_PUBLIC_APP_URL
```

## Production upgrade path

Recommended additions:

- Supabase / Neon persistence for leads and saved searches
- Resend transactional report delivery
- OpenAI proposal expansion and compliance checklist generation
- Stripe subscription gating by tier
- HubSpot or Airtable CRM handoff
- Background scheduled searches with alert emails
