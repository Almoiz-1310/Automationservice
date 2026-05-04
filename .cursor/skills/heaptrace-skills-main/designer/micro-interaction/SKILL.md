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
name: micro-interaction
description: "Design micro-interactions including loading states (skeleton, spinner, progress), transitions, hover/focus feedback, empty states, success/error feedback, and animation specs. Use when polishing UX details, defining component behaviors, or specifying animation timing."
---

# Micro-Interaction — The Details That Make UX Feel Alive

Designs the small but critical interaction moments: loading states, hover feedback, focus indicators, transitions, empty states, success/error confirmations, and animation timing. Micro-interactions communicate system status, guide attention, and create a polished, professional feel.

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
│     → Check existing interaction patterns in the codebase    │
│     → Read how loading/error states are currently handled    │
│     → Identify existing animation utilities or libraries     │
│     → Never assume — look at actual component behavior      │
│                                                              │
│  2. REUSE — NEVER REINVENT                                   │
│     → Use existing Skeleton, Spinner, Toast components       │
│     → If a loading pattern exists, match it everywhere       │
│     → Shared animation tokens go in shared config            │
│     → Ask: "How does the Courses page show loading?"         │
│                                                              │
│  3. USE EXISTING DESIGN LANGUAGE                             │
│     → Use the existing transition durations and easings      │
│     → Match the existing toast/notification style            │
│     → Follow established feedback patterns                   │
│                                                              │
│  4. ASK BEFORE ADDING ANYTHING NEW                           │
│     → New animation library? → ASK first                     │
│     → New notification style? → ASK first                    │
│     → Complex animation sequence? → ASK first                │
│     → Page transition effect? → ASK first                    │
│     → Never add motion without confirmation                  │
│                                                              │
│  5. LESS IS MORE WITH ANIMATION                              │
│     → Every animation must have a purpose                    │
│     → Prefer subtle over dramatic                            │
│     → Never exceed 500ms for UI transitions                  │
│     → Respect prefers-reduced-motion                         │
│                                                              │
│  6. COMMUNICATE VISUALLY                                     │
│     → Show state transitions as before → after sequences     │
│     → Include timing annotations on all animations           │
│     → Specify easing curves for each transition              │
│     → Document every state a component can be in             │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Micro-Interaction Categories

### Category 1: Loading States

```
LOADING PATTERN DECISION TREE:

  How long does it take?
  │
  ├── < 300ms (feels instant)
  │   └── No indicator needed
  │       (but disable the trigger to prevent double-clicks)
  │
  ├── 300ms - 1s (brief delay)
  │   └── Inline spinner on the trigger element
  │       ┌────────────────┐     ┌────────────────┐
  │       │  [ Save ]      │ ──▶ │  [ ◠ Saving ]  │
  │       └────────────────┘     └────────────────┘
  │
  ├── 1s - 3s (noticeable wait)
  │   └── Skeleton loader replacing content area
  │       ┌────────────────────────────┐
  │       │  ░░░░░░░░░░░░░░░░░░░░░    │
  │       │  ░░░░░░░░░░                │
  │       │  ░░░░░░░░░░░░░░░░░░       │
  │       │  ░░░░░░░░░░░░░░           │
  │       └────────────────────────────┘
  │
  ├── 3s - 10s (long operation)
  │   └── Progress bar (determinate if possible)
  │       ┌────────────────────────────┐
  │       │  Generating course...      │
  │       │  ████████████░░░░░ 65%     │
  │       │  Section 3 of 5            │
  │       └────────────────────────────┘
  │
  └── 10s+ (background task)
      └── Toast notification + background processing
          ┌────────────────────────────┐
          │  ℹ Course generation       │
          │    started. We'll notify   │
          │    you when it's ready.    │
          └────────────────────────────┘


SKELETON PATTERNS:

  Text skeleton:
  ┌──────────────────────────────────────────┐
  │  ░░░░░░░░░░░░░░░░░░░░░░  ← Title       │
  │  ░░░░░░░░░░░░░░░         ← Subtitle     │
  │                                          │
  │  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  Body  │
  │  ░░░░░░░░░░░░░░░░░░░░░░░░░░           │
  │  ░░░░░░░░░░░░░░░░░░                    │
  └──────────────────────────────────────────┘

  Card skeleton:
  ┌──────────────┐  ┌──────────────┐
  │ ░░░░░░░░░░░░ │  │ ░░░░░░░░░░░░ │
  │ ░░░░░░░░░░░░ │  │ ░░░░░░░░░░░░ │
  │              │  │              │
  │ ░░░░░░░░░░   │  │ ░░░░░░░░░░   │
  │ ░░░░░░       │  │ ░░░░░░       │
  │ ░░░░░░░░     │  │ ░░░░░░░░     │
  └──────────────┘  └──────────────┘

  Table skeleton:
  ┌──────────────────────────────────────┐
  │  ░░░░░░░  │ ░░░░░░  │ ░░░░░░░░░░░  │
  │  ░░░░░░░  │ ░░░░░░  │ ░░░░░░░░░░░  │
  │  ░░░░░░░  │ ░░░░░░  │ ░░░░░░░░░░░  │
  │  ░░░░░░░  │ ░░░░░░  │ ░░░░░░░░░░░  │
  └──────────────────────────────────────┘

  SKELETON RULES:
  □ Match the exact layout of the loaded content
  □ Use pulse animation (opacity 0.5 → 1.0, 1.5s loop)
  □ Show 3-5 skeleton rows (not exact count of real data)
  □ Skeleton width should vary to look natural
  □ NEVER show a spinner AND skeleton at the same time
```

