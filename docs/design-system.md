# Design Context
Colors: Blue, Orange, Grey
Fonts: (Add font details here)
# Campy Brand Identity Design System v1.0
> **Purpose**: This document defines the design tokens, component styles, and guidelines for building a premium, high-end Next.js website for the Campy brand. Follow these specifications strictly to ensure brand consistency.
---
## Table of Contents
1. [Color System](#color-system)
2. [Semantic Tokens](#semantic-tokens)
3. [Typography Guidelines](#typography-guidelines)
4. [Component Specifications](#component-specifications)
5. [Spacing & Layout](#spacing--layout)
6. [Animation & Transitions](#animation--transitions)
7. [Code Implementation](#code-implementation)
---
## Color System
### Primitive Colors (Base Palette)
| Token Name | Hex Value | Usage |
|------------|-----------|-------|
| `blue-500` | `#0056b3` | Primary brand blue |
| `blue-700` | `#004494` | Darker blue for hover states |
| `orange-400` | `#ffa500` | Light accent orange |
| `orange-500` | `#f39c12` | Primary accent/CTA color |
| `grey-white` | `#ffffff` | Pure white |
| `grey-100` | `#f8f9fa` | Light grey backgrounds |
| `grey-500` | `#7a7a7a` | Mid-tone grey for body text |
| `grey-800` | `#333333` | Dark grey for emphasis |
| `grey-900` | `#212529` | Near-black for high contrast |
### Tailwind Config Extension
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0056b3',
          'primary-dark': '#004494',
          accent: '#f39c12',
          'accent-light': '#ffa500',
        },
        surface: {
          white: '#ffffff',
          light: '#f8f9fa',
          muted: '#7a7a7a',
          dark: '#333333',
          black: '#212529',
        }
      }
    }
  }
}
```
---
## Semantic Tokens
### Brand Colors
| Token | Value | Description | When to Use |
|-------|-------|-------------|-------------|
| `brand.primary` | `#0056b3` | Main brand color | Headers, primary identifiers, navigation backgrounds |
| `brand.accent` | `#f39c12` | High-visibility accent | CTAs, important buttons, highlights |
### Background Colors
| Token | Value | Context |
|-------|-------|---------|
| `background.page-default` | `#ffffff` | Standard page background |
| `background.hero-section` | `#7a7a7a` | Hero sections with overlay |
| `background.surface-card` | `#ffffff` | Content cards, program cards |
| `background.header-nav` | `#0056b3` | Top navigation bar |
### Text Colors
| Token | Value | Context |
|-------|-------|---------|
| `text.heading-primary` | `#ffffff` | Headings on dark/hero backgrounds |
| `text.heading-secondary` | `#0056b3` | Headings on light backgrounds |
| `text.body-primary` | `#7a7a7a` | Standard body text |
| `text.nav-link` | `#ffffff` | Navigation link text |
### Interactive Colors
| Token | Value | Context |
|-------|-------|---------|
| `interactive.button-primary-bg` | `#f39c12` | Primary CTA button background |
| `interactive.button-primary-text` | `#212529` | Primary CTA button text |
| `interactive.button-ghost-border` | `#ffffff` | Ghost/outline button border |
| `interactive.button-ghost-text` | `#ffffff` | Ghost/outline button text |
---
## Typography Guidelines
### Font Stack (Premium Feel)
```css
--font-heading: 'Inter', 'SF Pro Display', -apple-system, sans-serif;
--font-body: 'Inter', 'SF Pro Text', -apple-system, sans-serif;
```
### Type Scale
| Element | Size | Weight | Line Height | Letter Spacing |
|---------|------|--------|-------------|----------------|
| H1 (Hero) | `48px` / `3rem` | `700` (Bold) | `1.1` | `-0.02em` |
| H2 (Section) | `36px` / `2.25rem` | `600` (Semibold) | `1.2` | `-0.01em` |
| H3 (Card Title) | `24px` / `1.5rem` | `600` (Semibold) | `1.3` | `0` |
| H4 (Subsection) | `20px` / `1.25rem` | `500` (Medium) | `1.4` | `0` |
| Body Large | `18px` / `1.125rem` | `400` (Regular) | `1.6` | `0` |
| Body | `16px` / `1rem` | `400` (Regular) | `1.6` | `0` |
| Small/Caption | `14px` / `0.875rem` | `400` (Regular) | `1.5` | `0.01em` |
### Tailwind Classes
```html
<!-- H1 Hero -->
<h1 class="text-5xl font-bold leading-tight tracking-tight">
<!-- H2 Section -->
<h2 class="text-4xl font-semibold leading-snug">
<!-- H3 Card Title -->
<h3 class="text-2xl font-semibold">
<!-- Body Text -->
<p class="text-base leading-relaxed text-[#7a7a7a]">
```
---
## Component Specifications
### Navigation Header
```
┌─────────────────────────────────────────────────────────────────┐
│  [LOGO]          Home   Programs   About   Contact    [CTA]    │
│  bg: #0056b3                                                    │
│  text: #ffffff                                                  │
│  height: 72px                                                   │
│  padding-x: 24px-48px                                           │
└─────────────────────────────────────────────────────────────────┘
```
**Specifications:**
- Background: `bg-[#0056b3]`
- Height: `h-18` (72px)
- Position: `sticky top-0 z-50`
- Shadow: `shadow-sm`
- Container: `max-w-7xl mx-auto`
- Link hover: `opacity-80` with `transition-opacity duration-200`
### Hero Section
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                     HEADLINE TEXT                               │
│                     (white, centered)                           │
│                                                                 │
│                    Supporting subtext                           │
│                    (white/80 opacity)                           │
│                                                                 │
│              [Primary CTA]    [Ghost CTA]                       │
│                                                                 │
│  bg: gradient overlay on image                                  │
│  min-height: 80vh                                               │
└─────────────────────────────────────────────────────────────────┘
```
**Specifications:**
- Min height: `min-h-[80vh]`
- Layout: `flex flex-col items-center justify-center text-center`
- Background: Image with `bg-gradient-to-b from-black/50 to-black/70` overlay
- Padding: `px-6 py-24`
- Text alignment: `text-center`
### Cards (Programs/Features)
```
┌──────────────────────────┐
│  [IMAGE]                 │
│                          │
├──────────────────────────┤
│  Card Title              │
│  (blue #0056b3)          │
│                          │
│  Description text here   │
│  (grey #7a7a7a)          │
│                          │
│  [View Details →]        │
└──────────────────────────┘
```
**Specifications:**
- Background: `bg-white`
- Border radius: `rounded-lg` (8px)
- Shadow: `shadow-md hover:shadow-xl`
- Transition: `transition-shadow duration-300`
- Padding (content area): `p-6`
- Image: `aspect-video object-cover rounded-t-lg`
### Buttons
#### Primary Button (CTA)
```html
<button class="
  bg-[#f39c12] 
  text-[#212529] 
  px-8 py-4 
  rounded-lg 
  font-semibold 
  text-lg
  hover:bg-[#ffa500] 
  transition-colors 
  duration-200
  shadow-lg 
  hover:shadow-xl
">
  Register Now
</button>
```
#### Ghost Button (Secondary)
```html
<button class="
  bg-transparent 
  text-white 
  border-2 
  border-white 
  px-8 py-4 
  rounded-lg 
  font-semibold 
  text-lg
  hover:bg-white/10 
  transition-all 
  duration-200
">
  Partner With Us
</button>
```
#### Text Link Button
```html
<a class="
  text-[#0056b3] 
  font-medium 
  hover:text-[#004494] 
  transition-colors 
  inline-flex 
  items-center 
  gap-2
">
  Learn More <span>→</span>
</a>
```
---
## Spacing & Layout
### Spacing Scale
| Token | Value | Use Case |
|-------|-------|----------|
| `xs` | `4px` | Tight spacing, icon gaps |
| `sm` | `8px` | Compact element spacing |
| `md` | `16px` | Default component padding |
| `lg` | `24px` | Section padding (mobile) |
| `xl` | `32px` | Card padding, gaps |
| `2xl` | `48px` | Section spacing |
| `3xl` | `64px` | Large section margins |
| `4xl` | `96px` | Hero padding, major sections |
### Container Widths
```css
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;
```
### Grid System
```html
<!-- 3-Column Cards Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
<!-- 2-Column Feature Layout -->
<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
<!-- 4-Column Footer Links -->
<div class="grid grid-cols-2 md:grid-cols-4 gap-8">
```
---
## Animation & Transitions
### Standard Transitions
```css
/* Fast - UI feedback */
--transition-fast: 150ms ease-out;
/* Normal - Most interactions */
--transition-normal: 200ms ease-out;
/* Slow - Complex animations */
--transition-slow: 300ms ease-out;
/* Smooth - Page transitions */
--transition-smooth: 500ms cubic-bezier(0.4, 0, 0.2, 1);
```
### Hover Effects (Premium Feel)
```html
<!-- Card hover lift -->
<div class="transform hover:-translate-y-1 transition-transform duration-300">
<!-- Button glow effect -->
<button class="hover:shadow-[0_0_20px_rgba(243,156,18,0.4)]">
<!-- Image zoom on hover -->
<div class="overflow-hidden">
  <img class="transform hover:scale-105 transition-transform duration-500">
</div>
<!-- Fade in on scroll (use with Intersection Observer) -->
<div class="opacity-0 translate-y-4 animate-fade-in">
```
### Entrance Animations
```css
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
}
```
---
## Code Implementation
### Complete Next.js Component Example
```tsx
// components/HeroSection.tsx
export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 z-10" />
      <Image
        src="/hero-bg.jpg"
        alt="Hero background"
        fill
        className="object-cover"
        priority
      />
      
      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
          Welcome to Campy
        </h1>
        <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
          Discover our premium programs designed for excellence
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-[#f39c12] text-[#212529] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#ffa500] transition-colors shadow-lg">
            Register Now
          </button>
          <button className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all">
            Partner With Us
          </button>
        </div>
      </div>
    </section>
  );
}
```
### CSS Variables Setup
```css
/* globals.css */
:root {
  /* Brand Colors */
  --color-brand-primary: #0056b3;
  --color-brand-primary-dark: #004494;
  --color-brand-accent: #f39c12;
  --color-brand-accent-light: #ffa500;
  
  /* Surface Colors */
  --color-surface-white: #ffffff;
  --color-surface-light: #f8f9fa;
  --color-surface-muted: #7a7a7a;
  --color-surface-dark: #333333;
  --color-surface-black: #212529;
  
  /* Semantic */
  --color-text-primary: #7a7a7a;
  --color-text-heading: #0056b3;
  --color-text-inverse: #ffffff;
}
```
---
## Premium Design Principles
### DO ✅
1. **Use generous whitespace** - Premium brands breathe. Add extra padding.
2. **Subtle shadows** - Use `shadow-sm` to `shadow-md`, never harsh shadows.
3. **Smooth transitions** - Every interaction should feel polished (200-300ms).
4. **Consistent spacing** - Stick to the spacing scale, no arbitrary values.
5. **High-quality imagery** - Use sharp, well-lit, professional photos.
6. **Limit color usage** - Primary blue + accent orange only. Grey for text.
7. **Typography hierarchy** - Clear distinction between heading levels.
### DON'T ❌
1. **Avoid pure black** - Use `#212529` instead of `#000000`.
2. **No harsh borders** - Use shadows or subtle `border-gray-100` if needed.
3. **Don't overuse accent** - Orange is for CTAs only, not decorative.
4. **Avoid small touch targets** - Minimum 44px for interactive elements.
5. **No jarring animations** - Keep movement subtle and purposeful.
6. **Don't mix border-radius** - Stick to `rounded-lg` (8px) consistently.
---
## Accessibility Requirements
- **Contrast Ratios**: All text must meet WCAG AA (4.5:1 for body, 3:1 for large text)
- **Focus States**: Visible focus ring using `focus:ring-2 focus:ring-[#0056b3] focus:ring-offset-2`
- **Touch Targets**: Minimum 44x44px for all interactive elements
- **Alt Text**: All images must have descriptive alt text
- **Semantic HTML**: Use proper heading hierarchy (h1 → h2 → h3)
---
## Quick Reference Card
```
┌─────────────────────────────────────────────────────────────────┐
│                     CAMPY BRAND CHEATSHEET                      │
├─────────────────────────────────────────────────────────────────┤
│  PRIMARY BLUE      │  #0056b3  │  Nav, headings, links         │
│  ACCENT ORANGE     │  #f39c12  │  CTAs, buttons only           │
│  BODY TEXT         │  #7a7a7a  │  Paragraphs, descriptions     │
│  DARK TEXT         │  #212529  │  Button text on orange        │
│  WHITE             │  #ffffff  │  Backgrounds, inverse text    │
├─────────────────────────────────────────────────────────────────┤
│  BORDER RADIUS     │  8px / rounded-lg                         │
│  SHADOW            │  shadow-md (cards), shadow-lg (buttons)   │
│  TRANSITION        │  duration-200 or duration-300             │
│  MAX WIDTH         │  max-w-7xl (1280px)                        │
└─────────────────────────────────────────────────────────────────┘
```
---
*Last updated: v1.0 | Campy Design System*