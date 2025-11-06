import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-housing-tab',
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900">السكن</h3>
        </div>

        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <!-- Housing Type -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                نوع السكن
              </label>
              <select
                formControlName="housingType"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400 cursor-pointer"
              >
                <option value="rent">إيجار</option>
                <option value="owned">تمليك</option>
              </select>
            </div>

            <!-- Ownership Name -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                اسم المالك
              </label>
              <input
                type="text"
                formControlName="ownershipName"
                placeholder="أدخل اسم المالك"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
              />
            </div>

            <!-- House Type -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                نوع المنزل
              </label>
              <select
                formControlName="houseType"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400 cursor-pointer"
              >
                <option value="family">عائلة</option>
                <option value="private">خاص</option>
              </select>
            </div>

            <!-- House Area -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                مساحة المنزل (م²)
              </label>
              <input
                type="number"
                formControlName="houseArea"
                placeholder="0"
                min="0"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
              />
            </div>

            <!-- Number of Floors -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                عدد الطوابق
              </label>
              <input
                type="number"
                formControlName="numberOfFloors"
                placeholder="1"
                min="1"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
              />
            </div>

            <!-- Number of Rooms -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                عدد الغرف
              </label>
              <input
                type="number"
                formControlName="numberOfRooms"
                placeholder="1"
                min="1"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
              />
            </div>

            <!-- Roof Type -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                نوع السقف
              </label>
              <input
                type="text"
                formControlName="roofType"
                placeholder="أدخل نوع السقف"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
              />
            </div>

            <!-- Walls Type -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                نوع الجدران
              </label>
              <input
                type="text"
                formControlName="wallsType"
                placeholder="أدخل نوع الجدران"
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
export class HousingTabComponent {
  form = input.required<FormGroup>();
}
