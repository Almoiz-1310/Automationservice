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
name: wireframe
description: "Create detailed ASCII wireframes with layout structure, component placement, responsive breakpoints, grid systems, spacing rhythm, and content hierarchy. Use when planning new pages, redesigning existing layouts, or communicating UI structure to developers."
---

# Wireframe — Structure Before Pixels

Creates detailed ASCII wireframes that communicate page layout, component placement, grid structure, spacing rhythm, responsive behavior, and content hierarchy. Wireframes bridge the gap between product requirements and implementation-ready UI specs.

---

## Common Rules — Read Before Every Task

```
┌──────────────────────────────────────────────────────────────┐
│              MANDATORY RULES FOR EVERY TASK                  │
│                                                              │
│  You are a senior UI/UX designer working with developers.    │
│  You think visually, communicate through diagrams, and       │
│  bridge design intent with implementation reality.           │
│                                                              │
│  ────────────────────────────────────────────────────────    │
│                                                              │
│  1. UNDERSTAND BEFORE YOU DESIGN                             │
│     → Study the existing UI patterns and components first    │
│     → Read how similar pages are already laid out            │
│     → Identify existing design tokens, spacing, and grids   │
│     → Never assume — look at the actual codebase/designs    │
│                                                              │
│  2. REUSE — NEVER REINVENT                                   │
│     → Search for existing components and patterns            │
│     → If a similar layout exists, adapt it — don't redesign │
│     → Shared patterns go in shared specs, not repeated       │
│     → Ask: "Does this pattern already exist somewhere?"      │
│                                                              │
│  3. USE EXISTING DESIGN LANGUAGE                             │
│     → Use the design tokens already in the project           │
│     → Don't introduce new spacing/color if existing works    │
│     → Follow the project's established visual patterns       │
│                                                              │
│  4. ASK BEFORE ADDING ANYTHING NEW                           │
│     → New layout pattern? → ASK first                        │
│     → New component type? → ASK first                        │
│     → New grid structure? → ASK first                        │
│     → New navigation pattern? → ASK first                    │
│     → Never introduce new patterns without confirmation      │
│                                                              │
│  5. DESIGN FOR ALL STATES                                    │
│     → Empty state, loading state, error state, success state │
│     → Overflow text, missing data, permissions denied        │
│     → First-time user vs. power user                         │
│     → Single item vs. hundreds of items                      │
│                                                              │
│  6. COMMUNICATE VISUALLY                                     │
│     → Always include ASCII mockups in your output            │
│     → Show, don't just describe                              │
│     → Label every element with its purpose                   │
│     → Annotate interactive elements and behaviors            │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## When to Use This Skill

| Scenario | Use This? |
|----------|-----------|
| Planning a new page or screen | Yes |
| Redesigning an existing layout | Yes |
| Communicating layout to a developer | Yes |
| Deciding between layout approaches | Yes |
| Mockup for a single component only | No — use `design-handoff` |
| User journey or flow mapping | No — use `user-flow` |
| Accessibility-specific planning | No — use `a11y-design` |

---

## Step-by-Step Process

### Step 1: Gather Requirements

Before drawing anything, answer these questions:

```
┌─────────────────────────────────────────────────────────────┐
│  WIREFRAME REQUIREMENTS CHECKLIST                           │
│                                                             │
│  □ What is the primary action on this page?                 │
│  □ Who are the users? (roles, experience levels)            │
│  □ What data is displayed? (list, detail, form, dashboard)  │
│  □ What actions can users take? (CRUD, navigation, export)  │
│  □ What are the edge cases? (empty, error, overflow)        │
│  □ What existing pages does this relate to?                 │
│  □ Which devices must be supported?                         │
│  □ Are there role-based visibility differences?             │
└─────────────────────────────────────────────────────────────┘
```

### Step 2: Define the Grid System

Choose a grid that fits the content type:

```
12-COLUMN GRID (most common — dashboards, listing pages)
┌──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┐
│1 │2 │3 │4 │5 │6 │7 │8 │9 │10│11│12│  Desktop: 1280px+
└──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┘
  col-span-3    col-span-6    col-span-3
  (sidebar)     (main content) (aside)

