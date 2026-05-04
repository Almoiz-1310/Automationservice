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
name: client-proposal
description: "Write a professional feature proposal for a client engagement. Produces executive summary, problem analysis, proposed solution, technical approach, phased timeline with milestones, cost breakdown, and ROI projection. Output is polished and ready for client-facing delivery."
---

# Client Proposal — From Client Need to Winning Proposal

Takes a client request, business problem, or feature idea and produces a polished, client-facing proposal document. Covers the business case, technical approach, timeline, cost, and projected ROI. Designed to build confidence, set expectations, and win approval.

---

## Common Rules — Read Before Every Task

```
┌──────────────────────────────────────────────────────────────┐
│              MANDATORY RULES FOR EVERY TASK                  │
│                                                              │
│  You are a senior consultant writing a proposal that a       │
│  client will use to make a purchasing or investment          │
│  decision. Your document must be professional, clear,        │
│  and persuasive without being manipulative.                  │
│  Follow these rules strictly.                                │
│                                                              │
│  ────────────────────────────────────────────────────────    │
│                                                              │
│  1. CLIENT FIRST, ALWAYS                                     │
│     → Frame everything in terms of client benefit            │
│     → Use their language, their metrics, their goals         │
│     → Reference their specific pain points, not generic ones │
│     → Show you understand their business context             │
│                                                              │
│  2. BE HONEST ABOUT SCOPE AND COST                           │
│     → Never underestimate to win the deal                    │
│     → Include contingency in every estimate                  │
│     → Clearly state assumptions and exclusions               │
│     → Surprises after sign-off destroy trust                 │
│                                                              │
│  3. MAKE THE ROI CREDIBLE                                    │
│     → Use conservative projections, not best-case            │
│     → Show your calculation methodology                      │
│     → Tie ROI to the client's own metrics                    │
│     → If ROI is uncertain, present a range (low/mid/high)    │
│                                                              │
│  4. PRESENT OPTIONS, NOT ULTIMATUMS                          │
│     → Always offer 2-3 options (good/better/best)            │
│     → Let the client choose the scope that fits their budget │
│     → Anchor on the middle option as "recommended"           │
│     → Each option must be independently valuable             │
│                                                              │
│  5. PROFESSIONAL TONE — NOT SALESY                           │
│     → No exclamation marks or hype language                  │
│     → No "industry-leading" or "best-in-class" claims        │
│     → Confidence without arrogance                           │
│     → Let the work speak through specifics, not adjectives   │
│                                                              │
│  6. NO AI TOOL REFERENCES — ANYWHERE                         │
│     → No "Generated by..." in document headers               │
│     → No AI tool mentions in any output                      │
│     → All output must look 100% human-written                │
└──────────────────────────────────────────────────────────────┘
```

---

## When to Use This Skill

- Client requests a new feature or module and needs a formal proposal
- Responding to an RFP (Request for Proposal) or RFI (Request for Information)
- Pitching a product improvement or add-on to an existing client
- Internal stakeholder needs a business case for a build decision
- Justifying engineering investment to non-technical leadership

---

## How It Works

```
┌──────────────────────────────────────────────────────────────────┐
│                    PROPOSAL WRITING FLOW                         │
│                                                                  │
│  ┌────────────┐    ┌────────────┐    ┌─────────────────────┐    │
│  │ STEP 1     │    │ STEP 2     │    │ STEP 3              │    │
│  │ Understand │───▶│ Design     │───▶│ Build the           │    │
│  │ the Client │    │ Solution   │    │ Business Case       │    │
│  └────────────┘    └────────────┘    └──────────┬──────────┘    │
│                                                  │               │
│  ┌────────────┐    ┌────────────┐    ┌──────────▼──────────┐    │
│  │ STEP 6     │    │ STEP 5     │    │ STEP 4              │    │
│  │ Polish &   │◀───│ Define     │◀───│ Timeline &          │    │
│  │ Deliver    │    │ Options    │    │ Cost Breakdown      │    │
│  └────────────┘    └────────────┘    └─────────────────────┘    │
│                                                                  │
│  Output: Client-ready proposal with options, ROI, and timeline   │
└──────────────────────────────────────────────────────────────────┘
```