### Category 2: Button States and Feedback

```
BUTTON STATE MACHINE:

  ┌──────────┐   hover    ┌──────────┐   mousedown  ┌──────────┐
  │ Default  │ ─────────▶ │  Hover   │ ──────────▶ │  Active  │
  │ bg-600   │            │  bg-700  │             │  bg-800  │
  │          │ ◀───────── │ shadow-md│ ◀────────── │ shadow-xs│
  └──────────┘  mouseleave└──────────┘   mouseup    └──────────┘
      │                                                  │
      │  focus (tab)                                     │ click
      ▼                                                  ▼
  ┌──────────┐                                    ┌──────────┐
  │  Focus   │                                    │ Loading  │
  │  ring-2  │                                    │  ◠ ...   │
  │ ring-200 │                                    │ disabled │
  └──────────┘                                    └──────────┘
      │                                                  │
      │                                             API returns
      │                                                  │
  ┌──────────┐                                    ┌──────────┐
  │ Disabled │                                    │ Success  │
  │  bg-300  │                                    │  ✓ Done  │
  │ cursor-  │                                    │ (1s then │
  │ not-allow│                                    │  revert) │
  └──────────┘                                    └──────────┘


  BUTTON CLICK FEEDBACK SEQUENCE:

  Time:   0ms        100ms       200ms       1000ms      2000ms
  State:  Click  →   Active  →   Loading  →  Success  →  Default
  Visual: [Save]     [Save]      [◠ Save]    [✓ Saved]   [Save]
          ↓scale     bg-800      disabled    bg-green     bg-600
          0.98       shadow-xs   opacity-70  text-white   normal

  CSS:
  transition: all 150ms ease-out;
  &:active { transform: scale(0.98); }
```

### Category 3: Hover and Focus Feedback

