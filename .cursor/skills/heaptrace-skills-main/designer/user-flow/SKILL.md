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
name: user-flow
description: "Map complete user journeys with entry points, decision trees, happy/error paths, exit points, multi-role flows, and state transitions. Use when planning features, onboarding flows, multi-step processes, or debugging UX bottlenecks."
---

# User Flow — Map Every Path a User Can Take

Maps complete user journeys from entry point to goal completion, including happy paths, error paths, decision branches, role-based variations, and state transitions. User flows reveal complexity before a single line of code is written.

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
│     → Read how similar flows are already implemented         │
│     → Identify existing navigation and routing patterns      │
│     → Never assume — look at the actual codebase/designs    │
│                                                              │
│  2. REUSE — NEVER REINVENT                                   │
│     → Search for existing flow patterns                      │
│     → If a similar journey exists, adapt it                  │
│     → Shared patterns go in shared specs, not repeated       │
│     → Ask: "Does this flow pattern already exist?"           │
│                                                              │
│  3. USE EXISTING DESIGN LANGUAGE                             │
│     → Use existing pages, modals, and navigation patterns    │
│     → Don't introduce new navigation paradigms carelessly    │
│     → Follow the project's established routing conventions   │
│                                                              │
│  4. ASK BEFORE ADDING ANYTHING NEW                           │
│     → New navigation pattern? → ASK first                    │
│     → New multi-step wizard? → ASK first                     │
│     → New authentication gate? → ASK first                   │
│     → New redirect behavior? → ASK first                     │
│     → Never introduce new patterns without confirmation      │
│                                                              │
│  5. DESIGN FOR ALL STATES                                    │
│     → Map the happy path first, then every unhappy path      │
│     → Permission denied, session expired, network failure    │
│     → What happens when the user goes back?                  │
│     → What happens when the user refreshes mid-flow?         │
│                                                              │
│  6. COMMUNICATE VISUALLY                                     │
│     → Always include ASCII flow diagrams in your output      │
│     → Show every decision point and branching path           │
│     → Label every arrow with the action or condition         │
│     → Use consistent notation throughout                     │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## When to Use This Skill

| Scenario | Use This? |
|----------|-----------|
| Planning a multi-step feature (onboarding, checkout) | Yes |
| Mapping all paths through an existing feature | Yes |
| Debugging why users drop off at a certain step | Yes |
| Documenting role-based access differences | Yes |
| Designing a single static page | No — use `wireframe` |
| Planning component interactions only | No — use `micro-interaction` |

---

## Flow Diagram Notation

Use consistent symbols throughout all diagrams:

```
NOTATION REFERENCE:

  ┌──────────┐
  │  Screen  │     Rectangle = Page / Screen / View
  └──────────┘

  ╔══════════╗
  ║ Decision ║     Double-border = Decision point
  ╚══════════╝

  ┌ ─ ─ ─ ─ ┐
  │  Modal   │     Dashed border = Modal / Dialog / Overlay
  └ ─ ─ ─ ─ ┘

  (( Action ))     Double parens = Background process / API call

  ● Start          Filled circle = Entry point
  ◉ End            Target circle = Terminal / Exit point

  ──── → ────      Solid arrow = User action / navigation
  - - - → - -      Dashed arrow = System action / redirect
  ════ → ════      Double arrow = Data flow

  ◇ Condition      Diamond = Branch condition
  ▼ Continue       Downward = Flow continues below
  ✕ Error          Cross = Error / failure state
```

---

## Step-by-Step Process

### Step 1: Identify the User Journey

```
┌─────────────────────────────────────────────────────────────┐
│  USER JOURNEY DEFINITION                                    │
│                                                             │
│  Answer these before mapping:                               │
│                                                             │
│  □ Who is the user? (role, permissions, experience)         │
│  □ Where do they start? (entry points)                      │
│  □ What is their goal? (desired outcome)                    │
│  □ What steps do they take? (actions)                       │
│  □ What can go wrong? (errors, edge cases)                  │
│  □ Where do they end up? (exit points)                      │
│  □ Are there multiple roles seeing different things?         │
│  □ Are there time-dependent states? (expiry, cooldowns)     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Step 2: Map Entry Points

Every flow starts somewhere. Document all entry points:

```
ENTRY POINTS MAP:

  ● Direct URL           → /courses/create
  ● Navigation menu      → Sidebar → "Courses" → "+ New"
  ● CTA button           → Dashboard → "Create Course" card
  ● Empty state          → Courses page → "No courses" → [Create]
  ● Email link           → Invitation email → "Accept" button
  ● Deep link            → Shared URL from colleague
  ● Redirect after auth  → Login → redirect to intended page

  All entry points MUST lead to the same flow.
  Never break the flow based on how the user arrived.
