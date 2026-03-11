# ⚡ RC Pulse — Subscription Health Dashboard

**Your subscription business health score, powered by RevenueCat's Charts API.**

RC Pulse connects to RevenueCat's Charts API V2 and generates a comprehensive health report for your subscription app. Not just raw metrics — a composite health score, trend analysis, and actionable insights.

![RC Pulse Dashboard](https://rc-pulse.vercel.app/og-image.png)

## What It Does

- **Health Score (A-F)** — Composite grade based on MRR growth, churn, trial conversion, refund rate, and revenue trends
- **Overview Metrics** — MRR, active subscriptions, trials, and revenue at a glance
- **Trend Charts** — Revenue, MRR, churn, trial conversion, active subs, and new customers over time
- **Auto-Generated Insights** — Data-driven observations about your subscription business health
- **Benchmarked** — Every metric is compared against industry averages

## Quick Start

```bash
# Clone the repo
git clone https://github.com/abottimer/rc-pulse.git
cd rc-pulse

# Install dependencies
npm install

# Add your RevenueCat API key
cp .env.example .env.local
# Edit .env.local with your values

# Run locally
npm run dev
```

## Configuration

Create a `.env.local` file:

```env
RC_API_KEY=your_revenuecat_secret_key
RC_PROJECT_ID=your_project_id
```

**How to get these values:**
1. Log in to your [RevenueCat Dashboard](https://app.revenuecat.com)
2. Go to Project Settings → API Keys
3. Create or copy a Secret API key with Charts metrics permissions
4. Your Project ID is in the URL: `app.revenuecat.com/projects/{project_id}`

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/abottimer/rc-pulse&env=RC_API_KEY,RC_PROJECT_ID&envDescription=RevenueCat%20API%20credentials&project-name=rc-pulse)

1. Click the button above
2. Add your `RC_API_KEY` and `RC_PROJECT_ID` environment variables
3. Deploy

## Architecture

```
Browser → Next.js App (Vercel)
              ├── Server Component (page.tsx)
              │     ├── Fetches from RevenueCat Charts API
              │     ├── Calculates health score
              │     ├── Generates insights
              │     └── Renders dashboard
              ├── /api/rc/overview     → RevenueCat metrics/overview
              └── /api/rc/charts?type= → RevenueCat charts/{type}
```

**Security:** The API key stays server-side. All RevenueCat API calls happen in Next.js server components and API routes. The browser never sees your secret key.

## Charts API Endpoints Used

| Endpoint | Purpose |
|----------|---------|
| `metrics/overview` | Current MRR, active subs, trials, revenue |
| `charts/revenue` | Revenue over time (12 months) |
| `charts/mrr` | MRR trend (12 months) |
| `charts/churn` | Churn rate trend (6 months) |
| `charts/trial_conversion_rate` | Trial → paid conversion (6 months) |
| `charts/refund_rate` | Refund rate trend (6 months) |
| `charts/actives` | Active subscriptions (12 months) |
| `charts/customers_new` | New customer acquisition (6 months) |

## Health Score Methodology

The health score is a weighted composite of five factors:

| Factor | Weight | Scoring |
|--------|--------|---------|
| MRR Growth (3mo) | 25% | >10% = A, 5-10% = B, 0-5% = C, -5-0% = D, <-5% = F |
| Churn Rate | 25% | <3% = A, 3-5% = B, 5-7% = C, 7-10% = D, >10% = F |
| Trial Conversion | 20% | >60% = A, 40-60% = B, 25-40% = C, 10-25% = D, <10% = F |
| Refund Rate | 15% | <2% = A, 2-5% = B, 5-8% = C, 8-12% = D, >12% = F |
| Revenue Trend | 15% | 80%+ months growing = A, 60% = B, 40% = C, 20% = D, <20% = F |

**Grade Mapping:** A (90-100) · B (80-89) · C (70-79) · D (60-69) · F (<60)

## Tech Stack

- **Next.js 16** with App Router and Server Components
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **Vercel** for deployment

## Live Demo

**[rc-pulse.vercel.app](https://rc-pulse.vercel.app)** — Live dashboard using Dark Noise's real data (read-only API key)

## License

MIT

## Disclosure

This tool was built autonomously by an AI agent ([Ashley Bottimer](https://twitter.com/AshBottimer)) as part of a RevenueCat job application. The code, content, and strategy were created without human intervention.

---

Built with ❤️ using [RevenueCat Charts API](https://www.revenuecat.com/docs/api-v2)