8-COLUMN GRID (content-heavy — articles, forms)
┌────┬────┬────┬────┬────┬────┬────┬────┐
│ 1  │ 2  │ 3  │ 4  │ 5  │ 6  │ 7  │ 8  │
└────┴────┴────┴────┴────┴────┴────┴────┘
      col-span-6 (content)     col-span-2

SINGLE-COLUMN (mobile, modals, wizards)
┌──────────────────────────────────┐
│          Full width              │
└──────────────────────────────────┘
```

**Grid Decision Tree:**

```
What type of page?
├── Dashboard / Admin panel
│   └── 12-column grid (sidebar + main + optional aside)
├── Content / Article / Detail view
│   └── 8-column grid (centered content + optional sidebar)
├── Form / Wizard / Auth
│   └── Single-column centered (max-width: 480-640px)
├── Listing / Table view
│   └── 12-column full-width (table stretches)
└── Modal / Dialog
    └── Single-column (sm: 400px, md: 560px, lg: 720px)
```

### Step 3: Establish Content Hierarchy

Map the visual hierarchy using size, weight, and position:

```
HIERARCHY LEVELS:
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  ██████████████████████████  ← Level 1: Page Title (H1)     │
│  24-32px, bold, top of page                                  │
│                                                              │
│  ████████████████  ← Level 2: Section Header (H2)           │
│  18-20px, semibold                                           │
│                                                              │
│  ██████████  ← Level 3: Subsection / Card Title (H3)        │
│  14-16px, medium                                             │
│                                                              │
│  ████████████████████████████████  ← Level 4: Body text      │
│  14px, regular, secondary color                              │
│                                                              │
│  ██████  ← Level 5: Caption / Helper text                   │
│  12px, muted color                                           │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Step 4: Draw the Wireframe

Use box-drawing characters for clean, precise layouts.

**Character Reference:**

```
Borders:  ┌ ─ ┐ │ └ ┘ ├ ┤ ┬ ┴ ┼
Arrows:   → ← ↑ ↓ ▶ ▼ ◀ ▲
Fills:    █ ▓ ░ ▒ ■ □
Checks:   ☑ ☐ ● ○
Stars:    ★ ☆
```

#### Example: Dashboard Page Wireframe

```
┌──────────────────────────────────────────────────────────────────────────┐
│  ┌─ Top Bar ─────────────────────────────────────────────────────────┐  │
│  │  [≡]  Logo Text          🔍 Search...        [🔔 3] [Avatar ▾]  │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│  ┌─ Sidebar ──┐  ┌─ Main Content ──────────────────────────────────┐  │
│  │            │  │                                                  │  │
│  │  Dashboard │  │  Dashboard                    [+ New Course]    │  │
│  │  ● Courses │  │  Welcome back, Sarah                            │  │
│  │  ○ Users   │  │                                                  │  │
│  │  ○ Paths   │  │  ┌─ Stat Card ──┐  ┌─ Stat Card ──┐            │  │
│  │  ○ Reports │  │  │  Total       │  │  Active       │            │  │
│  │            │  │  │  Courses     │  │  Learners     │            │  │
│  │  ──────    │  │  │              │  │               │            │  │
│  │  ○ Settings│  │  │  ██ 24       │  │  ██ 156       │            │  │
│  │  ○ Help    │  │  │  ↑ 12%      │  │  ↑ 8%        │            │  │
│  │            │  │  └──────────────┘  └───────────────┘            │  │
│  │            │  │                                                  │  │
│  │            │  │  ┌─ Stat Card ──┐  ┌─ Stat Card ──┐            │  │
│  │            │  │  │  Completion  │  │  Avg. Score   │            │  │
│  │            │  │  │  Rate        │  │               │            │  │
│  │            │  │  │              │  │               │            │  │
│  │            │  │  │  ██ 73%      │  │  ██ 82%       │            │  │
│  │            │  │  │  ↓ 3%       │  │  ↑ 5%        │            │  │
│  │            │  │  └──────────────┘  └───────────────┘            │  │
│  │            │  │                                                  │  │
│  │            │  │  Recent Activity                                │  │
│  │            │  │  ┌──────────────────────────────────────────┐    │  │
│  │            │  │  │  Name          Course        Status      │    │  │
│  │            │  │  ├──────────────────────────────────────────┤    │  │
│  │            │  │  │  J. Smith     React Basics   Completed   │    │  │
│  │            │  │  │  A. Jones     Node.js API    In Progress │    │  │
│  │            │  │  │  M. Lee       UX Design      Not Started │    │  │
│  │            │  │  └──────────────────────────────────────────┘    │  │
│  │            │  │                                                  │  │
│  └────────────┘  └──────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────┘
```