```

### Step 3: Map the Happy Path

Draw the ideal path from start to goal:

```
EXAMPLE: Course Creation Happy Path

  ● Start
  │
  ▼
  ┌──────────────┐     Click "+ New Course"     ┌──────────────────┐
  │  Courses     │ ──────────────────────────▶  │  Create Course   │
  │  List Page   │                              │  Form            │
  └──────────────┘                              └──────────────────┘
                                                       │
                                                  Fill form fields
                                                       │
                                                       ▼
                                               ╔══════════════════╗
                                               ║  Form valid?     ║
                                               ╚══════════════════╝
                                                  │           │
                                                 Yes          No
                                                  │           │
                                                  ▼           ▼
                                          (( Submit API ))  Show inline
                                                  │         validation
                                                  │         errors
                                                  ▼           │
                                          ┌──────────────┐    │
                                          │  Course      │    │
                                          │  Detail Page │    │
                                          │  (draft)     │    │
                                          └──────────────┘    │
                                                  │           │
                                              Toast:          │
                                            "Course created"   │
                                                  │           │
                                                  ◉           ◁──── User fixes
                                                             and resubmits
```

### Step 4: Map Error and Edge Cases

For every happy path step, map what can go wrong:

```
ERROR PATH MAPPING:

  Step: "Submit Course Form"
  ├── Happy: API returns 201 → Redirect to detail page
  ├── Error: 400 Validation → Show field errors inline
  ├── Error: 401 Unauthorized → Redirect to login
  ├── Error: 403 Forbidden → Show "No permission" message
  ├── Error: 409 Conflict → "Course title already exists"
  ├── Error: 413 Too Large → "Thumbnail exceeds 5MB"
  ├── Error: 500 Server → Show generic error toast + retry button
  └── Error: Network → Show offline banner + retry button

FULL ERROR FLOW:

  ┌──────────────┐     Submit     (( API Call ))
  │  Create Form │ ──────────▶   │
  └──────────────┘               │
                                 ├── 201 ──▶ ┌─ Detail Page ─┐ ──▶ ◉
                                 │           └────────────────┘
                                 ├── 400 ──▶ ┌─ Form w/ Errors ─┐
                                 │           │ "Title required"  │ ──▶ ◁ retry
                                 │           └──────────────────┘
                                 ├── 401 ─ ─ ▶ ┌─ Login Page ─┐
                                 │             │ session expired│ ──▶ ◁ re-auth
                                 │             └───────────────┘
                                 ├── 403 ──▶ ┌─ Access Denied ─┐
                                 │           │ "Contact admin"  │ ──▶ ◉ dead end
                                 │           └─────────────────┘
                                 └── 5xx ──▶ ┌─ Error Toast ─────┐
                                             │ "Something went   │
                                             │  wrong. Retry?"   │ ──▶ ◁ retry
                                             └──────────────────┘
```

### Step 5: Map Decision Points

Document every branch where the flow splits:

```
DECISION TREE: User Registration

  ● User clicks "Sign Up"
  │
  ▼
  ╔═══════════════════════════════╗
  ║  Sign up method?              ║
  ╚═══════════════════════════════╝
     │                    │
   Email              Google OAuth
     │                    │
     ▼                    ▼
  ┌──────────┐     (( Google Auth ))
  │ Email    │           │
  │ Form     │           ├── New user ──▶ Create account
  └──────────┘           │                     │
     │                   └── Existing ──▶ Link account
     │ Submit                                  │
     ▼                                         │
  (( Send verification email ))                │
     │                                         │
     ▼                                         ▼
  ┌──────────────┐                    ╔═══════════════════╗
  │ Check Email  │                    ║ Has organization? ║
  │ Screen       │                    ╚═══════════════════╝
  └──────────────┘                       │            │
     │                                  Yes           No
  Click verify link                      │            │
     │                                   ▼            ▼
     ▼                            ┌──────────┐  ┌──────────────┐
  ╔═══════════════════╗           │ Dashboard │  │ Create Org   │
  ║ Has organization? ║           └──────────┘  │ or Join      │
  ╚═══════════════════╝                         └──────────────┘
     │            │                                    │
    Yes           No                                   ▼
     │            │                              ╔═══════════╗
     ▼            ▼                              ║ Create    ║
  ┌──────────┐  ┌──────────────┐                 ║ or Join?  ║
  │ Dashboard │  │ Create Org   │                 ╚═══════════╝
  └──────────┘  │ or Join      │                   │        │
     │          └──────────────┘                Create     Join
     ◉                │                           │        │
                      ▼                           ▼        ▼
                 ◉ Dashboard                  ┌──────┐ ┌───────┐
                                              │Create│ │Request│
                                              │ Org  │ │Access │
                                              └──────┘ └───────┘
                                                 │        │
                                                 ◉        ◉
