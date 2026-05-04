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
name: ux-audit
description: "Audit existing UI for usability issues using Nielsen's 10 heuristics, consistency checks, cognitive load analysis, task completion paths, and pain point identification. Use when reviewing a shipped feature, preparing for a redesign, or investigating user complaints."
---

# UX Audit — Find What is Broken Before Users Do

Systematically evaluates existing UI against usability heuristics, consistency standards, cognitive load thresholds, and task completion efficiency. A UX audit identifies pain points, ranks them by severity, and recommends concrete fixes with before/after mockups.

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
│  1. UNDERSTAND BEFORE YOU JUDGE                              │
│     → Use the feature as a real user would                   │
│     → Read the original requirements and intent              │
│     → Understand the constraints the team worked under       │
│     → Never critique without proposing a solution            │
│                                                              │
│  2. REUSE — NEVER REINVENT                                   │
│     → Recommend existing components over custom builds       │
│     → If a fix exists elsewhere in the app, reference it     │
│     → Shared patterns fix consistency issues faster          │
│     → Ask: "Is this solved elsewhere in the product?"        │
│                                                              │
│  3. USE EXISTING DESIGN LANGUAGE                             │
│     → Fixes should use existing tokens and components        │
│     → Don't propose new patterns when existing ones work     │
│     → Follow the project's established conventions           │
│                                                              │
│  4. ASK BEFORE RECOMMENDING ANYTHING NEW                     │
│     → New interaction pattern? → ASK first                   │
│     → New component? → ASK first                             │
│     → New navigation paradigm? → ASK first                   │
│     → Redesign of core layout? → ASK first                   │
│     → Never propose radical changes without confirmation     │
│                                                              │
│  5. PRIORITIZE BY IMPACT                                     │
│     → Severity 1: Blocks task completion (fix now)           │
│     → Severity 2: Causes confusion or errors (fix soon)      │
│     → Severity 3: Reduces efficiency (plan fix)              │
│     → Severity 4: Minor polish (backlog)                     │
│                                                              │
│  6. COMMUNICATE VISUALLY                                     │
│     → Always include before/after ASCII mockups              │
│     → Show the problem and the fix side by side              │
│     → Annotate what changed and why                          │
│     → Use screenshots/references where possible              │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Step-by-Step Process

### Step 1: Define Audit Scope

```
AUDIT SCOPE TEMPLATE:
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Feature/Area:    ________________________________________  │
│  Pages to review: ________________________________________  │
│  User roles:      ________________________________________  │
│  Key tasks:       ________________________________________  │
│  Known complaints:________________________________________  │
│  Last updated:    ________________________________________  │
│                                                             │
│  Audit Type:                                                │
│  □ Full audit (all 10 heuristics)                           │
│  □ Focused audit (specific heuristics)                      │
│  □ Consistency audit (cross-page comparison)                │
│  □ Task-based audit (specific user task)                    │
│  □ Comparative audit (against competitor/benchmark)         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Step 2: Apply Nielsen's 10 Usability Heuristics

Evaluate the UI against each heuristic:

```
┌──────────────────────────────────────────────────────────────┐
│  NIELSEN'S 10 USABILITY HEURISTICS — EVALUATION FRAMEWORK    │
│                                                              │
│  Rate each: ✅ Pass  ⚠️ Issues  ❌ Fail  N/A Not Applicable │
└──────────────────────────────────────────────────────────────┘

