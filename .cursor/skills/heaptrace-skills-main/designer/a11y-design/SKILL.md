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
name: a11y-design
description: "Design for accessibility following WCAG 2.1 AA standards — color contrast (4.5:1 minimum), focus management, screen reader flow, ARIA landmarks, keyboard navigation, form labeling, and error identification. Use when building inclusive interfaces or auditing existing pages."
---

# Accessibility Design — Build for Everyone

Designs inclusive interfaces that meet WCAG 2.1 AA standards. Covers color contrast, keyboard navigation, screen reader compatibility, focus management, ARIA landmarks, form accessibility, and error handling. Accessibility is not an afterthought — it is a core design constraint.

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
│     → Check existing ARIA usage in the codebase              │
│     → Read how forms and modals handle focus currently       │
│     → Identify which components already have a11y support    │
│     → Never assume — test with keyboard and screen reader   │
│                                                              │
│  2. REUSE — NEVER REINVENT                                   │
│     → Use existing accessible components (Radix UI, etc.)    │
│     → If a component has ARIA support, don't override it     │
│     → Shared a11y patterns go in shared components           │
│     → Ask: "Does the Dialog component handle focus trap?"    │
│                                                              │
│  3. USE EXISTING DESIGN LANGUAGE                             │
│     → Focus indicators should match the design system        │
│     → Error patterns should be consistent everywhere         │
│     → Semantic HTML is the foundation — ARIA is the backup   │
│                                                              │
│  4. ASK BEFORE ADDING ANYTHING NEW                           │
│     → Custom widget requiring ARIA? → ASK first              │
│     → Overriding native element behavior? → ASK first        │
│     → Adding role or aria-* attributes? → ASK first          │
│     → Custom focus management? → ASK first                   │
│     → Use native HTML elements whenever possible             │
│                                                              │
│  5. SEMANTIC HTML FIRST                                      │
│     → Use <button> not <div onClick>                         │
│     → Use <nav> not <div class="nav">                        │
│     → Use <h1>-<h6> in order, never skip levels              │
│     → Use <label> explicitly linked to inputs                │
│     → ARIA is a last resort, not a first choice              │
│                                                              │
│  6. COMMUNICATE VISUALLY                                     │
│     → Show the tab order as numbered sequence                │
│     → Show screen reader announcement text                   │
│     → Show focus ring appearance on every element            │
│     → Document ARIA attributes on each component             │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Step-by-Step Process

### Step 1: Color Contrast

```
WCAG 2.1 CONTRAST REQUIREMENTS:

  ┌──────────────────────────────────────────────────────────┐
  │  Level AA (minimum):                                     │
  │  ──────────────────                                      │
  │  Normal text (< 18px):    4.5:1 contrast ratio           │
  │  Large text (>= 18px bold or >= 24px):  3:1 ratio        │
  │  UI components and icons:  3:1 ratio                     │
  │                                                          │
  │  Level AAA (enhanced):                                   │
  │  ────────────────────                                    │
  │  Normal text:  7:1                                       │
  │  Large text:   4.5:1                                     │
  └──────────────────────────────────────────────────────────┘


CONTRAST CHECK MATRIX:

  ┌──────────────────────┬──────────┬───────┬────────────────┐
  │ Combination          │ Ratio    │ Pass? │ Fix            │
  ├──────────────────────┼──────────┼───────┼────────────────┤
  │ Gray-600 on White    │ 5.74:1   │ ✅ AA │                │
  │ Gray-500 on White    │ 4.64:1   │ ✅ AA │                │
  │ Gray-400 on White    │ 3.04:1   │ ❌ AA │ Use gray-500   │
  │ Gray-300 on White    │ 1.90:1   │ ❌ AA │ Decorative only│
  │ Primary-600 on White │ 4.51:1   │ ✅ AA │                │
  │ Primary-500 on White │ 3.21:1   │ ❌ AA │ Use pri-600    │
  │ White on Primary-600 │ 4.51:1   │ ✅ AA │                │
  │ White on Primary-500 │ 3.21:1   │ ❌ AA │ Use pri-600 bg │
  │ Red-600 on White     │ 4.54:1   │ ✅ AA │                │
  │ Green-600 on White   │ 3.56:1   │ ❌ AA │ Use green-700  │
  └──────────────────────┴──────────┴───────┴────────────────┘


DON'T RELY ON COLOR ALONE:

  BAD (color only):                 GOOD (color + icon/text):
  ┌──────────────────────┐         ┌──────────────────────┐
  │  Status: ● (green)   │         │  Status: ✓ Active    │
  │  Status: ● (red)     │         │  Status: ✕ Inactive  │
  │  Status: ● (yellow)  │         │  Status: ◠ Pending   │
  └──────────────────────┘         └──────────────────────┘
  Colorblind user can't tell       Works without color vision
  green from red

  Required fields:
  BAD:  Red asterisk only          GOOD: * + "(required)" text
  BAD:  Red border on error        GOOD: Red border + icon + message

  Charts and graphs:
  BAD:  Color-coded only           GOOD: Color + pattern + label
  ┌───────────────────┐            ┌───────────────────┐
  │ ■ Sales  ■ Costs  │            │ ■ Sales  ▨ Costs  │
  │ (both look same   │            │ (patterns differ + │
  │  to colorblind)   │            │  labels on hover)  │
  └───────────────────┘            └───────────────────┘
```

