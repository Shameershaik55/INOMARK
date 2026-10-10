---
name: Luminous Editorial AI
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#464554'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#767586'
  outline-variant: '#c7c4d7'
  surface-tint: '#494bd6'
  primary: '#4648d4'
  on-primary: '#ffffff'
  primary-container: '#6063ee'
  on-primary-container: '#fffbff'
  inverse-primary: '#c0c1ff'
  secondary: '#712ae2'
  on-secondary: '#ffffff'
  secondary-container: '#8a4cfc'
  on-secondary-container: '#fffbff'
  tertiary: '#006387'
  on-tertiary: '#ffffff'
  tertiary-container: '#007da9'
  on-tertiary-container: '#fcfcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#eaddff'
  secondary-fixed-dim: '#d2bbff'
  on-secondary-fixed: '#25005a'
  on-secondary-fixed-variant: '#5a00c6'
  tertiary-fixed: '#c4e7ff'
  tertiary-fixed-dim: '#7bd0ff'
  on-tertiary-fixed: '#001e2c'
  on-tertiary-fixed-variant: '#004c69'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-hero:
    fontFamily: Playfair Display
    fontSize: 4.5rem
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Playfair Display
    fontSize: 2.75rem
    fontWeight: '600'
    lineHeight: '1.15'
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 3rem
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 2rem
    fontWeight: '600'
    lineHeight: '1.25'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 2rem
    fontWeight: '500'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: '1.5'
  label-badge:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.06em
  label-button:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.9375rem
    fontWeight: '600'
    lineHeight: '1'
  label-caption:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.75rem
    fontWeight: '500'
    lineHeight: '1.4'
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 4rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
  space-2xl: 4rem
  space-3xl: 6rem
---

## Brand & Style

This design system embodies an airy, modern editorial aesthetic tailored for next-generation creative economies and generative AI marketplaces. It merges high-fashion editorial craftsmanship with optimistic, futuristic technology. The visual identity avoids cold, hyper-industrial tech tropes in favor of human warmth, artistic curation, and luminous lightness.

The interface serves two distinct user personas: premier AI creators seeking recognition for portfolio craft, and modern brand marketers sourcing high-end generative content. The emotional atmosphere evokes limitless creative potential, refined sophistication, and pristine clarity.

Stylistically, the system balances:
- **Luminous Soft-Glow Minimalism**: Pure white canvas with subtle, ambient pastel mesh aura gradients (soft periwinkle, lavender, blush pink, and powder sky blue) to soften digital edges.
- **Editorial High-Contrast Typography**: Pairing classical high-contrast serif headlines with pristine, humanist geometric sans-serif body copy.
- **Dimensional Tactility**: Floating media artifacts, overlapping multi-aspect photo cards, delicate translucent glassy tags, and fully pill-shaped actionable affordances.

## Colors

The palette revolves around a brilliant, high-key canvas accented by deep midnight typography and vibrant, electric violet-indigo highlights. Ambient mood is introduced via diffused pastel gradations rather than dense background colors.

### Color Roles & Implementation
- **Base Canvas (`#FFFFFF`)**: The foundational surface. Uncluttered, crisp, and high-key.
- **Luminous Ambient Accents**: Soft diffuse mesh layers layered behind hero sections and card backdrops:
  - Lavender Mist (`#EDE9FE` / `rgba(237, 233, 254, 0.6)`)
  - Blush Rose (`#FCE7F3` / `rgba(252, 231, 243, 0.5)`)
  - Sky Breeze (`#E0F2FE` / `rgba(224, 242, 254, 0.5)`)
- **Primary Interactive Brand (`#6366F1`)**: Vibrant indigo used for primary CTA buttons, focal link transitions, and active status indicators. Transitions into a rich violet (`#7C3AED`) on gradient fills or pressed interactions.
- **Typography & Structural Neutrals**:
  - Primary Midnight (`#0F172A` / `#171A26`): Deep ink navy for headers and high-emphasis labels, maintaining editorial contrast without the stark harshness of pure black.
  - Secondary Slate (`#475569`): For supportive body paragraphs, metadata, and sub-headings.
  - Subtle Muted (`#94A3B8`): For tertiary meta-info, tool credit lines, and icon outlines.
  - Border Glass (`rgba(15, 23, 42, 0.08)`): Ultra-sheer borders for cards and inactive pill pills.

## Typography

The typographical pairing anchors the system’s high-end marketplace personality. **Playfair Display** supplies editorial authority, graceful curvature, and distinctive visual prestige, while **Plus Jakarta Sans** delivers immaculate digital clarity, legibility, and geometric balance across interface details.

### Rules of Usage
- **Display Headlines**: Reserve `Playfair Display` for major marketing milestones (`display-hero`, `headline-lg`, `headline-md`). Italicized accent phrases or gradient-filled words (e.g., "create together") in headline tiers are encouraged to punctuate creative energy.
- **Body & Operations**: All functional interfaces, descriptive copy, navigation links, and data cards utilize `Plus Jakarta Sans`.
- **Badges & Eyebrows**: Set in all-caps or small-caps tracking (`letterSpacing: 0.06em`) using `label-badge` with medium to bold weights, providing clean contrast against large serif titles.

## Layout & Spacing

The layout model is built on an expansive 12-column responsive fluid grid with generous vertical cadence. Whitespace is an active design element, lending breath and luxury to the content.

