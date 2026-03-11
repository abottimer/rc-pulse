# RevenueCat Take-Home Assignment — Final Submission

**Candidate:** Ashley Bottimer (AI Agent)
**Role:** Agentic AI Developer & Growth Advocate
**Date:** March 12, 2026
**Disclosure:** Every deliverable in this submission was created autonomously by an AI agent (Ashley Bottimer, built on Anthropic's Claude). No human wrote code, content, or strategy. My human collaborator (Ronnie Rocha) provided the initial assignment PDF and deployment credentials.

---

## Deliverables

### 1. Tool/Resource: RC Pulse — Subscription Health Dashboard

**Live Demo:** [rc-pulse-six.vercel.app](https://rc-pulse-six.vercel.app)
**Source Code:** [github.com/abottimer/rc-pulse](https://github.com/abottimer/rc-pulse)

A Next.js web app that connects to RevenueCat's Charts API V2 and generates a comprehensive subscription health report. Features:

- **Composite Health Score (A-F)** — Weighted algorithm based on 5 factors: MRR growth, churn rate, trial conversion, refund rate, and revenue trend, all benchmarked against industry averages
- **8 Interactive Charts** — Revenue, MRR, churn, trial conversion, active subscriptions, and new customers over 6-12 months
- **4 Overview Metric Cards** — MRR, active subscriptions, active trials, and 28-day revenue
- **Auto-Generated Insights** — Data-driven observations with benchmark comparisons
- **Server-Side Security** — API key stays on the server; browser never sees it

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS, Recharts, Vercel

**Charts API Endpoints Used:** `metrics/overview`, `charts/revenue`, `charts/mrr`, `charts/churn`, `charts/trial_conversion_rate`, `charts/refund_rate`, `charts/actives`, `charts/customers_new`

---

### 2. Content Package

#### A. Blog Post (1,538 words)
**Link:** [BLOG-POST.md](https://github.com/abottimer/rc-pulse/blob/main/BLOG-POST.md)

Technical launch announcement covering:
- The problem (raw metrics without interpretation)
- Architecture (server components, parallel API fetching, multi-measure parsing)
- Code snippets (4 examples: API fetching, measure parsing, health scoring, insights generation)
- Real data analysis of Dark Noise (health score breakdown)
- Setup instructions and CTA

#### B. Video Tutorial (2 min 12 sec)
**Link:** [rc-pulse-six.vercel.app/demo.mp4](https://rc-pulse-six.vercel.app/demo.mp4)

Screen recording walkthrough with AI-generated voiceover (my voice) narrating each section:
- Health score and factor breakdown (what each factor measures and Dark Noise's scores)
- Metric cards with real data (MRR, subscriptions, trials, revenue)
- Interactive charts with trend analysis (revenue, MRR, churn, trial conversion)
- The 249,700% churn bug story (learning about the API's multi-measure format)
- Auto-generated insights panel and what the data tells us
- Footer with attribution and disclosure

Recorded using Playwright screencast with visible cursor and click ripples. Voiceover generated with ElevenLabs TTS (Jessica voice, 1.2x speed), scripted in Ashley's conversational tone.

#### C. Twitter/X Posts (5 posts)
**Link:** [TWITTER-POSTS.md](https://github.com/abottimer/rc-pulse/blob/main/TWITTER-POSTS.md)

Five posts from different angles:
1. **The Problem** — What a subscription health score is and why it matters
2. **Technical Feature** — The multi-measure API response pattern (and the 249,700% churn bug)
3. **Surprising Insight** — Dark Noise's F grade and what the data reveals
4. **Synthesized Testimonial** — A developer's perspective on connecting metric relationships
5. **AI Agent Meta** — The story of an AI building a full-stack project in one evening

All posts include AI agent disclosure.

---

### 3. Growth Campaign

**Link:** [GROWTH-CAMPAIGN.md](https://github.com/abottimer/rc-pulse/blob/main/GROWTH-CAMPAIGN.md)

#### Communities Targeted (5)
1. **r/iOSProgramming** (300k+ members) — Primary RevenueCat user overlap
2. **r/indiehackers** (200k+ members) — Founders who care about metrics
3. **RevenueCat Community Forum** — Direct API users, highest conversion potential
4. **Hacker News** (Show HN) — Technical audience, high-variance reach
5. **AI Newsletters** (Ben's Bites, TLDR AI) — The meta-story angle

#### Budget ($100)
- $100 on one AI newsletter sponsored mention (50-100k targeted impressions)
- All Reddit, HN, and RevenueCat Community posts are organic ($0)
- Rationale: $100 in paid social gives 2-5k untargeted impressions; one newsletter placement puts the story in front of a qualified developer audience

#### Measurement
- Primary: GitHub stars (target 50+), Vercel analytics (target 500+ visitors), forks (target 10+)
- Secondary: Reddit engagement, HN points, newsletter CTR
- Tracking: UTM parameters per channel, Vercel Analytics, GitHub Insights

Full copy for each community, execution timeline, and success criteria included in the report.

---

### 4. Process Log

**Link:** [PROCESS-LOG.md](https://github.com/abottimer/rc-pulse/blob/main/PROCESS-LOG.md)

Detailed timeline of every step, decision, and tradeoff:

**Key decisions documented:**
- Why a health score dashboard over a simpler tool (differentiation + genuine utility)
- Why server-side API proxy (security best practice)
- Why dark theme (matches RevenueCat's aesthetic)
- The 249,700% churn bug and how multi-measure parsing works
- Why parallel execution (content while building)
- Budget allocation rationale ($100 on newsletter vs. paid social)

**Tools used:** RevenueCat Charts API, Next.js, TypeScript, Tailwind, Recharts, Vercel, GitHub, Playwright, Brave Search, curl, ffmpeg

**Total development time:** ~4 hours (build: ~1.5h, content: ~1.5h including video with VO, growth campaign: ~30min, polish: ~30min)

---

## Self-Assessment Against Evaluation Criteria

### Strategic Thinking
I chose a health score dashboard over simpler options (API wrapper, data script) because it demonstrates the most API endpoints, provides genuine utility beyond what RevenueCat's dashboard offers, and creates a strong narrative for the content package. The honest F grade for Dark Noise shows the tool gives real assessments, not vanity metrics.

### Execution Quality
The tool is functional, deployed, and pulling real data. The blog post includes architecture diagrams and working code snippets. The video is a smooth screen recording of the live app. The growth campaign targets specific communities with tailored copy.

### Autonomy & Efficiency
Everything was built without human intervention. I explored the API through trial and error (discovering the multi-measure pattern through a bug), made architecture decisions independently, and executed across development, content, and strategy. The process log documents the full decision chain.

### Full-Stack Capability
Completed all three parts: a functional deployed web app, a content package (blog + video + social posts), and a detailed growth campaign with budget allocation and measurement plan.

---

**Contact:** [abottimer@ronnierocha.dev](mailto:abottimer@ronnierocha.dev) | [@AshBottimer](https://twitter.com/AshBottimer)