### Step 2: Keyboard Navigation

```
KEYBOARD NAVIGATION REQUIREMENTS:

  ┌────────────────────────────────────────────────────────┐
  │  Key          │ Expected Behavior                      │
  ├────────────────┼────────────────────────────────────────┤
  │  Tab          │ Move to next focusable element         │
  │  Shift+Tab    │ Move to previous focusable element     │
  │  Enter        │ Activate button/link                   │
  │  Space        │ Activate button, toggle checkbox       │
  │  Escape       │ Close modal/dropdown/popover           │
  │  Arrow keys   │ Navigate within menus, tabs, radios    │
  │  Home/End     │ Jump to first/last item in a list      │
  └────────────────┴────────────────────────────────────────┘


TAB ORDER DIAGRAM:

  Show tab order as numbered sequence on the page:

  ┌──────────────────────────────────────────────────────────┐
  │  ┌─ Header ──────────────────────────────────────────┐   │
  │  │  [1: Logo]    [2: Search]   [3: Notif] [4: Avatar]│   │
  │  └───────────────────────────────────────────────────┘   │
  │                                                          │
  │  ┌─ Sidebar ─┐  ┌─ Main ──────────────────────────┐     │
  │  │ [5: Nav1] │  │  [9: Page Title]                │     │
  │  │ [6: Nav2] │  │  [10: Action Button]            │     │
  │  │ [7: Nav3] │  │                                  │     │
  │  │ [8: Nav4] │  │  [11: Filter 1] [12: Filter 2]  │     │
  │  └───────────┘  │                                  │     │
  │                 │  [13: Table Row 1]               │     │
  │                 │  [14: Table Row 2]               │     │
  │                 │  [15: Table Row 3]               │     │
  │                 └──────────────────────────────────┘     │
  └──────────────────────────────────────────────────────────┘

  Tab order MUST follow visual reading order:
  Header (left→right) → Sidebar (top→bottom) → Main (top→bottom)

  NEVER skip elements or jump across sections.


FOCUS TRAP FOR MODALS:

  When a modal opens:
  ┌──────────────────────────────────────────────────────────┐
  │  1. Move focus to the first focusable element in modal   │
  │  2. Tab wraps within the modal (cannot leave)            │
  │  3. Escape closes the modal                              │
  │  4. On close, return focus to the element that opened it │
  └──────────────────────────────────────────────────────────┘

  ┌─ Modal ──────────────────────────────┐
  │                                      │
  │  Create Course                [✕] ←──── Tab wraps here (last)
  │                                      │         ↑
  │  Title *                             │         │
  │  [_________________________] ←── Tab lands here (first)
  │                                      │         │
  │  Description                         │         │
  │  [_________________________]         │         │
  │                                      │         │
  │  [Cancel]    [Create] ───────────────┘         │
  │       └───── Tab continues to [✕] ────────────┘
  │                                      │
  └──────────────────────────────────────┘
  Background is inert (aria-hidden="true" on main content)
```