```
HOVER PATTERNS BY ELEMENT TYPE:

  Buttons:
  Default:  ┌──────────┐    Hover:    ┌──────────┐
            │  Button   │             │  Button   │  bg darkens 1 step
            └──────────┘             └──────────┘  shadow increases

  Cards (clickable):
  Default:  ┌──────────────┐  Hover:  ┌──────────────┐
            │  Card content │         │  Card content │  shadow-md
            │              │         │              │  translateY(-2px)
            └──────────────┘         └──────────────┘  border-primary-200

  Table rows (clickable):
  Default:  │ Row content      │  Hover:  │ Row content      │
            │                  │          │  bg-gray-50       │
                                          cursor: pointer

  Links:
  Default:  Click here            Hover:   Click here
            text-primary-600              text-primary-700
                                          underline

  Icons (interactive):
  Default:  [🗑]  text-gray-400   Hover:   [🗑]  text-red-500
            opacity: 0.6                  opacity: 1.0


FOCUS INDICATOR STANDARD:

  All interactive elements MUST show focus on Tab:

  ┌──────────────────────────┐
  │                          │  ← 2px ring
  │  ┌──────────────────┐   │  ← ring-offset-2
  │  │   Focus Target    │   │  ← ring-primary-500
  │  └──────────────────┘   │
  │                          │
  └──────────────────────────┘

  CSS: focus-visible:ring-2 focus-visible:ring-primary-500
       focus-visible:ring-offset-2

  RULE: NEVER use outline: none without providing an alternative
        focus indicator. This breaks keyboard accessibility.
```

### Category 4: Empty States

```
EMPTY STATE ANATOMY:

  ┌──────────────────────────────────────┐
  │                                      │
  │            ┌──────────┐              │
  │            │          │              │
  │            │   Icon   │  ← Relevant icon,   │
  │            │   64px   │    not decorative    │
  │            │          │                      │
  │            └──────────┘              │
  │                                      │
  │        Primary Message               │  ← What is empty
  │        (16px, semibold)              │
  │                                      │
  │     Secondary Message                │  ← Why + what to do
  │     (14px, muted color)              │
  │                                      │
  │       [ Primary Action ]             │  ← CTA to fix it
  │                                      │
  └──────────────────────────────────────┘


EMPTY STATE EXAMPLES:

  First-time (no data yet):          Filtered (no results):
  ┌──────────────────────┐          ┌──────────────────────┐
  │                      │          │                      │
  │        📚            │          │        🔍            │
  │                      │          │                      │
  │   No courses yet     │          │   No results found   │
  │                      │          │                      │
  │   Create your first  │          │   Try adjusting your │
  │   course to start    │          │   filters or search  │
  │   teaching.          │          │   terms.             │
  │                      │          │                      │
  │   [ + Create Course ]│          │   [ Clear Filters ]  │
  │                      │          │                      │
  └──────────────────────┘          └──────────────────────┘

  Error (failed to load):           Permission (no access):
  ┌──────────────────────┐          ┌──────────────────────┐
  │                      │          │                      │
  │        ⚠️             │          │        🔒            │
  │                      │          │                      │
  │   Failed to load     │          │   Access restricted   │
  │   courses            │          │                      │
  │                      │          │   You don't have     │
  │   Something went     │          │   permission to view │
  │   wrong. Please try  │          │   this content.      │
  │   again.             │          │                      │
  │                      │          │   [ Contact Admin ]  │
  │   [ Retry ]          │          │                      │
  └──────────────────────┘          └──────────────────────┘
```

### Category 5: Success and Error Feedback

