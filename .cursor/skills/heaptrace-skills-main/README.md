<p align="center">
  <img src="https://img.shields.io/badge/Skills-66-06b6d4?style=for-the-badge&labelColor=0f172a" alt="66 Skills">
  <img src="https://img.shields.io/badge/Packs-8-a855f7?style=for-the-badge&labelColor=0f172a" alt="8 Packs">
  <img src="https://img.shields.io/badge/Works_With-Claude_|_Cursor-10b981?style=for-the-badge&labelColor=0f172a" alt="Claude & Cursor">
</p>

<h1 align="center">Heaptrace Developer Skills</h1>

<p align="center">
  <strong>66 structured skills for development teams — from planning to release.</strong><br>
  Every skill comes with step-by-step guides, flow diagrams, checklists, templates, and anti-patterns.
</p>

<p align="center">
  <a href="https://lmsht.com/skills">📖 Browse Skills</a>
</p>

---

## Quick Setup

Both **Claude Code** and **Cursor** use the same skill file format. Clone this repo and copy.

### Step 1 — Clone

```bash
git clone https://github.com/heaptracetechnology/heaptrace-skills.git
```

### Step 2 — Copy to Your Tool

#### Claude Code

```bash
# Project-level (this project only)
cp -r heaptrace-skills/*/ your-project/.claude/skills/

# Personal (all projects)
cp -r heaptrace-skills/*/ ~/.claude/skills/
```

**Path:** `.claude/skills/<skill-name>/SKILL.md`

#### Cursor

```bash
# Project-level (this project only)
cp -r heaptrace-skills/*/ your-project/.cursor/skills/

# Personal (all projects — check Cursor docs for global path)
cp -r heaptrace-skills/*/ ~/.cursor/skills/
```

**Path:** `.cursor/skills/<skill-name>/skill.md`

### Step 3 — Add to .gitignore

Skills are **personal tools** — don't commit them to your project repo:

```bash
# Add to your project's .gitignore
echo ".claude/skills/" >> .gitignore
echo ".cursor/skills/" >> .gitignore
```

---

## What Are Skills?

Skills are structured instruction files that guide AI coding assistants through specific development tasks. Instead of writing prompts from scratch, skills give consistent, battle-tested processes your entire team can follow.

```
Client gives a task
    → /suggest       (what's missing? what can we add?)
    → /feature-plan  (break it down, plan it)
    → /feature-work  (build it end-to-end)
    → /code-review   (catch issues before PR)
    → /smart-commit  (clean commit message)
    → /release-notes (client-ready changelog)
```

---

## Skill Packs

### 🔷 Developer (10 skills)

The daily toolkit for every developer.

| Skill | What It Does |
|-------|-------------|
| `feature-plan` | Break requirements into tasks, mockups, and flow diagrams |
| `feature-work` | Build end-to-end: DB → API → UI → Test |
| `find-fix` | Trace bugs: reproduce → isolate → root cause → fix → verify |
| `smart-commit` | Generate semantic commit messages (WHY, not WHAT) |
| `suggest` | Spot gaps and suggest improvements clients didn't ask for |
| `code-review` | 8-pass review: logic, security, perf, naming, tests |
| `test-gen` | Generate tests that catch real bugs, not just pass |
| `explain` | Understand any code before you touch it |
| `sec-audit` | OWASP Top 10, secrets scan, dependency check |
| `release-notes` | Turn git history into client-ready changelogs |

### 🟡 Lead Engineer (8 skills)

For tech leads managing teams and making architectural decisions.

| Skill | What It Does |
|-------|-------------|
| `sprint-plan` | Break epics into sprints with estimates and assignments |
| `arch-review` | Audit architecture for scalability, coupling, SPOFs |
| `tech-debt-audit` | Find and prioritize tech debt across the codebase |
| `incident-response` | Structured triage, root cause analysis, postmortem |
| `pr-strategy` | Split large features into reviewable PRs |
| `onboard-dev` | Generate onboarding guide for new team members |
| `perf-audit` | Profile slow endpoints, N+1 queries, memory leaks |
| `decision-doc` | Write Architecture Decision Records (ADRs) |

### 🟣 Technical Architect (8 skills)

System design, API contracts, and infrastructure planning.

| Skill | What It Does |
|-------|-------------|
| `system-design` | Design systems from scratch with component diagrams |
| `api-design` | Design RESTful APIs with contracts and versioning |
| `db-design` | Design schemas, relations, indexes, migrations |
| `integration-plan` | Plan third-party integrations (OAuth, webhooks) |
| `migration-plan` | Plan zero-downtime data and system migrations |
| `scalability-review` | Audit for caching, queues, replicas, CDN, load balancing |
| `event-design` | Design event-driven architecture with idempotency |
| `cost-estimate` | Estimate infrastructure costs for features |

### 🟢 QA / Testing (8 skills)

Comprehensive testing from planning to execution.

| Skill | What It Does |
|-------|-------------|
| `test-plan` | Create test plans with cases, edge cases, priorities |
| `e2e-test` | Write end-to-end user flow tests |
| `api-test` | Test API endpoints: status codes, auth, edge cases |
| `regression-check` | Identify what could break from code changes |
| `bug-report` | Write structured bug reports with reproduction steps |
| `load-test` | Design load test scenarios and breaking points |
| `accessibility-audit` | Audit UI for WCAG compliance |
| `test-data-gen` | Generate realistic test data and seed scripts |

### 🔵 Automation QA (6 skills)

CI/CD test automation, visual regression, and contract testing.

