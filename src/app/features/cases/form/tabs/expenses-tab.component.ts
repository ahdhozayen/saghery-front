import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-expenses-tab',
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900">المصروفات</h3>
        </div>

        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <!-- Rent -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                الإيجار
              </label>
              <input
                type="number"
                formControlName="rent"
                placeholder="0"
                min="0"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
              />
            </div>

            <!-- Education Expenses -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                مصروفات تعليم
              </label>
              <input
                type="number"
                formControlName="educationExpenses"
                placeholder="0"
                min="0"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
              />
            </div>

            <!-- Electricity Bill -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                كهرباء
              </label>
              <input
                type="number"
                formControlName="electricityBill"
                placeholder="0"
                min="0"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
              />
            </div>

            <!-- Water Bill -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                مياه
              </label>
              <input
                type="number"
                formControlName="waterBill"
                placeholder="0"
                min="0"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
              />
            </div>

            <!-- Gas Bill -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                غاز
              </label>
              <input
                type="number"
                formControlName="gasBill"
                placeholder="0"
                min="0"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
              />
            </div>

            <!-- Phone Bill -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                تليفون
              </label>
              <input
                type="number"
                formControlName="phoneBill"
                placeholder="0"
                min="0"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
              />
            </div>

            <!-- Tutoring -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                دروس خصوصية
              </label>
              <input
                type="number"
                formControlName="tutoring"
                placeholder="0"
                min="0"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
              />
            </div>

            <!-- Associations -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                جمعيات
              </label>
              <input
                type="number"
                formControlName="associations"
                placeholder="0"
                min="0"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
              />
            </div>

            <!-- Monthly Treatment -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                علاج شهري
              </label>
              <input
                type="number"
                formControlName="monthlyTreatment"
                placeholder="0"
                min="0"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
              />
            </div>

            <!-- Device Installments -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                أقساط أجهزة
              </label>
              <input
                type="number"
                formControlName="deviceInstallments"
                placeholder="0"
                min="0"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
              />
            </div>

            <!-- Smoking -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                تدخين
              </label>
              <input
                type="number"
                formControlName="smoking"
                placeholder="0"
                min="0"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
              />
            </div>

            <!-- Household Expenses -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                مصروفات بيت
              </label>
              <input
                type="number"
                formControlName="householdExpenses"
                placeholder="0"
                min="0"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
              />
            </div>

            <!-- Total Debt -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                إجمالي الديون
              </label>
              <input
                type="number"
                formControlName="totalDebt"
                placeholder="0"
                min="0"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
              />
            </div>

            <!-- Debt Reason -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                سبب الدين
              </label>
              <input
                type="text"
                formControlName="debtReason"
                placeholder="أدخل سبب الدين"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
              />
            </div>

            <!-- Monthly Debt Payment -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                القسط الشهري
              </label>
              <input
                type="number"
                formControlName="monthlyDebtPayment"
                placeholder="0"
                min="0"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
              />
            </div>

            <!-- Creditor Relationship -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">
                صلة الدائن
              </label>
              <input
                type="text"
                formControlName="creditorRelationship"
                placeholder="أدخل صلة الدائن"
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       hover:border-gray-400"
              />
            </div>

            <!-- Other Expenses (Full Width) -->
            <div class="space-y-1.5 md:col-span-2 lg:col-span-3">
              <label class="block text-sm font-medium text-gray-700">
                مصروفات أخرى
              </label>
              <input
                type="text"
                formControlName="otherExpenses"
                placeholder="أدخل المصروفات الأخرى"
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
export class ExpensesTabComponent {
  form = input.required<FormGroup>();
}
