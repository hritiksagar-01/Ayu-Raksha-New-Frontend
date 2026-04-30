---
name: Ayu-Raksha Core
colors:
  surface: '#f9f9f7'
  surface-dim: '#dadad8'
  surface-bright: '#f9f9f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f1'
  surface-container: '#eeeeec'
  surface-container-high: '#e8e8e6'
  surface-container-highest: '#e2e3e0'
  on-surface: '#1a1c1b'
  on-surface-variant: '#414845'
  inverse-surface: '#2f312f'
  inverse-on-surface: '#f0f1ee'
  outline: '#717975'
  outline-variant: '#c0c8c3'
  surface-tint: '#3e6659'
  primary: '#1c4438'
  on-primary: '#ffffff'
  primary-container: '#345c4f'
  on-primary-container: '#a7d3c2'
  inverse-primary: '#a5d0bf'
  secondary: '#675d4e'
  on-secondary: '#ffffff'
  secondary-container: '#efe0cd'
  on-secondary-container: '#6d6354'
  tertiary: '#5a332d'
  on-tertiary: '#ffffff'
  tertiary-container: '#754943'
  on-tertiary-container: '#f6bbb3'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c0ecdb'
  primary-fixed-dim: '#a5d0bf'
  on-primary-fixed: '#002118'
  on-primary-fixed-variant: '#264e42'
  secondary-fixed: '#efe0cd'
  secondary-fixed-dim: '#d2c4b2'
  on-secondary-fixed: '#221a0f'
  on-secondary-fixed-variant: '#4f4538'
  tertiary-fixed: '#ffdad5'
  tertiary-fixed-dim: '#f3b8b0'
  on-tertiary-fixed: '#32120e'
  on-tertiary-fixed-variant: '#653c36'
  background: '#f9f9f7'
  on-background: '#1a1c1b'
  surface-variant: '#e2e3e0'
typography:
  h1:
    fontFamily: Newsreader
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.2'
  h2:
    fontFamily: Newsreader
    fontSize: 36px
    fontWeight: '600'
    lineHeight: '1.3'
  h3:
    fontFamily: Newsreader
    fontSize: 28px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-bold:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  button:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  2xl: 32px
  3xl: 48px
  4xl: 64px
  5xl: 96px
---

## Brand & Style

This design system is built on a **Corporate / Modern** foundation infused with **Minimalist** warmth. It balances the precision of medical science with the organic comfort of holistic wellness. The visual language aims to evoke immediate trust through structured layouts while remaining approachable through soft secondary tones and elegant typography.

The interface prioritizes clarity and whitespace to reduce cognitive load for patients and practitioners alike. It avoids clinical coldness by utilizing tactile feedback and a sophisticated, nature-inspired palette, ensuring that the portal feels like a premium sanctuary for health management.

## Colors

The color palette is anchored by **Deep Forest Green**, symbolizing vitality, growth, and medical professionalism. This is balanced by **Warm Cream** surfaces that prevent the interface from feeling sterile or intimidating.

**Warm Gold** is used sparingly as an accent to denote premium services, highlighted features, or calls to action that require a touch of distinction. The background remains a soft off-white to maintain high readability while softening the glare often found in traditional medical applications. Text maintains a high contrast ratio using deep charcoal and slate grays to ensure accessibility across all demographics.

## Typography

This design system utilizes a dual-font strategy to bridge the gap between tradition and modernity. **Newsreader** (serving as the serif "Playfair Display" equivalent) provides an authoritative, editorial feel for headings, suggesting a legacy of medical knowledge and care.

**Inter** is utilized for all functional and body text. Its neutral, systematic design ensures maximum legibility for patient records, prescriptions, and instructions. For navigational elements and small labels, an increased letter spacing is applied to maintain clarity at smaller scales. Use Newsreader for storytelling and high-level headers; use Inter for any interactive or data-heavy content.

## Layout & Spacing

The layout follows a **Fixed Grid** model on desktop, centering content within a 1280px container to ensure information remains scannable and contained. A 12-column system is used with a generous 24px gutter to provide ample breathing room between medical modules and data widgets.

The spacing rhythm is strictly derived from a **4px base unit**. Smaller increments (4px, 8px, 12px) are reserved for internal component padding and related grouping, while larger increments (32px, 48px, 64px) are used to define distinct sections of the portal. This mathematical consistency creates a sense of order and reliability inherent in professional healthcare environments.

## Elevation & Depth

Visual hierarchy in this design system is achieved through **Tonal Layers** and **Ambient Shadows**. Instead of harsh borders, surfaces are distinguished by subtle shifts in background color and soft, diffused shadows.

- **Level 0 (Background):** #FAFAFA.
- **Level 1 (Surface/Cards):** #FFFFFF with a soft shadow (0px 4px 12px rgba(52, 92, 79, 0.05)).
- **Level 2 (Modals/Popovers):** #FFFFFF with a deeper shadow (0px 8px 24px rgba(0, 0, 0, 0.08)).

Shadow colors are slightly tinted with the Primary Dark green to maintain a cohesive, organic feel. High-priority interactive elements use a subtle vertical lift on hover to signal interactability without disrupting the calm atmosphere.

## Shapes

The shape language is consistently **Rounded**, avoiding sharp corners to reinforce the "warm and caring" brand personality. 

- **6px (Small):** Applied to compact interactive elements such as buttons, tags, and input fields.
- **8px (Medium):** The standard for content containers, cards, and notification banners.
- **12px (Large):** Reserved for major structural components like modals, large dashboard cards, and feature sections.

These radii are designed to feel intentional and modern while remaining disciplined enough for a professional medical context.

## Components

### Buttons
Primary buttons use the Deep Forest Green background with white text. They feature a 200ms ease-out transition and a subtle scale-down effect (0.98) on click to provide tactile feedback. Secondary buttons utilize the Warm Cream background with Primary Dark text for a softer alternative.

### Input Fields
Inputs are styled with a 6px radius and a subtle 1px border (#E5E7EB). On focus, the border transitions to Primary Light with a soft glow. Labels use the "label-bold" typography setting in Text Secondary.

### Cards
Cards are the primary vehicle for information. They feature an 8px radius and a translateY(-4px) animation on hover to invite engagement. Use the Secondary (Cream) color for "Information" cards and white Surface for "Actionable" cards.

### Chips & Tags
Used for medical categories or status updates (e.g., "Confirmed", "Pending"). These use a 6px radius and highly desaturated versions of primary/accent colors to ensure they don't distract from the primary content.

### Medical Data Lists
List items should have a subtle bottom border or alternating Cream/White row backgrounds. Typography should favor readability with Inter Medium for data labels and Newsreader for patient names or high-level summaries.