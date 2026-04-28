# Civisource Live API Integrations

Civisource now exposes a normalized multi-source opportunity search layer at:

```txt
POST /api/search
POST /api/showcase
```

## Enabled sources

| Source | Connector | Auth |
|---|---|---|
| SAM.gov Contract Opportunities | `lib/integrations/sam.ts` | `SAM_GOV_API_KEY` required |
| Grants.gov | `lib/integrations/grants.ts` | public endpoint |
| USAspending.gov | `lib/integrations/usaspending.ts` | public endpoint |
| TED EU procurement notices | `lib/integrations/ted.ts` | anonymous for published notices |
| UK Contracts Finder | `lib/integrations/uk.ts` | public OData endpoint |
| World Bank Procurement | `lib/integrations/worldbank.ts` | public endpoint |
| EU Funding & Tenders | `lib/integrations/euFunding.ts` | configurable endpoint/mirror |

## Example request

```bash
curl -X POST http://localhost:3000/api/search \
  -H "Content-Type: application/json" \
  -d '{"keywords":"software cybersecurity training","state":"FL","sources":["sam-gov","grants-gov","usaspending"]}'
```

## Notes

- All provider responses are normalized to the shared `Opportunity` type.
- Individual provider failures return diagnostics instead of breaking the whole search.
- SAM.gov returns mock data until `SAM_GOV_API_KEY` is present.
- EU Funding & Tenders is provided as a configurable connector because deployments often use an approved dataset mirror, portal export, or custom endpoint.