#### Example: Form Page Wireframe

```
┌──────────────────────────────────────────────────────────────┐
│                  Create New Course                           │
│                  Fill in the course details below             │
│                                                              │
│  ┌─ Course Details ────────────────────────────────────────┐ │
│  │                                                          │ │
│  │  Course Title *                                          │ │
│  │  ┌──────────────────────────────────────────────────┐    │ │
│  │  │  Introduction to Machine Learning                │    │ │
│  │  └──────────────────────────────────────────────────┘    │ │
│  │                                                          │ │
│  │  Description                                             │ │
│  │  ┌──────────────────────────────────────────────────┐    │ │
│  │  │                                                  │    │ │
│  │  │  A comprehensive introduction to ML...           │    │ │
│  │  │                                                  │    │ │
│  │  └──────────────────────────────────────────────────┘    │ │
│  │  0/500 characters                                        │ │
│  │                                                          │ │
│  │  Category *                      Difficulty              │ │
│  │  ┌────────────────────┐          ┌──────────────────┐    │ │
│  │  │  Technology      ▾ │          │  Beginner      ▾ │    │ │
│  │  └────────────────────┘          └──────────────────┘    │ │
│  │                                                          │ │
│  │  Tags                                                    │ │
│  │  ┌──────────────────────────────────────────────────┐    │ │
│  │  │  [ML ✕] [Python ✕] [Data Science ✕]  |          │    │ │
│  │  └──────────────────────────────────────────────────┘    │ │
│  │                                                          │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌─ Thumbnail ─────────────────────────────────────────────┐ │
│  │                                                          │ │
│  │     ┌──────────────────────┐                             │ │
│  │     │                      │                             │ │
│  │     │    📷 Drop image     │     Recommended: 1200x630  │ │
│  │     │    or click to       │     Max size: 5MB           │ │
│  │     │    browse            │     Formats: PNG, JPG       │ │
│  │     │                      │                             │ │
│  │     └──────────────────────┘                             │ │
│  │                                                          │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                              │
│                        [ Cancel ]  [ Create Course ]         │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Step 5: Annotate Spacing and Dimensions

Add spacing annotations to guide developers:

```
SPACING RHYTHM (use consistent multiples):

  Base unit: 4px
  ├── 4px   (xs)  — between icon and label
  ├── 8px   (sm)  — between related elements
  ├── 12px  (md)  — between form fields
  ├── 16px  (base)— standard padding
  ├── 24px  (lg)  — between sections
  ├── 32px  (xl)  — between major blocks
  └── 48px  (2xl) — page-level margins

ANNOTATED EXAMPLE:
                    24px padding
              ┌─────────┤├─────────┐
              │                    │
    16px ─────│  Section Title     │
              │                    │── 12px gap
              │  ┌──────────────┐  │
              │  │  Input field  │  │
              │  └──────────────┘  │
              │         │          │
              │     12px gap       │
              │         │          │
              │  ┌──────────────┐  │
              │  │  Input field  │  │
              │  └──────────────┘  │
              │                    │── 24px gap
              │  [ Cancel ] [Save] │
              │        8px gap ──▶ │
              │                    │
              └────────────────────┘
```

### Step 6: Define Responsive Breakpoints

Show how the layout transforms across breakpoints:

```
BREAKPOINT STRATEGY:

  Mobile:    320px - 767px    (1 column, stack everything)
  Tablet:    768px - 1023px   (2 columns, collapsible sidebar)
  Desktop:   1024px - 1439px  (3 columns, full layout)
  Wide:      1440px+          (3 columns, max-width container)


