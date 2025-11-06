import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-infrastructure-tab',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  template: `
    <div class="p-6 animate-fadeIn" [formGroup]="form()">
      <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">

        <div class="flex items-center gap-3 px-6 py-4 bg-gradient-to-l from-info-50 to-white border-b border-gray-200">
          <div class="w-10 h-10 bg-info-100 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900">المرافق</h3>
        </div>

        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <!-- Has Sewage -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                الصرف الصحي
              </label>
              <div class="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  formControlName="hasSewage"
                  class="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
                />
                <label class="text-sm font-medium text-gray-900 cursor-pointer flex-1">
                  صرف صحي
                </label>
              </div>
            </div>

            <!-- Has Water -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                المياه
              </label>
              <div class="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  formControlName="hasWater"
                  class="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
                />
                <label class="text-sm font-medium text-gray-900 cursor-pointer flex-1">
                  مياه
                </label>
              </div>
            </div>

            <!-- Has Electricity -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                الكهرباء
              </label>
              <div class="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  formControlName="hasElectricity"
                  class="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
                />
                <label class="text-sm font-medium text-gray-900 cursor-pointer flex-1">
                  كهرباء
                </label>
              </div>
            </div>

            <!-- Has Gas -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                الغاز
              </label>
              <div class="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  formControlName="hasGas"
                  class="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
                />
                <label class="text-sm font-medium text-gray-900 cursor-pointer flex-1">
                  غاز
                </label>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  `
})
export class InfrastructureTabComponent {
  form = input.required<FormGroup>();
}
