# ORacle — CodeWiki

> **Audience:** CTSNet Executive Team (CEO, CTO), Surgical Faculty
> **Built by:** Khalpey AI Lab · ATARI AI LLC
> **Live demo:** https://zkhalpey.github.io/oracle-demo/

---

## What Is This?

ORacle is an AI-powered surgical video intelligence platform built as a proof-of-concept for a CTSNet partnership.

**The one-line pitch:** Type a surgical question in plain English. ORacle searches 19+ expert CTSNet videos by anatomy, technique, or timestamp — and a Norman Shumway AI tutor answers with a direct quote and the exact video timestamp to jump to.

This demo was built in a single session to show what a full CTSNet AI layer could look like at scale.

---

## Architecture at a Glance

```
┌─────────────────────────────────────────────────────────┐
│                     ORacle Demo                          │
│                                                          │
│  ┌──────────────┐    ┌──────────────┐   ┌─────────────┐ │
│  │ Video Atlas  │    │ Shumway AI   │   │ Timestamp   │ │
│  │  (19 videos) │    │   Tutor      │   │  Navigator  │ │
│  │  searchable  │ ←→ │ (rule-based  │ ←→│  (click to  │ │
│  │  by anatomy/ │    │  + keyword   │   │   jump in   │ │
│  │  technique   │    │  matching)   │   │   video)    │ │
│  └──────────────┘    └──────────────┘   └─────────────┘ │
│                                                          │
│  Tech: Next.js 15 · React 19 · TypeScript · GitHub Pages │
└─────────────────────────────────────────────────────────┘
```

---

## How It Was Built

### Stack
| Layer | Technology | Why |
|---|---|---|
| Framework | Next.js 15 (App Router) | Static export → GitHub Pages, zero server cost |
| UI | React 19 + inline CSS | No Tailwind dependency, full control of Kai Palette |
| Language | TypeScript | Type safety on surgical data schema |
| AI Layer | Rule-based keyword matching | Deterministic, no API key, works offline |
| Hosting | GitHub Pages (gh-pages branch) | Free, CDN-backed, instant deploy |
| Data | Hardcoded VIDEOS array | 19 real CTSNet Gaudiani Atlas procedures |

### Key Design Decisions

**Why no LLM API call?**
The demo must work without internet connectivity during a pitch and without any API key management. The "Shumway AI" layer uses surgical keyword matching against a curated response library — effectively a domain-specific knowledge base. For production, this plugs straight into an LLM (GPT-4o or Gemini) with the same interface.

**Why GitHub Pages?**
Zero infrastructure. No server to maintain. The CTO can clone the repo and run it in 60 seconds. It also demonstrates that the AI layer is entirely client-side — no patient data leaves the browser.

**Why one file?**
The entire application is 640 lines of TypeScript in `src/app/page.tsx`. Intentional. One file = readable in one review session. For production, each component (VideoCard, DetailPanel, ShumwayTutor) becomes its own module.

---

## Component Map

```
page.tsx (640 lines)
│
├── Constants
│   ├── C {}               — Kai Palette colour tokens (navy/blue/crimson)
│   └── VIDEOS []          — 19 CTSNet Gaudiani Atlas videos with full metadata
│
├── Pure Components (stateless)
│   ├── DiffBadge          — Coloured difficulty label (Introductory→Expert)
│   ├── TSPill             — Timestamp pill (click-to-seek)
│   ├── TagList            — Anatomy/technique tags with crimson highlight
│   └── Thumb              — Video thumbnail with duration overlay
│
├── Complex Components (stateful)
│   ├── VideoCard          — Clickable card in the atlas grid
│   ├── DetailPanel        — Expanded video view with timestamps + anatomy
│   ├── ShumwayTutor       — AI Q&A panel with typewriter response effect
│   └── Home               — Root component, all state lives here
│
└── State (all in Home)
    ├── query              — Search input text
    ├── filtered           — Computed filtered video list
    ├── selected           — Currently expanded video
    ├── shumwayAnswer      — Current AI tutor response
    ├── typing             — Typewriter animation in progress
    └── view               — "atlas" | "tutor" tab toggle
```

---

## The AI Tutor — How Shumway Works

The `getShumwayAnswer(query)` function is a surgical domain classifier:

```typescript
function getShumwayAnswer(query: string): ShumwayResponse {
  const q = query.toLowerCase();
  
  if (q.includes("p2") || q.includes("neochord") || q.includes("prolapse"))
    return { text: "...", timestamps: [{vid: 2, t: "8:14", label: "Neochord placement"}] };
    
  if (q.includes("saline") || q.includes("coaptation"))
    return { text: "...", timestamps: [{vid: 1, t: "14:00"}, {vid: 2, t: "22:10"}] };
    
  // ... 6 more domain branches
}
```

**Each branch returns:**
- A Shumway-voiced answer (Yacoub-meets-Churchill register, first-person surgical authority)
- Specific timestamp references → clicking jumps to that moment in the atlas

**Production upgrade path:** Replace `getShumwayAnswer()` with a single fetch to GPT-4o or Gemini with the full VIDEOS array as context. The rest of the app doesn't change.

---

## Data Schema

Each video in the `VIDEOS` array follows this schema:

```typescript
type Video = {
  id: number;
  title: string;
  author: string;
  date: string;
  duration: string;
  difficulty: "Introductory" | "Intermediate" | "Advanced" | "Expert";
  tags: string[];          // for search
  anatomy: string[];       // highlighted in crimson
  techniques: string[];    // for search
  timestamps: {
    t: string;             // "8:14"
    label: string;         // "Neochord placement begins"
  }[];
  description: string;     // surgeon-level summary
  shumway: string;         // curated teaching quote
  url: string;             // live CTSNet link
};
```

---

## What Phase 2 Looks Like

This demo is Layer 1. The roadmap:

| Phase | What It Adds | Value |
|---|---|---|
| **Phase 1 (now)** | Static atlas + AI search + Shumway tutor | Partnership proof-of-concept |
| **Phase 2** | CTSNet video upload → auto-transcription + chapter detection | AI indexes every new video on upload |
| **Phase 3** | Live LLM (GPT-4o) replacing rule-based tutor | Full conversational surgical education |
| **Phase 4** | Surgeon login → personalised learning path + CME tracking | Platform product |
| **Phase 5** | Intraoperative mode → real-time guidance from operative video | ORacle in the OR |

---

## Run It Yourself

```bash
git clone https://github.com/zkhalpey/oracle-demo
cd oracle-demo
npm install
npm run dev
# → http://localhost:3000
```

**Deploy update:**
```bash
npm run build
# Push src changes to main → auto-deploys via gh-pages branch
```

---

## Questions for the Room

- What is CTSNet's current video upload volume per month?
- Is there an existing taxonomy of surgical procedures we should map to?
- What does CME credit integration look like technically?
- Who owns the AI model outputs if trained on CTSNet content?

---

*Built by Khalpey AI Lab | ATARI AI LLC*
*Contact: zain@khalpey.ai | https://khalpey.ai*