RESPONSIVE TRANSFORMATION:

Desktop (1280px):
┌────────┬──────────────────────────────┬──────────┐
│Sidebar │      Main Content            │  Aside   │
│ 240px  │      flex-1                  │  280px   │
│        │                              │          │
│  Nav   │  ┌─Card─┐ ┌─Card─┐ ┌─Card─┐ │  Recent  │
│  items │  │      │ │      │ │      │ │  Feed    │
│        │  └──────┘ └──────┘ └──────┘ │          │
└────────┴──────────────────────────────┴──────────┘

Tablet (768px):
┌──────────────────────────────────────────────────┐
│  [≡] Logo            Search        [🔔] [Avatar] │
├──────────────────────────────────────────────────┤
│  Main Content (full width, sidebar collapsed)    │
│                                                  │
│  ┌──── Card ────┐  ┌──── Card ────┐              │
│  │              │  │              │              │
│  └──────────────┘  └──────────────┘              │
│  ┌──── Card ────┐                                │
│  │              │   Aside content moves below    │
│  └──────────────┘                                │
│                                                  │
│  ┌─ Recent Feed ─────────────────────────────┐   │
│  │ (full width, below main)                  │   │
│  └───────────────────────────────────────────┘   │
└──────────────────────────────────────────────────┘

Mobile (375px):
┌─────────────────────────────┐
│  [≡]  Logo        [🔔] [Av] │
├─────────────────────────────┤
│  Main Content               │
│                             │
│  ┌─── Card ──────────────┐  │
│  │                       │  │
│  └───────────────────────┘  │
│  ┌─── Card ──────────────┐  │
│  │                       │  │
│  └───────────────────────┘  │
│  ┌─── Card ──────────────┐  │
│  │                       │  │
│  └───────────────────────┘  │
│                             │
│  ┌─ Recent Feed ─────────┐  │
│  │                       │  │
│  └───────────────────────┘  │
│                             │
├─────────────────────────────┤
│  🏠  📚  👤  ⚙️  ≡          │
│  Bottom Tab Navigation      │
└─────────────────────────────┘
```

### Step 7: Document All States

Every wireframe must show these states:

```
STATE CHECKLIST:
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  □ Default — populated with realistic data                  │
│  □ Empty — no data, first-time user                         │
│  □ Loading — skeleton/spinner placement                     │
│  □ Error — validation errors, API failures                  │
│  □ Overflow — very long text, many items, pagination        │
│  □ Single item — only one record                            │
│  □ Permission-denied — user lacks access                    │
│  □ Success — after completing an action                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘

EMPTY STATE EXAMPLE:
┌──────────────────────────────────────────────────┐
│                                                  │
│          ┌──────────────────────┐                │
│          │                      │                │
│          │     📚               │                │
│          │                      │                │
│          │  No courses yet      │                │
│          │                      │                │
│          │  Create your first   │                │
│          │  course to get       │                │
│          │  started.            │                │
│          │                      │                │
│          │  [ + Create Course ] │                │
│          │                      │                │
│          └──────────────────────┘                │
│                                                  │
└──────────────────────────────────────────────────┘

LOADING STATE EXAMPLE:
┌──────────────────────────────────────────────────┐
│                                                  │
│  ░░░░░░░░░░░░░░░░░░░░░░  ← Skeleton title       │
│  ░░░░░░░░░░░░░                                   │
│                                                  │
│  ┌──────────────────┐  ┌──────────────────┐      │
│  │ ░░░░░░░░░░░░░░░░ │  │ ░░░░░░░░░░░░░░░░ │      │
│  │ ░░░░░░░░░░       │  │ ░░░░░░░░░░       │      │
│  │ ░░░░░░░░░░░░░    │  │ ░░░░░░░░░░░░░    │      │
│  └──────────────────┘  └──────────────────┘      │
│                                                  │
│  ┌──────────────────┐  ┌──────────────────┐      │
│  │ ░░░░░░░░░░░░░░░░ │  │ ░░░░░░░░░░░░░░░░ │      │
│  │ ░░░░░░░░░░       │  │ ░░░░░░░░░░       │      │
│  │ ░░░░░░░░░░░░░    │  │ ░░░░░░░░░░░░░    │      │
│  └──────────────────┘  └──────────────────┘      │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