---

## Step 1 — Understand the Client

### Client Context Worksheet

Before writing a single word, fill this out:

```
┌──────────────────────────────────────────────────────────────┐
│  CLIENT CONTEXT                                              │
│                                                              │
│  Company:        [Name]                                      │
│  Industry:       [Sector]                                    │
│  Size:           [Employees / Revenue]                       │
│  Decision Maker: [Name, Title]                               │
│  Champion:       [Internal advocate, Title]                  │
│  Budget Range:   [If known]                                  │
│  Timeline Need:  [When do they need this?]                   │
│  Contract Type:  [Fixed price / T&M / Retainer]              │
│                                                              │
│  THEIR PAIN POINTS                                           │
│  1. [Specific pain — in their words]                         │
│  2. [Specific pain — in their words]                         │
│  3. [Specific pain — in their words]                         │
│                                                              │
│  WHAT SUCCESS LOOKS LIKE FOR THEM                            │
│  1. [Measurable outcome they want]                           │
│  2. [Measurable outcome they want]                           │
│                                                              │
│  THEIR CONSTRAINTS                                           │
│  • Budget: [Hard limit?]                                     │
│  • Timeline: [Regulatory or business deadline?]              │
│  • Technical: [Legacy systems, specific platforms?]          │
│  • Organizational: [Approval process, stakeholders?]         │
└──────────────────────────────────────────────────────────────┘
```

---

## Step 2 — Design the Solution

### Solution Architecture (Client-Friendly)

Present the solution at the right abstraction level for the audience:

```
┌──────────────────────────────────────────────────────────────┐
│  SOLUTION OVERVIEW                                           │
│                                                              │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │  Module 1   │    │  Module 2   │    │  Module 3   │     │
│  │  [Name]     │───▶│  [Name]     │───▶│  [Name]     │     │
│  │             │    │             │    │             │     │
│  │  • Feature  │    │  • Feature  │    │  • Feature  │     │
│  │  • Feature  │    │  • Feature  │    │  • Feature  │     │
│  │  • Feature  │    │  • Feature  │    │  • Feature  │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
│                                                              │
│  ┌───────────────────────────────────────────────────┐      │
│  │  Foundation Layer                                  │      │
│  │  • Security & authentication                       │      │
│  │  • Data storage & backup                           │      │
│  │  • Performance & scalability                       │      │
│  └───────────────────────────────────────────────────┘      │
└──────────────────────────────────────────────────────────────┘
```

### Technical Approach — For the Technical Audience

```
┌──────────────────────────────────────────────────────────────┐
│  TECHNICAL APPROACH                                          │
│                                                              │
│  Architecture: [Monolith / Microservices / Modular]          │
│  Frontend:     [Framework, rendering strategy]               │
│  Backend:      [Language, framework, API style]              │
│  Database:     [Type, hosting, backup strategy]              │
│  Hosting:      [Cloud provider, deployment model]            │
│  Security:     [Auth method, encryption, compliance]         │
│                                                              │
│  Integration Points:                                         │
│  • [System 1] via [method — REST API / webhook / SDK]        │
│  • [System 2] via [method]                                   │
│                                                              │
│  Key Technical Decisions:                                    │
│  • [Decision 1] — because [rationale for client's context]   │
│  • [Decision 2] — because [rationale for client's context]   │
└──────────────────────────────────────────────────────────────┘
```

---

## Step 3 — Build the Business Case

### ROI Projection Template