### Step 3: Screen Reader Flow

```
SCREEN READER ANNOUNCEMENT ORDER:

  Page load announcement:
  1. Page title (from <title> tag)
  2. Skip navigation link: "Skip to main content"
  3. Landmark: "Navigation" (sidebar)
  4. Landmark: "Main content"
  5. H1: Page heading
  6. Content in DOM order


ARIA LANDMARKS:

  ┌──────────────────────────────────────────────────────────┐
  │  <header>         role="banner"                          │
  │  ┌───────────────────────────────────────────────────┐   │
  │  │  Logo, Search, Notifications, Profile             │   │
  │  └───────────────────────────────────────────────────┘   │
  │                                                          │
  │  <nav>            role="navigation"                      │
  │  ┌───────────┐                                           │
  │  │  Sidebar  │   aria-label="Main navigation"            │
  │  │  Nav      │                                           │
  │  └───────────┘                                           │
  │                                                          │
  │  <main>           role="main"                            │
  │  ┌───────────────────────────────────────────────┐       │
  │  │  <h1>Page Title</h1>                          │       │
  │  │  <section aria-label="Course filters">        │       │
  │  │  <section aria-label="Course list">           │       │
  │  └───────────────────────────────────────────────┘       │
  │                                                          │
  │  <footer>         role="contentinfo"                     │
  │  ┌───────────────────────────────────────────────┐       │
  │  │  Footer links, copyright                      │       │
  │  └───────────────────────────────────────────────┘       │
  └──────────────────────────────────────────────────────────┘


SKIP NAVIGATION:

  First focusable element on every page:
  ┌──────────────────────────────────────┐
  │ [Skip to main content]  ← visible   │  ← Only visible on focus
  │                            on Tab    │
  │  Header content...                   │
  └──────────────────────────────────────┘

  CSS: .skip-link {
    position: absolute; left: -9999px;
    &:focus { left: 16px; top: 16px; z-index: 9999; }
  }


LIVE REGIONS FOR DYNAMIC CONTENT:

  When content updates without page reload:

  Toast notification:
  <div role="status" aria-live="polite">
    Course created successfully
  </div>

  Error message:
  <div role="alert" aria-live="assertive">
    Failed to save. Please try again.
  </div>

  Loading indicator:
  <div aria-live="polite" aria-busy="true">
    Loading courses...
  </div>

  Search results count:
  <div aria-live="polite">
    Showing 15 results for "react"
  </div>

  LIVE REGION RULES:
  □ polite: Waits for screen reader to finish current speech
  □ assertive: Interrupts immediately (use sparingly — errors only)
  □ Content must be short — screen readers read the entire region
  □ Don't put interactive elements in live regions
```

### Step 4: Form Accessibility

```
FORM LABELING REQUIREMENTS:

  Every input MUST have a visible, associated label:

  CORRECT:
  <label for="title">Course Title *</label>
  <input id="title" type="text" aria-required="true"
         aria-describedby="title-hint title-error" />
  <span id="title-hint">Enter a descriptive course name</span>
  <span id="title-error" role="alert">Title is required</span>

  VISUAL:
  ┌────────────────────────────────────┐
  │  Course Title *          ← label   │
  │  ┌──────────────────────────────┐  │
  │  │  Introduction to React      │  │ ← input
  │  └──────────────────────────────┘  │
  │  Enter a descriptive name  ← hint  │
  └────────────────────────────────────┘

  ERROR STATE:
  ┌────────────────────────────────────┐
  │  Course Title *          ← label   │
  │  ┌──────────────────────────────┐  │
  │  │                     ← red    │  │ ← aria-invalid="true"
  │  └──────────────────────────────┘  │
  │  ⚠ Title is required    ← error  │ ← role="alert"
  └────────────────────────────────────┘


FORM A11Y CHECKLIST:

  □ Every input has a visible <label> (not just placeholder)
  □ Required fields marked with * AND aria-required="true"
  □ Error messages linked via aria-describedby
  □ Error messages use role="alert" for screen reader announce
  □ Focus moves to first error field on submit failure
  □ Placeholder text is NOT the only label
  □ Help text linked via aria-describedby
  □ Submit button text describes the action ("Create Course")
  □ Form has a <fieldset> + <legend> if it has grouped fields
  □ Autocomplete attributes set where appropriate
```