```
FEEDBACK PATTERN DECISION TREE:

  What just happened?
  │
  ├── Action succeeded (CRUD, setting change)
  │   └── Toast notification (bottom-right, auto-dismiss 4s)
  │       ┌──────────────────────────────┐
  │       │ ✓  Course created            │
  │       │    "React Basics" is ready   │
  │       │    to edit.           [View] │
  │       └──────────────────────────────┘
  │
  ├── Action succeeded with undo option
  │   └── Toast with undo button (auto-dismiss 8s)
  │       ┌──────────────────────────────┐
  │       │ ✓  Course deleted            │
  │       │    "React Basics" removed.   │
  │       │              [Undo] (5s)    │
  │       └──────────────────────────────┘
  │
  ├── Validation error (form input)
  │   └── Inline field error (red border + message below field)
  │       ┌──────────────────────────────┐
  │       │  Title *                     │
  │       │  ┌──────────────────────┐    │
  │       │  │                      │ ← red border
  │       │  └──────────────────────┘    │
  │       │  ⚠ Title is required         │ ← red text, below field
  │       └──────────────────────────────┘
  │
  ├── Server error (API failure)
  │   └── Toast notification (red, manual dismiss)
  │       ┌──────────────────────────────┐
  │       │ ✕  Failed to save            │
  │       │    Something went wrong.     │
  │       │    Please try again.  [✕]    │
  │       └──────────────────────────────┘
  │
  └── Network error (offline)
      └── Banner at top of page (persistent until reconnected)
          ┌──────────────────────────────────────────┐
          │ ⚠  You're offline. Changes will be saved │
          │    when connection is restored.           │
          └──────────────────────────────────────────┘


TOAST SPECIFICATIONS:

  Position:       Bottom-right (desktop), Bottom-center (mobile)
  Max visible:    3 toasts stacked
  Animation in:   Slide up + fade in (200ms, ease-out)
  Animation out:  Fade out + slide down (150ms, ease-in)
  Auto-dismiss:   Success: 4s, Info: 6s, Error: manual
  Max width:      400px
  Min width:      300px

  ┌──────────────────────────────────────────┐
  │                                          │
  │  ┌─ Toast Stack ──────────────────────┐  │
  │  │ ✓  Third toast (newest, on top)    │  │
  │  └────────────────────────────────────┘  │
  │  ┌────────────────────────────────────┐  │
  │  │ ℹ  Second toast                    │  │
  │  └────────────────────────────────────┘  │
  │  ┌────────────────────────────────────┐  │
  │  │ ✕  First toast (oldest, bottom)    │  │
  │  └────────────────────────────────────┘  │
  │                                          │
  └──────────────────────────────────────────┘
```

### Category 6: Transitions and Animations

```
TRANSITION TIMING GUIDE:

  ┌──────────────────────────────────────────────────────────┐
  │  Interaction          │ Duration │ Easing    │ Property  │
  │  ─────────────────────┼──────────┼───────────┼──────────│
  │  Hover color change   │  100ms   │ ease-out  │ bg, color│
  │  Focus ring appear    │  100ms   │ ease-out  │ box-shadow│
  │  Button press         │  100ms   │ ease-out  │ transform│
  │  Dropdown open        │  150ms   │ ease-out  │ opacity,y│
  │  Dropdown close       │  100ms   │ ease-in   │ opacity,y│
  │  Modal open           │  200ms   │ ease-out  │ opacity, │
  │                       │          │           │ scale    │
  │  Modal close          │  150ms   │ ease-in   │ opacity, │
  │                       │          │           │ scale    │
  │  Sidebar toggle       │  250ms   │ ease-out  │ width, x │
  │  Tab switch content   │  150ms   │ ease-out  │ opacity  │
  │  Toast enter          │  200ms   │ ease-out  │ opacity,y│
  │  Toast exit           │  150ms   │ ease-in   │ opacity,y│
  │  Page transition      │  300ms   │ ease-out  │ opacity  │
  │  Skeleton pulse       │  1500ms  │ ease-in-  │ opacity  │
  │                       │          │ out       │          │
  └──────────────────────────────────────────────────────────┘


MODAL OPEN/CLOSE ANIMATION:

  Closed:                    Opening (200ms):             Open:
  (nothing)         →   ┌────────────────────┐    →   ┌────────────────────┐
                        │   ░░░░░░░░░░░░░    │        │   Modal Content    │
                        │   ░░░░░░░░░░░      │        │                    │
                        │   (scale: 0.95     │        │   (scale: 1.0      │
                        │    opacity: 0.5)   │        │    opacity: 1.0)   │
                        └────────────────────┘        └────────────────────┘
  Backdrop:              rgba(0,0,0,0.0)              rgba(0,0,0,0.5)
                         → fade to 0.5                 stable


DROPDOWN ANIMATION:

  Closed:          Opening (150ms):      Open:
  [Select ▾]       [Select ▴]           [Select ▴]
                   ┌─────────────┐      ┌─────────────┐
                   │ Option 1    │      │ Option 1    │
                   │ Option 2    │  ←   │ Option 2    │
                   │ (translateY: │      │ Option 3    │
                   │  -8px,      │      └─────────────┘
                   │  opacity: 0)│      (translateY: 0,
                   └─────────────┘       opacity: 1)


PREFERS-REDUCED-MOTION:

  Always provide a reduced-motion fallback:

  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }

  Rule: When reduced-motion is active, transitions should be
  instant (opacity only) — no transforms, no movement.
```

