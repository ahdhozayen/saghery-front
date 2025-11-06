# Tailwind CSS Setup Guide

This project uses **Tailwind CSS** for modern, responsive UI design following Material Design and Fluent UI principles.

## 🎨 Design System

### Color Palette

All colors are defined in `tailwind.config.js` and match the existing theme palette:

- **Primary Colors**: `primary-50` through `primary-900` (Main: `primary-500` = #b87c4c)
- **Accent Colors**: `accent-50` through `accent-900` (Main: `accent-300` = #a8bba3)
- **Semantic Colors**: `success`, `warning`, `error`, `info` (with light/dark variants)
- **Background**: `background` (cream), `background-surface` (white), `background-surface-hover`
- **Text**: `text-primary`, `text-secondary`, `text-disabled`
- **Borders**: `border-light`, `border-medium`, `border-dark`

### Spacing Scale

- `xs`: 4px
- `sm`: 8px
- `md`: 16px
- `lg`: 24px
- `xl`: 32px
- `2xl`: 48px
- `3xl`: 64px

### Typography

- **Font Family**: Cairo (Arabic-friendly)
- **Font Sizes**: `xs`, `sm`, `base`, `lg`, `xl`, `2xl`, `3xl`, `4xl`
- **Font Weights**: `normal` (400), `medium` (500), `semibold` (600), `bold` (700)

### Border Radius

- `sm`: 4px
- `md`: 8px
- `lg`: 12px
- `xl`: 16px

## 📱 Responsive Design

Tailwind uses mobile-first breakpoints:

- **Mobile**: Default (no prefix)
- **Tablet**: `md:` (768px+)
- **Desktop**: `lg:` (1024px+)
- **Large Desktop**: `xl:` (1280px+)

## 🎯 Usage Examples

### Form Input

```html
<input
  type="text"
  class="w-full px-4 py-3 rounded-md border border-border-light bg-background-surface text-text-primary placeholder-text-disabled focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-base"
/>
```

### Button

```html
<button class="px-6 py-3 rounded-md bg-primary-500 text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-base font-semibold shadow-sm hover:shadow-md">
  حفظ
</button>
```

### Card

```html
<div class="bg-background-surface rounded-lg shadow-md border border-border-light p-6 hover:shadow-lg transition-shadow duration-base">
  <h3 class="text-xl font-bold text-text-primary mb-2">عنوان البطاقة</h3>
  <p class="text-text-secondary text-sm">محتوى البطاقة</p>
</div>
```

### Responsive Grid (3/2/1 columns)

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Columns automatically adjust: 1 on mobile, 2 on tablet, 3 on desktop -->
</div>
```

## 🧩 Example Components

Three example components demonstrate the design system:

1. **ModernFormExampleComponent** (`src/app/shared/components/modern-form-example/`)
   - Responsive form with 3/2/1 column layout
   - Form validation styling
   - Accessible inputs and labels

2. **ModernCardExampleComponent** (`src/app/shared/components/modern-card-example/`)
   - Various card styles (basic, with image, stats, feature, alert, success)
   - Hover effects and transitions
   - Responsive grid layout

3. **ModernNavbarExampleComponent** (`src/app/shared/components/modern-navbar-example/`)
   - Responsive navigation bar
   - Mobile menu toggle
   - User dropdown menu
   - Sticky positioning

## 🔧 Configuration

### Tailwind CSS v4 Setup

Tailwind CSS v4 uses CSS-based configuration:

1. **PostCSS Config** (`postcss.config.js`):
   - Uses `@tailwindcss/postcss` plugin
   - Includes autoprefixer

2. **Theme Configuration** (`src/styles/tailwind-theme.css`):
   - Uses `@theme` directive for CSS-based configuration
   - Defines all custom colors, spacing, typography, etc.

3. **Content Paths** (`tailwind.config.js`):
   - Defines which files Tailwind should scan for classes
   - Currently set to `./src/**/*.{html,ts}`

### Import in Styles

The main styles file (`src/styles.scss`) imports:
```scss
@import "tailwindcss";
@import "./styles/tailwind-theme.css";
```

## 📝 Best Practices

1. **Use Utility Classes**: Prefer Tailwind utilities over custom CSS
2. **Responsive First**: Design mobile-first, then enhance for larger screens
3. **Consistent Spacing**: Use the defined spacing scale (`xs`, `sm`, `md`, `lg`, `xl`)
4. **Color Consistency**: Always use theme colors from the config
5. **RTL Support**: Use `dir="rtl"` on containers and Tailwind's RTL-aware utilities
6. **Accessibility**: Include focus states, proper labels, and ARIA attributes
7. **Transitions**: Use `transition-all duration-base` for smooth interactions

## 🎨 Custom Utilities

You can add custom utilities in `tailwind.config.js`:

```js
theme: {
  extend: {
    // Add custom utilities here
  }
}
```

## 🚀 Getting Started

1. Tailwind is already configured and ready to use
2. Import example components to see the design system in action
3. Use Tailwind classes directly in your component templates
4. Refer to [Tailwind CSS Documentation](https://tailwindcss.com/docs) for more utilities

## 📚 Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind CSS Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)
- [Material Design Guidelines](https://material.io/design)
- [Fluent UI Design System](https://fluent2.microsoft.design/)

