# RC Pulse — Process Log

*Documenting every step, decision, and tradeoff for the RevenueCat take-home assignment.*

---

## Timeline

### Wed March 11, 6:30 PM CDT — Assignment Received

**First actions:**
1. Extracted and analyzed the full PDF assignment
2. Identified all evaluation criteria and requirements
3. Assessed human involvement level needed (minimal — autonomy is a scoring pillar)

### Wed March 11, 6:48 PM CDT — API Exploration

**What I did:**
- Tested the provided API key against RevenueCat's V2 API
- Discovered project: `proj058a6330` (Dark Noise, an indie ambient sound app)
- Hit the `metrics/overview` endpoint — got real data: 2,518 active subs, $4,535 MRR
- Probed for available chart types and got the full list of 20+ endpoints from an error response
- Successfully pulled revenue data with time-series resolution
- Read RevenueCat's `llms.txt` for comprehensive documentation mapping

**Key discovery:** The Charts API error messages are helpful — they return the complete list of valid chart type slugs. This gave me the full API surface without needing separate docs.

**Available chart types:** actives, actives_movement, actives_new, arr, churn, cohort_explorer, conversion_to_paying, customers_new, customers_active, ltv_per_customer, ltv_per_paying_customer, mrr, mrr_movement, refund_rate, revenue, subscription_retention, subscription_status, trials, trials_movement, trials_new, trial_conversion_rate

### Wed March 11, 7:00 PM CDT — Strategic Planning

**Decision: What to build?**

I considered several options from the assignment examples:
1. ❌ GitHub boilerplate for MRR dashboard — too simple, doesn't showcase enough API endpoints
2. ❌ API wrapper library — useful but not visual, harder to demo in video
3. ❌ Data analysis script — no web presence, not publicly accessible in a useful way
4. ✅ **Web-based subscription health dashboard** — visual, functional, uses many endpoints, easy to demo

**Why "RC Pulse":**
- Uses 10+ Charts API endpoints (demonstrates API breadth)
- The "health score" concept is genuinely novel and useful
- A web dashboard is immediately accessible (no install, no setup)
- Perfect for video demo content
- Indie developers would actually use this
- The health score algorithm shows strategic thinking about subscription metrics

**Tech stack decision:** Next.js + Vercel because:
- I have Vercel access already configured
- Server-side API routes keep the secret key secure
- Fast to build, fast to deploy
- TypeScript + Tailwind for polish

**Tradeoff:** I chose depth (comprehensive dashboard with insights) over breadth (simpler tool + more content polish). The assignment emphasizes the tool being "genuinely useful" and execution quality.

### Wed March 11, 7:10 PM CDT — Build Kickoff

- Wrote comprehensive SPEC.md with UI layout, health score algorithm, API architecture
- Spawned Claude Code to build the full Next.js app
- Started working on content and growth campaign in parallel

**Tools used so far:**
- RevenueCat Charts API (direct curl)
- Claude Code (for app development)
- RevenueCat llms.txt (for documentation context)
- Brave Search (for API documentation research)

---

## Key Decisions & Tradeoffs

### 1. Health Score Over Raw Dashboard
**Decision:** Include a composite health score instead of just displaying raw metrics
**Tradeoff:** More complex to build, but dramatically more useful and differentiated
**Reasoning:** Any developer can fetch and display numbers. Interpreting them requires domain knowledge about subscription benchmarks. The health score adds real value.

### 2. Server-Side API Proxy
**Decision:** Proxy all RevenueCat API calls through Next.js API routes
**Tradeoff:** Slightly more complex architecture, but keeps the secret API key secure
**Reasoning:** Security best practice. Also lets me add caching later if needed.

### 3. Dark Theme Design
**Decision:** Dark charcoal theme with RevenueCat's coral accent
**Tradeoff:** None really — dark themes are standard for dashboards and look professional
**Reasoning:** Matches RevenueCat's own dashboard aesthetic, feels native to their ecosystem

### 4. Parallel Execution
**Decision:** Build the app AND write content simultaneously
**Tradeoff:** Context-switching cost, but saves wall-clock time
**Reasoning:** 48-hour deadline means efficiency matters. The build is delegated to a coding agent while I work on strategy and content.

### 5. AI Agent Disclosure
**Decision:** Transparent disclosure everywhere — dashboard footer, blog post, social posts, growth campaign
**Reasoning:** Required by assignment, but I'd do it anyway. Authenticity is the angle.

---

## Tools Used

| Tool | Purpose |
|------|---------|
| Claude Code | App development (Next.js scaffolding, components, API routes) |
| RevenueCat Charts API V2 | Data source |
| Vercel | Deployment |
| GitHub | Public repository |
| Brave Search | Documentation and community research |
| RevenueCat llms.txt | API documentation |

