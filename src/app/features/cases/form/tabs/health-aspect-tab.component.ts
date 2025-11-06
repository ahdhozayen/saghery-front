import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-health-aspect-tab',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  template: `
    <div class="p-6 animate-fadeIn" [formGroup]="form()">
      <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">

        <div class="flex items-center gap-3 px-6 py-4 bg-gradient-to-l from-error-50 to-white border-b border-gray-200">
          <div class="w-10 h-10 bg-error-100 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900">الجانب الصحي</h3>
        </div>

        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <!-- Has Health Insurance -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                التأمين الصحي
              </label>
              <div class="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  formControlName="hasHealthInsurance"
                  class="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
                />
                <label class="text-sm font-medium text-gray-900 cursor-pointer flex-1">
                  لديه تأمين صحي
                </label>
              </div>
            </div>

            <!-- Is Wife Pregnant -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                حالة الزوجة
              </label>
              <div class="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  formControlName="isWifePregnant"
                  class="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
                />
                <label class="text-sm font-medium text-gray-900 cursor-pointer flex-1">
                  الزوجة حامل
                </label>
              </div>
            </div>

            <!-- Visits Family Planning -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                تنظيم الأسرة
              </label>
              <div class="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  formControlName="visitsFamilyPlanning"
                  class="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
                />
                <label class="text-sm font-medium text-gray-900 cursor-pointer flex-1">
                  تتردد على تنظيم الأسرة
                </label>
              </div>
            </div>

            <!-- Has Drug Addiction -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                الإدمان
              </label>
              <div class="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  formControlName="hasDrugAddiction"
                  class="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
                />
                <label class="text-sm font-medium text-gray-900 cursor-pointer flex-1">
                  لديه إدمان
                </label>
              </div>
            </div>

            <!-- Receives Addiction Treatment -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                العلاج
              </label>
              <div class="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  formControlName="receivesAddictionTreatment"
                  class="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
                />
                <label class="text-sm font-medium text-gray-900 cursor-pointer flex-1">
                  يتلقى علاج الإدمان
                </label>
              </div>
            </div>

            <!-- Addiction Treatment Place (Full Width) -->
            <div class="space-y-1.5 md:col-span-2 lg:col-span-3">
              <label class="block text-sm font-medium text-gray-700">
                مكان العلاج (إن وجد)
              </label>
              <input
                type="text"
                formControlName="addictionTreatmentPlace"
                placeholder="أدخل مكان العلاج"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  `
})
export class HealthAspectTabComponent {
  form = input.required<FormGroup>();
}

