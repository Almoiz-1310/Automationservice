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
name: design-handoff
description: "Create developer-ready handoff specs with component measurements, design token mapping, interaction states (default/hover/active/disabled/focus), assets export guidelines, animation timing, and implementation notes. Use when a design is approved and ready for development."
---

# Design Handoff — From Design to Code, Zero Ambiguity

Creates complete developer handoff specifications that eliminate guesswork. Includes component measurements, design token mapping, every interaction state, animation specs, responsive behavior, and implementation notes. The goal: a developer should be able to build the UI without asking a single question.

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
│  1. UNDERSTAND BEFORE YOU SPEC                               │
│     → Review the design thoroughly — every screen, state     │
│     → Check which components already exist in the codebase   │
│     → Identify what is new vs. reuse of existing components  │
│     → Never spec something that already exists unchanged     │
│                                                              │
│  2. REUSE — NEVER REINVENT                                   │
│     → Map design elements to existing components first       │
│     → If a component exists, reference it by name and path   │
│     → Only spec new components or modifications              │
│     → Ask: "Can the developer reuse Button variant='primary'?"│
│                                                              │
│  3. USE EXISTING DESIGN LANGUAGE                             │
│     → Map all values to existing design tokens               │
│     → Use token names, not raw values                        │
│     → If a value doesn't map to a token, flag it             │
│                                                              │
│  4. ASK BEFORE ADDING ANYTHING NEW                           │
│     → New token value needed? → ASK first                    │
│     → New component needed? → ASK first                      │
│     → Animation not in the system? → ASK first               │
│     → Custom behavior? → ASK first                           │
│     → Never spec something new without confirmation          │
│                                                              │
│  5. SPEC EVERY STATE — NO EXCEPTIONS                         │
│     → Default, Hover, Active, Focus, Disabled, Loading       │
│     → Empty, Error, Success, Overflow                        │
│     → If a state isn't shown in the design, ASK about it     │
│     → Developers will encounter every state — spec them all  │
│                                                              │
│  6. COMMUNICATE VISUALLY                                     │
│     → Show annotated mockups with measurements               │
│     → Show every state as a visual side by side              │
│     → Include a component tree showing nesting               │
│     → Provide pixel-perfect spacing annotations              │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Step-by-Step Process

### Step 1: Component Inventory

List every component needed for the design:

```
COMPONENT INVENTORY TEMPLATE:

  ┌────────────────────────────────────────────────────────────┐
  │  Component        │ Status    │ Path / Notes               │
  ├────────────────────┼───────────┼────────────────────────────┤
  │  Page Layout      │ Existing  │ app/(dashboard)/layout.tsx  │
  │  Button (primary) │ Existing  │ components/ui/button.tsx    │
  │  Input            │ Existing  │ components/ui/input.tsx     │
  │  Select           │ Existing  │ components/ui/select.tsx    │
  │  Badge            │ Existing  │ components/ui/badge.tsx     │
  │  Dialog           │ Existing  │ components/ui/dialog.tsx    │
  │  Table            │ Existing  │ components/ui/table.tsx     │
  │  CourseCard       │ NEW       │ Create in components/lms/   │
  │  ProgressRing     │ NEW       │ Create in components/ui/    │
  │  StatCard         │ MODIFY    │ Add trend indicator prop    │
  └────────────────────┴───────────┴────────────────────────────┘

  Legend:
  Existing = Use as-is, no changes needed
  MODIFY   = Exists but needs new prop or variant
  NEW      = Must be built from scratch
```

### Step 2: Component Tree

Show how components nest within the page:

