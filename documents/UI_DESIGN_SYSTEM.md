# Modern UI Design System Documentation

## Overview

This document describes the modern, responsive UI design system built for the Angular application using Angular Material as the primary component library.

## File Structure

```
saghery-front/src/styles/
├── theme-palette.scss     # Color palette definitions
├── custom-styles.scss      # Global custom styles and utilities
└── styles.scss             # Main stylesheet with Material theme configuration
```

## Design System Components

### 1. Color Palette (`theme-palette.scss`)

The color palette file defines all colors used throughout the application:

- **Primary Colors**: Brown/tan palette (#B87C4C) - Main brand color
- **Accent Colors**: Sage green palette (#A8BBA3) - Secondary accent
- **Semantic Colors**: Success, Warning, Error, Info
- **Neutral Colors**: Grayscale palette for text and backgrounds
- **Background Colors**: Cream (#F7F1DE) with surface variants

All colors are exported as CSS variables in `custom-styles.scss` for easy access:
- `--color-primary`
- `--color-accent`
- `--color-success`, `--color-warning`, `--color-error`, `--color-info`
- `--color-background`, `--color-surface`, `--color-surface-hover`
- `--color-text-primary`, `--color-text-secondary`, `--color-text-disabled`

### 2. Typography

Following Material Design guidelines with Cairo font for Arabic support:

- **Font Family**: Cairo (Arabic), system fonts fallback
- **Scale**: xs (12px), sm (14px), base (16px), lg (18px), xl (20px), 2xl (24px), 3xl (30px), 4xl (36px)
- **Weights**: Regular (400), Medium (500), Semibold (600), Bold (700)

### 3. Spacing System

Material Design spacing scale (8px base unit):

- `--spacing-xs`: 4px
- `--spacing-sm`: 8px
- `--spacing-md`: 16px
- `--spacing-lg`: 24px
- `--spacing-xl`: 32px
- `--spacing-2xl`: 48px
- `--spacing-3xl`: 64px

### 4. Border Radius

- `--radius-sm`: 4px
- `--radius-md`: 8px
- `--radius-lg`: 12px
- `--radius-xl`: 16px
- `--radius-full`: 9999px (for pills/badges)

### 5. Shadows (Material Elevation)

- `--shadow-sm`: Subtle shadow for subtle elevation
- `--shadow-md`: Standard card shadow
- `--shadow-lg`: Elevated cards
- `--shadow-xl`: Maximum elevation

### 6. Transitions

- `--transition-fast`: 150ms (hover effects)
- `--transition-base`: 250ms (standard transitions)
- `--transition-slow`: 350ms (complex animations)

## Component Examples

### 1. Login Form (`login.component.ts`)

**Features:**
- Centered card layout with gradient background
- Icon prefixes on form fields
- Password visibility toggle
- Loading state with spinner
- Responsive design for mobile

**Styling Highlights:**
- Card with `border-radius-xl` and `shadow-xl`
- Hover effects with `translateY(-2px)`
- Consistent form field height (48px)
- Smooth fade-in animation

### 2. Data Table (`data-table.component.ts`)

**Features:**
- Loading overlay with backdrop blur
- Empty state with icon and messaging
- Hover effects on rows
- Zebra striping for readability
- Responsive padding adjustments

**Styling Highlights:**
- Rounded container with border
- Header row with distinct background
- Row hover effects with subtle scale
- Empty state with centered content
- Pagination integrated at bottom

### 3. Dashboard Cards (`dashboard.component.ts`)

**Features:**
- Stat cards with colored top borders
- Chip/badge components
- List items with hover effects
- Financial grid layout
- Responsive grid system

**Styling Highlights:**
- Stat cards with `stat-primary`, `stat-success`, `stat-warning`, `stat-info` variants
- Hover effects with `translateY(-4px)` and shadow increase
- Chip components with pill shape
- List items with slide-in animation on hover
- Financial items with color-coded values

## Form Elements Styling

All form elements share consistent styling:

### Inputs & Selects
- Height: 48px (accessible touch target)
- Padding: 16px horizontal
- Font size: 16px
- Consistent border radius
- Focus states with primary color
- Error states with error color

### Buttons
- Minimum height: 44px
- Border radius: 8px
- No text transform (preserves Arabic text)
- Hover effects: `translateY(-1px)` with shadow
- Loading states with spinner

### Cards
- Border radius: 12px
- Shadow: `shadow-md` (elevated on hover)
- Border: 1px solid light border
- Hover: `translateY(-2px)` with increased shadow

## Responsive Design

Breakpoints:
- **Mobile**: max-width 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

Mobile adjustments:
- Reduced padding and spacing
- Single column layouts
- Smaller font sizes
- Simplified card layouts

## Animations

Subtle animations enhance UX without being distracting:

- **fadeIn**: Fade in with slight upward movement
- **slideIn**: Slide in from left
- **scaleIn**: Scale in from 0.95 to 1.0

Applied via utility classes:
- `.animate-fade-in`
- `.animate-slide-in`
- `.animate-scale-in`

## Accessibility

- Focus visible indicators with 2px outline
- Proper color contrast ratios
- Touch targets minimum 44px
- Semantic HTML structure
- ARIA labels where needed

## Usage Examples

### Using CSS Variables

```scss
.my-component {
  background: var(--color-surface);
  color: var(--color-text-primary);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  
  &:hover {
    background: var(--color-surface-hover);
    box-shadow: var(--shadow-lg);
  }
}
```

### Using Theme Colors

```typescript
// In component styles
.my-button {
  background-color: var(--color-primary);
  color: white;
  
  &:hover {
    background-color: var(--color-primary-dark);
  }
}
```

### Responsive Design

```scss
.my-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }
}
```

## Best Practices

1. **Always use CSS variables** for colors, spacing, and other design tokens
2. **Follow Material Design spacing** (8px base unit)
3. **Use consistent border radius** for related elements
4. **Apply subtle animations** for better UX
5. **Test responsive layouts** on mobile devices
6. **Ensure accessibility** with proper focus states
7. **Maintain consistent form field heights** (48px)

## Future Updates

To update colors:
1. Edit `theme-palette.scss`
2. CSS variables will automatically update
3. Material theme will reflect changes

To add new components:
1. Follow existing component patterns
2. Use CSS variables for styling
3. Ensure responsive behavior
4. Add appropriate animations