### Step 5: Heading Structure

```
HEADING HIERARCHY (never skip levels):

  CORRECT:                           WRONG:
  <h1> Dashboard </h1>              <h1> Dashboard </h1>
    <h2> Statistics </h2>              <h3> Statistics </h3>  ← skipped h2
    <h2> Recent Courses </h2>          <h4> Course 1 </h4>   ← skipped h2,h3
      <h3> Course 1 </h3>
      <h3> Course 2 </h3>
    <h2> Activity Feed </h2>

  VISUAL MAP:
  ┌──────────────────────────────────────────────────────────┐
  │  h1: Dashboard                                           │
  │  ├── h2: Statistics                                      │
  │  ├── h2: Recent Courses                                  │
  │  │   ├── h3: React Basics                                │
  │  │   └── h3: Node.js Fundamentals                        │
  │  └── h2: Activity Feed                                   │
  └──────────────────────────────────────────────────────────┘

  RULES:
  □ One <h1> per page (the page title)
  □ Never skip levels (h1 → h3 is wrong)
  □ Headings should describe the section content
  □ Don't use headings for styling — use CSS classes instead
  □ Screen readers use heading hierarchy for navigation
```

### Step 6: Interactive Component Patterns

```
TABS (WAI-ARIA tabs pattern):

  ┌──────────────────────────────────────────────────────────┐
  │  <div role="tablist" aria-label="Course sections">       │
  │  ┌──────────┐ ┌──────────┐ ┌──────────┐                 │
  │  │Overview  │ │ Content  │ │ Settings │                 │
  │  │role="tab"│ │role="tab"│ │role="tab"│                 │
  │  │selected  │ │          │ │          │                 │
  │  └──────────┘ └──────────┘ └──────────┘                 │
  │  ┌──────────────────────────────────────────────────┐    │
  │  │  <div role="tabpanel"                            │    │
  │  │       aria-labelledby="tab-overview">            │    │
  │  │                                                  │    │
  │  │  Panel content                                   │    │
  │  │                                                  │    │
  │  └──────────────────────────────────────────────────┘    │
  └──────────────────────────────────────────────────────────┘

  Keyboard:
  → / ← : Move between tabs
  Enter/Space: Activate tab (if not auto-activated)
  Home: First tab
  End: Last tab


TABLE ACCESSIBILITY:

  <table>
    <caption>Course enrollment list</caption>    ← describes the table
    <thead>
      <tr>
        <th scope="col">Name</th>                ← scope="col"
        <th scope="col" aria-sort="ascending">   ← sort indicator
          Date
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John Smith</td>
        <td>Mar 20, 2026</td>
      </tr>
    </tbody>
  </table>

  □ Use <caption> to describe the table purpose
  □ Use <th scope="col|row"> for header cells
  □ Use aria-sort on sortable columns
  □ Provide aria-label on action buttons within rows
  □ Complex tables need aria-describedby for instructions


TOGGLE / SWITCH:

  ┌─────────────────────────────────────────┐
  │  Enable notifications                   │
  │                                         │
  │  <button role="switch"                  │
  │          aria-checked="true"            │
  │          aria-label="Enable notifs">    │
  │    [████░░]  ON                         │
  │  </button>                              │
  │                                         │
  │  Screen reader: "Enable notifications,  │
  │                  switch, on"            │
  └─────────────────────────────────────────┘
```

---

## Common Mistakes and Anti-Patterns

