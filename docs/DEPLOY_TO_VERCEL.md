# Deploy Civisource to Vercel

```bash
npm install
npm run build
vercel --prod
```

Set environment variables:

```bash
vercel env add SAM_GOV_API_KEY
vercel env add SAM_GOV_API_BASE
vercel env add SAM_GOV_DEFAULT_DAYS_BACK
vercel env add SAM_GOV_DEFAULT_LIMIT
vercel env add NEXT_PUBLIC_APP_URL
```

Optional:

```bash
vercel env add OPENAI_API_KEY
vercel env add RESEND_API_KEY
vercel env add STRIPE_SECRET_KEY
vercel env add STRIPE_WEBHOOK_SECRET
```