```
┌──────────────────────────────────────────────────────────────┐
│  ROI CALCULATION                                             │
│                                                              │
│  COSTS (One-Time)                                            │
│  ├── Development          $[amount]                          │
│  ├── Design               $[amount]                          │
│  ├── Project management   $[amount]                          │
│  ├── Testing & QA         $[amount]                          │
│  └── Contingency (15%)    $[amount]                          │
│  Total One-Time:          $[total]                           │
│                                                              │
│  COSTS (Recurring / Year)                                    │
│  ├── Hosting & infra      $[amount]/yr                       │
│  ├── Maintenance & support $[amount]/yr                      │
│  └── Licensing (3rd party) $[amount]/yr                      │
│  Total Recurring:         $[total]/yr                        │
│                                                              │
│  BENEFITS (Year 1)                                           │
│  ├── Time saved           [X hours/mo] x $[rate] = $[total] │
│  ├── Error reduction      [X errors/mo] x $[cost] = $[total]│
│  ├── Revenue increase     [X% uplift] x $[base] = $[total]  │
│  └── Cost avoidance       [describe] = $[total]              │
│  Total Benefits (Year 1): $[total]                           │
│                                                              │
│  ────────────────────────────────────────────────            │
│  Year 1 ROI:  ($[benefits] - $[costs]) / $[costs] = [X]%    │
│  Payback Period: [X] months                                  │
│  3-Year Net Value: $[cumulative benefits - cumulative costs] │
└──────────────────────────────────────────────────────────────┘
```

### ROI Projection Table

| | Year 1 | Year 2 | Year 3 | Total |
|---|--------|--------|--------|-------|
| One-time cost | $50,000 | $0 | $0 | $50,000 |
| Recurring cost | $12,000 | $12,000 | $12,000 | $36,000 |
| **Total cost** | **$62,000** | **$12,000** | **$12,000** | **$86,000** |
| Benefits | $40,000 | $80,000 | $80,000 | $200,000 |
| **Net value** | **-$22,000** | **$68,000** | **$68,000** | **$114,000** |
| **Cumulative** | **-$22,000** | **$46,000** | **$114,000** | |

### ROI Credibility Rules

```
┌──────────────────────────────────────────────────────────────┐
│  MAKING ROI BELIEVABLE                                       │
│                                                              │
│  DO:                                                         │
│  ✓ Use conservative estimates (show low/mid/high scenarios)  │
│  ✓ Tie to the client's real metrics (their data, not yours)  │
│  ✓ Show the calculation so they can verify                   │
│  ✓ Include ramp-up time (benefits don't start on day 1)      │
│  ✓ Account for adoption rate (not 100% from day 1)           │
│                                                              │
│  DON'T:                                                      │
│  ✗ Promise exact numbers ("will save $127,342")              │
│  ✗ Ignore implementation costs in ROI calculation             │
│  ✗ Use best-case scenario as the primary projection          │
│  ✗ Forget recurring costs (hosting, maintenance, support)    │
│  ✗ Count benefits that require additional investment to get   │
└──────────────────────────────────────────────────────────────┘
```

---

## Step 4 — Timeline & Cost Breakdown

### Phased Timeline

```
┌──────────────────────────────────────────────────────────────┐
│  PROJECT TIMELINE                                            │
│                                                              │
│  PHASE 1 — Discovery & Design (Weeks 1-2)                   │
│  ├── Stakeholder interviews and requirement validation       │
│  ├── User flow design and wireframes                         │
│  ├── Technical architecture and API design                   │
│  └── Deliverable: Approved design document                   │
│  Milestone: Design Sign-Off                                  │
│                                                              │
│  PHASE 2 — Core Development (Weeks 3-6)                      │
│  ├── Backend API and database implementation                 │
│  ├── Frontend UI implementation                              │
│  ├── Integration with existing systems                       │
│  └── Deliverable: Working prototype for internal review      │
│  Milestone: Feature Complete                                 │
│                                                              │
│  PHASE 3 — Testing & Refinement (Weeks 7-8)                  │
│  ├── End-to-end testing and bug fixes                        │
│  ├── User acceptance testing with client team                │
│  ├── Performance optimization                                │
│  └── Deliverable: UAT-approved build                         │
│  Milestone: Client UAT Sign-Off                              │
│                                                              │
│  PHASE 4 — Launch & Handover (Week 9)                        │
│  ├── Production deployment                                   │
│  ├── Team training and documentation                         │
│  ├── 30-day hypercare support period begins                  │
│  └── Deliverable: Live system + training materials           │
│  Milestone: Go-Live                                          │
│                                                              │
│  TOTAL DURATION: 9 weeks                                     │
│  HYPERCARE: 30 days post-launch support included             │
└──────────────────────────────────────────────────────────────┘
```

