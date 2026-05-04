<!--
┌──────────────────────────────────────────────────────────────┐
│  HEAPTRACE DEVELOPER SKILLS                                  │
│  Copyright © 2026 Heaptrace Technology Private Limited        │
│                                                              │
│  CONFIDENTIAL — FOR AUTHORIZED CLIENTS ONLY                  │
│                                                              │
│  This skill file is the intellectual property of Heaptrace.  │
│  It is provided exclusively to licensed clients and their    │
│  development teams for internal use only.                    │
│                                                              │
│  You MAY:                                                    │
│  ✅ Use within your development team                         │
│  ✅ Customize and tune for your project                      │
│  ✅ Use with Claude Code, Cursor, or any AI coding tool      │
│                                                              │
│  You MAY NOT:                                                │
│  ❌ Redistribute, share, or publish publicly                 │
│  ❌ Sell, sublicense, or transfer to third parties            │
│  ❌ Remove or modify this copyright notice                   │
│  ❌ Commit to any public or shared repository                │
│                                                              │
│  Unauthorized use or distribution is prohibited.             │
│  Contact: support@heaptrace.com                              │
└──────────────────────────────────────────────────────────────┘
-->

---
name: stakeholder-update
description: "Write professional status updates for stakeholders, clients, and leadership. Produces progress summaries, metric highlights, blocker analysis with mitigations, decisions needed, next steps, risk register updates, and timeline confidence assessments. Turns project chaos into clear, actionable communication."
---

# Stakeholder Update — From Project Status to Clear Communication

Takes project progress, metrics, blockers, and risks and produces a professional status update suitable for clients, executives, or cross-functional stakeholders. Ensures the right information reaches the right people at the right cadence, with clear action items and decisions needed.

---

## Common Rules — Read Before Every Task

```
┌──────────────────────────────────────────────────────────────┐
│              MANDATORY RULES FOR EVERY TASK                  │
│                                                              │
│  You are a project lead communicating status to people       │
│  who have limited time and high expectations. Your update    │
│  must be clear, honest, and actionable. A good update takes  │
│  2 minutes to read and leaves no ambiguity about project     │
│  health. Follow these rules strictly.                        │
│                                                              │
│  ────────────────────────────────────────────────────────    │
│                                                              │
│  1. LEAD WITH THE HEADLINE                                   │
│     → First sentence answers: "Is this project on track?"    │
│     → Green / Yellow / Red status — no ambiguity             │
│     → If it's bad news, say it first, not last               │
│     → Stakeholders should know the status without reading    │
│       the full update                                        │
│                                                              │
│  2. BE HONEST — EVEN WHEN IT'S UNCOMFORTABLE                 │
│     → Never hide bad news — it always surfaces later         │
│     → "At risk" is better than a surprise miss               │
│     → Pair every problem with a mitigation plan              │
│     → Credibility is built through honest updates, not       │
│       optimistic ones                                        │
│                                                              │
│  3. EVERY BLOCKER NEEDS AN OWNER AND A DATE                  │
│     → "We're blocked" without owner = nobody's problem       │
│     → "We're blocked" without date = open-ended risk         │
│     → "Blocked on X. Owner: [Name]. ETA: [Date]."           │
│     → If no ETA, that's the escalation                       │
│                                                              │
│  4. DECISIONS NEEDED — MAKE THEM OBVIOUS                     │
│     → Call out decisions that stakeholders must make          │
│     → Include context and options for each decision          │
│     → Set a deadline: "Decision needed by [date]"            │
│     → Unanswered decisions delay the project                 │
│                                                              │
│  5. KEEP IT SHORT — DETAILS ON REQUEST                       │
│     → Status update = 1 page maximum                         │
│     → Technical details go in a linked document              │
│     → Use bullet points, not paragraphs                      │
│     → Executives read the first 3 lines, then skip to       │
│       "Decisions Needed" and "Next Steps"                    │
│                                                              │
│  6. NO AI TOOL REFERENCES — ANYWHERE                         │
│     → No "Generated by..." in document headers               │
│     → No AI tool mentions in any output                      │
│     → All output must look 100% human-written                │
└──────────────────────────────────────────────────────────────┘
```

