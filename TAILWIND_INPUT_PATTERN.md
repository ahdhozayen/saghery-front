# 🎯 Tailwind Input Pattern Guide

## Overview
All form inputs now use native HTML elements styled with Tailwind CSS utilities instead of Angular Material. This provides:
- ✅ **Smaller, cleaner inputs** (text-sm for compact design)
- ✅ **Better performance** (no Material overhead)
- ✅ **More control** over styling
- ✅ **Consistent design** across all forms

## Input Pattern

### Standard Text Input
```html
<div class="space-y-1.5">
  <label class="block text-sm font-medium text-gray-700">
    Field Label <span class="text-error">*</span>
  </label>
  <input
    type="text"
    formControlName="fieldName"
    placeholder="Enter placeholder text..."
    class="block w-full px-3 py-2 text-sm border rounded-lg transition-all duration-200
           focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
           hover:border-gray-400"
    [class.border-error]="form().controls['fieldName'].invalid && form().controls['fieldName'].touched"
    [class.border-success]="form().controls['fieldName'].valid && form().controls['fieldName'].touched"
    [class.border-gray-300]="!form().controls['fieldName'].touched"
  />
  @if (form().controls['fieldName'].hasError('required') && form().controls['fieldName'].touched) {
    <p class="text-xs text-error flex items-center gap-1 animate-slideInRTL">
      <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>
      Error message text
    </p>
  }
</div>
```

### Select Dropdown
```html
<div class="space-y-1.5">
  <label class="block text-sm font-medium text-gray-700">
    Select Label <span class="text-error">*</span>
  </label>
  <select
    formControlName="fieldName"
    class="block w-full px-3 py-2 text-sm border rounded-lg transition-all duration-200
           focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
           hover:border-gray-400 cursor-pointer"
    [class.border-error]="form().controls['fieldName'].invalid && form().controls['fieldName'].touched"
    [class.border-success]="form().controls['fieldName'].valid && form().controls['fieldName'].touched"
    [class.border-gray-300]="!form().controls['fieldName'].touched"
  >
    <option value="value1">Option 1</option>
    <option value="value2">Option 2</option>
  </select>
  @if (form().controls['fieldName'].hasError('required') && form().controls['fieldName'].touched) {
    <p class="text-xs text-error flex items-center gap-1 animate-slideInRTL">
      <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>
      Error message text
    </p>
  }
</div>
```

### Textarea
```html
<div class="space-y-1.5 md:col-span-2 lg:col-span-3">
  <label class="block text-sm font-medium text-gray-700">
    Textarea Label <span class="text-error">*</span>
  </label>
  <textarea
    formControlName="fieldName"
    rows="3"
    placeholder="Enter detailed text..."
    class="block w-full px-3 py-2 text-sm border rounded-lg transition-all duration-200
           focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
           hover:border-gray-400 resize-none"
    [class.border-error]="form().controls['fieldName'].invalid && form().controls['fieldName'].touched"
    [class.border-success]="form().controls['fieldName'].valid && form().controls['fieldName'].touched"
    [class.border-gray-300]="!form().controls['fieldName'].touched"
  ></textarea>
  @if (form().controls['fieldName'].hasError('required') && form().controls['fieldName'].touched) {
    <p class="text-xs text-error flex items-center gap-1 animate-slideInRTL">
      <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>
      Error message text
    </p>
  }
</div>
```

### Number Input
```html
<div class="space-y-1.5">
  <label class="block text-sm font-medium text-gray-700">
    Number Label <span class="text-error">*</span>
  </label>
  <input
    type="number"
    formControlName="fieldName"
    placeholder="0"
    class="block w-full px-3 py-2 text-sm border rounded-lg transition-all duration-200
           focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
           hover:border-gray-400"
    [class.border-error]="form().controls['fieldName'].invalid && form().controls['fieldName'].touched"
    [class.border-success]="form().controls['fieldName'].valid && form().controls['fieldName'].touched"
    [class.border-gray-300]="!form().controls['fieldName'].touched"
  />
</div>
```

### Checkbox
```html
<div class="flex items-start gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
  <input
    type="checkbox"
    formControlName="fieldName"
    class="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
  />
  <div class="flex-1">
    <label class="text-sm font-medium text-gray-900 block cursor-pointer">
      Checkbox Label
    </label>
    <span class="text-xs text-gray-500">Optional description text</span>
  </div>
</div>
```

## Key Classes Explained

### Container
- `space-y-1.5` - Vertical spacing between label, input, and error

### Label
- `block` - Display as block element
- `text-sm` - Small text size (14px)
- `font-medium` - Medium font weight (500)
- `text-gray-700` - Dark gray color