## Component Placement Patterns

### Common Page Layouts

```
PATTERN 1: Listing Page (table with filters)
┌──────────────────────────────────────────────────┐
│  Page Title                    [ + Create New ]  │
│  Description text                                │
│                                                  │
│  ┌ Filters ──────────────────────────────────┐   │
│  │ [Status ▾]  [Category ▾]  [Sort ▾]  🔍   │   │
│  └───────────────────────────────────────────┘   │
│                                                  │
│  ┌ Table ────────────────────────────────────┐   │
│  │  ☐  Name ▾    Status    Date     Actions  │   │
│  ├───────────────────────────────────────────┤   │
│  │  ☐  Item 1    Active    Mar 20   [⋮]     │   │
│  │  ☐  Item 2    Draft     Mar 19   [⋮]     │   │
│  │  ☐  Item 3    Archived  Mar 18   [⋮]     │   │
│  └───────────────────────────────────────────┘   │
│                                                  │
│  Showing 1-10 of 45          [< 1 2 3 4 5 >]    │
└──────────────────────────────────────────────────┘

PATTERN 2: Detail Page (view + edit)
┌──────────────────────────────────────────────────┐
│  ← Back to list                                  │
│                                                  │
│  ┌─ Header ──────────────────────────────────┐   │
│  │  [Avatar]  Entity Name       [ Edit ]     │   │
│  │            Status: Active    [ Delete ]   │   │
│  │            Created: Mar 20, 2026          │   │
│  └───────────────────────────────────────────┘   │
│                                                  │
│  ┌ Tabs ─────────────────────────────────────┐   │
│  │  [Overview]  [Settings]  [Activity]       │   │
│  ├───────────────────────────────────────────┤   │
│  │                                           │   │
│  │  Tab content area                         │   │
│  │                                           │   │
│  └───────────────────────────────────────────┘   │
└──────────────────────────────────────────────────┘

PATTERN 3: Card Grid (dashboard, catalog)
┌──────────────────────────────────────────────────┐
│  Page Title                    [Grid ▦] [List ≡] │
│  ┌ Filters ──────────────────────────────────┐   │
│  │ [Category ▾]  [Sort ▾]  🔍 Search...      │   │
│  └───────────────────────────────────────────┘   │
│                                                  │
│  ┌─ Card ───────┐  ┌─ Card ───────┐             │
│  │  [Thumbnail]  │  │  [Thumbnail]  │             │
│  │  Title        │  │  Title        │             │
│  │  Description  │  │  Description  │             │
│  │  ████░░ 60%   │  │  ██████ 100%  │             │
│  │  [View]       │  │  [View]       │             │
│  └───────────────┘  └───────────────┘             │
│  ┌─ Card ───────┐  ┌─ Card ───────┐             │
│  │  [Thumbnail]  │  │  [Thumbnail]  │             │
│  │  Title        │  │  Title        │             │
│  │  Description  │  │  Description  │             │
│  │  ██░░░░ 30%   │  │  ░░░░░░  0%   │             │
│  │  [View]       │  │  [View]       │             │
│  └───────────────┘  └───────────────┘             │
│                                                  │
│                    [ Load More ]                  │
└──────────────────────────────────────────────────┘
```

---

## Common Mistakes and Anti-Patterns

