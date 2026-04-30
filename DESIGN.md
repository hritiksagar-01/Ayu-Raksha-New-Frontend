---
# Design Tokens - Ayu-Raksha Healthcare Platform
# Version: 1.0.0
# Generated: 2026-04-30

colors:
  # Core palette - OKLCH color space for perceptual uniformity
  background:
    $value: oklch(1 0 0)
    $description: "Primary page background - pure white"
  foreground:
    $value: oklch(0.145 0 0)
    $description: "Primary text color - near black"
  
  # Semantic colors
  primary:
    $value: oklch(0.205 0 0)
    $description: "Primary brand color - neutral dark gray"
    $css: var(--primary)
  primary-foreground:
    $value: oklch(0.985 0 0)
    $description: "Text on primary color - white"
    $css: var(--primary-foreground)
  
  secondary:
    $value: oklch(0.97 0 0)
    $description: "Secondary surfaces - light gray"
    $css: var(--secondary)
  secondary-foreground:
    $value: oklch(0.205 0 0)
    $description: "Text on secondary - dark"
    $css: var(--secondary-foreground)
  
  muted:
    $value: oklch(0.97 0 0)
    $description: "Muted backgrounds - subtle gray"
    $css: var(--muted)
  muted-foreground:
    $value: oklch(0.556 0 0)
    $description: "Muted text - medium gray"
    $css: var(--muted-foreground)
  
  accent:
    $value: oklch(0.97 0 0)
    $description: "Accent surfaces"
    $css: var(--accent)
  accent-foreground:
    $value: oklch(0.205 0 0)
    $description: "Text on accent"
    $css: var(--accent-foreground)
  
  destructive:
    $value: oklch(0.577 0.245 27.325)
    $description: "Error/destructive actions - red with orange tint"
    $css: var(--destructive)
  destructive-foreground:
    $value: oklch(0.985 0 0)
    $description: "Text on destructive"
    $css: var(--destructive-foreground)
  
  # UI element colors
  card:
    $value: oklch(1 0 0)
    $description: "Card background - white"
    $css: var(--card)
  card-foreground:
    $value: oklch(0.145 0 0)
    $description: "Card text - near black"
    $css: var(--card-foreground)
  
  popover:
    $value: oklch(1 0 0)
    $description: "Popover/dropdown background"
    $css: var(--popover)
  popover-foreground:
    $value: oklch(0.145 0 0)
    $description: "Popover text"
    $css: var(--popover-foreground)
  
  border:
    $value: oklch(0.922 0 0)
    $description: "Default border - light gray"
    $css: var(--border)
  input:
    $value: oklch(0.922 0 0)
    $description: "Input background"
    $css: var(--input)
  ring:
    $value: oklch(0.708 0 0)
    $description: "Focus ring - medium gray"
    $css: var(--ring)
  
  # Chart colors for data visualization
  chart:
    colors:
      - $value: oklch(0.646 0.222 41.116)
        $description: "Chart color 1 - teal"
      - $value: oklch(0.6 0.118 184.704)
        $description: "Chart color 2 - blue"
      - $value: oklch(0.398 0.07 227.392)
        $description: "Chart color 3 - purple"
      - $value: oklch(0.828 0.189 84.429)
        $description: "Chart color 4 - green"
      - $value: oklch(0.769 0.188 70.08)
        $description: "Chart color 5 - yellow-green"
  
  # Sidebar specific colors
  sidebar:
    $value: oklch(0.985 0 0)
    $description: "Sidebar background"
    $css: var(--sidebar)
  sidebar-foreground:
    $value: oklch(0.145 0 0)
    $description: "Sidebar text"
    $css: var(--sidebar-foreground)
  sidebar-primary:
    $value: oklch(0.205 0 0)
    $description: "Sidebar active/primary items"
    $css: var(--sidebar-primary)
  sidebar-primary-foreground:
    $value: oklch(0.985 0 0)
    $description: "Text on sidebar primary"
    $css: var(--sidebar-primary-foreground)
  sidebar-accent:
    $value: oklch(0.97 0 0)
    $description: "Sidebar accent"
    $css: var(--sidebar-accent)
  sidebar-accent-foreground:
    $value: oklch(0.205 0 0)
    $description: "Text on sidebar accent"
    $css: var(--sidebar-accent-foreground)
  sidebar-border:
    $value: oklch(0.922 0 0)
    $description: "Sidebar borders"
    $css: var(--sidebar-border)
  sidebar-ring:
    $value: oklch(0.708 0 0)
    $description: "Sidebar focus ring"
    $css: var(--sidebar-ring)

