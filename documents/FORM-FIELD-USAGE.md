# Using the Custom Form Field Component

The `app-form-field` component provides consistent, properly-aligned form fields across your application.

## Features
- ✅ Properly centered text, placeholders, and icons
- ✅ 40px height (comfortable and professional)
- ✅ Automatic error handling
- ✅ RTL support
- ✅ Material Design styling
- ✅ TypeScript type safety

## Basic Usage

### Simple Text Input

```typescript
import { FormFieldComponent } from '../../../shared/components/form-field';

@Component({
  imports: [FormFieldComponent, ReactiveFormsModule],
  // ...
})
```

```html
<app-form-field
  label="الاسم الكامل"
  [control]="form().controls['fullName']">
  <input matInput formControlName="fullName">
</app-form-field>
```

### With Prefix Icon

```html
<app-form-field
  label="الموبايل"
  prefixIcon="phone"
  [control]="form().controls['mobile']">
  <input matInput formControlName="mobile">
</app-form-field>
```

### Select Dropdown

```html
<app-form-field
  label="النوع"
  prefixIcon="wc"
  [control]="form().controls['gender']">
  <mat-select formControlName="gender">
    <mat-option value="male">ذكر</mat-option>
    <mat-option value="female">أنثى</mat-option>
  </mat-select>
</app-form-field>
```

### Textarea

```html
<app-form-field
  label="رأي الباحث"
  [control]="form().controls['researcherOpinion']">
  <textarea matInput formControlName="researcherOpinion" rows="5"></textarea>
</app-form-field>
```

### Custom Error Messages

```html
<app-form-field
  label="الرقم القومي"
  prefixIcon="fingerprint"
  [errorMessage]="getErrorMessage('nationalId')">
  <input matInput formControlName="nationalId" maxlength="14">
</app-form-field>
```

```typescript
getErrorMessage(controlName: string): string | null {
  const control = this.form().get(controlName);
  if (!control || !control.errors) return null;

  if (control.errors['required']) return 'هذا الحقل مطلوب';
  if (control.errors['pattern']) return 'يجب أن يكون 14 رقم';
  return null;
}
```

### With Hint

```html
<app-form-field
  label="البريد الإلكتروني"
  hint="سيتم استخدامه لتسجيل الدخول"
  [control]="form().controls['email']">
  <input matInput formControlName="email" type="email">
</app-form-field>
```

## Component API

### Inputs

| Input | Type | Required | Description |
|-------|------|----------|-------------|
| `label` | `string` | Yes | Label text for the field |
| `prefixIcon` | `string` | No | Material icon name to show before input |
| `errorMessage` | `string \| null` | No | Custom error message to display |
| `hint` | `string \| null` | No | Hint text below the field |
| `control` | `AbstractControl \| null` | No | Form control for automatic error handling |

## Migrating Existing Forms

### Before (Old Way):
```html
<mat-form-field appearance="outline" class="form-field">
  <mat-label>الاسم الكامل</mat-label>
  <mat-icon matIconPrefix>person</mat-icon>
  <input matInput formControlName="fullName">
  @if (form().controls['fullName'].hasError('required')) {
    <mat-error>الاسم الكامل مطلوب</mat-error>
  }
</mat-form-field>
```

### After (New Way):
```html
<app-form-field
  label="الاسم الكامل"
  prefixIcon="person"
  [control]="form().controls['fullName']">
  <input matInput formControlName="fullName">
</app-form-field>
```

## Complete Example

Here's a complete tab component using the new form field:

```typescript
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormFieldComponent } from '../../../shared/components/form-field';

@Component({
  selector: 'app-basic-info-tab',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    FormFieldComponent
  ],
  template: `
    <div class="tab-content" [formGroup]="form()">
      <div class="section-card">
        <div class="section-header">
          <mat-icon>badge</mat-icon>
          <h3>البيانات الأساسية</h3>
        </div>
        <div class="section-body">
          <div class="form-grid">
            <app-form-field
              label="الاسم الكامل"
              prefixIcon="person"
              [control]="form().controls['fullName']">
              <input matInput formControlName="fullName">
            </app-form-field>

            <app-form-field
              label="العمر"
              prefixIcon="cake"
              [control]="form().controls['age']">
              <input matInput type="number" formControlName="age">
            </app-form-field>

            <app-form-field
              label="النوع"
              prefixIcon="wc"
              [control]="form().controls['gender']">
              <mat-select formControlName="gender">
                <mat-option value="male">ذكر</mat-option>
                <mat-option value="female">أنثى</mat-option>
              </mat-select>
            </app-form-field>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: var(--spacing-lg);
    }
  `]
})
export class BasicInfoTabComponent {
  form = input.required<FormGroup>();
}
```

## Benefits

1. **Consistency**: All form fields look and behave the same
2. **Less Code**: No need to repeat error handling logic
3. **Maintainability**: Update styling in one place
4. **Automatic Errors**: Default Arabic error messages
5. **Type Safety**: Full TypeScript support
6. **Accessibility**: Material Design a11y features included

## Next Steps

1. Update your existing forms to use `app-form-field`
2. Remove old form field styling from component styles
3. Enjoy consistent, properly-aligned form fields!
