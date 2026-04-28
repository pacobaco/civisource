# SAM.gov API Key Setup

1. Sign in to SAM.gov and request a public API key from Account Details.
2. Copy `.env.example` to `.env.local`.
3. Set:

```env
SAM_GOV_API_KEY=your_key_here
SAM_GOV_API_BASE=https://api.sam.gov/opportunities/v2/search
SAM_GOV_DEFAULT_DAYS_BACK=30
SAM_GOV_DEFAULT_LIMIT=10
```

4. Test locally:

```bash
npm install
npm run dev
curl -X POST http://localhost:3000/api/showcase \
  -H "Content-Type: application/json" \
  -d '{"email":"lead@example.com","company":"Saga Dog Corp","keywords":"software cybersecurity","state":"FL"}'
```

Keep `SAM_GOV_API_KEY` server-side only. Do not prefix it with `NEXT_PUBLIC_`.
