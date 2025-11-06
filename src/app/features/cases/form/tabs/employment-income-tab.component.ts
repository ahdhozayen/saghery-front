import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-employment-income-tab',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  template: `
    <div class="p-6 animate-fadeIn" [formGroup]="form()">
      <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">

        <div class="flex items-center gap-3 px-6 py-4 bg-gradient-to-l from-warning-50 to-white border-b border-gray-200">
          <div class="w-10 h-10 bg-warning-100 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900">العمل والدخل</h3>
        </div>

        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <!-- Is Employed Checkbox -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                حالة العمل
              </label>
              <div class="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  formControlName="isEmployed"
                  class="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
                />
                <label class="text-sm font-medium text-gray-900 cursor-pointer flex-1">
                  لديه عمل
                </label>
              </div>
            </div>

            <!-- Work Type -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                نوع العمل
              </label>
              <select
                formControlName="workType"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400 cursor-pointer"
              >
                <option value="">اختر نوع العمل</option>
                <option value="government">حكومي</option>
                <option value="private">خاص</option>
                <option value="stable">ثابت</option>
                <option value="craftsman">حرفي</option>
                <option value="seasonal">موسمي</option>
                <option value="daily">يومية</option>
              </select>
            </div>

            <!-- Job Title -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                المسمى الوظيفي
              </label>
              <input
                type="text"
                formControlName="jobTitle"
                placeholder="أدخل المسمى الوظيفي"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
              />
            </div>

            <!-- Craft -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                الحرفة
              </label>
              <input
                type="text"
                formControlName="craft"
                placeholder="أدخل الحرفة"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
              />
            </div>

            <!-- Monthly Income -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                الدخل الشهري
              </label>
              <input
                type="number"
                formControlName="monthlyIncome"
                placeholder="0"
                min="0"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
              />
            </div>

            <!-- Pension -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                المعاش
              </label>
              <input
                type="number"
                formControlName="pension"
                placeholder="0"
                min="0"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
              />
            </div>

            <!-- Alimony -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                النفقة
              </label>
              <input
                type="number"
                formControlName="alimony"
                placeholder="0"
                min="0"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
              />
            </div>

            <!-- Charity -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                الصدقات
              </label>
              <input
                type="number"
                formControlName="charity"
                placeholder="0"
                min="0"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
              />
            </div>

            <!-- Relatives Help -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                مساعدات الأقارب
              </label>
              <input
                type="number"
                formControlName="relativesHelp"
                placeholder="0"
                min="0"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
              />
            </div>

            <!-- Other Income -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                دخل آخر
              </label>
              <input
                type="number"
                formControlName="otherIncome"
                placeholder="0"
                min="0"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
              />
            </div>

            <!-- Other Income Description (Full Width) -->
            <div class="space-y-1.5 md:col-span-2 lg:col-span-3">
              <label class="block text-sm font-medium text-gray-700">
                وصف الدخل الآخر
              </label>
              <input
                type="text"
                formControlName="otherIncomeDescription"
                placeholder="أدخل وصف الدخل الآخر"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
              />
            </div>

            <!-- Has Own Project Checkbox -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                المشروع الخاص
              </label>
              <div class="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  formControlName="hasOwnProject"
                  class="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
                />
                <label class="text-sm font-medium text-gray-900 cursor-pointer flex-1">
                  لديه مشروع خاص
                </label>
              </div>
            </div>

            <!-- Project Type -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                نوع المشروع
              </label>
              <input
                type="text"
                formControlName="projectType"
                placeholder="أدخل نوع المشروع"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
              />
            </div>

            <!-- Project Donor -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                الجهة المانحة
              </label>
              <input
                type="text"
                formControlName="projectDonor"
                placeholder="أدخل الجهة المانحة"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
              />
            </div>

            <!-- Project Capital -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                رأس المال
              </label>
              <input
                type="number"
                formControlName="projectCapital"
                placeholder="0"
                min="0"
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
export class EmploymentIncomeTabComponent {
  form = input.required<FormGroup>();
}