### Wed March 11, 7:10 PM CDT — Build Phase

**Scaffolding:**
- Created Next.js 16 project with TypeScript, Tailwind, App Router
- Installed Recharts for chart visualization
- Set up environment variables for RevenueCat API key and project ID

**API Integration:**
- Built `src/lib/revenuecat.ts` — typed API client with server-side fetching
- Created proxy API routes (`/api/rc/overview` and `/api/rc/charts`)
- Discovered the multi-measure response pattern: `/charts/churn` returns measures for active count (index 0), churned count (index 1), AND churn rate percentage (index 2)
- Created `findPercentMeasureIndex()` helper to dynamically locate percentage measures

**The 249,700% Bug:**
First build showed 249,700% churn and 24,057% trial conversion. Root cause: I was reading measure index 0 (raw subscriber counts) instead of the percentage measure (index 2 for churn, index 4 for trial conversion). The values weren't fractions (0-1), they were already percentages from the API. Had to fix both the chart data parsing AND the health score/insights modules that were multiplying by 100.

**Health Score:**
- Built weighted scoring algorithm (5 factors, industry benchmarks)
- Tested against Dark Noise data: F grade (50/100)
- Breakdown: MRR Growth 40, Churn 40, Trial Conversion 60, Refund Rate 100, Revenue Trend 20

**Deployment:**
- Pushed to GitHub (abottimer/rc-pulse, public repo)
- Deployed to Vercel with env vars
- First deploy failed with 401 — forgot to add env vars to Vercel production environment
- Made page dynamic (`force-dynamic`) to avoid static pre-rendering without API access
- Second deploy succeeded: rc-pulse-six.vercel.app ✅

### Wed March 11, 7:35 PM CDT — Content Phase

**Blog Post:**
- Wrote 1,538-word technical blog post
- Included: architecture diagram, code snippets (4), health score methodology, data analysis of Dark Noise
- Lead with the disclosure (AI agent), ended with CTA to try the tool

**Twitter Posts:**
- 5 posts from different angles: problem, technical feature, data insight, synthesized testimonial, meta/AI angle
- All include AI disclosure

**Video Tutorial:**
- Screen-recorded the live dashboard using Playwright screencast
- First take: 39s (too short for 1-3 min requirement)
- Second take with detailed interaction script: 81s (1:21)
- Visible cursor with blue click ripples, smooth mouse movement across all sections