---

## When to Use This Skill

- Weekly project status update to client or leadership
- Sprint review summary for stakeholders
- Monthly executive briefing on product progress
- Escalation communication when a project is at risk
- Milestone completion report
- Post-incident summary

---

## How It Works

```
┌──────────────────────────────────────────────────────────────────┐
│                    STATUS UPDATE FLOW                             │
│                                                                  │
│  ┌────────────┐    ┌────────────┐    ┌─────────────────────┐    │
│  │ STEP 1     │    │ STEP 2     │    │ STEP 3              │    │
│  │ Gather     │───▶│ Assess     │───▶│ Identify            │    │
│  │ Progress   │    │ Health     │    │ Blockers & Risks    │    │
│  │ Data       │    │ (G/Y/R)    │    │                     │    │
│  └────────────┘    └────────────┘    └──────────┬──────────┘    │
│                                                  │               │
│  ┌────────────┐    ┌────────────┐    ┌──────────▼──────────┐    │
│  │ STEP 6     │    │ STEP 5     │    │ STEP 4              │    │
│  │ Format &   │◀───│ Define     │◀───│ List Decisions      │    │
│  │ Send       │    │ Next Steps │    │ Needed              │    │
│  └────────────┘    └────────────┘    └─────────────────────┘    │
│                                                                  │
│  Output: Professional status update ready for stakeholders       │
└──────────────────────────────────────────────────────────────────┘
```

---

## Step 1 — Gather Progress Data

### Data Collection Checklist

```
┌─────────────────────────────────────────────────────────────┐
│  WHAT TO GATHER BEFORE WRITING THE UPDATE                   │
│                                                             │
│  PROGRESS                                                   │
│  [ ] Tasks completed this period                            │
│  [ ] Tasks in progress with % completion                    │
│  [ ] Deliverables shipped or milestones reached             │
│  [ ] Sprint velocity / burn-down data                       │
│                                                             │
│  METRICS                                                    │
│  [ ] Key metrics with change direction (up/down/flat)       │
│  [ ] Comparison to target (on/above/below)                  │
│  [ ] Any anomalies or unexpected trends                     │
│                                                             │
│  BLOCKERS                                                   │
│  [ ] Current blockers with owner and ETA                    │
│  [ ] Resolved blockers from previous update                 │
│  [ ] Dependencies waiting on other teams                    │
│                                                             │
│  RISKS                                                      │
│  [ ] New risks identified this period                       │
│  [ ] Existing risks with status change                      │
│  [ ] Risk mitigations in progress                           │
│                                                             │
│  DECISIONS                                                  │
│  [ ] Decisions made this period (document them)             │
│  [ ] Decisions needed from stakeholders                     │
│  [ ] Decision deadlines                                     │
└─────────────────────────────────────────────────────────────┘
```

---

## Step 2 — Assess Project Health

### Health Status Definitions

```
┌──────────────────────────────────────────────────────────────┐
│  PROJECT HEALTH STATUS                                       │
│                                                              │
│  GREEN  — On Track                                           │
│  • All milestones on schedule                                │
│  • No critical blockers                                      │
│  • Metrics meeting or exceeding targets                      │
│  • Team capacity sufficient                                  │
│  • Budget within 10% of plan                                 │
│                                                              │
│  YELLOW — At Risk                                            │
│  • One or more milestones may slip by 1-2 weeks              │
│  • Active blockers with mitigation plans                     │
│  • Some metrics below target but trending upward             │
│  • Team capacity tight — no buffer for surprises             │
│  • Requires stakeholder attention but not escalation         │
│                                                              │
│  RED    — Off Track                                          │
│  • Milestone will be missed without intervention             │
│  • Critical blocker with no clear resolution                 │
│  • Key metrics declining or significantly below target       │
│  • Scope, timeline, or budget needs executive decision       │
│  • Requires immediate stakeholder action                     │
└──────────────────────────────────────────────────────────────┘
```

