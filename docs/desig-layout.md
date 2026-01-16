# Jr Camps Design Layout Reference

> **Purpose**: Quick reference guide for page layouts, section structures, and component arrangements. Use this document when building new pages or UI components.

---

## Page Structure Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        NAVIGATION                               │
│  [Logo]        Nav Links                    [CTA Button]        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                        HERO SECTION                             │
│              (Full-width, min-height: 80vh)                     │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                    CONTENT SECTIONS                             │
│              (Alternating backgrounds)                          │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                         FOOTER                                  │
│          Links | Social | Copyright                             │
└─────────────────────────────────────────────────────────────────┘
```

---

## Section Layouts

### 1. Hero Section Layout
**Use for**: Landing pages, program pages, about page

```
Container: max-w-7xl mx-auto
Padding: py-24 px-6 lg:px-8
Min Height: min-h-[80vh]
Alignment: flex flex-col items-center justify-center text-center
```

**Structure:**
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                     [Badge/Label]                               │
│                                                                 │
│                  PRIMARY HEADLINE                               │
│                  (48-72px, Bold)                                │
│                                                                 │
│              Supporting subtitle text                           │
│              (18-20px, 60% opacity)                             │
│                                                                 │
│         [Primary CTA]      [Secondary CTA]                      │
│                                                                 │
│                    [Trust Badges]                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### 2. Feature Grid Layout
**Use for**: Programs overview, benefits, services

```
Container: max-w-7xl mx-auto
Padding: py-20 lg:py-32 px-6 lg:px-8
Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8
```

**Structure:**
```
┌─────────────────────────────────────────────────────────────────┐
│              Section Title (centered)                           │
│              Section Subtitle                                   │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │    [Icon]    │  │    [Icon]    │  │    [Icon]    │          │
│  │    Title     │  │    Title     │  │    Title     │          │
│  │  Description │  │  Description │  │  Description │          │
│  │   [Link →]   │  │   [Link →]   │  │   [Link →]   │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

---

### 3. Split Content Layout (50/50)
**Use for**: About sections, testimonials, feature highlights

```
Container: max-w-7xl mx-auto
Padding: py-20 lg:py-32 px-6 lg:px-8
Grid: grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center
```

**Left-Image Variant:**
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ┌──────────────────┐    ┌──────────────────────────┐          │
│  │                  │    │  SECTION LABEL           │          │
│  │                  │    │  Main Headline           │          │
│  │      IMAGE       │    │                          │          │
│  │   (rounded-xl)   │    │  Description paragraph   │          │
│  │                  │    │  with details...         │          │
│  │                  │    │                          │          │
│  │                  │    │  • Bullet point 1        │          │
│  │                  │    │  • Bullet point 2        │          │
│  │                  │    │                          │          │
│  │                  │    │  [CTA Button]            │          │
│  └──────────────────┘    └──────────────────────────┘          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Right-Image Variant:** Swap columns on desktop with `lg:order-2`

---

### 4. Cards Grid Layout
**Use for**: Programs, team members, testimonials, locations

```
Container: max-w-7xl mx-auto
Padding: py-20 lg:py-32 px-6 lg:px-8
Grid: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8
```

**Card Structure:**
```
┌──────────────────────────┐
│  ┌────────────────────┐  │
│  │                    │  │
│  │       IMAGE        │  │
│  │   (aspect-video)   │  │
│  │                    │  │
│  └────────────────────┘  │
│                          │
│  Card Title              │
│  (text-xl font-semibold) │
│                          │
│  Description text here   │
│  (text-gray-600)         │
│                          │
│  [Action Link →]         │
│                          │
└──────────────────────────┘

Styling: bg-white rounded-xl shadow-md
Hover: hover:shadow-xl hover:-translate-y-1
Transition: transition-all duration-300
```

---

### 5. Stats/Numbers Section
**Use for**: Impact metrics, social proof

```
Container: max-w-7xl mx-auto
Padding: py-16 px-6 lg:px-8
Grid: grid-cols-2 lg:grid-cols-4 gap-8
Background: bg-brand-primary or gradient
```

**Structure:**
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│    ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────┐  │
│    │   1000+    │  │    50+     │  │    98%     │  │   15+  │  │
│    │  Students  │  │  Schools   │  │ Satisfaction│  │ Years  │  │
│    └────────────┘  └────────────┘  └────────────┘  └────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### 6. CTA Banner Section
**Use for**: Newsletter signup, partner inquiries, registration prompts

```
Container: max-w-7xl mx-auto
Padding: py-16 lg:py-24 px-6 lg:px-8
Layout: flex flex-col lg:flex-row items-center justify-between gap-8
Background: bg-gradient-to-r from-brand-primary to-brand-primary/80
Border Radius: rounded-2xl
```

