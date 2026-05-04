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
name: design-system
description: "Define or extend a design system with tokens (colors, spacing, typography, shadows, radii), component variants, naming conventions, and documentation. Use when establishing visual consistency, onboarding new designers, or auditing token usage across a codebase."
---

# Design System — The Single Source of Visual Truth

Defines, documents, and extends design tokens (colors, typography, spacing, shadows, radii, motion) and component variant specifications. A design system ensures visual consistency, speeds up development, and prevents one-off styles from creeping in.

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
│     → Audit the existing tokens and variables first          │
│     → Read tailwind.config, CSS variables, theme files       │
│     → Identify what tokens already exist before adding       │
│     → Never assume — look at the actual configuration       │
│                                                              │
│  2. REUSE — NEVER REINVENT                                   │
│     → Search for existing tokens before creating new ones    │
│     → If a color/size is close enough, use it                │
│     → Shared tokens go in shared config, not inline          │
│     → Ask: "Does this token already exist?"                  │
│                                                              │
│  3. USE EXISTING DESIGN LANGUAGE                             │
│     → Extend the existing scale, don't create parallel ones  │
│     → Follow the naming convention already established       │
│     → New tokens must fit the existing hierarchy             │
│                                                              │
│  4. ASK BEFORE ADDING ANYTHING NEW                           │
│     → New color? → ASK first                                 │
│     → New font? → ASK first                                  │
│     → New spacing value? → ASK first                         │
│     → New shadow? → ASK first                                │
│     → Never add tokens without confirmation                  │
│                                                              │
│  5. DESIGN FOR ALL STATES                                    │
│     → Every component needs: default, hover, active,         │
│       focus, disabled states as tokens                       │
│     → Light mode + dark mode values for every color          │
│     → Ensure sufficient contrast in both modes               │
│                                                              │
│  6. COMMUNICATE VISUALLY                                     │
│     → Show token swatches and scales visually                │
│     → Include before/after when modifying tokens             │
│     → Document usage examples for every token                │
│     → Build a living reference, not a static doc             │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## When to Use This Skill

| Scenario | Use This? |
|----------|-----------|
| Defining a new project's visual foundation | Yes |
| Adding a new color or typography style | Yes |
| Auditing token consistency across pages | Yes |
| Creating dark mode support | Yes |
| Onboarding a designer to the existing system | Yes |
| Designing a single page layout | No — use `wireframe` |
| Checking accessibility of colors | No — use `a11y-design` |

---

## Step-by-Step Process

### Step 1: Audit Existing Tokens

Before adding anything, map what exists:

```
TOKEN AUDIT CHECKLIST:
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  □ Read tailwind.config.ts / tailwind.config.js             │
│  □ Read globals.css / variables.css for CSS custom props    │
│  □ Search for inline colors (hex, rgb, hsl) in components   │
│  □ List all font-family declarations                        │
│  □ List all hardcoded spacing values                        │
│  □ List all shadow declarations                             │
│  □ List all border-radius values                            │
│  □ Check for dark mode variables/classes                    │
│  □ Check for breakpoint definitions                         │
│  □ Identify tokens used inconsistently across files         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Step 2: Define the Color System

```
COLOR ARCHITECTURE:

  ┌─ Brand Colors ────────────────────────────────────────────┐
  │                                                           │
  │  Primary (main brand action color)                        │
  │  ┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐ │
  │  │ 50  │ 100 │ 200 │ 300 │ 400 │ 500 │ 600 │ 700 │ 800 │ │
  │  │░░░░░│░░░░░│▒▒▒▒▒│▒▒▒▒▒│▓▓▓▓▓│█████│█████│█████│█████│ │
  │  │light│     │     │     │ def │ dark│     │     │deep │ │
  │  └─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┘ │
  │                                                           │
  │  Usage:                                                   │
  │  50:  Backgrounds (hover states, selected rows)           │
  │  100: Subtle backgrounds (badges, tags)                   │
  │  200: Borders (focus rings, active borders)               │
  │  500: Default buttons, links, icons                       │
  │  600: Hover state for primary actions                     │
  │  700: Active/pressed state                                │
  │  900: Text on light backgrounds                           │
  │                                                           │
  └───────────────────────────────────────────────────────────┘

  ┌─ Semantic Colors ─────────────────────────────────────────┐
  │                                                           │
  │  Success    ██ green-500    Positive actions, completion   │
  │  Warning    ██ amber-500    Caution, pending, degraded    │
  │  Error      ██ red-500      Destructive, failed, invalid  │
  │  Info       ██ blue-500     Informational, neutral alerts │
  │                                                           │
  │  Each semantic color needs the full 50-900 scale          │
  │                                                           │
  └───────────────────────────────────────────────────────────┘

  ┌─ Neutral Colors (grays) ──────────────────────────────────┐
  │                                                           │
  │  ┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐ │
  │  │ 50  │ 100 │ 200 │ 300 │ 400 │ 500 │ 600 │ 700 │ 800 │ │
  │  │░░░░░│░░░░░│▒▒▒▒▒│▒▒▒▒▒│▓▓▓▓▓│█████│█████│█████│█████│ │
  │  └─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┘ │
  │                                                           │
  │  50:   Page background                                    │
  │  100:  Card/section background                            │
  │  200:  Borders, dividers                                  │
  │  300:  Disabled backgrounds                               │
  │  400:  Placeholder text                                   │
  │  500:  Secondary text, icons                              │
  │  600:  Body text (light mode)                             │
  │  700:  Headings                                           │
  │  800:  High-emphasis text                                 │
  │  900:  Maximum contrast text                              │
  │                                                           │
  └───────────────────────────────────────────────────────────┘
```

**Color Naming Convention:**

```
NAMING DECISION TREE:

  What kind of color?
  ├── Brand identity
  │   └── primary-{50-900}, secondary-{50-900}
  ├── Status/feedback
  │   └── success-{50-900}, warning-{50-900}, error-{50-900}, info-{50-900}
  ├── Neutral/gray
  │   └── gray-{50-900} or neutral-{50-900}
  └── Semantic/functional
      └── text-{primary|secondary|muted|disabled}
          bg-{primary|secondary|muted|elevated}
          border-{default|strong|subtle}

  NEVER:
  ✕ Use color names: "blue", "red" → use "primary", "error"
  ✕ Use arbitrary values: "#3B82F6" inline → use token
  ✕ Mix naming schemes: "primary-blue" and "btn-color"
```

### Step 3: Define Typography Scale

```
TYPOGRAPHY SCALE:

  ┌────────────┬────────┬────────────┬───────────┬──────────────────┐
  │ Token      │ Size   │ Weight     │ Line-Ht   │ Use              │
  ├────────────┼────────┼────────────┼───────────┼──────────────────┤
  │ text-xs    │ 12px   │ 400        │ 16px      │ Captions, badges │
  │ text-sm    │ 14px   │ 400        │ 20px      │ Body text, forms │
  │ text-base  │ 16px   │ 400        │ 24px      │ Primary body     │
  │ text-lg    │ 18px   │ 500        │ 28px      │ Card titles      │
  │ text-xl    │ 20px   │ 600        │ 28px      │ Section headers  │
  │ text-2xl   │ 24px   │ 600        │ 32px      │ Page headers     │
  │ text-3xl   │ 30px   │ 700        │ 36px      │ Hero/marketing   │
  │ text-4xl   │ 36px   │ 700        │ 40px      │ Landing pages    │
  └────────────┴────────┴────────────┴───────────┴──────────────────┘

  VISUAL SCALE:

  text-4xl ████████████████████████████████████  Landing Hero
  text-3xl ██████████████████████████████        Marketing H1
  text-2xl ████████████████████████              Page Title
  text-xl  ██████████████████████                Section Header
  text-lg  ████████████████████                  Card Title
  text-base ██████████████████                   Body Copy
  text-sm  ████████████████                      Form Labels
  text-xs  ██████████████                        Captions

  FONT FAMILIES:

  ┌─────────────┬────────────────────┬─────────────────────┐
  │ Token       │ Font               │ Use                 │
  ├─────────────┼────────────────────┼─────────────────────┤
  │ font-sans   │ Inter, sans-serif  │ All UI text         │
  │ font-mono   │ JetBrains Mono     │ Code, data, IDs     │
  │ font-display│ Cal Sans, display  │ Marketing headlines │
  └─────────────┴────────────────────┴─────────────────────┘