# Dark mode colors
dark:
  colors:
    background:
      $value: oklch(0.145 0 0)
      $description: "Dark mode background - near black"
    foreground:
      $value: oklch(0.985 0 0)
      $description: "Dark mode text - white"
    card:
      $value: oklch(0.205 0 0)
      $description: "Dark mode card"
    primary:
      $value: oklch(0.922 0 0)
      $description: "Dark mode primary - light gray"
    secondary:
      $value: oklch(0.269 0 0)
      $description: "Dark mode secondary"
    muted:
      $value: oklch(0.269 0 0)
      $description: "Dark mode muted"
    accent:
      $value: oklch(0.269 0 0)
      $description: "Dark mode accent"
    destructive:
      $value: oklch(0.704 0.191 22.216)
      $description: "Dark mode destructive - deeper red"
    border:
      $value: oklch(1 0 0 / 10%)
      $description: "Dark mode border - transparent white"
    input:
      $value: oklch(1 0 0 / 15%)
      $description: "Dark mode input"
    ring:
      $value: oklch(0.556 0 0)
      $description: "Dark mode ring"

# Typography
typography:
  fontFamily:
    sans:
      $value: "Inter, system-ui, sans-serif"
      $description: "Primary body font - clean, modern, highly readable"
    mono:
      $value: "Geist Mono, monospace"
      $description: "Code/monospace font"
  
  fontSizes:
    h1:
      $value: 2.5rem (40px)
      $description: "Page titles"
      $lineHeight: 1.2
    h2:
      $value: 2rem (32px)
      $description: "Section headers"
      $lineHeight: 1.3
    h3:
      $value: 1.5rem (24px)
      $description: "Card titles"
      $lineHeight: 1.4
    h4:
      $value: 1.25rem (20px)
      $description: "Subsections"
      $lineHeight: 1.4
    body:
      $value: 1rem (16px)
      $description: "Default body text"
      $lineHeight: 1.5
    small:
      $value: 0.875rem (14px)
      $description: "Secondary text, captions"
      $lineHeight: 1.5
    xs:
      $value: 0.75rem (12px)
      $description: "Labels, badges"
      $lineHeight: 1.4
  
  fontWeights:
    regular: 400
    medium: 500
    semibold: 600
    bold: 700

# Spacing
spacing:
  baseUnit: 4px
  scale:
    0: 0px
    1: 0.25rem (4px)
    2: 0.5rem (8px)
    3: 0.75rem (12px)
    4: 1rem (16px)
    5: 1.25rem (20px)
    6: 1.5rem (24px)
    8: 2rem (32px)
    10: 2.5rem (40px)
    12: 3rem (48px)
    16: 4rem (64px)
    20: 5rem (80px)
    24: 6rem (96px)
  
  container:
    maxWidth: 1280px
    padding: 1.5rem (24px)
  
  section:
    verticalPadding: 6rem (96px)
    horizontalPadding: 1.5rem (24px)

# Border Radius
borderRadius:
  sm:
    $value: 0.25rem (4px)
    $description: "Small elements - badges, small buttons"
    $css: var(--radius-sm)
  md:
    $value: 0.375rem (6px)
    $description: "Medium elements - inputs, small cards"
    $css: var(--radius-md)
  lg:
    $value: 0.625rem (10px)
    $description: "Large elements - cards, modals"
    $css: var(--radius-lg)
  xl:
    $value: 0.75rem (12px)
    $description: "Extra large - large modals"
    $css: var(--radius-xl)
  full:
    $value: 9999px
    $description: "Pills, avatars, circular buttons"
  default:
    $value: 0.625rem (10px)
    $description: "Default radius base"
    $css: var(--radius)

# Shadows
shadows:
  sm:
    $value: 0 1px 2px 0 rgb(0 0 0 / 0.05)
    $description: "Subtle elevation - inline elements"
  md:
    $value: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)
    $description: "Medium elevation - cards, dropdowns"
  lg:
    $value: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)
    $description: "Large elevation - modals, popovers"
  xl:
    $value: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)
    $description: "Extra large - full page modals"
  header:
    $value: 0 4px 6px -1px rgb(0 0 0 / 0.1)
    $description: "Fixed header shadow"

# Motion / Animations
motion:
  duration:
    fast: 150ms
    normal: 200ms
    slow: 300ms
    slower: 500ms
  
  easing:
    default: cubic-bezier(0.4, 0, 0.2, 1)
    in: cubic-bezier(0.4, 0, 1, 1)
    out: cubic-bezier(0, 0, 0.2, 1)
    bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55)
  
  animations:
    accordion-down:
      $value: accordion-down 0.2s ease-out
      $description: "Accordion collapse animation"
    accordion-up:
      $value: accordion-up 0.2s ease-out
      $description: "Accordion expand animation"
    bounce:
      $value: bounce 1s infinite
      $description: "Loading bounce animation"
    fade-in:
      $value: fade-in 0.2s ease-out
      $description: "Page transition fade"
    slide-up:
      $value: slide-up 0.3s ease-out
      $description: "Modal entrance"

# Breakpoints
breakpoints:
  sm:
    $value: 640px
    $description: "Small tablets"
  md:
    $value: 768px
    $description: "Tablets"
  lg:
    $value: 1024px
    $description: "Laptops"
  xl:
    $value: 1280px
    $description: "Desktops"
  2xl:
    $value: 1536px
    $description: "Large screens"