H1: VISIBILITY OF SYSTEM STATUS
┌──────────────────────────────────────────────────────────────┐
│  "Does the system tell users what is happening?"             │
│                                                              │
│  Check for:                                                  │
│  □ Loading indicators when data is being fetched             │
│  □ Progress bars for multi-step processes                    │
│  □ Success/error feedback after actions                      │
│  □ Active state on current navigation item                   │
│  □ Saving indicators for auto-save                           │
│  □ Real-time updates (or last-updated timestamps)            │
│  □ Upload progress for file uploads                          │
│  □ Character/word counts on limited inputs                   │
│                                                              │
│  Common violations:                                          │
│  ✕ Button clicked but no visual feedback                     │
│  ✕ Form submitted but no confirmation                        │
│  ✕ Data loading with no skeleton/spinner                     │
│  ✕ Navigation changes with no active state indicator         │
│                                                              │
│  BEFORE (violation):              AFTER (fix):               │
│  ┌──────────────────┐            ┌──────────────────┐        │
│  │  [Save]          │            │  [✓ Saved]       │        │
│  │                  │            │  Changes saved    │        │
│  │  (nothing        │            │  just now         │        │
│  │   happens)       │            │                   │        │
│  └──────────────────┘            └──────────────────┘        │
└──────────────────────────────────────────────────────────────┘

H2: MATCH BETWEEN SYSTEM AND REAL WORLD
┌──────────────────────────────────────────────────────────────┐
│  "Does the system speak the user's language?"                │
│                                                              │
│  Check for:                                                  │
│  □ Jargon-free labels (no developer terms in UI)             │
│  □ Icons that match real-world metaphors                     │
│  □ Dates in user's locale format                             │
│  □ Numbers formatted with proper separators                  │
│  □ Natural reading order (left-to-right, top-to-bottom)      │
│  □ Actions named as verbs users understand                   │
│                                                              │
│  Common violations:                                          │
│  ✕ "Record created with ID: 550e8400-e29b-41d4-a716..."     │
│  ✕ "Status: ENUM_ACTIVE_PUBLISHED"                          │
│  ✕ "Timestamp: 2026-03-20T14:30:00.000Z"                    │
│  ✕ Error: "ValidationError: path.required"                   │
│                                                              │
│  BEFORE:                           AFTER:                    │
│  "Record 550e8400..."              "Course created!"         │
│  "ENUM_ACTIVE"                     "Active"                  │
│  "2026-03-20T14:30:00Z"           "Mar 20, 2026"            │
└──────────────────────────────────────────────────────────────┘

H3: USER CONTROL AND FREEDOM
┌──────────────────────────────────────────────────────────────┐
│  "Can users easily undo, redo, and escape?"                  │
│                                                              │
│  Check for:                                                  │
│  □ Cancel buttons on all forms and dialogs                   │
│  □ Undo for destructive actions (or confirmation dialog)     │
│  □ Back navigation always works                              │
│  □ Escape key closes modals                                  │
│  □ Clear/reset options on filters                            │
│  □ Draft saving for long forms                               │
│  □ Ability to deselect / change selections                   │
│                                                              │
│  BEFORE:                           AFTER:                    │
│  ┌──────────────────┐             ┌──────────────────┐       │
│  │ Are you sure     │             │ Course deleted.   │       │
│  │ you want to      │             │                   │       │
│  │ delete this?     │             │ [Undo] (5s)       │       │
│  │                  │             │                   │       │
│  │ [Delete Forever] │             │ (soft delete +    │       │
│  │                  │             │  undo window)     │       │
│  └──────────────────┘             └──────────────────┘       │
└──────────────────────────────────────────────────────────────┘

H4: CONSISTENCY AND STANDARDS
┌──────────────────────────────────────────────────────────────┐
│  "Do similar things look and behave the same?"               │
│                                                              │
│  Check for:                                                  │
│  □ Same action, same button style across pages               │
│  □ Same data, same display format across pages               │
│  □ Same terminology for same concepts everywhere             │
│  □ Same icon meanings across the app                         │
│  □ Same filter/sort patterns across listing pages            │
│  □ Same form field order for similar data                    │
│  □ Same toast/notification patterns                          │
│  □ Same error message format                                 │
│                                                              │
│  CROSS-PAGE CONSISTENCY MATRIX:                              │
│  ┌──────────┬────────┬────────┬────────┬────────┐            │
│  │ Pattern  │Page A  │Page B  │Page C  │Match?  │            │
│  ├──────────┼────────┼────────┼────────┼────────┤            │
│  │ CTA btn  │ Blue   │ Blue   │ Green  │ ✕ No   │            │
│  │ Date fmt │ Mar 20 │ 3/20   │ 20 Mar │ ✕ No   │            │
│  │ Filters  │ Top    │ Top    │ Side   │ ✕ No   │            │
│  │ Empty st │ Has    │ None   │ Has    │ ✕ No   │            │
│  └──────────┴────────┴────────┴────────┴────────┘            │
└──────────────────────────────────────────────────────────────┘

