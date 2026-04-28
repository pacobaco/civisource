# Deploy Civisource to Vercel

```bash
npm install
npm run build
vercel --prod
```

## Environment Variables

```env
OPENAI_API_KEY=your_openai_key
OPENAI_MODEL=gpt-4.1-mini
CIVISOURCE_ORG_NAME=Saga Dog Corp
CIVISOURCE_CONTACT_EMAIL=jrodrig@ecoquipr.com
CIVISOURCE_HOMEPAGE=https://www.ecoquipr.com
```

## Suggested Domain Routes

```text
https://www.ecoquipr.com/civisource
https://www.ecoquipr.com/demo
```

## Production Persistence

The lead dashboard uses in-memory state for demo purposes. For production, connect:
- Supabase
- Vercel Postgres
- Neon
- Airtable
- HubSpot
- Google Sheets