**Structure:**
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   Ready to Get Started?              [Primary CTA] [Ghost CTA] │
│   Join thousands of families...                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### 7. Testimonials Layout
**Use for**: Customer reviews, partner quotes

```
Container: max-w-7xl mx-auto
Padding: py-20 lg:py-32 px-6 lg:px-8
Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8
```

**Testimonial Card:**
```
┌──────────────────────────┐
│  ★★★★★                   │
│                          │
│  "Quote text here that   │
│  wraps nicely..."        │
│                          │
│  ┌───┐                   │
│  │ 👤│ Name              │
│  └───┘ Role, Location    │
└──────────────────────────┘

Styling: bg-white p-6 rounded-xl border border-gray-100
```

---

## Three Pillars Section (Programs)

**Special layout for Jr Sports, Jr STEM, Jr Defense:**

```
┌─────────────────────────────────────────────────────────────────┐
│                  OUR CORE PROGRAMS                              │
│                                                                 │
│  ┌───────────────────┐  ┌───────────────────┐  ┌─────────────┐ │
│  │  ⚽ JR SPORTS     │  │  🔬 JR STEM       │  │ 🛡️ JR DEFENSE│ │
│  │                   │  │                   │  │             │ │
│  │  [Image]          │  │  [Image]          │  │  [Image]    │ │
│  │                   │  │                   │  │             │ │
│  │  Description of   │  │  Description of   │  │  Description│ │
│  │  sports program   │  │  STEM program     │  │  of defense │ │
│  │                   │  │                   │  │  program    │ │
│  │  • Soccer         │  │  • Robotics       │  │  • Safety   │ │
│  │  • Basketball     │  │  • Chemistry      │  │  • Confidence│ │
│  │  • Football       │  │  • Coding         │  │  • Awareness│ │
│  │                   │  │                   │  │             │ │
│  │  [Learn More →]   │  │  [Learn More →]   │  │ [Learn More]│ │
│  └───────────────────┘  └───────────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────────┘

Color Accents:
- Sports: Green accent (#10B981)
- STEM: Purple accent (#8B5CF6)
- Defense: Blue accent (#0056b3)
```

---

## Responsive Breakpoints

| Breakpoint | Width  | Columns | Padding  |
|------------|--------|---------|----------|
| Mobile     | <640px | 1       | px-4     |
| Tablet     | 768px  | 2       | px-6     |
| Desktop    | 1024px | 3-4     | px-8     |
| Wide       | 1280px | 3-4     | px-8     |

---

## Section Spacing Guide

| Between Elements      | Spacing Class      |
|-----------------------|-------------------|
| Section to Section    | py-20 lg:py-32    |
| Title to Subtitle     | mt-2 or mb-4      |
| Subtitle to Content   | mt-6 or mb-8      |
| Cards Gap             | gap-6 lg:gap-8    |
| Buttons Gap           | gap-4             |
| Icon to Text          | gap-2 or gap-3    |

---

## Dual Audience Navigation

```
┌─────────────────────────────────────────────────────────────────┐
│  [LOGO]    Home | Programs | About | Contact    [Partner Portal]│
│                                                                 │
│  Primary Nav for Parents (B2C)        Secondary for B2B         │
└─────────────────────────────────────────────────────────────────┘
```

**B2C Pages (Parents):**
- Warm, emotional imagery
- CTAs: "Register Now", "Find a Location"
- Focus: Child safety, skill-building, convenience

**B2B Pages (Partners):**
- Professional, data-driven content
- CTAs: "Become a Partner", "Get the Turnkey Guide"
- Focus: Revenue share, liability coverage, turnkey solution

---

## Quick Layout Recipes

### Homepage Layout:
1. Hero (80vh) → Programs Grid (3-col) → Stats Banner → Split Content → Testimonials → CTA Banner → Footer

### Program Page Layout:
1. Hero (60vh) → Program Details (Split) → Features Grid → Testimonials → CTA Banner → Footer

### Partner Page Layout:
1. Hero (70vh) → Benefits Grid → How It Works (Steps) → Stats → Partner Form → Footer

### About Page Layout:
1. Hero (60vh) → Mission Statement (Split) → Team Grid → Values Grid → CTA Banner → Footer

---

## Z-Index Layers

| Layer           | Z-Index  | Usage                    |
|-----------------|----------|--------------------------|
| Background      | z-0      | Background effects       |
| Content         | z-10     | Main content             |
| Overlays        | z-20     | Image overlays           |
| Navigation      | z-50     | Sticky navigation        |
| Modals          | z-[100]  | Modal dialogs            |
| Tooltips        | z-[200]  | Tooltips, dropdowns      |

---

*Reference this document when building any new page or component. Combine with `design-system.md` for colors, typography, and component styles.*
