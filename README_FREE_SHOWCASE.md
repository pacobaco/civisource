# Civisource Free Showcase Funnel

Adds a business-convention funnel:

```text
business email + keyword input
→ one free bulk keyword search
→ one sample proposal generated
→ results report emailed
→ lead saved
→ upgrade call-to-action for paid tiers
```

## Intended use

Use this at business conventions, chamber events, expos, and networking meetings.

## Routes Added

```text
/showcase
/api/showcase
```

## Required dependencies

```bash
npm install resend openai
```

## Environment

```env
RESEND_API_KEY=your_resend_key
FROM_EMAIL=onboarding@resend.dev
CIVISOURCE_CONTACT_EMAIL=jrodrig@ecoquipr.com
CIVISOURCE_HOMEPAGE=https://www.ecoquipr.com
OPENAI_API_KEY=optional_openai_key
OPENAI_MODEL=gpt-4.1-mini
```

## How it works

- The user enters email, company, and keywords.
- The API runs a mock bulk keyword opportunity search.
- The API selects the top notice.
- The API generates a sample proposal with OpenAI if configured.
- The user receives a report by email.
- You receive a copy.
- The report includes an upgrade pitch for Starter, Professional, and Enterprise tiers.