```
PAGE COMPONENT TREE:

  CoursesPage
  ├── PageHeader
  │   ├── h1: "Courses"
  │   └── Button (variant="primary"): "+ Create Course"
  │
  ├── FilterBar
  │   ├── Select: Status filter
  │   ├── Select: Category filter
  │   ├── Select: Sort
  │   └── Button (variant="ghost"): "Filters" (toggle)
  │
  ├── CourseTable
  │   ├── TableHeader
  │   │   ├── TableHead: Checkbox (select all)
  │   │   ├── TableHead: "Title" (sortable)
  │   │   ├── TableHead: "Status"
  │   │   ├── TableHead: "Enrolled"
  │   │   ├── TableHead: "Updated" (sortable)
  │   │   └── TableHead: "Actions"
  │   │
  │   └── TableBody
  │       └── CourseRow (repeated)
  │           ├── Checkbox
  │           ├── Title + Description (truncated)
  │           ├── Badge (status variant)
  │           ├── Number (enrollment count)
  │           ├── Date (relative format)
  │           └── ActionsDropdown
  │               ├── "Edit"
  │               ├── "Duplicate"
  │               ├── "Preview"
  │               ├── ── separator ──
  │               └── "Delete" (destructive)
  │
  ├── EmptyState (when no courses)
  │   ├── Icon: BookOpen (64px)
  │   ├── Text: "No courses yet"
  │   ├── Subtext: "Create your first course..."
  │   └── Button: "+ Create Course"
  │
  └── Pagination
      ├── Text: "Showing 1-10 of 45"
      └── PageButtons: [< 1 2 3 4 5 >]
```

### Step 3: Detailed Component Specifications

For each NEW or MODIFIED component, provide full specs:

```
┌──────────────────────────────────────────────────────────────┐
│  COMPONENT SPEC: CourseCard                                  │
│  Status: NEW                                                 │
│  Location: components/lms/course-card.tsx                    │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ANATOMY:                                                    │
│  ┌────────────────────────────────────────┐                  │
│  │  ┌──────────────────────────────────┐  │ ← 8px radius    │
│  │  │                                  │  │                  │
│  │  │         Thumbnail                │  │ ← aspect-[16/9] │
│  │  │         (or gradient placeholder)│  │                  │
│  │  │                                  │  │                  │
│  │  └──────────────────────────────────┘  │                  │
│  │  16px padding ──────────────────────── │                  │
│  │                                        │                  │
│  │  Course Title ────── text-base, bold   │                  │
│  │                      ──── 4px gap      │                  │
│  │  Description ──────  text-sm, muted    │                  │
│  │                      max 2 lines       │                  │
│  │                      line-clamp-2      │                  │
│  │                      ──── 12px gap     │                  │
│  │  ┌────────────────────────────────┐    │                  │
│  │  │ ██████████░░░░ 65%             │    │ ← h-2, rounded  │
│  │  └────────────────────────────────┘    │                  │
│  │                      ──── 8px gap      │                  │
│  │  [Badge: Published]    [12 enrolled]   │                  │
│  │                      ──── 16px padding │                  │
│  └────────────────────────────────────────┘                  │
│                                                              │
│  DIMENSIONS:                                                 │
│  Width:          100% of grid column                         │
│  Min-width:      240px                                       │
│  Border:         1px solid border-default                    │
│  Border-radius:  radius-lg (8px)                             │
│  Shadow:         shadow-sm                                   │
│  Background:     bg-primary (white/gray-950 dark)            │
│  Padding:        16px (content area below thumbnail)         │
│                                                              │
│  THUMBNAIL:                                                  │
│  Aspect ratio:   16:9                                        │
│  Border-radius:  radius-lg radius-lg 0 0 (top corners only) │
│  Fallback:       Gradient from primary-100 to primary-200    │
│  Object-fit:     cover                                       │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Step 4: Interaction States

Document EVERY state for each interactive element:

```
┌──────────────────────────────────────────────────────────────┐
│  INTERACTION STATES: CourseCard                               │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  DEFAULT:                                                    │
│  ┌────────────────────┐                                      │
│  │  [Thumbnail]       │  border: border-default              │
│  │  Title             │  shadow: shadow-sm                   │
│  │  Description       │  cursor: pointer                     │
│  │  ██████░░ 65%      │                                      │
│  └────────────────────┘                                      │
│                                                              │
│  HOVER:                                                      │
│  ┌────────────────────┐                                      │
│  │  [Thumbnail]       │  shadow: shadow-md                   │
│  │  Title             │  border: border-primary-200          │
│  │  Description       │  transform: translateY(-2px)         │
│  │  ██████░░ 65%      │  transition: all 150ms ease-out      │
│  └────────────────────┘                                      │
│                                                              │
│  ACTIVE (mousedown):                                         │
│  ┌────────────────────┐                                      │
│  │  [Thumbnail]       │  shadow: shadow-xs                   │
│  │  Title             │  transform: translateY(0)            │
│  │  Description       │  transition: all 50ms ease-out       │
│  │  ██████░░ 65%      │                                      │
│  └────────────────────┘                                      │
│                                                              │
│  FOCUS (keyboard):                                           │
│  ┌────────────────────┐                                      │
│  │  [Thumbnail]       │  ring: 2px primary-500               │
│  │  Title             │  ring-offset: 2px                    │
│  │  Description       │  outline: none                       │
│  │  ██████░░ 65%      │                                      │
│  └────────────────────┘                                      │
│                                                              │
│  LOADING (skeleton):                                         │
│  ┌────────────────────┐                                      │
│  │  ░░░░░░░░░░░░░░░░░ │  Skeleton pulse animation           │
│  │  ░░░░░░░░░░░░░     │  1.5s ease-in-out infinite          │
│  │  ░░░░░░░░░░░░░░    │  Matches exact layout dimensions    │
│  │  ░░░░░░░░░░        │                                      │
│  └────────────────────┘                                      │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Step 5: Design Token Mapping

