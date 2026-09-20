---
name: Tactical Elimination Grid
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#b9cbb9'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#849585'
  outline-variant: '#3b4b3d'
  surface-tint: '#00e478'
  primary: '#f1ffef'
  on-primary: '#003919'
  primary-container: '#00ff87'
  on-primary-container: '#007138'
  inverse-primary: '#006d36'
  secondary: '#ffe083'
  on-secondary: '#3c2f00'
  secondary-container: '#eec200'
  on-secondary-container: '#645000'
  tertiary: '#fffaf9'
  on-tertiary: '#68000a'
  tertiary-container: '#ffd5d1'
  on-tertiary-container: '#bf1f27'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#60ff98'
  primary-fixed-dim: '#00e478'
  on-primary-fixed: '#00210c'
  on-primary-fixed-variant: '#005227'
  secondary-fixed: '#ffe083'
  secondary-fixed-dim: '#eec200'
  on-secondary-fixed: '#231b00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3ad'
  on-tertiary-fixed: '#410004'
  on-tertiary-fixed-variant: '#930013'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 56px
    fontWeight: '800'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 42px
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 30px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 26px
    letterSpacing: 0em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '700'
    lineHeight: 22px
    letterSpacing: 0.02em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  metric-xl:
    fontFamily: JetBrains Mono
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.04em
  metric-lg:
    fontFamily: JetBrains Mono
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 26px
    letterSpacing: -0.02em
  metric-md:
    fontFamily: JetBrains Mono
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: -0.01em
  label-badge:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '800'
    lineHeight: 14px
    letterSpacing: 0.06em
  telemetry-mono:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-tablet: 0.75rem
  gutter-mobile: 0.5rem
  margin: 2rem
  margin-tablet: 1rem
  margin-mobile: 0.75rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style
The design system operates at the intersection of high-stakes knockout tournament drama and sterile tactical mastery ("Copero" grit meets surgical technical execution). It projects an intense, competitive, broadcast-grade atmosphere tailored for browser-based strategic gameplay. 

The aesthetic is precision-driven dark mode sport-tech: crisp telemetry, deep midnight turf layers, and decisive high-visibility indicators. Interface surfaces feel like an advanced tactical digital chalkboard inside a championship dressing room. Visual clutter is stripped away to let squad metrics, knockout brackets, stamina gauges, and ruthless scorelines dominate user attention. Micro-interactions should feel sudden, snap-responsive, and consequential—mirroring a single-elimination tie.

## Colors
The palette leverages high-contrast luminescence on deep layered slates to replicate stadium floodlights against pitch shadows:

- **Primary (`#00FF87` - Neon Pitch Green):** Primary action triggers, confirmation states, top-tier ratings (OVR 85+), stamina peaks, and advancement confirmation. Hover states pull toward `#10B981`.
- **Secondary (`#FACC15` - Whistle Yellow):** Tactical warnings, pending tactical subs, penalty shootouts, and decision timeouts.
- **Tertiary (`#EF4444` - Card Red):** Instant knockout, conceding a goal, critical fatigue, red card sanctions, and destructive actions.
- **Neutral & Surfaces:**
  - Base Canvas (`#0B0F17`): Void background providing infinite contrast.
  - Surface Mid (`#0F172A`): Structural grid panels, sidebars, and viewport containers.
  - Surface Raised (`#162032`): Modular card bodies, tactical formations, and player slot containers.
  - Surface Active (`#1E293B`): Active card state, focused inputs, and hovered table rows.
  - Borders & Dividers: Semi-transparent slates (`#334155` and `rgba(255, 255, 255, 0.08)`).
- **Accents & Glory:** Trophy Gold (`#F59E0B` to `#FCD34D`) reserved strictly for final trophy brackets, match MVP medals, and legendary player tiers.

## Typography
Typographic rhythm enforces a strict hierarchy between strategic tactical text and live game telemetry:

- **Headlines, Team Names, and Match Results:** Set in `Plus Jakarta Sans` in weights 700 and 800. Tournament headers, stage titles, and critical notices utilize uppercase casing with subtle negative letter-spacing for athletic, solid impact.
- **Match Telemetry & Ratings:** Match clocks, match stats (xG, possession, duels), overall player numbers (OVR), and live odds are strictly rendered in `JetBrains Mono` with tabular numbers enabled (`tnum`) to eliminate layout jump during live simulations.
- **Micro Labels & Tags:** Set in bold all-caps with generous tracking (`0.06em`) for rapid scanability during time-sensitive management decisions.

## Layout & Spacing
Built upon an unyielding **8px base grid** (with 4px half-steps for micro telemetry), the layout prioritizes situational awareness and rapid side-by-side tactical comparisons.

