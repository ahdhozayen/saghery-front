import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-researcher-opinion-tab',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  template: `
    <div class="p-6 animate-fadeIn" [formGroup]="form()">
      <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">

        <div class="flex items-center gap-3 px-6 py-4 bg-gradient-to-l from-accent-50 to-white border-b border-gray-200">
          <div class="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900">رأي الباحث</h3>
        </div>

        <div class="p-6">
          <div class="space-y-1.5">
            <label class="block text-sm font-medium text-gray-700">
              رأي الباحث في الحالة
            </label>
            <textarea
              formControlName="researcherOpinion"
              rows="5"
              placeholder="أدخل رأي الباحث في الحالة..."
              class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                     hover:border-gray-400 resize-none"
            ></textarea>
            @if (form().controls['researcherOpinion'].hasError('required') && form().controls['researcherOpinion'].touched) {
              <p class="text-xs text-error flex items-center gap-1 animate-slideInRTL">
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                رأي الباحث مطلوب
              </p>
            }
          </div>
        </div>
      </div>
    </div>
  `
})
export class ResearcherOpinionTabComponent {
  form = input.required<FormGroup>();
}