Map every visual value to a design token:

```
TOKEN MAPPING TABLE:

  ┌─────────────────────────────────────────────────────────────┐
  │  Property           │ Token              │ Value            │
  ├──────────────────────┼────────────────────┼──────────────────┤
  │  COLORS                                                     │
  │  Page background    │ bg-primary         │ white / gray-950 │
  │  Card background    │ bg-elevated        │ white / gray-900 │
  │  Title text         │ text-primary       │ gray-900/ gray-50│
  │  Body text          │ text-secondary     │ gray-600/ gray400│
  │  Muted text         │ text-muted         │ gray-400/ gray500│
  │  Primary button bg  │ primary-600        │ #4F46E5          │
  │  Primary hover bg   │ primary-700        │ #4338CA          │
  │  Error text         │ error-600          │ #DC2626          │
  │  Success text       │ success-600        │ #16A34A          │
  │  Border default     │ border-default     │ gray-200/ gray700│
  │  Border strong      │ border-strong      │ gray-300/ gray600│
  ├──────────────────────┼────────────────────┼──────────────────┤
  │  TYPOGRAPHY                                                 │
  │  Page title         │ text-2xl / bold     │ 24px / 700      │
  │  Section header     │ text-lg / semibold  │ 18px / 600      │
  │  Card title         │ text-base / medium  │ 16px / 500      │
  │  Body               │ text-sm / normal    │ 14px / 400      │
  │  Caption            │ text-xs / normal    │ 12px / 400      │
  ├──────────────────────┼────────────────────┼──────────────────┤
  │  SPACING                                                    │
  │  Page padding       │ p-6                │ 24px             │
  │  Section gap        │ gap-6 / space-y-6  │ 24px             │
  │  Card padding       │ p-4                │ 16px             │
  │  Form field gap     │ space-y-3          │ 12px             │
  │  Icon-label gap     │ gap-1              │ 4px              │
  │  Button padding-x   │ px-4               │ 16px             │
  ├──────────────────────┼────────────────────┼──────────────────┤
  │  EFFECTS                                                    │
  │  Card shadow         │ shadow-sm          │ 0 1px 3px...    │
  │  Card hover shadow   │ shadow-md          │ 0 4px 6px...    │
  │  Modal shadow        │ shadow-lg          │ 0 10px 15px...  │
  │  Border radius card  │ rounded-lg         │ 8px             │
  │  Border radius input │ rounded-md         │ 6px             │
  │  Border radius badge │ rounded-full       │ 9999px          │
  ├──────────────────────┼────────────────────┼──────────────────┤
  │  TRANSITIONS                                                │
  │  Hover transition    │ transition-all     │ 150ms ease-out  │
  │  Modal open          │ custom             │ 200ms ease-out  │
  │  Modal close         │ custom             │ 150ms ease-in   │
  │  Toast enter         │ custom             │ 200ms ease-out  │
  └──────────────────────┴────────────────────┴──────────────────┘

  ⚠ VALUES NOT IN TOKEN SYSTEM (needs discussion):
  □ card hover translateY: -2px (not a standard token)
  □ progress bar gradient: primary-500 to primary-600
```

