# Stripe Installation for Civisource

Stripe Checkout is used for subscription checkout. Stripe Billing manages recurring subscriptions. Stripe Customer Portal provides self-service billing management.

## 1. Install

```bash
npm install stripe
```

## 2. Create Stripe products

Create three products in Stripe Dashboard:

```text
Civisource Starter       $299/month
Civisource Professional  $1,500/month
Civisource Enterprise    $7,500/month
```

Copy the monthly recurring price IDs into `.env.local`.

## 3. Environment

```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_APP_URL=http://localhost:3000

STRIPE_PRICE_STARTER=price_...
STRIPE_PRICE_PROFESSIONAL=price_...
STRIPE_PRICE_ENTERPRISE=price_...
```

## 4. Vercel env

```bash
vercel env add STRIPE_SECRET_KEY
vercel env add STRIPE_WEBHOOK_SECRET
vercel env add NEXT_PUBLIC_APP_URL
vercel env add STRIPE_PRICE_STARTER
vercel env add STRIPE_PRICE_PROFESSIONAL
vercel env add STRIPE_PRICE_ENTERPRISE
```

## 5. Webhook endpoint

```text
https://your-domain.com/api/stripe/webhook
```

Recommended events:

```text
checkout.session.completed
customer.subscription.created
customer.subscription.updated
customer.subscription.deleted
invoice.payment_succeeded
invoice.payment_failed
```

## 6. Customer Portal

Enable Stripe Customer Portal in Stripe Dashboard, then call:

```text
POST /api/stripe/portal
```

with:

```json
{ "customerId": "cus_..." }
```

## 7. Patch navigation

Add a Pricing link to `app/layout.tsx`:

```tsx
<Link href="/pricing">Pricing</Link>
```