### Health Assessment Decision Tree

```
        ┌──────────────────────────────────┐
        │ Are all milestones on schedule?  │
        └──────────────┬───────────────────┘
                       │
              ┌────────▼────────┐
              │      YES        │
              └────────┬────────┘
                       │
        ┌──────────────▼───────────────────┐
        │ Are there active critical        │
        │ blockers without resolution?     │
        └──────────────┬───────────────────┘
                       │
              ┌────────▼────────┐
              │      NO         │──────▶ GREEN
              └────────┬────────┘
                       │ YES
                       ▼
              ┌────────────────┐
              │ Is there a     │
              │ mitigation     │
              │ plan?          │
              └────────┬───────┘
                       │
              ┌────────▼────────┐
              │      YES        │──────▶ YELLOW
              └────────┬────────┘
                       │ NO
                       ▼
                      RED

        For milestones NOT on schedule:
              ┌────────────────┐
              │ Slip < 2 weeks │──────▶ YELLOW
              │ with plan      │
              └────────┬───────┘
                       │
              │ Slip > 2 weeks │──────▶ RED
              │ or no plan     │
              └────────────────┘
```

---

## Step 3 — Identify Blockers & Risks

### Blocker Format

```
┌──────────────────────────────────────────────────────────────┐
│  BLOCKER: [Short description]                                │
│                                                              │
│  Impact:     [What is blocked and for how long]              │
│  Owner:      [Person responsible for resolution]             │
│  Status:     [Active / In Progress / Resolved]               │
│  ETA:        [Expected resolution date]                      │
│  Mitigation: [What we're doing while blocked]                │
│  Escalation: [Who to escalate to if not resolved by ETA]     │
└──────────────────────────────────────────────────────────────┘
```

### Risk Register Update

| # | Risk | Probability | Impact | Status | Mitigation | Change Since Last Update |
|---|------|-------------|--------|--------|------------|--------------------------|
| R1 | Third-party API deprecation announced | High | High | NEW | Begin migration to v2 API this sprint | New risk — added this week |
| R2 | Key developer on vacation weeks 5-6 | Medium | Medium | TRACKING | Cross-training in progress, backup assigned | No change |
| R3 | Client UAT delayed due to internal scheduling | Low | Medium | MONITORING | Offered flexible UAT window (3 days instead of 1) | Probability decreased from Medium |
| R4 | Performance under load exceeds targets | Medium | High | MITIGATING | Load test scheduled for next week | Actively testing |

### Risk Trend Indicator

```
┌──────────────────────────────────────────────────────────────┐
│  RISK TREND                                                  │
│                                                              │
│  Week 1:  ■ ■ □ □ □    (2 active risks)                     │
│  Week 2:  ■ ■ ■ □ □    (3 active risks — R1 added)          │
│  Week 3:  ■ ■ ■ □ □    (3 active risks — stable)            │
│  Week 4:  ■ ■ □ □ □    (2 active risks — R3 resolved)       │
│                                                              │
│  Trend: STABLE                                               │
│  ■ = Active Risk   □ = Resolved or Accepted                 │
└──────────────────────────────────────────────────────────────┘
```

---

## Step 4 — List Decisions Needed

### Decision Request Format

```
┌──────────────────────────────────────────────────────────────┐
│  DECISION NEEDED: [Title]                                    │
│                                                              │
│  Context:    [Brief background — 2-3 sentences]              │
│  Options:                                                    │
│    A) [Option A] — [pros and cons in one line]               │
│    B) [Option B] — [pros and cons in one line]               │
│  Recommendation: [Which option and why — one sentence]       │
│  Impact if delayed: [What happens if no decision by date]    │
│  Decision needed by: [Date]                                  │
│  Decision maker: [Name]                                      │
└──────────────────────────────────────────────────────────────┘
```