---

## Common Mistakes and Anti-Patterns

```
MISTAKE 1: Animation without purpose

  BAD: Spinning logo on page load (decorative, distracting)
  GOOD: Skeleton pulse while content loads (communicates status)

  Every animation must answer: "What does this tell the user?"

MISTAKE 2: Too slow

  BAD:  Modal opens in 800ms (feels sluggish)
  GOOD: Modal opens in 200ms (feels responsive)

  ┌──────────────────────────────────────────┐
  │  Duration feeling:                       │
  │  < 100ms:   Instant (snappy)             │
  │  100-200ms: Quick (responsive)           │
  │  200-300ms: Normal (smooth)              │
  │  300-500ms: Deliberate (noticeable)      │
  │  > 500ms:   Slow (feels broken)          │
  └──────────────────────────────────────────┘

MISTAKE 3: No loading state at all

  BAD: Button clicked → nothing happens → content appears
  GOOD: Button clicked → spinner on button → content appears

  RULE: If ANY async operation takes > 300ms, show feedback.

MISTAKE 4: Inconsistent feedback

  BAD: Create uses toast, delete uses alert, edit uses nothing
  GOOD: All CRUD operations use toast notifications consistently

MISTAKE 5: Ignoring reduced-motion

  BAD: Complex animations with no fallback
  GOOD: prefers-reduced-motion media query that simplifies all
        animations to instant opacity changes
```

---

## Micro-Interaction Checklist

```
┌──────────────────────────────────────────────────────────────┐
│  MICRO-INTERACTION CHECKLIST                                 │
│                                                              │
│  Loading States                                              │
│  □ Every async operation has a loading indicator             │
│  □ Skeleton loaders match the layout of loaded content       │
│  □ Buttons show inline spinner when submitting               │
│  □ Progress bar for operations > 3 seconds                   │
│  □ Background task notification for operations > 10s         │
│                                                              │
│  Feedback                                                    │
│  □ Toast for every CRUD success                              │
│  □ Inline validation for form errors                         │
│  □ Red toast for server errors (manual dismiss)              │
│  □ Undo option for destructive actions                       │
│  □ Offline banner when network is lost                       │
│                                                              │
│  Hover and Focus                                             │
│  □ All clickable elements have hover state                   │
│  □ All focusable elements have visible focus ring            │
│  □ Hover preview for truncated text (tooltip)                │
│  □ No hover-only features (must work on touch too)           │
│                                                              │
│  Empty States                                                │
│  □ Every list/table has an empty state                       │
│  □ Empty states have icon + message + CTA                    │
│  □ Filtered-empty differs from first-time-empty              │
│  □ Error-empty has retry action                              │
│                                                              │
│  Transitions                                                 │
│  □ Modal open/close has animation                            │
│  □ Dropdown open/close has animation                         │
│  □ Tab switch has content fade                               │
│  □ All durations under 500ms                                 │
│  □ prefers-reduced-motion respected                          │
│  □ Close animation is faster than open animation             │
│                                                              │
│  Consistency                                                 │
│  □ Same loading pattern used across all pages                │
│  □ Same toast style for all success/error messages           │
│  □ Same hover effect for same element types                  │
│  □ Same focus ring style on all interactive elements         │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Output Format

When designing micro-interactions, always deliver:

1. **Interaction inventory** — all interactions on the page/component
2. **State machine** — every state the component can be in
3. **Loading strategy** — which loading pattern and why
4. **Feedback spec** — success/error/validation messages
5. **Animation spec** — duration, easing, properties for each transition
6. **Empty state designs** — for each list/grid/table
7. **Hover/focus specs** — visual changes on interaction
8. **Reduced-motion fallback** — simplified version
9. **Before/after mockups** — showing the interaction sequence
10. **Implementation notes** — CSS classes, component props needed