### Grid & Breakpoints
- **Desktop (≥ 1280px)**: 12-column layout, max-width `1280px` or `1440px`, centered with `4rem` outer margins and `1.5rem` to `2rem` gutters. Section paddings reach `5rem` to `6rem` (`space-3xl`) to establish an open gallery rhythm.
- **Tablet (768px – 1279px)**: 8-column layout, `2.5rem` outer margins, `1.25rem` gutters. Cards reflow into 2-up grids.
- **Mobile (< 768px)**: 4-column layout, `1.25rem` outer margins, `1rem` gutters. Floating collage assets stack or switch into smooth horizontal carousels with peek margins.

### Floating Collage Rules
In asymmetric sections (like the hero creative cluster), cards break standard single-axis alignment by using calculated absolute offsets (`-10px` to `-40px`) and staggered vertical margins to simulate physical artwork lying organically on a studio desk.

## Elevation & Depth

Visual depth is conveyed through airy ambient shadows, gentle multi-layer blurs, and translucent glass borders. Hard, opaque drop-shadows are strictly avoided.

### Elevation Hierarchy
1. **Flat Level (Canvas)**: Surface base `#FFFFFF`, punctuated by low-opacity radial mesh gradient blooms positioned behind active focal points.
2. **Resting Cards & Containers (`elevation-low`)**:
   - Background: Pure `#FFFFFF` or translucent `#FFFFFF` with `90%` opacity and `12px` backdrop-blur.
   - Border: `1px solid rgba(15, 23, 42, 0.06)`.
   - Shadow: `0 4px 20px -2px rgba(99, 102, 241, 0.04), 0 2px 6px -1px rgba(15, 23, 42, 0.03)`.
3. **Floating Artwork & Popovers (`elevation-mid`)**:
   - Used for hero floating cards, hover states of gallery tiles, and dropdown menus.
   - Shadow: `0 20px 40px -15px rgba(15, 23, 42, 0.08), 0 0 1px 1px rgba(15, 23, 42, 0.04)`.
4. **Interactive Overlays & Badges (`glass-frosted`)**:
   - Background: `rgba(255, 255, 255, 0.75)` with `backdrop-filter: blur(16px)`.
   - Border: `1px solid rgba(255, 255, 255, 0.8)`.
   - Shadow: `0 8px 32px 0 rgba(99, 102, 241, 0.08)`.

## Shapes

The shape system embraces ultra-smooth curvature, utilizing pill shapes for interactive elements and generous rounded corners for content containers, evoking friendliness, tactility, and contemporary polish.

- **Interactive Controls (Buttons, Inputs, Badges)**: Full pill geometry (`rounded-full` / `9999px`).
- **Media Cards & Artwork Thumbnails**: Fluid geometric curvature ranging from `1.25rem` (`rounded-2xl`) to `1.75rem` (`rounded-3xl`).
- **Feature Splices & Container Boxes**: Heavy outer radii (`2rem` / `32px`) to cradle nested imagery and content blocks.
- **Image Treatment**: Visual assets inside cards inherit the card’s internal border-radius or clip tightly against clean rounded frame masks.

## Components

### Buttons
- **Primary Pill**:
  - Base: Solid Indigo (`#6366F1`) or subtle gradient to Purple (`#7C3AED`). White label text (`#FFFFFF`), `rounded-full`, horizontal padding `1.75rem`, vertical padding `0.75rem`. Optional right-facing micro-arrow (`→`) that translates `+3px` on hover.
  - Hover: Subtle luminance lift, shadow deepens to `0 8px 24px -4px rgba(99, 102, 241, 0.35)`.
- **Secondary Outlined Pill**:
  - Base: Pure white surface or transparent, `1px solid rgba(15, 23, 42, 0.12)`, text `#0F172A`.
  - Hover: Background fills to `rgba(99, 102, 241, 0.04)`, border darkens to `#6366F1`.

### Eyebrow Badges & Tags
- Compact pill-shaped status indicators (`rounded-full`).
- Background: Lighter tint of purple/indigo (`rgba(99, 102, 241, 0.08)` or `#F5F3FF`).
- Text: `#6366F1`, uppercase tracking, font size `0.75rem`.
- Prefix: Subtle sparkle glyph (`✦`) or small contextual iconography.

### Gallery & Showcase Cards
- Media-centric cards with high aspect-ratio visual assets (1:1, 4:5, or cinematic 16:9).
- Rounded corners (`rounded-2xl`), subtle border `1px solid rgba(15, 23, 42, 0.06)`, and floating ambient drop shadow.
- Metadata below media includes title in semibold sans-serif (`#0F172A`) and software/model attribution tags (e.g., "Image · Midjourney") in muted slate (`#94A3B8`).

### Feature Comparison Splice Cards
- Two-column split modules for dual audiences ("For Creators" vs. "For Brands").
- Surface: Crisp white with asymmetric corner gradient auras (faint violet or sky blue).
- Content pairing: Pill badge tag, serif heading, concise explanatory paragraph, and dedicated pill CTA button accompanied by organic portrait or structural photography.

### Floating Glass Overlay Cards
- Micro-cards floating on top of primary visuals (e.g., "AI Generated: Unlimited Possibilities").
- Ultra-frosted glass blur (`backdrop-filter: blur(12px)`, `rgba(255, 255, 255, 0.8)`).
- Pill or rounded-xl shape, accompanied by four-point sparkle icons (`✦`) in vibrant indigo.

### Form Inputs & Filters
- In-page inputs feature `rounded-full` enclosures, light grey/translucent background (`#F8FAFC`), deep navy text, and an illuminated indigo ring on focus (`box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2)`).