H5: ERROR PREVENTION
┌──────────────────────────────────────────────────────────────┐
│  "Does the system prevent errors before they happen?"        │
│                                                              │
│  Check for:                                                  │
│  □ Inline validation as user types (not just on submit)      │
│  □ Confirmation dialogs for destructive actions              │
│  □ Disabled buttons when form is invalid                     │
│  □ Type constraints on inputs (number, date, email)          │
│  □ Character limits shown before exceeded                    │
│  □ Sensible defaults that reduce required input              │
│  □ Autocomplete for known values                             │
│  □ Preview before publishing                                 │
└──────────────────────────────────────────────────────────────┘

H6: RECOGNITION RATHER THAN RECALL
┌──────────────────────────────────────────────────────────────┐
│  "Can users see their options instead of remembering?"       │
│                                                              │
│  Check for:                                                  │
│  □ Breadcrumbs showing navigation path                       │
│  □ Recently used items or suggestions                        │
│  □ Autocomplete and search-as-you-type                       │
│  □ Contextual help text near complex fields                  │
│  □ Visible labels (not just placeholder text)                │
│  □ Dashboard showing recent/frequent items                   │
│  □ Filter values visible (not hidden behind menus)           │
└──────────────────────────────────────────────────────────────┘

H7: FLEXIBILITY AND EFFICIENCY OF USE
┌──────────────────────────────────────────────────────────────┐
│  "Can power users work faster?"                              │
│                                                              │
│  Check for:                                                  │
│  □ Keyboard shortcuts for frequent actions                   │
│  □ Bulk actions (select all, batch delete, batch assign)     │
│  □ Search/filter that is quick to use                        │
│  □ Saved filters or views                                    │
│  □ Drag-and-drop for reordering                              │
│  □ Inline editing (click to edit without opening modal)      │
│  □ Tab navigation through forms                              │
└──────────────────────────────────────────────────────────────┘

H8: AESTHETIC AND MINIMALIST DESIGN
┌──────────────────────────────────────────────────────────────┐
│  "Is every element necessary and purposeful?"                │
│                                                              │
│  Check for:                                                  │
│  □ No redundant information on screen                        │
│  □ Visual hierarchy guides the eye to what matters           │
│  □ White space used intentionally (not cramped)              │
│  □ Colors used sparingly (not rainbow UI)                    │
│  □ Icons used to clarify, not decorate                       │
│  □ Progressive disclosure (details on demand)                │
│                                                              │
│  BEFORE (cluttered):              AFTER (clean):             │
│  ┌──────────────────┐            ┌──────────────────┐        │
│  │ Title: Course    │            │                   │        │
│  │ Status: Active   │            │  Course Title     │        │
│  │ ID: ABC-123      │            │  ● Active         │        │
│  │ Created: Mar 20  │            │                   │        │
│  │ Updated: Mar 21  │            │  Created Mar 20   │        │
│  │ Author: John     │            │  by John          │        │
│  │ Version: 2.1     │            │                   │        │
│  │ Format: Online   │            │  [View] [Edit]    │        │
│  │ [View][Edit]     │            │                   │        │
│  │ [Clone][Share]   │            │  ⋮ More actions   │        │
│  │ [Export][Delete]  │            │                   │        │
│  └──────────────────┘            └──────────────────┘        │
│  (11 elements competing)         (6 elements, clear focus)   │
└──────────────────────────────────────────────────────────────┘