```

### Step 6: Map Multi-Role Flows

When different roles see different things in the same flow:

```
MULTI-ROLE FLOW: Course Enrollment Request

  Role Legend:  [L] = Learner   [A] = Admin   [S] = System

  [L] ● Learner clicks "Enroll"
       │
       ▼
  [L]  ╔══════════════════════════╗
       ║  Course requires         ║
       ║  approval?               ║
       ╚══════════════════════════╝
          │                  │
         No                 Yes
          │                  │
          ▼                  ▼
  [S]  (( Auto-enroll ))   [S] (( Create request ))
          │                  │
          ▼                  ├──────────────────────────────┐
  [L]  ┌──────────────┐     │                              │
       │ Course View  │     ▼                              ▼
       │ (enrolled)   │  [L] ┌─────────────────┐    [A] ┌────────────────┐
       └──────────────┘      │ "Request Sent"  │        │ Notification:  │
          │                  │  Pending badge   │        │ New enrollment │
          ◉                  └─────────────────┘        │ request        │
                                    │                   └────────────────┘
                              Waits...                         │
                                    │                     Reviews request
                                    │                          │
                                    │                          ▼
                                    │                   ╔══════════════╗
                                    │                   ║  Decision    ║
                                    │                   ╚══════════════╝
                                    │                     │          │
                                    │                  Approve     Reject
                                    │                     │          │
                                    │                     ▼          ▼
                              ┌─────┴─────┐         [S] (( Send  [S] (( Send
                              │           │            email ))     email ))
                              │           │               │          │
                              ▼           ▼               ▼          ▼
                        [L] ┌─────┐  [L] ┌──────┐  [L] ┌─────┐ [L] ┌──────┐
                            │Enrol│      │Reject│      │Email:│     │Email:│
                            │-led │      │-ed   │      │You're│     │Not   │
                            └─────┘      └──────┘      │in!   │     │apprvd│
                              │            │           └─────┘     └──────┘
                              ◉            ◉
```

### Step 7: Map State Transitions

For entities that change state, show the full state machine:

```
COURSE STATE MACHINE:

  ┌────────┐   Publish    ┌───────────┐   Archive    ┌──────────┐
  │  Draft │ ───────────▶ │ Published │ ───────────▶ │ Archived │
  └────────┘              └───────────┘              └──────────┘
     │  ▲                    │     ▲                    │
     │  │                    │     │                    │
     │  └──── Edit ──────────┘     │                    │
     │                             │                    │
     │                        Unarchive                 │
     │                             │                    │
     │                             └────────────────────┘
     │
     │  Delete
     ▼
  ┌─────────┐
  │ Deleted │  (soft delete, recoverable by admin)
  └─────────┘


ENROLLMENT STATE MACHINE:

                                    ┌──────────┐
                           ┌───────▶│Completed │
                           │        └──────────┘
                     Complete quiz       ▲
                     or assignment       │ All content
                           │             │ completed
  ┌──────────┐   Start   ┌────────────┐  │
  │  Enrolled│ ────────▶ │In Progress │──┘
  └──────────┘           └────────────┘
     │                       │
     │  Unenroll             │  Suspend
     ▼                       ▼
  ┌──────────┐         ┌───────────┐
  │ Dropped  │         │ Suspended │
  └──────────┘         └───────────┘