### Step 6: Responsive Behavior

```
RESPONSIVE SPECS:

  ┌────────────────────────────────────────────────────────────┐
  │  Breakpoint │ Layout Change                                │
  ├─────────────┼──────────────────────────────────────────────┤
  │  < 640px    │ Cards: 1 column, full width                  │
  │  (mobile)   │ Table: Convert to card list                  │
  │             │ Filters: Behind "Filter" button (sheet)      │
  │             │ Page padding: 16px                            │
  │             │ Page title: text-xl (20px)                    │
  │             │ Action button: full width, bottom sticky      │
  ├─────────────┼──────────────────────────────────────────────┤
  │  640-767px  │ Cards: 2 columns                             │
  │  (sm)       │ Table: Still card list                        │
  │             │ Filters: Visible, single row                  │
  ├─────────────┼──────────────────────────────────────────────┤
  │  768-1023px │ Cards: 2-3 columns                           │
  │  (md)       │ Table: Full table with horizontal scroll      │
  │             │ Sidebar: Collapsible (hamburger)              │
  ├─────────────┼──────────────────────────────────────────────┤
  │  1024+      │ Cards: 3-4 columns                           │
  │  (lg)       │ Table: Full table, all columns visible        │
  │             │ Sidebar: Persistent                           │
  │             │ Page padding: 24px                            │
  └─────────────┴──────────────────────────────────────────────┘
```

### Step 7: Animation and Transition Specs

```
ANIMATION SPECIFICATION:

  ┌────────────────────────────────────────────────────────────┐
  │  Animation: Card Hover Lift                                │
  │  ─────────────────────────                                 │
  │  Trigger:     mouseenter                                   │
  │  Properties:  transform, box-shadow, border-color          │
  │  Duration:    150ms                                        │
  │  Easing:      ease-out (cubic-bezier(0, 0, 0.2, 1))       │
  │  From:        translateY(0) shadow-sm border-default       │
  │  To:          translateY(-2px) shadow-md border-primary-200│
  │                                                            │
  │  Reverse:     mouseleave                                   │
  │  Duration:    100ms                                        │
  │  Easing:      ease-in (cubic-bezier(0.4, 0, 1, 1))        │
  │                                                            │
  │  Reduced motion: opacity change only (no transform)        │
  └────────────────────────────────────────────────────────────┘

  ┌────────────────────────────────────────────────────────────┐
  │  Animation: Modal Open                                     │
  │  ─────────────────────                                     │
  │  Trigger:     Dialog open state                            │
  │                                                            │
  │  Backdrop:                                                 │
  │    From: opacity 0                                         │
  │    To:   opacity 1 (bg: rgba(0,0,0,0.5))                  │
  │    Duration: 200ms, ease-out                               │
  │                                                            │
  │  Content:                                                  │
  │    From: opacity 0, scale(0.95), translateY(8px)           │
  │    To:   opacity 1, scale(1), translateY(0)                │
  │    Duration: 200ms, ease-out                               │
  │    Delay: 50ms (after backdrop starts)                     │
  │                                                            │
  │  Close (reverse):                                          │
  │    Content first: 150ms, ease-in                           │
  │    Backdrop after: 100ms, ease-in                          │
  │                                                            │
  │  Reduced motion: opacity only, 0ms duration                │
  └────────────────────────────────────────────────────────────┘
```