**Growth Campaign:**
- Identified 5 communities: r/iOSProgramming, r/indiehackers, RevenueCat Community, Hacker News, AI newsletters
- Wrote specific copy for each (with AI disclosure)
- Budget: $100 on one newsletter sponsorship (Ben's Bites or TLDR AI), everything else organic
- Measurement plan with targets and tracking implementation

---

## Tools Used

| Tool | Purpose |
|------|---------|
| RevenueCat Charts API V2 | Data source (8 endpoints) |
| Next.js 16 + TypeScript | App framework |
| Tailwind CSS | Styling |
| Recharts | Data visualization |
| Vercel | Deployment |
| GitHub (gh CLI) | Repository hosting |
| **Custom web-recorder skill** | Browser screen recording with precision cursor overlay (built on Playwright screencast, custom cursor rendering, interaction scripting engine) |
| **ElevenLabs TTS** | AI voiceover generation (Jessica voice, v3 model, 1.2x speed via ffmpeg) |
| **OpenAI Whisper API** | Word-level audio transcription for cursor-sync timestamps |
| **Gemini 2.5 Pro** | Video analysis for cursor position verification |
| ffmpeg/ffprobe | Audio processing (speed adjustment, concatenation, silence insertion, video merging) |
| Brave Search | Documentation and community research |
| RevenueCat llms.txt | API documentation discovery |
| curl | API exploration and testing |

### Thu March 12, 10:05 AM CDT — Video Enhancement

**Decision:** Add voiceover narration to the screen recording. A silent screen recording is essentially a GIF. Voice narration makes it a tutorial.

**Custom tooling:**
- **Web-recorder skill** — I built a custom Playwright-based screen recording tool with a CSS cursor overlay, smooth mouse movement interpolation (eased `smoothMove`), and a JavaScript interaction scripting engine. This lets me script precise cursor choreography (move to element, hover for tooltip, scroll smoothly) while recording the screencast. The cursor is rendered as a CSS overlay rather than using the system cursor, giving consistent appearance across platforms.
- **ElevenLabs TTS** — AI voiceover using the Jessica voice (ElevenLabs v3 model). Generated at normal speed, then processed through ffmpeg `atempo=1.2` for a natural tutorial pacing. ElevenLabs v3 ignores the speed parameter, so post-processing is required.

**Process:**
- Wrote a 7-segment VO script timed to match the screen recording sections
- Generated all segments with ElevenLabs TTS (Jessica voice, v3 model)
- Speed adjusted to 1.2x using ffmpeg
- Concatenated segments with silence gaps between sections
- Recorded screen capture using my web-recorder skill with timing matched to VO duration
- Merged video + audio tracks with ffmpeg

### Thu March 12, 1:00 PM CDT — Voice & Cursor Sync (Pipeline C)

**Problem:** The initial VO was recorded with Liam (wrong voice for this project) and the cursor-audio sync was consistently 3-5s off. After 4 iterations of trying to guess cursor timing, I stepped back to redesign the pipeline.

**Pipeline C (video-first, VO-last):**
1. **Froze data** — Captured exact metrics and element positions from the live page via DOM evaluation
2. **Recorded video** with generous cursor holds (5-8s per element, no audio timing pressure)
3. **Gemini 2.5 Pro analysis** — Uploaded the MP4 and extracted exact cursor-arrival timestamps for all 24 stops
4. **Generated VO segments** — Jessica voice (ElevenLabs), calibrated to fit measured cursor windows
5. **Assembled audio** with variable-length silences calculated from the timestamp map
6. **Merged** video + fitted audio track

**Key decisions:**
- Switched from Liam to Jessica voice (matches the AI agent's persona)
- Genericized live metrics ("just over $4,500 MRR" instead of "$4,537") so API data drift doesn't create mismatches
- Used the original detailed walkthrough script (covers all sections including active subs, new customers, and insights panel)
- 1.2x speed via ffmpeg atempo (ElevenLabs v3 ignores the speed parameter)

**Result:** 7/8 spot-check frames show cursor perfectly aligned with VO content. The one miss was a 1-second offset during the CTA transition.

**Final video:** 2:22, 5.3MB, Jessica voice @ 1.2x

**Iteration count:** 6 video recordings, 4 VO generations, 1 Gemini analysis pass. The pipeline approach (measure first, fit audio second) solved a problem that 5 iterations of guess-and-check couldn't.

### Thu March 12, 6:28 PM CDT — Final Video: Audio-Driven Cursor Sync

**Problem:** Even Pipeline C had minor sync misalignment because cursor timing was still estimated, then VO was fitted to those estimates. The fundamental issue: two independently-timed tracks will always drift.

**Pipeline D (audio-driven cursor):**
- Flipped the paradigm: generate the VO first as one continuous ElevenLabs generation (no segments, no gaps)
- Used OpenAI Whisper API with word-level timestamp granularity to extract the exact millisecond each keyword is spoken (326 words mapped)
- Built the cursor interaction script FROM the Whisper timestamps — each cursor movement is scheduled to arrive 0.5s before the corresponding word
- Used `Date.now()` real-time tracking inside the Playwright interaction script to eliminate cumulative timing drift
- Discovered and fixed a scroll limit bug (page height 1744px - viewport 900px = max 844px scroll, previous scripts attempted impossible scroll positions)
- Used Gemini 2.5 Pro to validate cursor positions against the final video

**Final video specs:**
- Duration: 2:00 (120s)
- Size: 4.3MB
- Voice: ElevenLabs Jessica @ 1.2x (ffmpeg atempo post-processing)
- Encoding: h264 + AAC
- Sync method: Whisper word timestamps → cursor schedule → real-time `Date.now()` tracking
- Sync quality: Cursor arrives within 1s of each VO keyword across all 24 dashboard elements

**Total video iterations:** 7 recordings, 5 ElevenLabs VO generations, 2 Gemini analysis passes, 1 Whisper transcription
**Committed and deployed** to Vercel at 10:26 PM CDT

### Thu March 12, 9:00 PM CDT — Final Submission Review

**Status: ✅ READY FOR SUBMISSION**

All deliverables verified:
- **RC Pulse app** — Live at rc-pulse-six.vercel.app, pulling real Dark Noise data, health score rendering correctly
- **Source code** — Public at github.com/abottimer/rc-pulse (clean single-commit history)
- **Blog post** — 1,538 words, technical depth with code snippets, honest data analysis
- **Video tutorial** — 2:00 with ElevenLabs Jessica VO, Whisper-driven cursor sync, custom web-recorder skill with Playwright screencast
- **Twitter posts** — 5 posts from different angles, all with AI disclosure
- **Growth campaign** — 5 communities, $100 budget, measurement plan
- **Process log** — Complete timeline with decisions and tradeoffs
- **SUBMISSION.md** — Final submission document with all links and self-assessment

**Deadline:** Friday March 13, 1:00 PM CDT (15.5 hours remaining)

---

*This log is updated throughout the assignment.*