```

---

## Flow Patterns Library

### Pattern 1: CRUD Flow

```
  ● Start
  │
  ▼
  ┌──────────┐  [+ Create]   ┌ ─ ─ ─ ─ ─ ─ ┐   Submit   (( API ))
  │  List    │ ──────────▶  │ Create Modal │ ─────────▶ │
  │  Page    │              └ ─ ─ ─ ─ ─ ─ ┘            │
  └──────────┘                                          │
     │     │                                    ┌───────┤
     │     │   Click row                        │       │
     │     ▼                                  201 OK    Error
     │  ┌──────────┐  [Edit]  ┌ ─ ─ ─ ─ ─ ─ ┐  │       │
     │  │  Detail  │ ───────▶│ Edit Modal   │  ▼       ▼
     │  │  Page    │         └ ─ ─ ─ ─ ─ ─ ┘ Refresh  Toast
     │  └──────────┘                          list     error
     │     │
     │     │  [Delete]
     │     ▼
     │  ┌ ─ ─ ─ ─ ─ ─ ─ ─ ┐   Confirm    (( API ))   Refresh
     │  │ Confirm Dialog   │ ──────────▶ │ ─────────▶ list
     │  └ ─ ─ ─ ─ ─ ─ ─ ─ ┘
     │
     ◉
```

### Pattern 2: Multi-Step Wizard

```
  ● Start
  │
  ▼
  ┌──────────────────────────────────────────────────────┐
  │  Step 1         Step 2        Step 3        Step 4   │
  │  ●──────────────○─────────────○─────────────○        │
  │  Basic Info     Content       Settings      Review   │
  ├──────────────────────────────────────────────────────┤
  │                                                      │
  │  Step 1: Basic Information                           │
  │  ┌──────────────────────────┐                        │
  │  │  Title: [          ]     │                        │
  │  │  Desc:  [          ]     │                        │
  │  └──────────────────────────┘                        │
  │                                                      │
  │              [ Cancel ]  [ Next → ]                  │
  └──────────────────────────────────────────────────────┘
     │                              │
   Cancel                        Next (validates step 1)
     │                              │
     ▼                              ▼
  ┌──────────┐              Step 2: Content
  │ Confirm  │              ┌──────────────────┐
  │ discard? │              │ Add sections...  │
  └──────────┘              └──────────────────┘
     │    │                    │            │
    Yes   No                [ ← Back ]  [ Next → ]
     │    │                    │            │
     ▼    ◁                    ▼            ▼
  ┌──────┐                 Step 1       Step 3...
  │ List │
  └──────┘
     ◉

  WIZARD RULES:
  □ Each step validates before allowing "Next"
  □ "Back" preserves all entered data
  □ "Cancel" prompts "Discard changes?" if data entered
  □ Progress indicator shows current step
  □ User can click completed steps to go back
  □ Browser back button = step back (not leave wizard)
  □ Page refresh should preserve progress (sessionStorage)
```

### Pattern 3: Authentication Gate

```
  ● User arrives at protected page
  │
  ▼
  ╔═══════════════════╗
  ║  Authenticated?   ║
  ╚═══════════════════╝
     │             │
    Yes            No
     │             │
     │             ▼
     │      ╔═══════════════════╗
     │      ║  Has valid        ║
     │      ║  refresh token?   ║
     │      ╚═══════════════════╝
     │         │            │
     │        Yes           No
     │         │            │
     │         ▼            ▼
     │    (( Refresh ))   ┌───────────┐
     │    (( token   ))   │  Login    │
     │         │          │  Page     │
     │         │          └───────────┘
     │    ┌────┤               │
     │    │    │          Login success
     │  Success Fail          │
     │    │    │          - - -▶ Redirect to
     │    │    ▼              original URL
     │    │  ┌───────────┐
     │    │  │  Login    │
     │    │  │  Page     │
     │    │  └───────────┘
     │    │
     ▼    ▼
  ╔═══════════════════╗
  ║  Has permission   ║
  ║  for this page?   ║
  ╚═══════════════════╝
     │             │
    Yes            No
     │             │
     ▼             ▼
  ┌──────────┐  ┌──────────────┐
  │ Render   │  │ 403 Denied   │
  │ page     │  │ "Contact     │
  └──────────┘  │  your admin" │
     │          └──────────────┘
     ◉              │
                    ◉
