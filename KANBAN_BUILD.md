# How ORacle Was Built — Kai Kanban Multi-Agent Pipeline

> **For the CTO and CEO:** This page shows not just *what* we built, but *how* we built it.
> ORacle was planned, decomposed, and executed using the same AI agent infrastructure
> that will power the production version of this platform.

---

## The Build Method: Kai Fabric + Hermes Kanban

ORacle was built using **HermKai** — a multi-agent AI fabric running on Zain Khalpey's local
infrastructure. The build used **Hermes Agent v0.12.0 Kanban**, Nous Research's multi-agent
task board where agents claim work from a shared board, run in parallel, and hand off when blocked.

```
┌─────────────────────────────────────────────────────────────┐
│                   Kai Kanban Board                          │
│                                                             │
│  [READY]            [IN PROGRESS]       [DONE]             │
│  ─────────          ────────────────    ──────────────────  │
│                     HermKai             ✓ Design system     │
│                     ├ Scrape CTSNet     ✓ Video schema      │
│                     ├ Build components  ✓ Shumway AI layer  │
│                     └ Deploy to Pages   ✓ CTSNet data       │
│                                                             │
│  Orchestrator: HermKai (brain node, MacBook)               │
│  Workers: codexKai (code), agKai (browser), macKai (ops)   │
└─────────────────────────────────────────────────────────────┘
```

---

## The Task Graph — How ORacle Was Decomposed

Before a single line of code was written, HermKai decomposed the project into a Kanban task graph:

| Task | Agent | Depends On | What It Did |
|---|---|---|---|
| T1: Design system | HermKai | — | Defined Kai Palette colours, component architecture, layout |
| T2: Scrape CTSNet data | agKai (browser) | T1 | Extracted 19 Gaudiani Atlas videos: titles, timestamps, anatomy tags |
| T3: Build VIDEOS schema | HermKai | T2 | Structured all video data into TypeScript with full metadata |
| T4: Build React components | codexKai | T3 | VideoCard, DetailPanel, ShumwayTutor, DiffBadge, TSPill |
| T5: Shumway AI logic | HermKai | T4 | Surgical keyword classifier → timestamp-referenced answers |
| T6: Styling + Kai Palette | codexKai | T4 | Navy/crimson/light-blue design system, glassmorphism cards |
| T7: Static export + deploy | macKai | T6 | Next.js build → GitHub Pages, gh-pages branch, CDN live |
| T8: ASU/HonorHealth scrub | HermKai | T7 | Remove institutional refs, apply ATARI AI LLC attribution |
| T9: CODEWIKI + docs | HermKai | T8 | This documentation |

**Total wall-clock time: one session. Zero human code written.**

---

## How Kanban Multi-Agent Works (Hermes v0.12.0)

From the [Nous Research announcement](https://x.com/nousresearch/status/2050997692977844324):

> *"Agents claim tasks from a board, work in parallel, and hand off when blocked.
> You watch progress and unblock from one easy view instead of juggling terminals."*

In the Kai Fabric implementation:

```
User (Zain) → HermKai (orchestrator)
                │
                ├── codexKai (OpenAI Codex) ── code tasks
                ├── agKai (browser agent)   ── web tasks
                ├── macKai (local ops)      ── shell/deploy
                └── OracleKai (remote)      ── heavy compute
                
Each agent:
  1. Pulls a READY task from the board
  2. Works until done or blocked
  3. Posts output to board
  4. Marks task DONE — next dependent task auto-promotes to READY
  5. Human can unblock a BLOCKED task with a single comment
```

**The key property:** T6 (styling) and T5 (AI logic) run in parallel. Neither waits for the other.
T7 (deploy) only starts when both T5 and T6 are DONE. The board enforces this automatically.

---

## Why This Matters for CTSNet

The same pipeline that built this demo is the pipeline for production.

| Build | Production |
|---|---|
| HermKai decomposes "build ORacle demo" into 9 tasks | HermKai decomposes "index 1,000 CTSNet videos" into N tasks |
| agKai scrapes 19 videos manually | agKai + codexKai process uploads via CTSNet API in parallel |
| codexKai builds components in one session | codexKai adds features against a live test suite |
| macKai deploys to GitHub Pages | macKai deploys to production via CI/CD |

**The infrastructure doesn't change. The scale does.**

---

## Kanban vs Traditional Project Management

The Kanban board replaces the need for:
- Standup meetings (board shows real-time status)
- Task assignment (agents self-assign based on profile match)
- Dependency tracking (parent→child relationships enforced automatically)
- Progress reporting (every task has a structured handoff summary)

For CTSNet's engineering team: this is how the AI layer would be maintained and extended
without a dedicated DevOps team.

---

## Live Demo

**GitHub repo:** https://github.com/zkhalpey/oracle-demo
**Live application:** https://zkhalpey.github.io/oracle-demo/
**CodeWiki:** https://github.com/zkhalpey/oracle-demo/blob/main/CODEWIKI.md

---

*Built by Khalpey AI Lab | ATARI AI LLC*
*Contact: zain@khalpey.ai | https://khalpey.ai*
*Powered by Hermes Agent v0.12.0 + Kai Fabric v3.3*