```

### Step 4: Define Spacing Scale

```
SPACING SCALE (base unit: 4px):

  Token    │ Value  │ Visual             │ Use
  ─────────┼────────┼────────────────────┼──────────────────
  space-0  │ 0px    │                    │ Reset
  space-0.5│ 2px    │ ▏                  │ Hairline gaps
  space-1  │ 4px    │ ▎                  │ Icon-label gap
  space-1.5│ 6px    │ ▍                  │ Tight padding
  space-2  │ 8px    │ ▌                  │ Related elements
  space-3  │ 12px   │ ▋                  │ Form field gap
  space-4  │ 16px   │ █                  │ Card padding
  space-5  │ 20px   │ █▎                 │ Comfortable gap
  space-6  │ 24px   │ █▌                 │ Section gap
  space-8  │ 32px   │ ██                 │ Major blocks
  space-10 │ 40px   │ ██▌                │ Layout spacing
  space-12 │ 48px   │ ███                │ Page margins
  space-16 │ 64px   │ ████               │ Hero spacing
  space-20 │ 80px   │ █████              │ Section breaks

  SPACING DECISION TREE:

  What are you spacing?
  ├── Icon next to text                    → space-1 (4px)
  ├── Related form elements                → space-2 to space-3 (8-12px)
  ├── Cards in a grid                      → space-4 to space-6 (16-24px)
  ├── Major page sections                  → space-8 to space-12 (32-48px)
  ├── Padding inside a card/container      → space-4 to space-6 (16-24px)
  ├── Page-level horizontal margins        → space-6 to space-8 (24-32px)
  └── Between header and content           → space-6 to space-8 (24-32px)
```

### Step 5: Define Component Tokens

```
COMPONENT TOKEN MAP:

  ┌─ Button ──────────────────────────────────────────────────┐
  │                                                           │
  │  Variant    │ BG         │ Text      │ Border    │ Hover  │
  │  ──────────┼────────────┼───────────┼───────────┼────────│
  │  Primary   │ primary-600│ white     │ none      │ pri-700│
  │  Secondary │ white      │ gray-700  │ gray-300  │ gray-50│
  │  Ghost     │ transparent│ gray-600  │ none      │ gray-50│
  │  Danger    │ red-600    │ white     │ none      │ red-700│
  │  Link      │ transparent│ pri-600   │ none      │ pri-700│
  │                                                           │
  │  Size      │ Height │ Padding-X │ Font-Size │ Radius     │
  │  ──────────┼────────┼───────────┼───────────┼────────────│
  │  xs        │ 28px   │ 8px       │ 12px      │ radius-md  │
  │  sm        │ 32px   │ 12px      │ 14px      │ radius-md  │
  │  md        │ 36px   │ 16px      │ 14px      │ radius-md  │
  │  lg        │ 40px   │ 20px      │ 16px      │ radius-md  │
  │  xl        │ 48px   │ 24px      │ 16px      │ radius-lg  │
  │                                                           │
  │  States:                                                  │
  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
  │  │ Default  │  │  Hover   │  │  Active  │  │ Disabled │  │
  │  │ pri-600  │  │  pri-700 │  │  pri-800 │  │ gray-300 │  │
  │  │ shadow-sm│  │ shadow-md│  │ shadow-xs│  │ no shadow│  │
  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
  │  ┌──────────┐                                             │
  │  │  Focus   │                                             │
  │  │ ring-2   │                                             │
  │  │ pri-200  │                                             │
  │  └──────────┘                                             │
  └───────────────────────────────────────────────────────────┘

  ┌─ Badge ───────────────────────────────────────────────────┐
  │                                                           │
  │  Variant   │ BG          │ Text        │ Border           │
  │  ─────────┼─────────────┼─────────────┼──────────────────│
  │  default  │ gray-100    │ gray-700    │ gray-200         │
  │  success  │ green-50    │ green-700   │ green-200        │
  │  warning  │ amber-50    │ amber-700   │ amber-200        │
  │  error    │ red-50      │ red-700     │ red-200          │
  │  info     │ blue-50     │ blue-700    │ blue-200         │
  │  primary  │ pri-50      │ pri-700     │ pri-200          │
  │                                                           │
  └───────────────────────────────────────────────────────────┘
