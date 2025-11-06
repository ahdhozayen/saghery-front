import { Component, input, OnInit, signal, inject, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { UserService, UserItem } from '../../../../core/services/user.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-researcher-info-tab',
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900">معلومات الباحث</h3>
        </div>

        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <!-- Researcher Select -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                الباحث
              </label>
              <div class="relative">
                <select
                  formControlName="researcher"
                  [disabled]="loadingResearchers()"
                  class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                         focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                         hover:border-gray-400 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option [value]="null">اختر الباحث</option>
                  @if (loadingResearchers()) {
                    <option disabled>جاري التحميل...</option>
                  } @else {
                    @for (researcher of researchers(); track researcher.id) {
                      <option [value]="researcher.id">{{ researcher.fullName }}</option>
                    }
                    @if (researchers().length === 0) {
                      <option disabled>لا يوجد باحثين</option>
                    }
                  }
                </select>
                @if (loadingResearchers()) {
                  <div class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg class="w-4 h-4 text-primary animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                }
              </div>
              @if (loadingResearchers()) {
                <p class="text-xs text-gray-500 flex items-center gap-1">
                  <svg class="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  جاري تحميل الباحثين...
                </p>
              }
            </div>

            <!-- Guide Name -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                اسم الدليل
              </label>
              <input
                type="text"
                formControlName="guideName"
                placeholder="أدخل اسم الدليل"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
              />
              @if (form().controls['guideName'].hasError('required') && form().controls['guideName'].touched) {
                <p class="text-xs text-error flex items-center gap-1 animate-slideInRTL">
                  <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  اسم الدليل مطلوب
                </p>
              }
            </div>

            <!-- Guide Mobile -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                موبايل الدليل
              </label>
              <input
                type="tel"
                formControlName="guideMobile"
                placeholder="01xxxxxxxxx"
                class="block w-full px-3 py-2 text-sm border rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
                [class.border-error]="form().controls['guideMobile'].invalid && form().controls['guideMobile'].touched"
                [class.border-success]="form().controls['guideMobile'].valid && form().controls['guideMobile'].touched"
                [class.border-gray-300]="!form().controls['guideMobile'].touched"
              />
              @if (guideMobileError()) {
                <p class="text-xs text-error flex items-center gap-1 animate-slideInRTL">
                  <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  {{ guideMobileError() }}
                </p>
              }
            </div>

          </div>
        </div>
      </div>
    </div>
  `
})
export class ResearcherInfoTabComponent implements OnInit {
  private readonly userService = inject(UserService);

  form = input.required<FormGroup>();
  readonly researchers = signal<UserItem[]>([]);
  readonly loadingResearchers = signal(false);

  // Custom error message for guideMobile
  guideMobileError = computed(() => {
    const control = this.form().controls['guideMobile'];
    if (!control || !control.errors || !(control.dirty || control.touched)) {
      return null;
    }
    if (control.errors['required']) return 'موبايل الدليل مطلوب';
    if (control.errors['pattern']) return 'رقم الموبايل غير صحيح';
    return null;
  });

  constructor() {
    // Use effect to enable/disable the researcher control based on loading state
    effect(() => {
      const researcherControl = this.form()?.get('researcher');
      if (researcherControl) {
        if (this.loadingResearchers()) {
          researcherControl.disable({ emitEvent: false });
        } else {
          researcherControl.enable({ emitEvent: false });
        }
      }
    });
  }

  ngOnInit(): void {
    this.loadResearchers();
  }

  private loadResearchers(): void {
    this.loadingResearchers.set(true);
    this.userService.getResearchers(1, 100)
      .pipe(
        catchError(() => {
          this.loadingResearchers.set(false);
          return of({ data: [], meta: { count: 0, page: 1, page_size: 100, num_pages: 0 } });
        })
      )
      .subscribe({
        next: (response) => {
          this.researchers.set(response.data);
          this.loadingResearchers.set(false);
        },
        error: () => {
          this.loadingResearchers.set(false);
        }
      });
  }
}