# Z-Index Scale
zIndex:
  base: 0
  dropdown: 1000
  sticky: 1020
  fixed: 1030
  modal-backdrop: 1040
  modal: 1050
  popover: 1060
  tooltip: 1070
  toast: 1080
---

# Ayu-Raksha Design System

## Overview

Ayu-Raksha is a healthcare management platform serving three distinct user portals: Patients, Doctors, and Medical Report Uploaders. The design system emphasizes clarity, trust, and accessibility—critical qualities for a healthcare application.

## Design Philosophy

### Trust Through Simplicity
The interface uses a neutral, professional color palette that conveys medical authority without feeling cold or institutional. The light backgrounds and clear typography create an environment where users feel safe sharing sensitive health information.

### Accessibility First
All interactive elements maintain WCAG AA contrast ratios. The design supports keyboard navigation throughout, with visible focus states on all actionable elements. Touch targets meet minimum 44x44px requirements for mobile accessibility.

### Portal Differentiation
Each portal (Patient, Doctor, Uploader) uses distinct accent colors to create visual separation while maintaining design consistency:
- **Patient Portal**: Blue gradient icon (#3B82F6 → #1D4ED8)
- **Doctor Portal**: Teal gradient icon (#14B8A6 → #0D9488)
- **Uploader Portal**: Orange gradient icon (#F97316 → #EA580C)

## Visual Language

### Color Strategy

The system uses OKLCH color space, which provides perceptual uniformity across different hues and luminance levels. This ensures that color differences are perceived consistently by users with varying color vision capabilities.

**Light Mode**: Clean white backgrounds with subtle gray borders create a clinical, professional feel appropriate for healthcare.

**Dark Mode**: Deep gray backgrounds (#1A1A1A equivalent) with light text provide reduced eye strain for users in low-light environments, such as late-night medication checks or viewing test results.

### Typography

**Inter** serves as the primary typeface for its excellent readability across all sizes and its professional, neutral character. The font's geometric construction feels modern and trustworthy without being cold.

**Geist Mono** provides monospace for code-like elements, ensuring clear distinction from body text.

### Layout Principles

- **Consistent container width** (max 1280px) keeps content readable on large screens
- **Generous whitespace** (24px base padding) prevents information overload
- **Card-based organization** groups related information into digestible chunks
- **Sticky header** ensures navigation is always accessible

### Component Behavior

**Cards**: Elevated with subtle shadows, featuring rounded corners (10px default). Hover states lift cards slightly (translateY -4px) to indicate interactivity.

**Buttons**: Primary buttons use filled backgrounds with high contrast. Ghost buttons provide alternative actions without visual competition. All buttons include visible focus rings for keyboard users.

**Forms**: Input fields use clear labels above the field. Validation states appear inline with helpful error messages. Disabled states reduce opacity to indicate unavailable actions.

**Loading States**: Skeleton screens maintain layout stability during data loading. Spinners indicate active processing. Progress bars show upload/download progress.

## Responsive Behavior

### Mobile (< 640px)
- Single column layouts
- Hamburger menu for navigation
- Full-width cards and buttons
- Simplified tables (horizontal scroll)

### Tablet (640px - 1024px)
- Two-column grids where appropriate
- Collapsible sidebar navigation
- Touch-optimized spacing

### Desktop (> 1024px)
- Full multi-column layouts
- Persistent sidebar navigation
- Hover states fully active
- Expanded data tables

## Animation Guidelines

Animations serve functional purposes rather than purely decorative ones:

- **Page transitions**: Subtle fade (200ms) prevents jarring jumps
- **Card hover**: Lift effect provides feedback without distraction
- **Button press**: Scale down (0.98) confirms interaction
- **Loading states**: Skeleton shimmer indicates data fetching
- **Toast notifications**: Slide in from top-right, auto-dismiss after 5 seconds

## Accessibility Considerations

### Focus Management
- Logical tab order follows visual layout
- Focus trap in modals prevents navigation outside
- Skip links allow bypassing repeated navigation

### Screen Reader Support
- Semantic HTML structure (header, main, nav, footer)
- ARIA labels on icon-only buttons
- Live regions for dynamic content updates

### Color Independence
- Information conveyed by shape, not just color
- Status indicators include icons + color
- Error states combine color + text message

## Usage Guidelines

### Do's
- Use cards to group related content
- Maintain consistent spacing (multiples of 4px)
- Include clear call-to-action buttons
- Provide feedback for all user actions

### Don'ts
- Mix different button styles for the same action type
- Use color as the only indicator of state
- Create overly complex nested layouts
- Use animations that could trigger vestibular responses

## Implementation Notes

This design system is implemented using:
- **Tailwind CSS** for utility classes
- **shadcn/ui** for base components
- **CSS Custom Properties** for theming
- **OKLCH color space** for future-proof color management

The system supports automatic dark mode switching based on user system preferences, with manual override capability through the UI.