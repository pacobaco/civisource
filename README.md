# Civisource

Civisource is an opportunity and procurement intelligence demo platform by Saga Dog Corp.

It demonstrates how a business capability description can become:
- sector match
- opportunity shortlist
- priority ranking
- proposal preview
- requirements checklist
- lead capture record
- follow-up dashboard entry

## Install

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Routes

```text
/                  Homepage
/civisource        Landing page
/demo              Interactive demo
/sectors           Sector library
/leads             Lead dashboard
/api/demo/match    Matching API
/api/demo/proposal Proposal API
/api/leads         Lead capture API
/api/leads/export  CSV export
```

## Deploy

```bash
vercel --prod
```


## Granting Body / Procurement API Registry

Added routes:

```text
/sources
/sources/[slug]
/api/sources
/api/sources?q=grants
```

Registry file:

```text
data/granting-bodies.json
```

This registry includes official public APIs and API documentation targets for:
- SAM.gov opportunities
- Grants.gov APIs
- Simpler.Grants.gov
- USAspending award intelligence
- EU Funding & Tenders
- TED API
- UK Contracts Finder
- UK Find a Tender
- World Bank document/data APIs