```

---

## Common Mistakes and Anti-Patterns

```
MISTAKE 1: Only mapping the happy path

  BAD: Start → Fill Form → Submit → Success → Done
  GOOD: Start → Fill Form → Submit
                               ├── 201 → Success → Done
                               ├── 400 → Show errors → Retry
                               ├── 401 → Redirect to login
                               ├── 500 → Error toast → Retry
                               └── Offline → Queue + retry banner

MISTAKE 2: Ignoring browser navigation

  Questions to always answer:
  □ What happens when the user hits the browser Back button?
  □ What happens on page refresh mid-flow?
  □ What happens if they bookmark a mid-flow URL?
  □ What happens if they open a mid-flow URL in a new tab?

MISTAKE 3: Missing exit points

  Users can leave at ANY point. Account for:
  □ Closing the browser tab
  □ Navigating away via sidebar
  □ Session timeout
  □ Loss of network
  □ Being logged out in another tab

MISTAKE 4: Ambiguous decision points

  BAD:                          GOOD:
  ╔════════════╗               ╔═══════════════════════════╗
  ║  Check     ║               ║  user.role === 'admin' && ║
  ║  access    ║               ║  course.status !== 'draft'║
  ╚════════════╝               ╚═══════════════════════════╝

  Always specify the EXACT condition, not vague descriptions.

MISTAKE 5: Not showing parallel processes

  BAD: Everything in one linear line
  GOOD: Show what happens simultaneously

  [User]  Sees loading spinner  ──────────────────▶  Sees result
                    │                                     ▲
  [System]  ────── API call ──── Process ──── Return ─────┘
                    │
  [Other user]  Gets notification ─────▶ Can take action
```

---

## Flow Quality Checklist

```
┌──────────────────────────────────────────────────────────────┐
│  USER FLOW QUALITY CHECKLIST                                 │
│                                                              │
│  Completeness                                                │
│  □ All entry points mapped                                   │
│  □ Happy path fully traced from start to goal                │
│  □ Every error response has a user-facing recovery path      │
│  □ Every decision point has all branches documented          │
│  □ All exit points identified (success and abandonment)      │
│  □ Multi-role variations shown if applicable                 │
│                                                              │
│  Edge Cases                                                  │
│  □ Browser back button behavior defined                      │
│  □ Page refresh behavior defined                             │
│  □ Session expiry mid-flow handled                           │
│  □ Network failure mid-flow handled                          │
│  □ Concurrent access conflicts addressed                     │
│  □ Deep linking to mid-flow URLs handled                     │
│                                                              │
│  State Management                                            │
│  □ State transitions documented for all entities             │
│  □ Invalid state transitions blocked and explained           │
│  □ Optimistic vs. pessimistic updates defined                │
│  □ Loading states shown for async operations                 │
│                                                              │
│  Developer Readiness                                         │
│  □ API endpoints referenced at each data operation           │
│  □ Route paths specified for each screen                     │
│  □ Redirect logic clearly documented                         │
│  □ Permission checks mapped to specific roles                │
│  □ Toast/notification messages written out                   │
│                                                              │
│  Diagram Quality                                             │
│  □ Consistent notation used throughout                       │
│  □ Every arrow labeled with action or condition              │
│  □ No orphaned nodes (every box connects to the flow)        │
│  □ Readable left-to-right or top-to-bottom                   │
│  □ Role labels on multi-role flows                           │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Tools and Resources

| Tool | Purpose |
|------|---------|
| ASCII diagrams | Primary flow mapping tool in this skill |
| Mermaid.js | Code-based flowcharts (renders in Markdown) |
| Whimsical | Collaborative flowcharts |
| FigJam | Whiteboard-style flow mapping |
| Excalidraw | Hand-drawn style diagrams |
| draw.io | Detailed technical diagrams |

---

## Output Format

When creating user flows, always deliver:

1. **Journey summary** — who, where they start, what they want
2. **Entry points list** — every way into this flow
3. **Happy path diagram** — the ideal journey, fully drawn
4. **Error paths** — every failure and recovery
5. **Decision tree** — every branching point with conditions
6. **State transitions** — entity state machine (if applicable)
7. **Multi-role view** — per-role differences (if applicable)
8. **Edge cases list** — back button, refresh, timeout, deep link
9. **Route map** — URL paths for each screen
10. **API touchpoints** — which API calls happen where
