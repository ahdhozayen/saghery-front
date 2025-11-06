import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-health-records-tab',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  template: `
    <div class="p-6 animate-fadeIn" [formGroup]="form()">
      <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div class="flex items-center justify-between px-6 py-4 bg-gradient-to-l from-primary-50 to-white border-b border-gray-200">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900">السجلات الصحية</h3>
          </div>
          <button
            type="button"
            (click)="addRecord.emit()"
            class="w-9 h-9 flex items-center justify-center rounded-lg bg-primary-500 text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        <div class="p-6 space-y-4" formArrayName="healthRecords">
          @for (record of healthRecords().controls; track $index) {
            <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200" [formGroupName]="$index">
              <div class="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="space-y-1.5">
                  <label class="block text-sm font-medium text-gray-700">الصلة</label>
                  <input
                    type="text"
                    formControlName="relationship"
                    placeholder="أدخل الصلة"
                    class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                           focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                           hover:border-gray-400"
                  />
                </div>

                <div class="space-y-1.5">
                  <label class="block text-sm font-medium text-gray-700">الاسم</label>
                  <input
                    type="text"
                    formControlName="name"
                    placeholder="أدخل الاسم"
                    class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                           focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                           hover:border-gray-400"
                  />
                </div>

                <div class="space-y-1.5">
                  <label class="block text-sm font-medium text-gray-700">العمر</label>
                  <input
                    type="number"
                    formControlName="age"
                    placeholder="أدخل العمر"
                    class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                           focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                           hover:border-gray-400"
                  />
                </div>

                <div class="space-y-1.5">
                  <label class="block text-sm font-medium text-gray-700">الشكوى</label>
                  <input
                    type="text"
                    formControlName="complaint"
                    placeholder="أدخل الشكوى"
                    class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                           focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                           hover:border-gray-400"
                  />
                </div>

                <div class="space-y-1.5">
                  <label class="block text-sm font-medium text-gray-700">تكلفة العلاج الشهرية</label>
                  <input
                    type="number"
                    formControlName="monthlyTreatmentCost"
                    placeholder="0"
                    class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                           focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                           hover:border-gray-400"
                  />
                </div>

                <div class="space-y-1.5 flex items-end">
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      formControlName="hasPrescription"
                      class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
                    />
                    <span class="text-sm font-medium text-gray-700">لديه روشتة</span>
                  </label>
                </div>
              </div>

              <button
                type="button"
                (click)="removeRecord.emit($index)"
                class="w-9 h-9 flex items-center justify-center rounded-lg text-error hover:bg-error-light focus:outline-none focus:ring-2 focus:ring-error focus:ring-offset-2 transition-colors mt-6"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          }
          @if (healthRecords().length === 0) {
            <p class="text-center text-gray-500 py-8">لا توجد سجلات. اضغط + لإضافة سجل</p>
          }
        </div>
      </div>
    </div>
  `
})
export class HealthRecordsTabComponent {
  form = input.required<FormGroup>();
  healthRecords = input.required<FormArray>();
  addRecord = output<void>();
  removeRecord = output<number>();
}