```

### Step 6: Define Shadows, Radii, and Motion

```
SHADOW SCALE:

  Token      │ Value                              │ Use
  ───────────┼────────────────────────────────────┼──────────────
  shadow-xs  │ 0 1px 2px rgba(0,0,0,0.05)        │ Subtle lift
  shadow-sm  │ 0 1px 3px rgba(0,0,0,0.1)         │ Cards, buttons
  shadow-md  │ 0 4px 6px rgba(0,0,0,0.1)         │ Dropdowns
  shadow-lg  │ 0 10px 15px rgba(0,0,0,0.1)       │ Modals, popovers
  shadow-xl  │ 0 20px 25px rgba(0,0,0,0.1)       │ Large modals
  shadow-none│ none                               │ Reset / flat

BORDER RADIUS SCALE:

  Token      │ Value  │ Visual          │ Use
  ───────────┼────────┼─────────────────┼──────────────
  radius-none│ 0px    │ ┌──────┐        │ Sharp corners
  radius-sm  │ 4px    │ ╭──────╮        │ Subtle rounding
  radius-md  │ 6px    │ ╭──────╮        │ Default (inputs, buttons)
  radius-lg  │ 8px    │ ╭──────╮        │ Cards, containers
  radius-xl  │ 12px   │ ╭──────╮        │ Large cards, modals
  radius-2xl │ 16px   │ ╭──────╮        │ Pill shapes
  radius-full│ 9999px │  (    )         │ Circles, pills

MOTION / TRANSITION TOKENS:

  Token            │ Duration │ Easing              │ Use
  ─────────────────┼──────────┼─────────────────────┼─────────────
  duration-fast    │ 100ms    │ ease-out             │ Hover effects
  duration-normal  │ 200ms    │ ease-in-out          │ State changes
  duration-slow    │ 300ms    │ ease-in-out          │ Modals, panels
  duration-slower  │ 500ms    │ cubic-bezier custom  │ Page transitions

  MOTION RULE:
  □ Hover/focus: 100-150ms (instant feedback)
  □ Opening/closing: 200-300ms (smooth but not slow)
  □ Large layouts: 300-500ms (pages, sidebars)
  □ Never exceed 500ms — feels sluggish
```

---

## Dark Mode Token Mapping

```
LIGHT / DARK MODE PAIRS:

  Semantic Token     │ Light Mode        │ Dark Mode
  ───────────────────┼───────────────────┼──────────────────
  bg-primary         │ white             │ gray-950
  bg-secondary       │ gray-50           │ gray-900
  bg-muted           │ gray-100          │ gray-800
  bg-elevated        │ white             │ gray-900
  ───────────────────┼───────────────────┼──────────────────
  text-primary       │ gray-900          │ gray-50
  text-secondary     │ gray-600          │ gray-400
  text-muted         │ gray-400          │ gray-500
  text-disabled      │ gray-300          │ gray-600
  ───────────────────┼───────────────────┼──────────────────
  border-default     │ gray-200          │ gray-700
  border-strong      │ gray-300          │ gray-600
  border-subtle      │ gray-100          │ gray-800
  ───────────────────┼───────────────────┼──────────────────
  shadow-card        │ shadow-sm         │ shadow-none +
                     │                   │ border-subtle

  IMPLEMENTATION:
  Use CSS custom properties so dark mode is automatic:

  :root {
    --bg-primary: theme(colors.white);
    --text-primary: theme(colors.gray.900);
  }
  .dark {
    --bg-primary: theme(colors.gray.950);
    --text-primary: theme(colors.gray.50);
  }