- **Desktop (12-column dynamic grid, 1280px+):** Tri-panel architecture displaying Live Bracket / Fixtures on the left (3 cols), Interactive Pitch Board / Match Canvas in the center (6 cols), and Squad Telemetry / Actions on the right (3 cols). Gutters fixed at `1rem` (16px) with an outer container margin of `2rem` (32px).
- **Tablet (8-column grid, 768px - 1279px):** Split-view with persistent match canvas top/center and collapsible tabbed panels below for bench, tactical substitutions, and dynamic statistics. Gutters at `0.75rem` (12px).
- **Mobile (4-column grid, <768px):** Full-bleed vertical stack with sticky bottom match action controls. Tactical pitch transforms into a top-down scrollable sheet or swipeable formation view. Outer margins tight at `0.75rem` (12px) to maximize touch target footprints.

## Elevation & Depth
The system uses stacked tonal planes and subtle directional neon backdrops rather than soft generic drop shadows.

- **Ground Level (Canvas):** Pure `#0B0F17`, unlit flat backdrop.
- **Level 1 (Panels & Field Grid):** Surface `#0F172A` edged by an outer hair-line stroke of `rgba(255, 255, 255, 0.08)`. No blur shadow.
- **Level 2 (Active Cards, Player Tokens, Modular Widgets):** Surface `#162032` with a 1px border of `#334155`. In high-priority situations (e.g. current attacking phase, penalty kick), the card gains a low-diffusion neon edge-tint: `box-shadow: 0 0 16px -2px rgba(0, 255, 135, 0.15)`.
- **Level 3 (Tactical Overlays & Modal Confirmations):** Deep tinted backdrop blur (`backdrop-filter: blur(12px) bg: rgba(11, 15, 23, 0.85)`), surfaced with `#1E293B`, framed in crisp `#334155`.

## Shapes
Shapes express modern athletic gear: aerodynamic, clean, and controlled. 

- **Cards and Panels:** Governed by an exact **10px to 12px** boundary (`rounded-lg` token), providing a structured box silhouette that nests cleanly into tactical boards without looking round or childlike.
- **Pills and Badges:** Compact metric chips, status indicators, and minute-counters utilize full pill rounding (`9999px`) to create clear contrast against angular tactical boards.
- **Form Controls & Inputs:** Inputs and linear buttons adopt standard **8px** radii for structural alignment with grid lines.

## Components

### Buttons
- **Primary ("Action / Confirm Tactics"):** Background in saturated `#00FF87`, text in contrasting `#0B0F17` (`font-weight: 800`), all-caps tracking. Hover transition to `#10B981` with subtle pulse glow (`box-shadow: 0 0 12px rgba(0, 255, 135, 0.35)`). Active state scales down to `0.98`.
- **Destructive ("Forfeit / Instant Out"):** `#EF4444` background or 1px border with red semi-transparent fill (`rgba(239, 68, 68, 0.1)`), text in `#FFFFFF`.
- **Ghost / Tactical:** Border 1px `rgba(255, 255, 255, 0.15)`, transparent background, hover state switches fill to `#1E293B`.

### Tactical Cards & Player Badges
- **Pitch Token:** Circular player token (40px or 48px) with `#162032` base, crisp number in `JetBrains Mono`, and border ring colored dynamically by stamina/card status (Green > Yellow > Red).
- **Player Card:** Compact 10px-radius container. Top bar features player position tag (e.g., `FWD`, `CB`) and overall rating (`OVR 89`) in tabular mono. Body carries tactical role details. Bottom anchors high-precision linear attribute bars.

### Progress Bars & Telemetry Gauges
- **Stamina / Momentum Bar:** Ultra-compact (4px - 6px height) track in `#1E293B` with flat ends. Progress fill is neon `#00FF87` transitioning smoothly to `#FACC15` when below 40%, and `#EF4444` under 15%. No rounded caps; razor-sharp linear dividers indicate stamina segments.

### Status Badges & Chips
- Form Factor: 20px height, uppercase `Plus Jakarta Sans` at 11px.
- Variants:
  - *Lead / In Play:* `#00FF87` border and text with 10% opacity background.
  - *Under Review / Var / Whistle:* `#FACC15` border and text with 10% opacity background.
  - *Eliminated / Red Card:* `#EF4444` background, solid white text.
  - *Champion:* `#F59E0B` metallic gold border, high-contrast black/dark background.

### Input Fields & Selectors
- Background `#0F172A`, 1px border `#334155`, focus ring expands 1px with `#00FF87` border tint and zero shadow blur. Micro-labels sit outside or tucked tight above the border.

### Brackets & Knockout Matchups
- Connecting lines rendered in 2px wide `#334155`. The winning path illuminates dynamically into `#00FF87`, turning the entire traversed branch fluorescent.