### Step 8: Implementation Notes

```
IMPLEMENTATION NOTES:

  ┌────────────────────────────────────────────────────────────┐
  │  Developer Notes for CourseCard Component                  │
  ├────────────────────────────────────────────────────────────┤
  │                                                            │
  │  PROPS:                                                    │
  │  ┌──────────────────┬────────────┬─────────────────────┐   │
  │  │ Prop             │ Type       │ Notes               │   │
  │  ├──────────────────┼────────────┼─────────────────────┤   │
  │  │ title            │ string     │ Required            │   │
  │  │ description      │ string     │ Optional, 2 lines   │   │
  │  │ thumbnailUrl     │ string     │ Optional, fallback  │   │
  │  │ status           │ BadgeVar   │ draft|published|... │   │
  │  │ progress         │ number     │ 0-100, percentage   │   │
  │  │ enrolledCount    │ number     │ Display as "12 learners"│
  │  │ onClick          │ () => void │ Navigate to detail  │   │
  │  └──────────────────┴────────────┴─────────────────────┘   │
  │                                                            │
  │  BEHAVIOR:                                                 │
  │  - Clicking anywhere on the card navigates to course detail│
  │  - Long title truncates with ellipsis (1 line)             │
  │  - Description truncates at 2 lines (line-clamp-2)         │
  │  - Progress bar shows 0% as empty, 100% as full primary    │
  │  - If no thumbnail, show gradient placeholder              │
  │  - Card is focusable (tabIndex={0})                        │
  │  - Enter/Space key triggers onClick                        │
  │                                                            │
  │  DATA REQUIREMENTS:                                        │
  │  - API endpoint: GET /api/courses                          │
  │  - Fields needed: id, title, description,                  │
  │    thumbnail_url, status, enrolled_count,                  │
  │    user_progress (for learner view)                        │
  │                                                            │
  │  ACCESSIBILITY:                                            │
  │  - role="article" or use <article> tag                     │
  │  - aria-label="{title} course card"                        │
  │  - Progress bar: role="progressbar"                        │
  │    aria-valuenow={progress} aria-valuemin={0}              │
  │    aria-valuemax={100}                                     │
  │  - Badge: decorative (aria-hidden), status in              │
  │    sr-only text                                            │
  │                                                            │
  │  EXISTING COMPONENTS TO USE:                               │
  │  - Badge from components/ui/badge.tsx                      │
  │  - Skeleton from components/ui/skeleton.tsx                │
  │  - Card from components/ui/card.tsx (extend it)            │
  │                                                            │
  └────────────────────────────────────────────────────────────┘
```

---

## Common Mistakes and Anti-Patterns

```
MISTAKE 1: Speccing only the default state

  BAD handoff: Shows the card looking perfect with data.
  GOOD handoff: Shows default, hover, active, focus, loading,
                empty, error, overflow states — all of them.

  RULE: If you don't spec a state, the developer will invent it
  (or skip it). Always spec every state explicitly.

MISTAKE 2: Using pixel values instead of tokens

  BAD:  "The padding is 16px and the text is #374151"
  GOOD: "The padding is p-4 (space-4) and the text is text-secondary
         (gray-600 in light mode, gray-400 in dark mode)"

  Tokens are the contract. Pixels change; tokens are semantic.

MISTAKE 3: Forgetting dark mode

  BAD:  "Background is white, text is gray-900"
  GOOD: "Background is bg-primary (white / gray-950 dark),
         text is text-primary (gray-900 / gray-50 dark)"

  Always specify both light and dark mode values.

MISTAKE 4: No component tree

  BAD:  A flat screenshot with some annotations
  GOOD: A hierarchical component tree showing exactly how
        components nest, plus specs for each leaf component.

  The tree answers: "What components do I create, and how do
  they compose together?"

MISTAKE 5: Ambiguous interaction behavior

  BAD:  "The card is clickable"
  GOOD: "Clicking the card navigates to /courses/{id}.
         The entire card is the click target (not just the title).
         On mobile, tap feedback is a subtle scale(0.98) for 100ms.
         The action menu (three-dot) stops propagation."
```

