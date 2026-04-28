# Civisource Stripe Upgrade

Adds Stripe subscription checkout, tiered pricing, billing portal, and access-tier metadata to Civisource.

## Tiers

```text
Starter      $299/month    lead capture + 3 reports/month
Professional $1,500/month  expanded query/report/proposal pipeline
Enterprise   $7,500/month  high-volume pipeline + consulting workflow
```

You can change prices in `lib/pricing.ts` and your Stripe Dashboard.

## Install

```bash
npm install stripe
```

## Environment

```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_APP_URL=http://localhost:3000

STRIPE_PRICE_STARTER=price_...
STRIPE_PRICE_PROFESSIONAL=price_...
STRIPE_PRICE_ENTERPRISE=price_...
```

## Routes Added

```text
/pricing
/billing/success
/billing/cancel
/api/stripe/checkout
/api/stripe/portal
/api/stripe/webhook
```

## Production Notes

This patch uses Stripe Checkout for subscriptions and Stripe Customer Portal for self-service subscription management. Stripe Billing supports recurring subscriptions, and the Customer Portal lets customers manage payment methods, invoices, and subscriptions. See official Stripe docs for subscriptions and portal integration.