### Cost Breakdown Table

| Phase | Activities | Duration | Team | Cost |
|-------|-----------|----------|------|------|
| Discovery & Design | Requirements, wireframes, architecture | 2 weeks | PM, Designer, Architect | $8,000 |
| Core Development | Backend, frontend, integrations | 4 weeks | 2 Developers, PM | $28,000 |
| Testing & Refinement | QA, UAT, bug fixes, performance | 2 weeks | QA Engineer, Developer | $10,000 |
| Launch & Handover | Deploy, train, document | 1 week | PM, Developer | $4,000 |
| **Subtotal** | | **9 weeks** | | **$50,000** |
| Contingency (15%) | Unforeseen scope, technical challenges | — | — | $7,500 |
| **Total** | | | | **$57,500** |

### Payment Schedule

| Milestone | Amount | When |
|-----------|--------|------|
| Project kickoff | 30% ($17,250) | Contract signing |
| Design sign-off | 20% ($11,500) | End of Phase 1 |
| Feature complete | 30% ($17,250) | End of Phase 2 |
| Go-live | 20% ($11,500) | End of Phase 4 |

---

## Step 5 — Define Options

### The 3-Option Framework

Always present three options. Anchor on the middle one.

```
┌──────────────────────────────────────────────────────────────┐
│  OPTION A — Essential                                        │
│  "Get the core value with minimal investment"                │
│                                                              │
│  Includes: [Core features only — MVP]                        │
│  Timeline: [Shorter]                                         │
│  Cost:     $[lowest]                                         │
│  Best for: Tight budget, want to validate before expanding   │
├──────────────────────────────────────────────────────────────┤
│  OPTION B — Recommended  ★                                   │
│  "The right balance of value, scope, and investment"         │
│                                                              │
│  Includes: [Core + important enhancements]                   │
│  Timeline: [Standard]                                        │
│  Cost:     $[mid-range]                                      │
│  Best for: Most clients — delivers full value                │
├──────────────────────────────────────────────────────────────┤
│  OPTION C — Complete                                         │
│  "Full solution with advanced capabilities"                  │
│                                                              │
│  Includes: [Everything + advanced features]                  │
│  Timeline: [Longer]                                          │
│  Cost:     $[highest]                                        │
│  Best for: Organizations that want the complete solution     │
└──────────────────────────────────────────────────────────────┘
```

### Option Comparison Table

| Capability | Option A (Essential) | Option B (Recommended) | Option C (Complete) |
|-----------|---------------------|----------------------|-------------------|
| Core workflow | Included | Included | Included |
| User management | Basic (invite only) | Full (invite + bulk + SSO) | Full + advanced roles |
| Reporting | 3 standard reports | 5 standard + custom filters | Custom report builder |
| Integrations | API only | API + 2 native integrations | API + 5 integrations |
| Mobile support | Responsive web | Responsive web | Responsive + PWA |
| Training | Documentation | Documentation + 1 session | 3 sessions + ongoing |
| Support | Email (48hr) | Email (24hr) + Slack | Priority + dedicated CSM |
| **Timeline** | **6 weeks** | **9 weeks** | **14 weeks** |
| **Investment** | **$30,000** | **$57,500** | **$95,000** |

---

## Step 6 — Polish & Deliver

### Proposal Quality Checklist

```
PROPOSAL QUALITY CHECKLIST
──────────────────────────
[ ] Executive summary fits on one page and can stand alone
[ ] Client's specific pain points referenced (not generic problems)
[ ] Solution described in client-friendly language (no unnecessary jargon)
[ ] Technical approach section exists for technical stakeholders
[ ] 3 options presented with clear differentiation
[ ] Middle option marked as "Recommended" with rationale
[ ] ROI calculation shows methodology, not just final number
[ ] Timeline has phases with clear milestones and deliverables
[ ] Cost breakdown shows line items (not just a total)
[ ] Payment schedule tied to milestones (not arbitrary dates)
[ ] Assumptions and exclusions listed explicitly
[ ] Risks acknowledged with mitigations (builds trust)
[ ] 15% contingency included in cost
[ ] No typos, consistent formatting, professional tone
[ ] Client's company name and project title used throughout
[ ] Contact information and next steps included at the end
```