H9: HELP USERS RECOGNIZE, DIAGNOSE, AND RECOVER FROM ERRORS
┌──────────────────────────────────────────────────────────────┐
│  "Are error messages helpful and actionable?"                │
│                                                              │
│  Check for:                                                  │
│  □ Error messages in plain language                          │
│  □ Errors point to the specific field with the problem       │
│  □ Errors suggest how to fix the issue                       │
│  □ Errors don't blame the user                               │
│  □ Network errors have retry actions                         │
│  □ 404 pages have navigation options                         │
│                                                              │
│  BEFORE (bad error):              AFTER (good error):        │
│  ┌──────────────────┐            ┌──────────────────┐        │
│  │ Error: 422       │            │ Title is required │        │
│  │ Unprocessable    │            │                   │        │
│  │ Entity           │            │ Please enter a    │        │
│  │                  │            │ course title to   │        │
│  │ [OK]             │            │ continue.         │        │
│  └──────────────────┘            └──────────────────┘        │
└──────────────────────────────────────────────────────────────┘

H10: HELP AND DOCUMENTATION
┌──────────────────────────────────────────────────────────────┐
│  "Can users find help when they need it?"                    │
│                                                              │
│  Check for:                                                  │
│  □ Tooltips on complex icons or features                     │
│  □ Contextual help links near complex areas                  │
│  □ Onboarding flow for first-time users                      │
│  □ Empty states that teach how to use the feature            │
│  □ Searchable help/docs accessible from the app              │
│  □ Inline hints for complex form fields                      │
└──────────────────────────────────────────────────────────────┘
```

### Step 3: Cognitive Load Analysis

```
COGNITIVE LOAD ASSESSMENT:

  Count the decisions a user must make on each screen:

  ┌──────────────────────────────────────────────────────────┐
  │  Screen: Course Creation Form                            │
  │                                                          │
  │  Decisions required:                                     │
  │  1. What title to enter               (recall - HIGH)    │
  │  2. What description to write         (recall - HIGH)    │
  │  3. Which category to pick            (recognition - LOW)│
  │  4. Which difficulty to set           (recognition - LOW)│
  │  5. What tags to add                  (recall - MEDIUM)  │
  │  6. Whether to upload thumbnail       (optional - LOW)   │
  │  7. Submit or cancel                  (binary - LOW)     │
  │                                                          │
  │  Cognitive load score: 2 HIGH + 1 MEDIUM + 4 LOW = MEDIUM│
  │                                                          │
  │  Reduction strategies:                                   │
  │  → Auto-suggest titles based on content                  │
  │  → AI-generate description from title                    │
  │  → Default category from user's most-used                │
  │  → Suggest popular tags                                  │
  └──────────────────────────────────────────────────────────┘

  COGNITIVE LOAD THRESHOLDS:

  ┌──────────────────────────────────────────────────────┐
  │  Decisions per screen:                               │
  │  1-3 decisions    → LOW load  (ideal for quick tasks)│
  │  4-7 decisions    → MEDIUM    (acceptable for forms) │
  │  8-12 decisions   → HIGH      (consider splitting)   │
  │  13+ decisions    → OVERLOAD  (must reduce/split)    │
  └──────────────────────────────────────────────────────┘
```

### Step 4: Task Completion Path Analysis

```
TASK: "Enroll a user in a course"

  Step  │ Screen             │ Actions Required │ Potential Friction
  ──────┼────────────────────┼──────────────────┼────────────────────
  1     │ Dashboard          │ Navigate to Users│ Is "Users" visible?
  2     │ Users list         │ Find the user    │ Can they search?
  3     │ User detail        │ Click "Courses"  │ Is the tab obvious?
  4     │ User courses tab   │ Click "Enroll"   │ Is button visible?
  5     │ Enroll dialog      │ Search course    │ Can they filter?
  6     │ Enroll dialog      │ Select + confirm │ Is confirm clear?
  7     │ User courses tab   │ See enrollment   │ Does list refresh?

  Total steps: 7
  Minimum clicks: 5
  Friction points: 3

  EFFICIENCY RATING:
  ┌────────────────────────────────────────────────────┐
  │  1-3 steps:  Excellent (single-screen tasks)       │
  │  4-6 steps:  Good (standard CRUD)                  │
  │  7-10 steps: Acceptable (complex multi-entity)     │
  │  11+ steps:  Too many — find shortcuts             │
  └────────────────────────────────────────────────────┘