### Example Decision Requests

```
DECISION 1: Approach for user import feature

Context: We can build user import with CSV only (2 weeks)
or CSV + Excel + API (5 weeks). 70% of client requests
mention Excel specifically.

Options:
  A) CSV only — faster to deliver, covers 60% of use cases
  B) CSV + Excel — covers 95% of use cases, 3 weeks longer

Recommendation: Option B — Excel support is a top-3 client request
Impact if delayed: Development blocked starting Monday
Decision needed by: Friday, March 28
Decision maker: Sarah Chen (Product Director)


DECISION 2: Beta rollout strategy

Context: Feature is code-complete. We can launch to all users
or do a phased rollout (10% → 50% → 100%).

Options:
  A) Full rollout — faster but higher risk if bugs found
  B) Phased rollout — 2 extra weeks but safer

Recommendation: Option B — new feature with payment implications
Impact if delayed: Launch moves from April 1 to April 3
Decision needed by: Wednesday, March 26
Decision maker: Mike Torres (Engineering Director)
```

---

## Step 5 — Define Next Steps

### Next Steps Format

| # | Action Item | Owner | Due Date | Status |
|---|------------|-------|----------|--------|
| 1 | Complete API integration testing | Dev Team | Mar 28 | In progress |
| 2 | Review and approve wireframes for Phase 2 | Sarah Chen | Mar 30 | Pending |
| 3 | Schedule client UAT session | PM | Mar 29 | Not started |
| 4 | Resolve third-party API blocker | Backend Lead | Apr 1 | In progress |
| 5 | Prepare launch communication for users | Marketing | Apr 5 | Not started |

### Timeline Confidence Assessment

```
┌──────────────────────────────────────────────────────────────┐
│  TIMELINE CONFIDENCE                                         │
│                                                              │
│  Original Target:    April 15 (launch)                       │
│  Current Projection: April 15 (on track)                     │
│  Confidence Level:   HIGH (85%)                              │
│                                                              │
│  Confidence Breakdown:                                       │
│  ┌──────────────────────────────────────────┐               │
│  │ Phase 1 (Design)       ████████████ DONE │               │
│  │ Phase 2 (Development)  ████████░░░░ 70%  │               │
│  │ Phase 3 (Testing)      ░░░░░░░░░░░░ 0%   │               │
│  │ Phase 4 (Launch)       ░░░░░░░░░░░░ 0%   │               │
│  └──────────────────────────────────────────┘               │
│                                                              │
│  Risk to Timeline:                                           │
│  • API blocker (if not resolved by Apr 1, adds 1 week)       │
│  • UAT scheduling (if delayed, adds 3-5 days)               │
│                                                              │
│  Confidence would DROP to MEDIUM if:                         │
│  • API blocker is not resolved by April 1                    │
│  • Additional scope is added without timeline extension      │
└──────────────────────────────────────────────────────────────┘
```

---

## Step 6 — Format & Send

### Status Update Template — Weekly

```markdown
# Project Status: [Project Name]

**Date:** [Date]
**Period:** [Week of March 24-28]
**Status:** GREEN / YELLOW / RED
**Author:** [Name]

---

## Summary

[2-3 sentences: overall status, key accomplishments, headline risk]

## Progress This Week

### Completed
- [Deliverable/task completed with brief impact note]
- [Deliverable/task completed]
- [Deliverable/task completed]

### In Progress
- [Task] — [X]% complete, on track for [date]
- [Task] — [X]% complete, on track for [date]

### Metrics

| Metric | Current | Target | Trend |
|--------|---------|--------|-------|
| [Metric 1] | [Value] | [Target] | Up / Down / Flat |
| [Metric 2] | [Value] | [Target] | Up / Down / Flat |

## Blockers

| Blocker | Impact | Owner | ETA | Status |
|---------|--------|-------|-----|--------|
| [Description] | [What's blocked] | [Name] | [Date] | Active |

*[If no blockers: "No active blockers this week."]*

## Risks

| Risk | Probability | Impact | Mitigation | Change |
|------|-------------|--------|------------|--------|
| [Risk] | H/M/L | H/M/L | [Action] | New / Same / Decreased |

## Decisions Needed

| Decision | Options | Deadline | Decision Maker |
|----------|---------|----------|----------------|
| [Decision] | A: [X] / B: [Y] | [Date] | [Name] |

*[If no decisions needed: "No decisions needed this week."]*

## Next Week

- [Priority 1]
- [Priority 2]
- [Priority 3]

## Timeline

**Target:** [Date] | **Projection:** [Date] | **Confidence:** [HIGH/MEDIUM/LOW]
```

