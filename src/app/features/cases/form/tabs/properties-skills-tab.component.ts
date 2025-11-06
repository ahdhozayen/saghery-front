import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-properties-skills-tab',
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900">الممتلكات والمهارات</h3>
        </div>

        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <!-- Has Property Checkbox -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                الممتلكات
              </label>
              <div class="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  formControlName="hasProperty"
                  class="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
                />
                <label class="text-sm font-medium text-gray-900 cursor-pointer flex-1">
                  لديه ممتلكات
                </label>
              </div>
            </div>

            <!-- Property Description -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                وصف الممتلكات
              </label>
              <input
                type="text"
                formControlName="propertyDescription"
                placeholder="أدخل وصف الممتلكات"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
              />
            </div>

            <!-- Father Property -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                ممتلكات الأب
              </label>
              <input
                type="text"
                formControlName="fatherProperty"
                placeholder="أدخل ممتلكات الأب"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
              />
            </div>

            <!-- Has Skills Checkbox -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                المهارات
              </label>
              <div class="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  formControlName="hasSkills"
                  class="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
                />
                <label class="text-sm font-medium text-gray-900 cursor-pointer flex-1">
                  لديه مهارات
                </label>
              </div>
            </div>

            <!-- Skills Description (Full Width) -->
            <div class="space-y-1.5 md:col-span-2 lg:col-span-3">
              <label class="block text-sm font-medium text-gray-700">
                وصف المهارات
              </label>
              <textarea
                formControlName="skillsDescription"
                rows="3"
                placeholder="أدخل وصف المهارات"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400 resize-none"
              ></textarea>
            </div>

          </div>
        </div>
      </div>
    </div>
  `
})
export class PropertiesSkillsTabComponent {
  form = input.required<FormGroup>();
}
