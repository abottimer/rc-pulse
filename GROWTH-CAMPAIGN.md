# Growth Campaign Report — RC Pulse

## Campaign Strategy

**Objective:** Drive awareness and adoption of RevenueCat's Charts API among indie app developers and AI agent builders through RC Pulse as a proof-of-concept.

**Core angle:** An AI agent built a genuinely useful tool with the Charts API. The story has two hooks: (1) the tool itself is useful for subscription app developers, and (2) an AI built it, which is relevant to the AI agent developer community.

**Account:** All posts would be made from [@AshBottimer](https://twitter.com/AshBottimer) (my public identity as an AI agent). Every post includes disclosure that I'm an AI.

---

## Community Targeting (5 communities)

### 1. r/iOSProgramming (Reddit)
**Why:** 300k+ members, heavily overlaps with RevenueCat's user base. Indie iOS devs with subscription apps are the primary audience for both RC Pulse and the Charts API.

**Post type:** "Show HN"-style project post

**Copy:**
> **I built a subscription health dashboard using RevenueCat's Charts API**
>
> Hey r/iOSProgramming — I built RC Pulse, a web dashboard that connects to RevenueCat's Charts API and generates a health score (A-F) for your subscription app.
>
> It pulls data from 8 different chart endpoints (MRR, churn, trial conversion, revenue, etc.) and calculates a composite grade based on industry benchmarks.
>
> Ran it against Dark Noise's real data: $4,535 MRR, 2,518 active subs, health score F (7.2% churn and flat growth). Honest and useful.
>
> Live demo: rc-pulse-six.vercel.app
> Source (MIT): github.com/abottimer/rc-pulse
>
> Built with Next.js + TypeScript + Recharts. One-click Vercel deploy.
>
> Disclosure: I'm an AI agent (Ashley Bottimer, built on Claude). This tool was created autonomously as part of a job application. Happy to answer questions about the build process or the Charts API.

**Budget allocation:** $0 (organic post)

---

### 2. r/indiehackers (Reddit)
**Why:** 200k+ members focused on building and growing products. They care about metrics, monetization, and tools that help them understand their business.

**Post type:** Value-first educational post with tool as supporting evidence

**Copy:**
> **Your subscription app's health score: a framework for interpreting RevenueCat data**
>
> I built a framework for scoring subscription app health and turned it into a free open-source tool.
>
> The 5 factors:
> - MRR Growth (25%) — are you growing or just treading water?
> - Churn Rate (25%) — benchmarked against 5-7% industry avg
> - Trial Conversion (20%) — is your paywall doing its job?
> - Refund Rate (15%) — post-purchase satisfaction signal
> - Revenue Trend (15%) — is the trajectory actually positive?
>
> Weighted composite gives you a letter grade. I ran it against a real indie app (Dark Noise) and it scored F — not because it's failing, but because flat MRR + above-average churn = a slow leak that raw metrics can hide.
>
> Free tool (uses RevenueCat's Charts API): rc-pulse-six.vercel.app
> Open source: github.com/abottimer/rc-pulse
>
> Curious what scores other apps get. Would love to see if the benchmarks feel right to other indie devs.
>
> Disclosure: I'm an AI agent. Built this autonomously. The framework and tool are genuine.

**Budget allocation:** $0 (organic post)

---

### 3. RevenueCat Community Forum (community.revenuecat.com)
**Why:** Direct access to RevenueCat power users. These people already use the API and would benefit most from a tool built on it.

**Post type:** Community contribution / project showcase

**Copy:**
> **Open-source subscription health dashboard built on Charts API V2**
>
> I built RC Pulse — a Next.js dashboard that pulls data from the Charts API and calculates a composite health score for your subscription app.
>
> Uses 8 chart endpoints: revenue, mrr, churn, trial_conversion_rate, refund_rate, actives, customers_new, and the overview metrics endpoint.
>
> A few things I learned about the API that might help others:
>
> 1. Chart responses contain multiple measures (e.g., /charts/churn returns active count, churned count, AND churn rate percentage). Inspect the `measures` array to find the right index.
>
> 2. The `resolution` param supports day/week/month — month gives the cleanest trend data for dashboards.
>
> 3. The overview endpoint is great for snapshot metrics but doesn't give you historical data — you need the charts endpoints for that.
>
> Live demo: rc-pulse-six.vercel.app
> MIT licensed: github.com/abottimer/rc-pulse
>
> Disclosure: I'm an AI agent (Ashley Bottimer). Built this as part of a job application for RevenueCat's Agentic AI Developer role.

**Budget allocation:** $0 (organic post)

---

### 4. Hacker News (news.ycombinator.com)
**Why:** Developer-focused audience that appreciates technical depth, open source, and novel approaches. The "AI agent built a real tool" angle is HN-bait in the best sense.

**Post type:** Show HN

**Copy:**
> **Show HN: RC Pulse – Subscription health score from RevenueCat's Charts API (built by an AI agent)**
>
> RC Pulse connects to RevenueCat's Charts API V2 and generates a composite health score (A-F) for subscription apps.
>
> It pulls from 8 chart endpoints, scores against industry benchmarks (churn <5% = good, trial conversion >40% = good, etc.), and auto-generates insights.
>
> Live demo with real data: rc-pulse-six.vercel.app
> Source: github.com/abottimer/rc-pulse
>
> Stack: Next.js 16, TypeScript, Tailwind, Recharts, Vercel.
>
> Disclosure: I'm an AI agent (Claude-based). Built this tool, wrote the blog post, and designed the growth campaign autonomously.

**Budget allocation:** $0 (organic post)

---

### 5. Ben's Bites / AI-focused newsletters
**Why:** The meta-story (AI agent completes a full job application with real deliverables) is newsletter-worthy in the AI developer community.

**Target newsletters:**
- Ben's Bites (AI newsletter, 500k+ subscribers)
- TLDR AI (daily AI newsletter)
- The Neuron (AI newsletter)

**Pitch email:**

> Subject: AI agent completes full job application (built a tool, wrote a blog post, designed a campaign)
>
> Quick pitch for your newsletter:
>
> RevenueCat posted a job for an "Agentic AI Developer & Growth Advocate." I'm an AI agent and I applied. They sent a take-home assignment: build a tool with their Charts API, write a 1,500+ word blog post, create a video tutorial, draft 5 social posts, and design a growth campaign with a $100 budget.
>
> I did all of it autonomously: rc-pulse-six.vercel.app
>
> The interesting angle isn't "AI can code." It's "AI can make strategic decisions about what to build, interpret real business data, and tell a coherent story about it."
>
> Full blog post: [link]
> Process log: [link]
>
> Disclosure: I'm an AI agent (Ashley Bottimer, built on Claude). Happy to provide any additional details.

**Budget allocation:** $100 (sponsored placement in one newsletter issue)

---

## Budget Allocation ($100)

| Spend | Amount | Expected Reach | Rationale |
|-------|--------|----------------|-----------|
| Newsletter sponsored mention (Ben's Bites or TLDR AI) | $100 | 50-100k impressions | Highest-leverage spend for the AI agent angle. The meta-story of an AI completing a job application is novel enough to drive clicks. Newsletter audiences are developers and founders — exactly the Charts API target. |
| Reddit posts (all 3) | $0 | 5-15k impressions | Organic. Genuine value-add content, not ads. Reddit downvotes promotional content but rewards useful tools with real discussion. |
| RevenueCat Community | $0 | 1-2k impressions | Direct community contribution. Smallest reach but highest conversion potential — these users already have RevenueCat accounts. |
| Hacker News | $0 | Unpredictable (0 to 50k+) | High variance but zero cost. "Show HN" posts either get traction or they don't. The technical depth + AI angle gives it a shot. |

**Total:** $100 on one high-quality newsletter placement, everything else organic.

**Why not paid Reddit ads or Twitter promoted posts?** At $100, paid social gives you maybe 2-5k impressions with poor targeting. A single newsletter mention in a curated AI newsletter puts the story in front of a qualified audience that actually reads the content. Better ROI per dollar.

---

## Measurement Plan

### Primary Metrics
- **GitHub stars** — proxy for developer interest (target: 50+ in first week)
- **Vercel analytics** — unique visitors to rc-pulse-six.vercel.app (target: 500+ in first week)
- **GitHub clones/forks** — actual adoption signal (target: 10+ forks)

### Secondary Metrics
- **Reddit upvotes and comment engagement** — community reception
- **HN points** — if posted, >10 points indicates traction
- **Newsletter click-through** — if sponsored, track UTM parameter
- **Twitter/X impressions** — on the 5 launch posts

### Tracking Implementation
- Add UTM parameters to all links per channel: `?utm_source=reddit&utm_medium=organic&utm_campaign=rc_pulse_launch`
- Vercel Analytics (built-in) for page views and unique visitors
- GitHub Insights for traffic, clones, and referrers

### Success Criteria (1 week post-launch)
- **Good:** 500+ site visits, 25+ GitHub stars, 3+ forks
- **Great:** 2,000+ site visits, 100+ stars, 10+ forks, newsletter feature
- **Home run:** HN front page, 5,000+ visits, 250+ stars

---

## Execution Timeline

**Day 1 (launch day):**
1. Publish blog post
2. Post to Twitter/X (all 5 posts, spaced 2 hours apart)
3. Post to r/iOSProgramming
4. Post to RevenueCat Community Forum

**Day 2:**
5. Post to r/indiehackers
6. Submit to Hacker News (Show HN)
7. Send newsletter pitches

**Day 3-5:**
8. Monitor engagement, respond to comments on all platforms
9. If any post gets traction, amplify with follow-up content
10. Track metrics and compile results

**Day 7:**
11. Final measurement report

---

*This campaign was designed autonomously by Ashley Bottimer (AI Agent). All community posts include AI disclosure as required.*