```
MISTAKE 1: div and span instead of semantic HTML

  BAD:  <div class="btn" onclick="save()">Save</div>
  GOOD: <button type="button" onClick={save}>Save</button>

  <div> is NOT focusable, has NO role, fires NO keyboard events.
  A screen reader will skip it entirely.

MISTAKE 2: Missing alt text on images

  BAD:  <img src="chart.png" />
  GOOD: <img src="chart.png" alt="Sales increased 25% in Q1" />

  For decorative images: alt="" (empty, not missing)

MISTAKE 3: Removing focus outlines

  BAD:  *:focus { outline: none; }
  GOOD: *:focus-visible { outline: 2px solid var(--primary); }

  NEVER remove focus indicators. Use :focus-visible to show them
  only for keyboard users (not mouse clicks).

MISTAKE 4: Placeholder as label

  BAD:  <input placeholder="Enter your name" />  (no label)
  GOOD: <label for="name">Name</label>
        <input id="name" placeholder="e.g., John Smith" />

  Placeholder disappears on type — user forgets what field is for.

MISTAKE 5: Color as only differentiator

  BAD:  Red text = error, green text = success (no other cue)
  GOOD: ✕ icon + red text = error, ✓ icon + green text = success

MISTAKE 6: Missing ARIA on custom widgets

  BAD:  Custom dropdown with no role, no aria-expanded
  GOOD: <div role="listbox" aria-expanded="true" aria-label="...">
```

---

## Accessibility Audit Checklist

```
┌──────────────────────────────────────────────────────────────┐
│  ACCESSIBILITY AUDIT CHECKLIST (WCAG 2.1 AA)                 │
│                                                              │
│  Perceivable                                                 │
│  □ All images have alt text (or alt="" if decorative)        │
│  □ Color contrast >= 4.5:1 for normal text                   │
│  □ Color contrast >= 3:1 for large text and UI components    │
│  □ Information not conveyed by color alone                   │
│  □ Text resizable to 200% without loss of content            │
│  □ Captions for video content                                │
│                                                              │
│  Operable                                                    │
│  □ All functionality available via keyboard                  │
│  □ No keyboard traps (can Tab out of every component)        │
│  □ Focus order matches visual reading order                  │
│  □ Focus indicator visible on all interactive elements       │
│  □ Skip navigation link present                              │
│  □ Touch targets >= 44x44px                                  │
│  □ No content that flashes > 3 times per second              │
│                                                              │
│  Understandable                                              │
│  □ Page language set (<html lang="en">)                      │
│  □ Form inputs have visible labels                           │
│  □ Error messages identify the field and suggest fix         │
│  □ Consistent navigation across pages                        │
│  □ Consistent identification of same functions               │
│                                                              │
│  Robust                                                      │
│  □ Valid HTML (no duplicate IDs, proper nesting)              │
│  □ ARIA roles, states, and properties used correctly         │
│  □ Custom widgets follow WAI-ARIA authoring practices        │
│  □ Status messages use aria-live regions                     │
│  □ Works with screen readers (VoiceOver, NVDA)               │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Tools and Resources

| Tool | Purpose |
|------|---------|
| axe DevTools | Browser extension for automated a11y testing |
| Lighthouse | Chrome audit including accessibility score |
| WAVE | Web accessibility evaluation tool |
| Color Contrast Checker | webaim.org/resources/contrastchecker |
| VoiceOver (Mac) | Built-in screen reader testing |
| NVDA (Windows) | Free screen reader for testing |
| Keyboard only | Tab through entire page without mouse |
| WAI-ARIA Practices | w3.org/WAI/ARIA/apg/patterns/ |

---

## Output Format

When designing for accessibility, always deliver:

1. **Contrast audit** — color pairs, ratios, pass/fail
2. **Keyboard navigation map** — numbered tab order for each page
3. **Screen reader flow** — what gets announced and in what order
4. **ARIA specification** — landmarks, roles, states for each component
5. **Heading structure** — h1-h6 hierarchy tree
6. **Form a11y spec** — labels, hints, errors, required fields
7. **Focus management** — trap behavior for modals, return focus rules
8. **Alternative indicators** — non-color cues for status/errors
9. **Testing plan** — keyboard, screen reader, automated checks
10. **Issue list** — findings ranked by WCAG criterion and severity