```
MISTAKE 1: No hierarchy — everything looks equally important

  BEFORE (bad):                    AFTER (good):
  ┌────────────────────┐          ┌────────────────────┐
  │  Title             │          │  TITLE              │
  │  Subtitle          │          │  subtitle (muted)   │
  │  Action            │          │                     │
  │  Note              │          │  [ Primary Action ] │
  │  Another note      │          │                     │
  │  [Button] [Button] │          │  Note text (small)  │
  └────────────────────┘          └────────────────────┘

MISTAKE 2: No spacing rhythm — random spacing everywhere

  BEFORE (bad):                    AFTER (good):
  ┌────────────────────┐          ┌────────────────────┐
  │Title               │          │                    │
  │                    │          │  Title              │
  │                    │          │                    │ 8px
  │Description         │          │  Description        │
  │[Button]            │          │                    │ 16px
  │                    │          │  [ Button ]         │
  │                    │          │                    │
  └────────────────────┘          └────────────────────┘

MISTAKE 3: Ignoring edge cases — only showing happy path

  MUST ALWAYS SHOW:
  □ What happens with 0 items?
  □ What happens with 1,000 items?
  □ What happens with a 200-character name?
  □ What happens on a 320px screen?
  □ What if the API returns an error?
  □ What if the user has no permissions?

MISTAKE 4: No alignment — elements scattered randomly

  BEFORE (bad):                    AFTER (good):
  ┌────────────────────┐          ┌────────────────────┐
  │    Title           │          │  Title              │
  │ Description        │          │  Description        │
  │      [Button]      │          │  [ Button ]         │
  │  Note              │          │  Note               │
  └────────────────────┘          └────────────────────┘
  Elements drift around            Everything left-aligned
```

---

## Wireframe Quality Checklist

Before delivering any wireframe, verify:

```
┌──────────────────────────────────────────────────────────────┐
│  WIREFRAME QUALITY CHECKLIST                                 │
│                                                              │
│  Layout Structure                                            │
│  □ Grid system defined (columns, gutters, margins)           │
│  □ Content hierarchy clear (H1 → H2 → body → caption)       │
│  □ Spacing rhythm consistent (4px base unit)                 │
│  □ Alignment is deliberate (left, center, right)             │
│  □ Visual weight balanced across the page                    │
│                                                              │
│  Component Placement                                         │
│  □ Primary action is visually prominent                      │
│  □ Navigation is consistent with other pages                 │
│  □ Form fields use consistent widths                         │
│  □ Tables have sortable headers marked                       │
│  □ Pagination or infinite scroll defined                     │
│                                                              │
│  States Covered                                              │
│  □ Default state with realistic data                         │
│  □ Empty state with helpful CTA                              │
│  □ Loading state with skeleton placement                     │
│  □ Error state with clear messaging                          │
│  □ Overflow state (long text, many items)                    │
│                                                              │
│  Responsive Design                                           │
│  □ Desktop layout defined                                    │
│  □ Tablet layout defined (768px breakpoint)                  │
│  □ Mobile layout defined (375px breakpoint)                  │
│  □ Touch targets are 44x44px minimum on mobile               │
│  □ Navigation pattern defined for each breakpoint            │
│                                                              │
│  Developer Readiness                                         │
│  □ Spacing values annotated                                  │
│  □ Interactive elements labeled                              │
│  □ Component names match codebase naming                     │
│  □ Behavior on interaction described                         │
│  □ Data source for each element noted                        │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Tools and Resources

| Tool | Purpose |
|------|---------|
| ASCII box-drawing characters | Primary wireframing tool in this skill |
| Excalidraw | Quick collaborative whiteboard wireframes |
| Figma | High-fidelity wireframes and prototypes |
| Whimsical | Flowcharts + wireframes combined |
| Balsamiq | Low-fidelity wireframes |

**Spacing Scale Reference:**

| Token | Value | Use |
|-------|-------|-----|
| `space-1` | 4px | Icon-to-label gap |
| `space-2` | 8px | Related element gap |
| `space-3` | 12px | Form field gap |
| `space-4` | 16px | Section padding |
| `space-6` | 24px | Section gap |
| `space-8` | 32px | Major block gap |
| `space-12` | 48px | Page margins |

---

## Output Format

When creating wireframes, always deliver:

1. **Requirements summary** — what was asked for
2. **Grid system** — which grid and why
3. **Desktop wireframe** — full annotated layout
4. **Tablet wireframe** — how it adapts at 768px
5. **Mobile wireframe** — how it adapts at 375px
6. **States** — empty, loading, error (as needed)
7. **Spacing annotations** — key spacing values
8. **Component notes** — which existing components to reuse
9. **Interaction notes** — what happens on click, hover, etc.