```

---

## Common Mistakes and Anti-Patterns

```
MISTAKE 1: One-off color values

  BEFORE (bad):                        AFTER (good):
  className="text-[#6366F1]"           className="text-primary-500"
  className="bg-[#EEF2FF]"            className="bg-primary-50"

  Rule: If you use a hex value more than once, it MUST be a token.

MISTAKE 2: Inconsistent spacing

  BEFORE (bad):                        AFTER (good):
  className="p-3 mt-7 mb-5 gap-9"     className="p-4 mt-8 mb-6 gap-4"
                                       (all values on the 4px grid)

  Rule: Every spacing value must be on the 4px base grid.

MISTAKE 3: Too many font sizes

  BEFORE (bad):                        AFTER (good):
  13px, 14px, 15px, 16px, 17px        text-sm (14px), text-base (16px)
  (5 sizes that are barely different)  (2 distinct sizes with clear purpose)

  Rule: Use the typographic scale. No arbitrary font sizes.

MISTAKE 4: No semantic naming

  BEFORE (bad):                        AFTER (good):
  --blue-button-bg                     --btn-primary-bg
  --red-text                           --text-error
  --light-gray-border                  --border-subtle

  Rule: Name by function/purpose, not visual appearance.
```

---

## Design System Quality Checklist

```
┌──────────────────────────────────────────────────────────────┐
│  DESIGN SYSTEM QUALITY CHECKLIST                             │
│                                                              │
│  Tokens                                                      │
│  □ Color palette complete (primary, semantic, neutral)        │
│  □ All colors have 50-900 scale                              │
│  □ Typography scale defined (size, weight, line-height)      │
│  □ Spacing scale on 4px grid                                 │
│  □ Shadow scale defined (xs through xl)                      │
│  □ Border radius scale defined                               │
│  □ Motion/transition tokens defined                          │
│                                                              │
│  Naming                                                      │
│  □ Semantic names (not visual: "primary" not "blue")         │
│  □ Consistent format (kebab-case throughout)                 │
│  □ No duplicate tokens with different names                  │
│  □ Clear hierarchy (bg-primary > bg-secondary > bg-muted)    │
│                                                              │
│  Dark Mode                                                   │
│  □ Every light token has a dark equivalent                   │
│  □ Contrast ratios maintained in both modes                  │
│  □ Shadows adjusted for dark backgrounds                     │
│  □ Semantic colors still readable in dark mode               │
│                                                              │
│  Components                                                  │
│  □ All variants documented (primary, secondary, ghost...)    │
│  □ All sizes documented (xs, sm, md, lg, xl)                 │
│  □ All states documented (default, hover, active, disabled)  │
│  □ Focus states use consistent ring style                    │
│  □ Disabled states are visually distinct but not hidden      │
│                                                              │
│  Documentation                                               │
│  □ Usage examples for every token                            │
│  □ Do/don't examples showing correct vs incorrect usage      │
│  □ Decision tree for choosing variants                       │
│  □ Migration guide if replacing existing tokens              │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Output Format

When defining or extending a design system, always deliver:

1. **Audit summary** — what exists, what is missing, what is inconsistent
2. **Color system** — full palette with scales and semantic mapping
3. **Typography scale** — sizes, weights, line heights, font families
4. **Spacing scale** — values, visual reference, usage guidance
5. **Component tokens** — per-component variant and state specifications
6. **Dark mode mapping** — light/dark pairs for every semantic token
7. **Naming conventions** — rules for naming new tokens
8. **Migration notes** — what to change in existing code (if applicable)
9. **Usage examples** — correct and incorrect usage for each token