```

---

## Audit Report Format

```
┌──────────────────────────────────────────────────────────────┐
│  UX AUDIT FINDING                                            │
│                                                              │
│  ID:        UX-001                                           │
│  Heuristic: H1 — Visibility of System Status                 │
│  Severity:  ●●●○ High                                        │
│  Page:      /courses (Courses listing page)                  │
│  Impact:    Users don't know if actions succeeded             │
│                                                              │
│  Problem:                                                    │
│  When a user clicks "Delete" on a course, the confirmation   │
│  dialog closes but there is no toast or visual feedback       │
│  that the deletion was successful. The course just            │
│  disappears from the list.                                   │
│                                                              │
│  BEFORE:                                                     │
│  ┌──────────────────────┐                                    │
│  │ [Confirm Delete?]    │     ┌──────────────────┐           │
│  │                      │ ──▶ │ (course just     │           │
│  │ [Cancel] [Delete]    │     │  vanishes, no    │           │
│  └──────────────────────┘     │  feedback)       │           │
│                               └──────────────────┘           │
│                                                              │
│  AFTER (recommended):                                        │
│  ┌──────────────────────┐     ┌──────────────────┐           │
│  │ [Confirm Delete?]    │     │ ┌──── Toast ───┐ │           │
│  │                      │ ──▶ │ │ ✓ Course     │ │           │
│  │ [Cancel] [Delete]    │     │ │   deleted    │ │           │
│  └──────────────────────┘     │ │   [Undo]    │ │           │
│                               │ └─────────────┘ │           │
│                               └──────────────────┘           │
│                                                              │
│  Fix effort: Low (add toast notification)                    │
│  Component:  Use existing `toastSuccess()` utility           │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Severity Rating Scale

```
  Severity   │ Label      │ Criteria                          │ Action
  ───────────┼────────────┼───────────────────────────────────┼─────────
  ●●●● (4)  │ Critical   │ Blocks task completion,           │ Fix NOW
             │            │ causes data loss, breaks flow     │
  ●●●○ (3)  │ High       │ Causes user confusion,            │ Fix this
             │            │ leads to errors, workaround exists│ sprint
  ●●○○ (2)  │ Medium     │ Reduces efficiency,               │ Plan fix
             │            │ minor annoyance, not blocking     │
  ●○○○ (1)  │ Low        │ Cosmetic issue, minor polish,     │ Backlog
             │            │ does not affect task completion    │
```

---

## Common Mistakes When Auditing

```
MISTAKE 1: Auditing without using the feature

  Rule: Complete the primary task yourself before auditing.
  Walk through: Create, Read, Update, Delete as each user role.

MISTAKE 2: Reporting problems without solutions

  BAD:  "The button color is wrong"
  GOOD: "The delete button uses primary (blue) style, which signals
         a constructive action. Switch to variant='destructive'
         (red) to match the destructive action pattern used on
         the Users page."

MISTAKE 3: Treating all issues as equal severity

  Rule: Use the 4-level severity scale. Not everything is critical.
  Sort findings by severity, then by fix effort (quick wins first).

MISTAKE 4: Only checking the happy path

  Rule: Test with 0 items, 1 item, 100 items, invalid input,
  expired sessions, permission denied, slow network.
```

---

## Output Format

When delivering a UX audit, always provide:

1. **Audit scope** — what was reviewed, which roles, which tasks
2. **Heuristic scores** — pass/issue/fail for each of 10 heuristics
3. **Findings list** — each finding with ID, heuristic, severity, before/after
4. **Cognitive load analysis** — decisions per screen, load score
5. **Task completion analysis** — steps, clicks, friction points
6. **Priority matrix** — findings ranked by severity and fix effort
7. **Quick wins** — low-effort, high-impact fixes to do first
8. **Consistency matrix** — cross-page comparison of patterns
9. **Recommendations** — specific, actionable changes with component references
