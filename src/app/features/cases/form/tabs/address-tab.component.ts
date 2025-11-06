import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-address-tab',
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900">العنوان</h3>
        </div>

        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <!-- Governorate -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                المحافظة <span class="text-error">*</span>
              </label>
              <input
                type="text"
                formControlName="governorate"
                placeholder="أدخل اسم المحافظة"
                class="block w-full px-3 py-2 text-sm border rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
                [class.border-error]="form().controls['governorate'].invalid && form().controls['governorate'].touched"
                [class.border-success]="form().controls['governorate'].valid && form().controls['governorate'].touched"
                [class.border-gray-300]="!form().controls['governorate'].touched"
              />
              @if (form().controls['governorate'].hasError('required') && form().controls['governorate'].touched) {
                <p class="text-xs text-error flex items-center gap-1 animate-slideInRTL">
                  <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  المحافظة مطلوبة
                </p>
              }
            </div>

            <!-- City/Center -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                المدينة/المركز <span class="text-error">*</span>
              </label>
              <input
                type="text"
                formControlName="cityCenter"
                placeholder="أدخل اسم المدينة أو المركز"
                class="block w-full px-3 py-2 text-sm border rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
                [class.border-error]="form().controls['cityCenter'].invalid && form().controls['cityCenter'].touched"
                [class.border-success]="form().controls['cityCenter'].valid && form().controls['cityCenter'].touched"
                [class.border-gray-300]="!form().controls['cityCenter'].touched"
              />
              @if (form().controls['cityCenter'].hasError('required') && form().controls['cityCenter'].touched) {
                <p class="text-xs text-error flex items-center gap-1 animate-slideInRTL">
                  <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  المدينة/المركز مطلوب
                </p>
              }
            </div>

            <!-- Area/Village -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                المنطقة/القرية <span class="text-error">*</span>
              </label>
              <input
                type="text"
                formControlName="areaVillage"
                placeholder="أدخل اسم المنطقة أو القرية"
                class="block w-full px-3 py-2 text-sm border rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
                [class.border-error]="form().controls['areaVillage'].invalid && form().controls['areaVillage'].touched"
                [class.border-success]="form().controls['areaVillage'].valid && form().controls['areaVillage'].touched"
                [class.border-gray-300]="!form().controls['areaVillage'].touched"
              />
              @if (form().controls['areaVillage'].hasError('required') && form().controls['areaVillage'].touched) {
                <p class="text-xs text-error flex items-center gap-1 animate-slideInRTL">
                  <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  المنطقة/القرية مطلوبة
                </p>
              }
            </div>

            <!-- Street -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                الشارع <span class="text-error">*</span>
              </label>
              <input
                type="text"
                formControlName="street"
                placeholder="أدخل اسم الشارع"
                class="block w-full px-3 py-2 text-sm border rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
                [class.border-error]="form().controls['street'].invalid && form().controls['street'].touched"
                [class.border-success]="form().controls['street'].valid && form().controls['street'].touched"
                [class.border-gray-300]="!form().controls['street'].touched"
              />
              @if (form().controls['street'].hasError('required') && form().controls['street'].touched) {
                <p class="text-xs text-error flex items-center gap-1 animate-slideInRTL">
                  <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  الشارع مطلوب
                </p>
              }
            </div>

            <!-- Detailed Address (Full Width) -->
            <div class="space-y-1.5 md:col-span-2 lg:col-span-3">
              <label class="block text-sm font-medium text-gray-700">
                العنوان التفصيلي <span class="text-error">*</span>
              </label>
              <textarea
                formControlName="detailedAddress"
                rows="3"
                placeholder="أدخل العنوان التفصيلي (رقم المنزل، علامات مميزة، إلخ)"
                class="block w-full px-3 py-2 text-sm border rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400 resize-none"
                [class.border-error]="form().controls['detailedAddress'].invalid && form().controls['detailedAddress'].touched"
                [class.border-success]="form().controls['detailedAddress'].valid && form().controls['detailedAddress'].touched"
                [class.border-gray-300]="!form().controls['detailedAddress'].touched"
              ></textarea>
              @if (form().controls['detailedAddress'].hasError('required') && form().controls['detailedAddress'].touched) {
                <p class="text-xs text-error flex items-center gap-1 animate-slideInRTL">
                  <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  العنوان التفصيلي مطلوب
                </p>
              }
            </div>

          </div>
        </div>
      </div>
    </div>
  `
})
export class AddressTabComponent {
  form = input.required<FormGroup>();
}

