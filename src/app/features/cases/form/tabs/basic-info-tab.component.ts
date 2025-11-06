import { Component, input, computed } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-basic-info-tab',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  template: `
    <div class="p-6 animate-fadeIn" [formGroup]="form()">
      <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">

        <div class="flex items-center gap-3 px-6 py-4 bg-gradient-to-l from-primary-50 to-white border-b border-gray-200">
          <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900">البيانات الأساسية</h3>
        </div>

        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <!-- Full Name -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                الاسم الكامل <span class="text-error">*</span>
              </label>
              <input
                type="text"
                formControlName="fullName"
                placeholder="أدخل الاسم الكامل"
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
                  الاسم الكامل مطلوب
                </p>
              }
            </div>

            <!-- Age -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                العمر <span class="text-error">*</span>
              </label>
              <input
                type="number"
                formControlName="age"
                placeholder="أدخل العمر"
                class="block w-full px-3 py-2 text-sm border rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
                [class.border-error]="form().controls['age'].invalid && form().controls['age'].touched"
                [class.border-success]="form().controls['age'].valid && form().controls['age'].touched"
                [class.border-gray-300]="!form().controls['age'].touched"
              />
              @if (form().controls['age'].hasError('required') && form().controls['age'].touched) {
                <p class="text-xs text-error flex items-center gap-1 animate-slideInRTL">
                  <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  العمر مطلوب
                </p>
              }
            </div>

            <!-- Gender -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                النوع <span class="text-error">*</span>
              </label>
              <select
                formControlName="gender"
                class="block w-full px-3 py-2 text-sm border rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400 cursor-pointer"
                [class.border-error]="form().controls['gender'].invalid && form().controls['gender'].touched"
                [class.border-success]="form().controls['gender'].valid && form().controls['gender'].touched"
                [class.border-gray-300]="!form().controls['gender'].touched"
              >
                <option value="male">ذكر</option>
                <option value="female">أنثى</option>
              </select>
              @if (form().controls['gender'].hasError('required') && form().controls['gender'].touched) {
                <p class="text-xs text-error flex items-center gap-1 animate-slideInRTL">
                  <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  النوع مطلوب
                </p>
              }
            </div>

            <!-- National ID -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                الرقم القومي <span class="text-error">*</span>
              </label>
              <input
                type="text"
                formControlName="nationalId"
                maxlength="14"
                placeholder="أدخل الرقم القومي (14 رقم)"
                class="block w-full px-3 py-2 text-sm border rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
                [class.border-error]="form().controls['nationalId'].invalid && form().controls['nationalId'].touched"
                [class.border-success]="form().controls['nationalId'].valid && form().controls['nationalId'].touched"
                [class.border-gray-300]="!form().controls['nationalId'].touched"
              />
              @if (nationalIdError()) {
                <p class="text-xs text-error flex items-center gap-1 animate-slideInRTL">
                  <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  {{ nationalIdError() }}
                </p>
              }
            </div>

            <!-- Mobile -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                الموبايل <span class="text-error">*</span>
              </label>
              <input
                type="tel"
                formControlName="mobile"
                placeholder="01xxxxxxxxx"
                class="block w-full px-3 py-2 text-sm border rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
                [class.border-error]="form().controls['mobile'].invalid && form().controls['mobile'].touched"
                [class.border-success]="form().controls['mobile'].valid && form().controls['mobile'].touched"
                [class.border-gray-300]="!form().controls['mobile'].touched"
              />
              @if (mobileError()) {
                <p class="text-xs text-error flex items-center gap-1 animate-slideInRTL">
                  <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  {{ mobileError() }}
                </p>
              }
            </div>

            <!-- Landline -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                التليفون الأرضي
              </label>
              <input
                type="tel"
                formControlName="landline"
                placeholder="أدخل رقم التليفون الأرضي"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
              />
            </div>

            <!-- Education -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                التعليم
              </label>
              <select
                formControlName="education"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400 cursor-pointer"
              >
                <option value="illiterate">أمي</option>
                <option value="literacy_certificate">شهادة محو الأمية</option>
                <option value="preparatory">إعدادية</option>
                <option value="medium">مؤهل متوسط</option>
                <option value="high">مؤهل عالي</option>
              </select>
            </div>

          </div>
        </div>
      </div>
    </div>
  `
})
export class BasicInfoTabComponent {
  form = input.required<FormGroup>();

  // Custom error messages for fields with multiple validations
  nationalIdError = computed(() => {
    const control = this.form().controls['nationalId'];
    if (!control || !control.errors || !(control.dirty || control.touched)) {
      return null;
    }
    if (control.errors['required']) return 'الرقم القومي مطلوب';
    if (control.errors['pattern']) return 'يجب أن يكون 14 رقم';
    return null;
  });

  mobileError = computed(() => {
    const control = this.form().controls['mobile'];
    if (!control || !control.errors || !(control.dirty || control.touched)) {
      return null;
    }
    if (control.errors['required']) return 'الموبايل مطلوب';
    if (control.errors['pattern']) return 'رقم الموبايل غير صحيح';
    return null;
  });
}