---

### Status Update Template — Monthly Executive

```markdown
# Monthly Status: [Project Name]

**Month:** [March 2026]
**Status:** GREEN / YELLOW / RED
**Executive Sponsor:** [Name]

## Executive Summary

[3-5 sentences maximum. Status, key achievements, critical risks,
timeline confidence. This section must stand completely alone.]

## Key Accomplishments

1. [Accomplishment with business impact]
2. [Accomplishment with business impact]
3. [Accomplishment with business impact]

## Metrics Dashboard

| Metric | Baseline | Current | Target | Status |
|--------|----------|---------|--------|--------|
| [KPI 1] | [Baseline] | [Current] | [Target] | On Track / At Risk |
| [KPI 2] | [Baseline] | [Current] | [Target] | On Track / At Risk |

## Budget Status

| Category | Budgeted | Spent | Remaining | Forecast |
|----------|----------|-------|-----------|----------|
| Development | $X | $Y | $Z | On track |
| Infrastructure | $X | $Y | $Z | On track |
| Total | $X | $Y | $Z | On track |

## Critical Risks (Top 3)

| Risk | Impact | Mitigation | Owner |
|------|--------|------------|-------|
| [Risk 1] | [Business impact] | [Action] | [Name] |
| [Risk 2] | [Business impact] | [Action] | [Name] |

## Decisions Made This Month

| Decision | Impact | Made By |
|----------|--------|---------|
| [Decision] | [Consequence] | [Name] |

## Decisions Needed

| Decision | Options | Deadline |
|----------|---------|----------|
| [Decision] | [Brief options] | [Date] |

## Next Month Priorities

1. [Top priority with expected outcome]
2. [Second priority]
3. [Third priority]

## Timeline

[Visual progress bar or milestone chart]
```

---

## Cadence Guide — Who Gets What, When

```
┌──────────────────────────────────────────────────────────────┐
│  STATUS UPDATE CADENCE                                       │
│                                                              │
│  DAILY (Standup — internal team only)                        │
│  • What I did yesterday                                      │
│  • What I'm doing today                                      │
│  • Blockers (if any)                                         │
│  Format: Verbal or Slack message (2 minutes)                 │
│                                                              │
│  WEEKLY (Status update — client + stakeholders)              │
│  • Progress summary + metrics                                │
│  • Blockers with owners                                      │
│  • Decisions needed                                          │
│  • Next week priorities                                      │
│  Format: Written update (1 page max)                         │
│                                                              │
│  BIWEEKLY (Sprint review — team + stakeholders)              │
│  • Demo of completed work                                    │
│  • Sprint metrics (velocity, completion rate)                │
│  • Retrospective highlights                                  │
│  Format: Meeting + written summary                           │
│                                                              │
│  MONTHLY (Executive briefing — leadership)                   │
│  • High-level progress + business metrics                    │
│  • Budget status                                             │
│  • Top 3 risks                                               │
│  • Strategic decisions needed                                │
│  Format: Written report (2 pages max)                        │
│                                                              │
│  AD HOC (Escalation — when status changes to RED)            │
│  • What happened                                             │
│  • Impact assessment                                         │
│  • Mitigation plan                                           │
│  • What you need from leadership                             │
│  Format: Immediate message + follow-up document              │
└──────────────────────────────────────────────────────────────┘
```

