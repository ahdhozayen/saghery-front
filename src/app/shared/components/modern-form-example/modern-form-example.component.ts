import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modern-form-example',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-text-primary mb-2">نموذج حديث</h1>
          <p class="text-lg text-text-secondary">مثال على نموذج باستخدام Tailwind CSS</p>
        </div>

        <!-- Form Card -->
        <div class="bg-background-surface rounded-lg shadow-md border border-border-light p-6 sm:p-8">
          <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-6">
            <!-- Grid Layout: 3 columns on large, 2 on tablet, 1 on mobile -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <!-- Full Name -->
              <div class="lg:col-span-1">
                <label for="fullName" class="block text-sm font-semibold text-text-primary mb-2">
                  الاسم الكامل <span class="text-error">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  formControlName="fullName"
                  class="w-full px-4 py-3 rounded-md border border-border-light bg-background-surface text-text-primary placeholder-text-disabled focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-base"
                  placeholder="أدخل الاسم الكامل"
                />
                @if (form.get('fullName')?.hasError('required') && form.get('fullName')?.touched) {
                  <p class="mt-1 text-sm text-error">الاسم الكامل مطلوب</p>
                }
              </div>

              <!-- Email -->
              <div class="lg:col-span-1">
                <label for="email" class="block text-sm font-semibold text-text-primary mb-2">
                  البريد الإلكتروني <span class="text-error">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  formControlName="email"
                  class="w-full px-4 py-3 rounded-md border border-border-light bg-background-surface text-text-primary placeholder-text-disabled focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-base"
                  placeholder="example@email.com"
                />
                @if (form.get('email')?.hasError('required') && form.get('email')?.touched) {
                  <p class="mt-1 text-sm text-error">البريد الإلكتروني مطلوب</p>
                }
                @if (form.get('email')?.hasError('email') && form.get('email')?.touched) {
                  <p class="mt-1 text-sm text-error">البريد الإلكتروني غير صحيح</p>
                }
              </div>

              <!-- Phone -->
              <div class="lg:col-span-1">
                <label for="phone" class="block text-sm font-semibold text-text-primary mb-2">
                  رقم الهاتف
                </label>
                <input
                  id="phone"
                  type="tel"
                  formControlName="phone"
                  class="w-full px-4 py-3 rounded-md border border-border-light bg-background-surface text-text-primary placeholder-text-disabled focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-base"
                  placeholder="01XXXXXXXXX"
                />
              </div>

              <!-- Select Dropdown -->
              <div class="lg:col-span-1">
                <label for="country" class="block text-sm font-semibold text-text-primary mb-2">
                  الدولة <span class="text-error">*</span>
                </label>
                <select
                  id="country"
                  formControlName="country"
                  class="w-full px-4 py-3 rounded-md border border-border-light bg-background-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-base"
                >
                  <option value="">اختر الدولة</option>
                  <option value="eg">مصر</option>
                  <option value="sa">السعودية</option>
                  <option value="ae">الإمارات</option>
                </select>
                @if (form.get('country')?.hasError('required') && form.get('country')?.touched) {
                  <p class="mt-1 text-sm text-error">الدولة مطلوبة</p>
                }
              </div>

              <!-- Date Input -->
              <div class="lg:col-span-1">
                <label for="birthDate" class="block text-sm font-semibold text-text-primary mb-2">
                  تاريخ الميلاد
                </label>
                <input
                  id="birthDate"
                  type="date"
                  formControlName="birthDate"
                  class="w-full px-4 py-3 rounded-md border border-border-light bg-background-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-base"
                />
              </div>

              <!-- Checkbox -->
              <div class="lg:col-span-1 flex items-center">
                <input
                  id="newsletter"
                  type="checkbox"
                  formControlName="newsletter"
                  class="w-5 h-5 rounded-sm border-border-medium text-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-0 cursor-pointer"
                />
                <label for="newsletter" class="mr-2 text-sm text-text-primary cursor-pointer">
                  الاشتراك في النشرة الإخبارية
                </label>
              </div>
            </div>

            <!-- Full Width Textarea -->
            <div>
              <label for="message" class="block text-sm font-semibold text-text-primary mb-2">
                الرسالة
              </label>
              <textarea
                id="message"
                formControlName="message"
                rows="4"
                class="w-full px-4 py-3 rounded-md border border-border-light bg-background-surface text-text-primary placeholder-text-disabled focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-base resize-y"
                placeholder="اكتب رسالتك هنا..."
              ></textarea>
            </div>

            <!-- Form Actions -->
            <div class="flex flex-col sm:flex-row gap-4 justify-end pt-4 border-t border-border-light">
              <button
                type="button"
                (click)="onCancel()"
                class="px-6 py-3 rounded-md border border-border-medium text-text-primary bg-background-surface hover:bg-background-surface-hover hover:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-base font-medium"
              >
                إلغاء
              </button>
              <button
                type="submit"
                [disabled]="form.invalid"
                class="px-6 py-3 rounded-md bg-primary-500 text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-base font-semibold shadow-sm hover:shadow-md"
              >
                حفظ
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
})
export class ModernFormExampleComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      country: ['', [Validators.required]],
      birthDate: [''],
      newsletter: [false],
      message: [''],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
      // Handle form submission
    } else {
      this.form.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.form.reset();
  }
}