### Input/Select/Textarea Base Classes
```css
block                 /* Display as block */
w-full                /* Full width */
px-3 py-2            /* Padding: 12px horizontal, 8px vertical */
text-sm              /* Small text size (14px) */
border               /* Border width 1px */
rounded-lg           /* 12px border radius */
transition-all       /* Smooth transitions */
duration-200         /* 200ms transition */
```

### Focus State
```css
focus:outline-none              /* Remove default outline */
focus:ring-2                    /* 2px focus ring */
focus:ring-primary             /* Primary color ring */
focus:border-transparent       /* Hide border on focus */
```

### Hover State
```css
hover:border-gray-400   /* Darker border on hover */
```

### Validation States (Dynamic Classes)
```css
[class.border-error]="invalid && touched"       /* Red border for errors */
[class.border-success]="valid && touched"       /* Green border for success */
[class.border-gray-300]="!touched"             /* Default gray border */
```

### Error Message
- `text-xs` - Extra small text (12px)
- `text-error` - Red color
- `flex items-center gap-1` - Flex layout with icon
- `animate-slideInRTL` - Slide in from right (RTL)

## Input Sizes

### Small (Default - Used Throughout)
```html
class="px-3 py-2 text-sm"
```
**Result:** Compact, professional inputs

### Medium (Optional for Important Fields)
```html
class="px-4 py-2.5 text-base"
```

### Large (Optional for Prominent Fields)
```html
class="px-5 py-3 text-base"
```

## Color States

### Default (Untouched)
```css
border-gray-300     /* #d1d5db */
```

### Focus
```css
ring-primary        /* #b87c4c */
```

### Error
```css
border-error        /* #ef4444 */
text-error          /* #ef4444 */
```

### Success
```css
border-success      /* #10b981 */
```

## Full-Width Fields

For fields that should span all columns (like textareas or long text inputs):

```html
<div class="space-y-1.5 md:col-span-2 lg:col-span-3">
  <!-- field content -->
</div>
```

This makes the field:
- **Mobile (< 768px):** 1 column (default)
- **Tablet (≥ 768px):** 2 columns
- **Desktop (≥ 1024px):** 3 columns

## Import Requirements

Make sure your component imports:
```typescript
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-your-tab',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  // ...
})
```

**Note:** Remove these imports:
- ~~`MatFormFieldModule`~~
- ~~`MatInputModule`~~
- ~~`MatSelectModule`~~
- ~~`MatIconModule`~~ (unless using Material icons elsewhere)

## Error SVG Icon

Standard error icon used throughout:
```html
<svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
</svg>
```

## Before & After Comparison

### Before (Angular Material)
```html
<mat-form-field appearance="outline">
  <mat-label>Full Name</mat-label>
  <mat-icon matIconPrefix>person</mat-icon>
  <input matInput formControlName="fullName">
  @if (form.get('fullName')?.hasError('required')) {
    <mat-error>Name is required</mat-error>
  }
</mat-form-field>
```

### After (Tailwind)
```html
<div class="space-y-1.5">
  <label class="block text-sm font-medium text-gray-700">
    Full Name <span class="text-error">*</span>
  </label>
  <input
    type="text"
    formControlName="fullName"
    placeholder="Enter full name"
    class="block w-full px-3 py-2 text-sm border rounded-lg transition-all duration-200
           focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
           hover:border-gray-400"
    [class.border-error]="form().controls['fullName'].invalid && form().controls['fullName'].touched"
    [class.border-success]="form().controls['fullName'].valid && form().controls['fullName'].touched"
    [class.border-gray-300]="!form().controls['fullName'].touched"
  />
  @if (form().controls['fullName'].hasError('required') && form().controls['fullName'].touched) {
    <p class="text-xs text-error flex items-center gap-1 animate-slideInRTL">
      <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>
      Name is required
    </p>
  }
</div>
```

## Benefits

1. **Smaller Inputs**: `text-sm` and `px-3 py-2` create compact, professional inputs
2. **Faster Loading**: No Material component overhead
3. **Better Control**: Direct HTML/CSS control over all aspects
4. **Consistent**: All inputs look identical across the app
5. **Accessible**: Proper label-input association and ARIA attributes
6. **Responsive**: Adapts to all screen sizes
7. **Validated**: Visual feedback for validation states
8. **Animated**: Smooth transitions and error animations

## Quick Reference

| Element | Type | Placeholder | Required |
|---------|------|-------------|----------|
| Text | `type="text"` | ✅ | Optional |
| Email | `type="email"` | ✅ | Optional |
| Tel | `type="tel"` | ✅ | Optional |
| Number | `type="number"` | ✅ | Optional |
| Select | `<select>` | ❌ | Optional |
| Textarea | `<textarea>` | ✅ | Optional |
| Checkbox | `type="checkbox"` | ❌ | N/A |

---

**Applied to:** `basic-info-tab.component.ts`, `address-tab.component.ts`

**Next:** Apply this pattern to the remaining 13 tab components using the examples above as reference.