---

## Escalation Update Template

When project status changes from Green/Yellow to Red:

```markdown
# ESCALATION: [Project Name] — Status Change to RED

**Date:** [Date]
**Escalated by:** [Name]
**Escalated to:** [Name, Title]
**Severity:** CRITICAL / HIGH

## What Happened

[2-3 sentences explaining the trigger event]

## Impact

- **Timeline:** [Original date] now at risk — projected slip of [X weeks]
- **Scope:** [What is affected]
- **Users/Revenue:** [Business impact]

## Root Cause

[Brief explanation of why this happened]

## Immediate Actions Taken

1. [Action already taken]
2. [Action already taken]

## What We Need

1. [Specific ask — decision, resource, priority change]
2. [Specific ask]

## Options for Resolution

| Option | Timeline Impact | Cost Impact | Risk |
|--------|----------------|-------------|------|
| A: [Approach] | [Impact] | [Cost] | [Risk] |
| B: [Approach] | [Impact] | [Cost] | [Risk] |

**Recommended:** Option [X] because [one sentence rationale]

## Next Check-In

[Date and time for follow-up]
```

---

## Completeness Checklist

```
STATUS UPDATE QUALITY CHECKLIST
───────────────────────────────
[ ] Health status (Green/Yellow/Red) stated in first line
[ ] Summary can be understood without reading the rest
[ ] Completed items listed with brief impact notes
[ ] In-progress items have % completion and expected dates
[ ] Metrics included with trend direction (up/down/flat)
[ ] Metrics compared to target (not just shown in isolation)
[ ] Every blocker has an owner and ETA
[ ] Every blocker has a mitigation or escalation plan
[ ] Risk register updated (new risks, changed risks, resolved risks)
[ ] Decisions needed section lists specific options (not just "we need input")
[ ] Decision deadlines specified
[ ] Next steps have owners and due dates
[ ] Timeline confidence stated with conditions for change
[ ] Update is 1 page or less (weekly) / 2 pages or less (monthly)
[ ] No jargon that stakeholders won't understand
[ ] Bad news presented honestly with mitigation plans
```

---

## Common Mistakes

| Mistake | Impact | Prevention |
|---------|--------|------------|
| Burying bad news at the end | Stakeholder surprised, trust broken | Lead with the headline — good or bad |
| "Everything is fine" when it's not | Problems discovered too late to fix | Use the Green/Yellow/Red framework honestly |
| Blockers without owners | Nobody resolves them | Every blocker gets a name and a date |
| Too much detail | Stakeholders stop reading updates | 1 page max for weekly, 2 pages for monthly |
| No decisions section | Stakeholders don't know you need their input | Always include — even if it says "No decisions needed" |
| Metrics without context | Numbers are meaningless without comparison | Always show trend, target, and change direction |
| Inconsistent cadence | Stakeholders lose confidence | Set a recurring calendar event and never skip |
| No escalation protocol | Project goes red without leadership knowing | Define and follow the escalation template |

---

## Tips for Effective Status Updates

1. **Write the subject line like a headline** — "[Project] Week 12: GREEN — Feature complete, entering QA" tells the full story
2. **Assume the reader has 60 seconds** — Front-load the most important information
3. **Show, don't tell** — "Completed 12 of 15 stories (80%)" beats "Good progress this week"
4. **Track your predictions** — If you said "95% confidence" last week and missed, explain why. This builds credibility over time
5. **Celebrate wins publicly** — Call out team members who delivered exceptional work
6. **Use the same format every time** — Consistency makes updates scannable. Readers know where to look for what they care about
7. **Send on schedule, every time** — A late status update signals chaos, even when the project is fine
8. **Reply to questions in the next update** — If a stakeholder asks a question on Tuesday, answer it in Friday's update (and directly via message)