| Skill | What It Does |
|-------|-------------|
| `cypress-test` | Write Cypress/Playwright tests with page objects |
| `ci-test-pipeline` | Set up parallel test runs in CI with reporting |
| `mock-service` | Create mock APIs with MSW/Nock for testing |
| `visual-regression` | Screenshot comparison with threshold config |
| `test-coverage` | Analyze gaps and improve meaningful coverage |
| `contract-test` | Write contract tests between services |

### 🟠 AWS Cloud Engineer (10 skills)

Infrastructure, deployment, and operations on AWS.

| Skill | What It Does |
|-------|-------------|
| `vpc-design` | Design VPC: subnets, NAT, security groups, peering |
| `ecs-deploy` | Deploy containers to ECS with ALB and auto-scaling |
| `rds-setup` | Set up RDS: sizing, Multi-AZ, backups, monitoring |
| `iam-policy` | Write least-privilege IAM policies and roles |
| `terraform-module` | Write Terraform modules with state management |
| `ci-cd-pipeline` | Build CI/CD with GitHub Actions, ECR, ECS |
| `monitoring-setup` | Set up CloudWatch alarms, dashboards, alerts |
| `cost-optimize` | Audit and reduce AWS costs |
| `disaster-recovery` | Plan DR: RTO/RPO, backups, cross-region failover |
| `secrets-manage` | Manage secrets with SSM/Secrets Manager |

### 🩷 UI/UX Designer (8 skills)

Wireframes, flows, design systems, and handoffs.

| Skill | What It Does |
|-------|-------------|
| `wireframe` | Create wireframes with responsive breakpoints |
| `user-flow` | Map user journeys with decision trees |
| `design-system` | Define tokens, components, typography, colors |
| `ux-audit` | Audit UI against Nielsen's 10 heuristics |
| `responsive-design` | Plan mobile-first layouts and touch targets |
| `micro-interaction` | Design loading, empty, error states, transitions |
| `a11y-design` | Design for accessibility: contrast, focus, ARIA |
| `design-handoff` | Create dev handoff specs with measurements |

### 🩵 Business / Product (8 skills)

Requirements, proposals, prioritization, and stakeholder updates.

| Skill | What It Does |
|-------|-------------|
| `prd-write` | Write Product Requirements Documents |
| `user-story` | Write user stories with acceptance criteria |
| `competitor-analysis` | Analyze competitor features and gaps |
| `feature-prioritize` | Prioritize with RICE/MoSCoW scoring |
| `client-proposal` | Write feature proposals with ROI projection |
| `metrics-define` | Define KPIs and success metrics |
| `scope-negotiate` | Negotiate scope and MVP definition |
| `stakeholder-update` | Write status updates for stakeholders |

---

## Every Skill Includes

- Step-by-step workflow with ASCII flow diagrams
- Decision trees for ambiguous situations
- Checklists and templates you can copy-paste
- Common mistakes and anti-patterns
- Real-world examples (not lorem ipsum)
- 6 mandatory rules enforced on every task

### Mandatory Rules (Built Into Every Skill)

1. **Understand before you build** — Study existing architecture first
2. **Reuse, never duplicate** — Search for existing code before writing new
3. **Use existing technology** — Don't introduce new libraries unnecessarily
4. **Ask before adding anything new** — Confirm before installing dependencies
5. **Follow best practices** — Clean code, error handling, validation
6. **No AI tool references** — All output must look 100% human-written

---

## Customizing Skills

You can tune any skill for your project:

1. Open the `SKILL.md` file in any text editor
2. Modify steps, add project-specific patterns, adjust checklists
3. Add your team's conventions, naming rules, or tech stack details
4. Save — the updated skill is used immediately on next invocation

Skills are yours to customize. Make them fit your workflow.

---

## Repo Structure

```
heaptrace-skills/
├── feature-plan/SKILL.md          ← Developer pack
├── feature-work/SKILL.md
├── find-fix/SKILL.md
├── smart-commit/SKILL.md
├── suggest/SKILL.md
├── code-review/SKILL.md
├── test-gen/SKILL.md
├── explain/SKILL.md
├── sec-audit/SKILL.md
├── release-notes/SKILL.md
├── lead-engineer/                  ← Lead Engineer pack
│   ├── sprint-plan/SKILL.md
│   ├── arch-review/SKILL.md
│   └── ...
├── architect/                      ← Technical Architect pack
│   ├── system-design/SKILL.md
│   └── ...
├── qa/                             ← QA / Testing pack
│   ├── test-plan/SKILL.md
│   └── ...
├── automation-qa/                  ← Automation QA pack
│   ├── cypress-test/SKILL.md
│   └── ...
├── cloud-engineer/                 ← AWS Cloud Engineer pack
│   ├── vpc-design/SKILL.md
│   └── ...
├── designer/                       ← UI/UX Designer pack
│   ├── wireframe/SKILL.md
│   └── ...
├── business/                       ← Business / Product pack
│   ├── prd-write/SKILL.md
│   └── ...
└── docs/
    ├── index.html                  ← Skills documentation site
    └── announcement-email.html     ← Team announcement template
```

---

## License

Copyright © 2026 **Heaptrace Technology Private Limited**

This repository and its contents are **confidential and proprietary**. Skills are provided exclusively to licensed clients and their development teams for internal use only.

**You MAY:**
- Use within your development team
- Customize and tune for your project
- Use with Claude Code, Cursor, or any AI coding tool

**You MAY NOT:**
- Redistribute, share, or publish publicly
- Sell, sublicense, or transfer to third parties
- Remove or modify copyright notices
- Commit skill files to any public or shared repository

Contact: **support@heaptrace.com**
