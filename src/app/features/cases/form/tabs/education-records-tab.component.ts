import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-education-records-tab',
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900">سجلات التعليم</h3>
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
        <div class="p-6 space-y-4" formArrayName="educationRecords">
          @for (record of educationRecords().controls; track $index) {
            <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200" [formGroupName]="$index">
              <div class="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  <label class="block text-sm font-medium text-gray-700">المرحلة التعليمية</label>
                  <input
                    type="text"
                    formControlName="educationStage"
                    placeholder="أدخل المرحلة"
                    class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                           focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                           hover:border-gray-400"
                  />
                </div>

                <div class="space-y-1.5">
                  <label class="block text-sm font-medium text-gray-700">المصروفات</label>
                  <input
                    type="number"
                    formControlName="educationExpenses"
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
                      formControlName="isDropout"
                      class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
                    />
                    <span class="text-sm font-medium text-gray-700">متسرب</span>
                  </label>
                </div>

                <div class="space-y-1.5">
                  <label class="block text-sm font-medium text-gray-700">سبب التسرب</label>
                  <input
                    type="text"
                    formControlName="dropoutReason"
                    placeholder="أدخل سبب التسرب"
                    class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                           focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                           hover:border-gray-400"
                  />
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
          @if (educationRecords().length === 0) {
            <p class="text-center text-gray-500 py-8">لا توجد سجلات. اضغط + لإضافة سجل</p>
          }
        </div>
      </div>
    </div>
  `
})
export class EducationRecordsTabComponent {
  form = input.required<FormGroup>();
  educationRecords = input.required<FormArray>();
  addRecord = output<void>();
  removeRecord = output<number>();
}