---

## Handoff Quality Checklist

```
┌──────────────────────────────────────────────────────────────┐
│  DESIGN HANDOFF QUALITY CHECKLIST                            │
│                                                              │
│  Structure                                                   │
│  □ Component inventory (existing, modify, new)               │
│  □ Component tree showing nesting hierarchy                  │
│  □ File path for each component                              │
│  □ Props interface for each new/modified component           │
│                                                              │
│  Visual Specs                                                │
│  □ Annotated mockup with spacing values                      │
│  □ All measurements use design tokens, not raw values        │
│  □ Typography: size, weight, line-height, color token        │
│  □ Colors: background, text, border — light AND dark mode    │
│  □ Spacing: padding, margin, gap — all annotated             │
│  □ Borders: width, color, radius — all using tokens          │
│  □ Shadows: which elevation level                            │
│                                                              │
│  Interaction States                                          │
│  □ Default state shown                                       │
│  □ Hover state (visual changes + transition timing)          │
│  □ Active/pressed state                                      │
│  □ Focus state (keyboard — ring style)                       │
│  □ Disabled state (visual + cursor)                          │
│  □ Loading state (skeleton or spinner)                       │
│  □ Empty state (icon + message + CTA)                        │
│  □ Error state (validation messages)                         │
│  □ Overflow state (truncation rules)                         │
│                                                              │
│  Responsive                                                  │
│  □ Breakpoint behavior documented                            │
│  □ Mobile layout shown                                       │
│  □ Tablet layout shown (if different from desktop)           │
│  □ Reflow rules documented                                   │
│                                                              │
│  Animation                                                   │
│  □ Every transition has duration and easing specified         │
│  □ Enter/exit animations for modals, dropdowns, toasts       │
│  □ Reduced motion fallback noted                             │
│                                                              │
│  Accessibility                                               │
│  □ ARIA roles and attributes specified                       │
│  □ Keyboard behavior documented                              │
│  □ Focus management for modals documented                    │
│  □ Screen reader text for icons and badges                   │
│                                                              │
│  Data                                                        │
│  □ API endpoints referenced                                  │
│  □ Data shape (which fields are used where)                  │
│  □ Loading/error/empty scenarios tied to API states           │
│                                                              │
│  Implementation                                              │
│  □ Existing components to reuse identified                   │
│  □ New components to create listed                           │
│  □ Third-party dependencies noted (if any)                   │
│  □ Edge cases documented                                     │
│  □ "Developer should not need to ask any questions"          │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Tools and Resources

| Tool | Purpose |
|------|---------|
| Figma Dev Mode | Inspect designs for measurements and tokens |
| Storybook | Document component states interactively |
| Zeroheight | Design system documentation platform |
| Zeplin | Design-to-dev handoff with specs |
| Chromatic | Visual regression testing for components |

---

## Output Format

When creating a design handoff, always deliver:

1. **Component inventory** — existing, modified, new with file paths
2. **Component tree** — nesting hierarchy of the entire page
3. **Annotated mockups** — measurements, spacing, tokens on each element
4. **Token mapping table** — every color, spacing, typography mapped
5. **Interaction states** — all states for every interactive element
6. **Animation specs** — duration, easing, properties for each transition
7. **Responsive specs** — behavior at each breakpoint
8. **Accessibility notes** — ARIA, keyboard, screen reader specs
9. **Props interface** — TypeScript interface for each new component
10. **Implementation notes** — behavior, edge cases, data requirements
11. **Existing component references** — which components to reuse and how
