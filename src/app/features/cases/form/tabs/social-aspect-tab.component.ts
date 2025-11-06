import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-social-aspect-tab',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  template: `
    <div class="p-6 animate-fadeIn" [formGroup]="form()">
      <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">

        <div class="flex items-center gap-3 px-6 py-4 bg-gradient-to-l from-success-50 to-white border-b border-gray-200">
          <div class="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900">الجانب الاجتماعي</h3>
        </div>

        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <!-- Marital Status -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                الحالة الاجتماعية
              </label>
              <select
                formControlName="maritalStatus"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400 cursor-pointer"
              >
                <option value="single">أعزب</option>
                <option value="married">متزوج</option>
                <option value="divorced">مطلق</option>
                <option value="widowed">أرمل</option>
              </select>
              @if (form().controls['maritalStatus'].hasError('required') && form().controls['maritalStatus'].touched) {
                <p class="text-xs text-error flex items-center gap-1 animate-slideInRTL">
                  <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  الحالة الاجتماعية مطلوبة
                </p>
              }
            </div>

            <!-- Is Provider Checkbox -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                الإعالة
              </label>
              <div class="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  formControlName="isProvider"
                  class="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
                />
                <label class="text-sm font-medium text-gray-900 cursor-pointer flex-1">
                  هل هو المعيل للأسرة؟
                </label>
              </div>
            </div>

            <!-- Number of Dependents -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                عدد الأفراد المعالين
              </label>
              <input
                type="number"
                formControlName="numberOfDependents"
                placeholder="0"
                min="0"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
              />
              @if (form().controls['numberOfDependents'].hasError('required') && form().controls['numberOfDependents'].touched) {
                <p class="text-xs text-error flex items-center gap-1 animate-slideInRTL">
                  <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  عدد الأفراد مطلوب
                </p>
              }
            </div>

            <!-- Number of Wives -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                عدد الزوجات
              </label>
              <input
                type="number"
                formControlName="numberOfWives"
                placeholder="0"
                min="0"
                max="4"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
              />
              @if (form().controls['numberOfWives'].hasError('required') && form().controls['numberOfWives'].touched) {
                <p class="text-xs text-error flex items-center gap-1 animate-slideInRTL">
                  <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  عدد الزوجات مطلوب
                </p>
              }
            </div>

            <!-- Number of Children -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                عدد الأولاد
              </label>
              <input
                type="number"
                formControlName="numberOfChildren"
                placeholder="0"
                min="0"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
              />
              @if (form().controls['numberOfChildren'].hasError('required') && form().controls['numberOfChildren'].touched) {
                <p class="text-xs text-error flex items-center gap-1 animate-slideInRTL">
                  <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  عدد الأولاد مطلوب
                </p>
              }
            </div>

          </div>
        </div>
      </div>
    </div>
  `
})
export class SocialAspectTabComponent {
  form = input.required<FormGroup>();
}