---

## Complete Proposal Template

```markdown
# [Project Name] — Proposal

**Prepared for:** [Client Company Name]
**Prepared by:** [Your Company Name]
**Date:** [Date]
**Version:** [1.0]
**Valid until:** [Date + 30 days]

---

## Executive Summary

[2-3 paragraphs covering: the client's problem, your proposed solution,
expected outcomes, and investment range. This section must stand alone —
many decision-makers read only this page.]

---

## 1. Understanding Your Needs

### The Challenge

[Describe the client's current situation and pain points — in their words.
Show that you listened and understood.]

### Impact of the Status Quo

[Quantify the cost of not solving this problem — time wasted, revenue
lost, compliance risk, user frustration.]

---

## 2. Proposed Solution

### Solution Overview

[High-level description with architecture diagram]

### Key Capabilities

[Feature list organized by module/area]

### How It Works

[User flow or process diagram — keep it simple and visual]

---

## 3. Technical Approach

[Architecture, technology choices, integration points — for the
technical stakeholders]

---

## 4. Options & Investment

### Option Comparison

[3-option comparison table]

### Recommended Option

[1-2 paragraphs explaining why Option B is the best fit]

---

## 5. Timeline & Milestones

[Phased timeline with deliverables per phase]

---

## 6. Investment & Payment

### Cost Breakdown

[Line-item cost table with contingency]

### Payment Schedule

[Milestone-based payment plan]

---

## 7. Expected ROI

[ROI calculation with methodology and conservative projections]

---

## 8. Our Approach to Quality

### Project Management
[How you run projects — communication, tools, cadence]

### Quality Assurance
[Testing approach, UAT process, acceptance criteria]

### Post-Launch Support
[Hypercare period, SLA, ongoing support options]

---

## 9. Risks & Mitigations

[Top 3-5 risks with clear mitigation strategies]

---

## 10. Assumptions & Exclusions

### Assumptions
- [What you assume to be true for this estimate to hold]

### Exclusions
- [What is NOT included in this proposal]

---

## 11. Next Steps

1. Review this proposal and share feedback by [date]
2. Schedule a Q&A session to address questions
3. Select preferred option
4. Sign agreement and schedule kickoff

---

## About [Your Company]

[Brief company description, relevant experience, team highlights]

### Contact

[Name, Title]
[Email]
[Phone]
```

---

## Common Mistakes

| Mistake | Impact | Prevention |
|---------|--------|------------|
| Generic problem statement | Client feels you don't understand them | Use their exact words from discovery calls |
| No options — single take-it-or-leave-it | Client has no room to negotiate | Always present 3 options |
| Underestimating to win the deal | Cost overruns destroy trust | Include 15% contingency, use honest estimates |
| ROI projection too optimistic | Client doesn't believe the numbers | Use conservative estimates with ranges |
| No exclusions section | Scope disputes after signing | Explicitly list what is NOT included |
| Too much jargon | Non-technical decision makers can't evaluate | Write for the least technical reader in the room |
| Missing next steps | Proposal sits in inbox | End with clear action items and dates |
| No expiration date | Proposal used 6 months later at old prices | Add "Valid until [date]" in the header |

---

## Tips for Winning Proposals

1. **Mirror their language** — Use the exact phrases the client used to describe their problem
2. **Anchor on the middle option** — Present the cheapest option first, recommended second, premium third
3. **Show, don't tell** — Include mockups, diagrams, or prototypes when possible
4. **Reference similar work** — "We built something similar for [industry peer]" builds confidence
5. **Include a risk section** — Acknowledging risks makes you look thorough, not risky
6. **Follow up in person** — Never just email the proposal. Walk through it live.
7. **Make the next step easy** — "Reply to this email to schedule the kickoff" beats a complex procurement process
8. **Keep it under 15 pages** — Longer proposals are less likely to be read completely
