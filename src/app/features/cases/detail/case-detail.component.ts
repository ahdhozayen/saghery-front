import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CaseService, CaseDetail } from '../../../core/services/case.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-case-detail',
  imports: [
    CommonModule,
    RouterLink
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-6 animate-fadeIn" dir="rtl">
      @if (loading()) {
        <div class="flex flex-col items-center justify-center min-h-[400px] gap-4">
          <svg class="w-12 h-12 text-primary-500 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="text-lg text-gray-600">جار تحميل بيانات الحالة...</p>
        </div>
      } @else if (caseData()) {
        <!-- Header -->
        <div class="bg-white rounded-xl border border-gray-200 shadow-md mb-6 overflow-hidden">
          <div class="bg-gradient-to-l from-primary-500 to-primary-600 px-6 py-6">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div class="flex-1">
                <h1 class="text-3xl font-bold text-white mb-3">{{ caseData()!.basicData.fullName }}</h1>
                <div class="flex flex-wrap items-center gap-3">
                  <span class="inline-flex items-center px-3 py-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                    <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    {{ caseData()!.researcherInformation.caseCode }}
                  </span>
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium" [ngClass]="getStatusClasses(caseData()!.caseManagement.status)">
                    {{ getStatusLabel(caseData()!.caseManagement.status) }}
                  </span>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <a
                  [routerLink]="['/cases']"
                  class="inline-flex items-center gap-2 px-4 py-2 border border-white border-opacity-30 text-white rounded-lg hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-500 transition-all"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                  <span>رجوع</span>
                </a>
                <a
                  [routerLink]="['/cases', caseId(), 'edit']"
                  class="inline-flex items-center gap-2 px-4 py-2 bg-white text-primary-600 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-500 transition-all font-semibold shadow-sm"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>تعديل</span>
                </a>
                <a
                  [routerLink]="['/cases', caseId(), 'print']"
                  class="inline-flex items-center gap-2 px-4 py-2 border border-white border-opacity-30 text-white rounded-lg hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-500 transition-all"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  <span>طباعة</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Researcher Information -->
          <div class="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
            <div class="flex items-center gap-3 px-6 py-4 bg-gradient-to-l from-info-50 to-white border-b border-gray-200">
              <div class="w-10 h-10 bg-info-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900">معلومات الباحث</h3>
            </div>
            <div class="p-6">
              <div class="space-y-4">
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">اسم الباحث</span>
                  <span class="text-base text-gray-900">{{ caseData()!.researcherInformation.researcherName }}</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">اسم الدليل</span>
                  <span class="text-base text-gray-900">{{ caseData()!.researcherInformation.guideName || '—' }}</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">موبايل الدليل</span>
                  <span class="text-base text-gray-900">{{ caseData()!.researcherInformation.guideMobile || '—' }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Basic Data -->
          <div class="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
            <div class="flex items-center gap-3 px-6 py-4 bg-gradient-to-l from-primary-50 to-white border-b border-gray-200">
              <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900">البيانات الأساسية</h3>
            </div>
            <div class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">الاسم الكامل</span>
                  <span class="text-base text-gray-900 font-medium">{{ caseData()!.basicData.fullName }}</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">العمر</span>
                  <span class="text-base text-gray-900">{{ caseData()!.basicData.age }} سنة</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">النوع</span>
                  <span class="text-base text-gray-900">{{ getGenderLabel(caseData()!.basicData.gender) }}</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">الرقم القومي</span>
                  <span class="text-base text-gray-900 font-mono">{{ caseData()!.basicData.nationalId }}</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">الموبايل</span>
                  <span class="text-base text-gray-900">{{ caseData()!.basicData.mobile }}</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">التليفون الأرضي</span>
                  <span class="text-base text-gray-900">{{ caseData()!.basicData.landline || '—' }}</span>
                </div>
                <div class="flex flex-col md:col-span-2">
                  <span class="text-sm font-medium text-gray-500 mb-1">التعليم</span>
                  <span class="text-base text-gray-900">{{ getEducationLabel(caseData()!.basicData.education) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Address -->
          <div class="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
            <div class="flex items-center gap-3 px-6 py-4 bg-gradient-to-l from-success-50 to-white border-b border-gray-200">
              <div class="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900">العنوان</h3>
            </div>
            <div class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">المحافظة</span>
                  <span class="text-base text-gray-900">{{ caseData()!.address.governorate }}</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">المدينة/المركز</span>
                  <span class="text-base text-gray-900">{{ caseData()!.address.cityCenter }}</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">المنطقة/القرية</span>
                  <span class="text-base text-gray-900">{{ caseData()!.address.areaVillage }}</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">الشارع</span>
                  <span class="text-base text-gray-900">{{ caseData()!.address.street }}</span>
                </div>
                <div class="flex flex-col md:col-span-2">
                  <span class="text-sm font-medium text-gray-500 mb-1">العنوان التفصيلي</span>
                  <span class="text-base text-gray-900">{{ caseData()!.address.detailedAddress }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Social Aspect -->
          <div class="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
            <div class="flex items-center gap-3 px-6 py-4 bg-gradient-to-l from-accent-50 to-white border-b border-gray-200">
              <div class="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900">الجانب الاجتماعي</h3>
            </div>
            <div class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">الحالة الاجتماعية</span>
                  <span class="text-base text-gray-900">{{ getMaritalStatusLabel(caseData()!.socialAspect.maritalStatus) }}</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">هل هو المعيل</span>
                  <span class="text-base text-gray-900">
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium" [class.bg-success-light]="caseData()!.socialAspect.isProvider" [class.text-success-dark]="caseData()!.socialAspect.isProvider" [class.bg-gray-100]="!caseData()!.socialAspect.isProvider" [class.text-gray-600]="!caseData()!.socialAspect.isProvider">
                      {{ caseData()!.socialAspect.isProvider ? 'نعم' : 'لا' }}
                    </span>
                  </span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">عدد الأفراد</span>
                  <span class="text-base text-gray-900 font-semibold">{{ caseData()!.socialAspect.numberOfDependents }}</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">عدد الزوجات</span>
                  <span class="text-base text-gray-900 font-semibold">{{ caseData()!.socialAspect.numberOfWives }}</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">عدد الأولاد</span>
                  <span class="text-base text-gray-900 font-semibold">{{ caseData()!.socialAspect.numberOfChildren }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Health Aspect -->
          <div class="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
            <div class="flex items-center gap-3 px-6 py-4 bg-gradient-to-l from-error-50 to-white border-b border-gray-200">
              <div class="w-10 h-10 bg-error-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900">الجانب الصحي</h3>
            </div>
            <div class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">لديه تأمين صحي</span>
                  <span class="text-base text-gray-900">
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium" [class.bg-success-light]="caseData()!.healthAspect.hasHealthInsurance" [class.text-success-dark]="caseData()!.healthAspect.hasHealthInsurance" [class.bg-gray-100]="!caseData()!.healthAspect.hasHealthInsurance" [class.text-gray-600]="!caseData()!.healthAspect.hasHealthInsurance">
                      {{ caseData()!.healthAspect.hasHealthInsurance ? 'نعم' : 'لا' }}
                    </span>
                  </span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">الزوجة حامل</span>
                  <span class="text-base text-gray-900">
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium" [class.bg-success-light]="caseData()!.healthAspect.isWifePregnant" [class.text-success-dark]="caseData()!.healthAspect.isWifePregnant" [class.bg-gray-100]="!caseData()!.healthAspect.isWifePregnant" [class.text-gray-600]="!caseData()!.healthAspect.isWifePregnant">
                      {{ caseData()!.healthAspect.isWifePregnant ? 'نعم' : 'لا' }}
                    </span>
                  </span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">تتردد على تنظيم الأسرة</span>
                  <span class="text-base text-gray-900">
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium" [class.bg-success-light]="caseData()!.healthAspect.visitsFamilyPlanning" [class.text-success-dark]="caseData()!.healthAspect.visitsFamilyPlanning" [class.bg-gray-100]="!caseData()!.healthAspect.visitsFamilyPlanning" [class.text-gray-600]="!caseData()!.healthAspect.visitsFamilyPlanning">
                      {{ caseData()!.healthAspect.visitsFamilyPlanning ? 'نعم' : 'لا' }}
                    </span>
                  </span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">لديه إدمان</span>
                  <span class="text-base text-gray-900">
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium" [class.bg-error-light]="caseData()!.healthAspect.hasDrugAddiction" [class.text-error-dark]="caseData()!.healthAspect.hasDrugAddiction" [class.bg-gray-100]="!caseData()!.healthAspect.hasDrugAddiction" [class.text-gray-600]="!caseData()!.healthAspect.hasDrugAddiction">
                      {{ caseData()!.healthAspect.hasDrugAddiction ? 'نعم' : 'لا' }}
                    </span>
                  </span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">يتلقى علاج الإدمان</span>
                  <span class="text-base text-gray-900">
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium" [class.bg-success-light]="caseData()!.healthAspect.receivesAddictionTreatment" [class.text-success-dark]="caseData()!.healthAspect.receivesAddictionTreatment" [class.bg-gray-100]="!caseData()!.healthAspect.receivesAddictionTreatment" [class.text-gray-600]="!caseData()!.healthAspect.receivesAddictionTreatment">
                      {{ caseData()!.healthAspect.receivesAddictionTreatment ? 'نعم' : 'لا' }}
                    </span>
                  </span>
                </div>
                @if (caseData()!.healthAspect.addictionTreatmentPlace) {
                  <div class="flex flex-col md:col-span-2">
                    <span class="text-sm font-medium text-gray-500 mb-1">مكان العلاج</span>
                    <span class="text-base text-gray-900">{{ caseData()!.healthAspect.addictionTreatmentPlace }}</span>
                  </div>
                }
              </div>
            </div>
          </div>

          <!-- Employment & Income -->
          <div class="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
            <div class="flex items-center gap-3 px-6 py-4 bg-gradient-to-l from-warning-50 to-white border-b border-gray-200">
              <div class="w-10 h-10 bg-warning-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900">العمل والدخل</h3>
            </div>
            <div class="p-6">
              <div class="mb-6 p-4 bg-gradient-to-l from-success-50 to-white rounded-lg border border-success-200">
                <div class="flex items-center justify-between">
                  <span class="text-sm font-medium text-gray-600">الدخل الشهري</span>
                  <span class="text-2xl font-bold text-success-dark">{{ caseData()!.employmentAndIncome.monthlyIncome }} ج.م</span>
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">لديه عمل</span>
                  <span class="text-base text-gray-900">
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium" [class.bg-success-light]="caseData()!.employmentAndIncome.isEmployed" [class.text-success-dark]="caseData()!.employmentAndIncome.isEmployed" [class.bg-gray-100]="!caseData()!.employmentAndIncome.isEmployed" [class.text-gray-600]="!caseData()!.employmentAndIncome.isEmployed">
                      {{ caseData()!.employmentAndIncome.isEmployed ? 'نعم' : 'لا' }}
                    </span>
                  </span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">نوع العمل</span>
                  <span class="text-base text-gray-900">{{ getWorkTypeLabel(caseData()!.employmentAndIncome.workType) || '—' }}</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">المسمى الوظيفي</span>
                  <span class="text-base text-gray-900">{{ caseData()!.employmentAndIncome.jobTitle || '—' }}</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">الحرفة</span>
                  <span class="text-base text-gray-900">{{ caseData()!.employmentAndIncome.craft || '—' }}</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">المعاش</span>
                  <span class="text-base text-gray-900 font-semibold">{{ caseData()!.employmentAndIncome.pension }} ج.م</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">النفقة</span>
                  <span class="text-base text-gray-900 font-semibold">{{ caseData()!.employmentAndIncome.alimony }} ج.م</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">الصدقات</span>
                  <span class="text-base text-gray-900 font-semibold">{{ caseData()!.employmentAndIncome.charity }} ج.م</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">مساعدات الأقارب</span>
                  <span class="text-base text-gray-900 font-semibold">{{ caseData()!.employmentAndIncome.relativesHelp }} ج.م</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">دخل آخر</span>
                  <span class="text-base text-gray-900 font-semibold">{{ caseData()!.employmentAndIncome.otherIncome }} ج.م</span>
                </div>
                @if (caseData()!.employmentAndIncome.otherIncomeDescription) {
                  <div class="flex flex-col md:col-span-2 lg:col-span-3">
                    <span class="text-sm font-medium text-gray-500 mb-1">وصف الدخل الآخر</span>
                    <span class="text-base text-gray-900">{{ caseData()!.employmentAndIncome.otherIncomeDescription }}</span>
                  </div>
                }
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">لديه مشروع خاص</span>
                  <span class="text-base text-gray-900">
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium" [class.bg-success-light]="caseData()!.employmentAndIncome.hasOwnProject" [class.text-success-dark]="caseData()!.employmentAndIncome.hasOwnProject" [class.bg-gray-100]="!caseData()!.employmentAndIncome.hasOwnProject" [class.text-gray-600]="!caseData()!.employmentAndIncome.hasOwnProject">
                      {{ caseData()!.employmentAndIncome.hasOwnProject ? 'نعم' : 'لا' }}
                    </span>
                  </span>
                </div>
                @if (caseData()!.employmentAndIncome.hasOwnProject) {
                  <div class="flex flex-col">
                    <span class="text-sm font-medium text-gray-500 mb-1">نوع المشروع</span>
                    <span class="text-base text-gray-900">{{ caseData()!.employmentAndIncome.projectType }}</span>
                  </div>
                  <div class="flex flex-col">
                    <span class="text-sm font-medium text-gray-500 mb-1">الجهة المانحة</span>
                    <span class="text-base text-gray-900">{{ caseData()!.employmentAndIncome.projectDonor }}</span>
                  </div>
                  <div class="flex flex-col">
                    <span class="text-sm font-medium text-gray-500 mb-1">رأس المال</span>
                    <span class="text-base text-gray-900 font-semibold">{{ caseData()!.employmentAndIncome.projectCapital }} ج.م</span>
                  </div>
                }
              </div>
            </div>
          </div>

          <!-- Expenses -->
          <div class="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
            <div class="flex items-center gap-3 px-6 py-4 bg-gradient-to-l from-error-50 to-white border-b border-gray-200">
              <div class="w-10 h-10 bg-error-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v2a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900">المصروفات</h3>
            </div>
            <div class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div class="p-4 bg-gradient-to-l from-error-50 to-white rounded-lg border border-error-200">
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium text-gray-600">إجمالي المصروفات</span>
                    <span class="text-2xl font-bold text-error-dark">{{ caseData()!.expenses.monthlyExpenses }} ج.م</span>
                  </div>
                </div>
                <div class="p-4 rounded-lg border" [class.bg-gradient-to-l]="isPositive(caseData()!.expenses.netIncome)" [class.from-success-50]="isPositive(caseData()!.expenses.netIncome)" [class.to-white]="isPositive(caseData()!.expenses.netIncome)" [class.border-success-200]="isPositive(caseData()!.expenses.netIncome)" [class.bg-gradient-to-l]="!isPositive(caseData()!.expenses.netIncome)" [class.from-error-50]="!isPositive(caseData()!.expenses.netIncome)" [class.to-white]="!isPositive(caseData()!.expenses.netIncome)" [class.border-error-200]="!isPositive(caseData()!.expenses.netIncome)">
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium text-gray-600">صافي الدخل</span>
                    <span class="text-2xl font-bold" [class.text-success-dark]="isPositive(caseData()!.expenses.netIncome)" [class.text-error-dark]="!isPositive(caseData()!.expenses.netIncome)">
                      {{ caseData()!.expenses.netIncome }} ج.م
                    </span>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">الإيجار</span>
                  <span class="text-base text-gray-900 font-semibold">{{ caseData()!.expenses.rent }} ج.م</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">مصروفات تعليم</span>
                  <span class="text-base text-gray-900 font-semibold">{{ caseData()!.expenses.educationExpenses }} ج.م</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">كهرباء</span>
                  <span class="text-base text-gray-900 font-semibold">{{ caseData()!.expenses.electricityBill }} ج.م</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">مياه</span>
                  <span class="text-base text-gray-900 font-semibold">{{ caseData()!.expenses.waterBill }} ج.م</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">غاز</span>
                  <span class="text-base text-gray-900 font-semibold">{{ caseData()!.expenses.gasBill }} ج.م</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">تليفون</span>
                  <span class="text-base text-gray-900 font-semibold">{{ caseData()!.expenses.phoneBill }} ج.م</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">دروس خصوصية</span>
                  <span class="text-base text-gray-900 font-semibold">{{ caseData()!.expenses.tutoring }} ج.م</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">جمعيات</span>
                  <span class="text-base text-gray-900 font-semibold">{{ caseData()!.expenses.associations }} ج.م</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">علاج شهري</span>
                  <span class="text-base text-gray-900 font-semibold">{{ caseData()!.expenses.monthlyTreatment }} ج.م</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">أقساط أجهزة</span>
                  <span class="text-base text-gray-900 font-semibold">{{ caseData()!.expenses.deviceInstallments }} ج.م</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">تدخين</span>
                  <span class="text-base text-gray-900 font-semibold">{{ caseData()!.expenses.smoking }} ج.م</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">مصروفات بيت</span>
                  <span class="text-base text-gray-900 font-semibold">{{ caseData()!.expenses.householdExpenses }} ج.م</span>
                </div>
                <div class="flex flex-col p-3 bg-error-50 rounded-lg border border-error-200">
                  <span class="text-sm font-medium text-error-dark mb-1">إجمالي الديون</span>
                  <span class="text-lg font-bold text-error-dark">{{ caseData()!.expenses.totalDebt }} ج.م</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">سبب الدين</span>
                  <span class="text-base text-gray-900">{{ caseData()!.expenses.debtReason || '—' }}</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">القسط الشهري</span>
                  <span class="text-base text-gray-900 font-semibold">{{ caseData()!.expenses.monthlyDebtPayment }} ج.م</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">صلة الدائن</span>
                  <span class="text-base text-gray-900">{{ caseData()!.expenses.creditorRelationship || '—' }}</span>
                </div>
                @if (caseData()!.expenses.otherExpenses) {
                  <div class="flex flex-col md:col-span-2 lg:col-span-3">
                    <span class="text-sm font-medium text-gray-500 mb-1">مصروفات أخرى</span>
                    <span class="text-base text-gray-900">{{ caseData()!.expenses.otherExpenses }}</span>
                  </div>
                }
              </div>
            </div>
          </div>

          <!-- Housing -->
          <div class="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
            <div class="flex items-center gap-3 px-6 py-4 bg-gradient-to-l from-primary-50 to-white border-b border-gray-200">
              <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900">السكن</h3>
            </div>
            <div class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">نوع السكن</span>
                  <span class="text-base text-gray-900">{{ getHousingTypeLabel(caseData()!.housing.housingType) }}</span>
                </div>
                @if (caseData()!.housing.ownershipName) {
                  <div class="flex flex-col">
                    <span class="text-sm font-medium text-gray-500 mb-1">اسم المالك</span>
                    <span class="text-base text-gray-900">{{ caseData()!.housing.ownershipName }}</span>
                  </div>
                }
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">نوع المنزل</span>
                  <span class="text-base text-gray-900">{{ getHouseTypeLabel(caseData()!.housing.houseType) }}</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">مساحة المنزل</span>
                  <span class="text-base text-gray-900 font-semibold">{{ caseData()!.housing.houseArea }} م²</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">عدد الطوابق</span>
                  <span class="text-base text-gray-900 font-semibold">{{ caseData()!.housing.numberOfFloors }}</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">عدد الغرف</span>
                  <span class="text-base text-gray-900 font-semibold">{{ caseData()!.housing.numberOfRooms }}</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">نوع السقف</span>
                  <span class="text-base text-gray-900">{{ caseData()!.housing.roofType || '—' }}</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">نوع الجدران</span>
                  <span class="text-base text-gray-900">{{ caseData()!.housing.wallsType || '—' }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Infrastructure -->
          <div class="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
            <div class="flex items-center gap-3 px-6 py-4 bg-gradient-to-l from-info-50 to-white border-b border-gray-200">
              <div class="w-10 h-10 bg-info-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900">المرافق</h3>
            </div>
            <div class="p-6">
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="flex flex-col items-center p-4 rounded-lg border" [class.bg-success-50]="caseData()!.infrastructure.hasSewage" [class.border-success-200]="caseData()!.infrastructure.hasSewage" [class.bg-gray-50]="!caseData()!.infrastructure.hasSewage" [class.border-gray-200]="!caseData()!.infrastructure.hasSewage">
                  <svg class="w-8 h-8 mb-2" [class.text-success]="caseData()!.infrastructure.hasSewage" [class.text-gray-400]="!caseData()!.infrastructure.hasSewage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  <span class="text-xs font-medium text-gray-700 mb-1">صرف صحي</span>
                  <span class="text-sm font-semibold" [class.text-success-dark]="caseData()!.infrastructure.hasSewage" [class.text-gray-500]="!caseData()!.infrastructure.hasSewage">
                    {{ caseData()!.infrastructure.hasSewage ? 'نعم' : 'لا' }}
                  </span>
                </div>
                <div class="flex flex-col items-center p-4 rounded-lg border" [class.bg-success-50]="caseData()!.infrastructure.hasWater" [class.border-success-200]="caseData()!.infrastructure.hasWater" [class.bg-gray-50]="!caseData()!.infrastructure.hasWater" [class.border-gray-200]="!caseData()!.infrastructure.hasWater">
                  <svg class="w-8 h-8 mb-2" [class.text-success]="caseData()!.infrastructure.hasWater" [class.text-gray-400]="!caseData()!.infrastructure.hasWater" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  <span class="text-xs font-medium text-gray-700 mb-1">مياه</span>
                  <span class="text-sm font-semibold" [class.text-success-dark]="caseData()!.infrastructure.hasWater" [class.text-gray-500]="!caseData()!.infrastructure.hasWater">
                    {{ caseData()!.infrastructure.hasWater ? 'نعم' : 'لا' }}
                  </span>
                </div>
                <div class="flex flex-col items-center p-4 rounded-lg border" [class.bg-success-50]="caseData()!.infrastructure.hasElectricity" [class.border-success-200]="caseData()!.infrastructure.hasElectricity" [class.bg-gray-50]="!caseData()!.infrastructure.hasElectricity" [class.border-gray-200]="!caseData()!.infrastructure.hasElectricity">
                  <svg class="w-8 h-8 mb-2" [class.text-success]="caseData()!.infrastructure.hasElectricity" [class.text-gray-400]="!caseData()!.infrastructure.hasElectricity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span class="text-xs font-medium text-gray-700 mb-1">كهرباء</span>
                  <span class="text-sm font-semibold" [class.text-success-dark]="caseData()!.infrastructure.hasElectricity" [class.text-gray-500]="!caseData()!.infrastructure.hasElectricity">
                    {{ caseData()!.infrastructure.hasElectricity ? 'نعم' : 'لا' }}
                  </span>
                </div>
                <div class="flex flex-col items-center p-4 rounded-lg border" [class.bg-success-50]="caseData()!.infrastructure.hasGas" [class.border-success-200]="caseData()!.infrastructure.hasGas" [class.bg-gray-50]="!caseData()!.infrastructure.hasGas" [class.border-gray-200]="!caseData()!.infrastructure.hasGas">
                  <svg class="w-8 h-8 mb-2" [class.text-success]="caseData()!.infrastructure.hasGas" [class.text-gray-400]="!caseData()!.infrastructure.hasGas" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                  </svg>
                  <span class="text-xs font-medium text-gray-700 mb-1">غاز</span>
                  <span class="text-sm font-semibold" [class.text-success-dark]="caseData()!.infrastructure.hasGas" [class.text-gray-500]="!caseData()!.infrastructure.hasGas">
                    {{ caseData()!.infrastructure.hasGas ? 'نعم' : 'لا' }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Properties & Skills -->
          <div class="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
            <div class="flex items-center gap-3 px-6 py-4 bg-gradient-to-l from-accent-50 to-white border-b border-gray-200">
              <div class="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900">الممتلكات والمهارات</h3>
            </div>
            <div class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">لديه ممتلكات</span>
                  <span class="text-base text-gray-900">
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium" [class.bg-success-light]="caseData()!.propertiesAndSkills.hasProperty" [class.text-success-dark]="caseData()!.propertiesAndSkills.hasProperty" [class.bg-gray-100]="!caseData()!.propertiesAndSkills.hasProperty" [class.text-gray-600]="!caseData()!.propertiesAndSkills.hasProperty">
                      {{ caseData()!.propertiesAndSkills.hasProperty ? 'نعم' : 'لا' }}
                    </span>
                  </span>
                </div>
                @if (caseData()!.propertiesAndSkills.propertyDescription) {
                  <div class="flex flex-col md:col-span-2">
                    <span class="text-sm font-medium text-gray-500 mb-1">وصف الممتلكات</span>
                    <span class="text-base text-gray-900">{{ caseData()!.propertiesAndSkills.propertyDescription }}</span>
                  </div>
                }
                @if (caseData()!.propertiesAndSkills.fatherProperty) {
                  <div class="flex flex-col md:col-span-2">
                    <span class="text-sm font-medium text-gray-500 mb-1">ممتلكات الأب</span>
                    <span class="text-base text-gray-900">{{ caseData()!.propertiesAndSkills.fatherProperty }}</span>
                  </div>
                }
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">لديه مهارات</span>
                  <span class="text-base text-gray-900">
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium" [class.bg-success-light]="caseData()!.propertiesAndSkills.hasSkills" [class.text-success-dark]="caseData()!.propertiesAndSkills.hasSkills" [class.bg-gray-100]="!caseData()!.propertiesAndSkills.hasSkills" [class.text-gray-600]="!caseData()!.propertiesAndSkills.hasSkills">
                      {{ caseData()!.propertiesAndSkills.hasSkills ? 'نعم' : 'لا' }}
                    </span>
                  </span>
                </div>
                @if (caseData()!.propertiesAndSkills.skillsDescription) {
                  <div class="flex flex-col md:col-span-2">
                    <span class="text-sm font-medium text-gray-500 mb-1">وصف المهارات</span>
                    <span class="text-base text-gray-900">{{ caseData()!.propertiesAndSkills.skillsDescription }}</span>
                  </div>
                }
              </div>
            </div>
          </div>

          <!-- Researcher Opinion -->
          <div class="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
            <div class="flex items-center gap-3 px-6 py-4 bg-gradient-to-l from-accent-50 to-white border-b border-gray-200">
              <div class="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900">رأي الباحث</h3>
            </div>
            <div class="p-6">
              <div class="prose max-w-none">
                <p class="text-base text-gray-900 leading-relaxed whitespace-pre-wrap">{{ caseData()!.researcherOpinion.researcherOpinion || 'لا يوجد رأي' }}</p>
              </div>
            </div>
          </div>

          <!-- Family Members -->
          @if (caseData()!.familyMembers.length > 0) {
            <div class="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
              <div class="flex items-center gap-3 px-6 py-4 bg-gradient-to-l from-primary-50 to-white border-b border-gray-200">
                <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-900">أفراد الأسرة ({{ caseData()!.familyMembers.length }})</h3>
              </div>
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th scope="col" class="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">الاسم</th>
                      <th scope="col" class="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">العمر</th>
                      <th scope="col" class="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">الصلة</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    @for (member of caseData()!.familyMembers; track member.id) {
                      <tr class="hover:bg-gray-50 transition-colors">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ member.name }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ member.age }} سنة</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ member.relationship }}</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          }

          <!-- Education Records -->
          @if (caseData()!.educationRecords.length > 0) {
            <div class="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
              <div class="flex items-center gap-3 px-6 py-4 bg-gradient-to-l from-info-50 to-white border-b border-gray-200">
                <div class="w-10 h-10 bg-info-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-900">سجلات التعليم ({{ caseData()!.educationRecords.length }})</h3>
              </div>
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th scope="col" class="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">الاسم</th>
                      <th scope="col" class="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">العمر</th>
                      <th scope="col" class="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">المرحلة</th>
                      <th scope="col" class="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">المصروفات</th>
                      <th scope="col" class="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">متسرب</th>
                      <th scope="col" class="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">سبب التسرب</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    @for (record of caseData()!.educationRecords; track record.id) {
                      <tr class="hover:bg-gray-50 transition-colors">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ record.name }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ record.age }} سنة</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ record.educationStage }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold">{{ record.educationExpenses }} ج.م</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm">
                          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" [class.bg-warning-light]="record.isDropout" [class.text-warning-dark]="record.isDropout" [class.bg-success-light]="!record.isDropout" [class.text-success-dark]="!record.isDropout">
                            {{ record.isDropout ? 'نعم' : 'لا' }}
                          </span>
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-800">{{ record.dropoutReason || '—' }}</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          }

          <!-- Health Records -->
          @if (caseData()!.healthRecords.length > 0) {
            <div class="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
              <div class="flex items-center gap-3 px-6 py-4 bg-gradient-to-l from-error-50 to-white border-b border-gray-200">
                <div class="w-10 h-10 bg-error-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-900">السجلات الصحية ({{ caseData()!.healthRecords.length }})</h3>
              </div>
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th scope="col" class="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">الصلة</th>
                      <th scope="col" class="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">الاسم</th>
                      <th scope="col" class="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">العمر</th>
                      <th scope="col" class="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">الشكوى</th>
                      <th scope="col" class="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">تكلفة العلاج</th>
                      <th scope="col" class="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">لديه روشتة</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    @for (record of caseData()!.healthRecords; track record.id) {
                      <tr class="hover:bg-gray-50 transition-colors">
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ record.relationship }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ record.name }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ record.age }} سنة</td>
                        <td class="px-6 py-4 text-sm text-gray-800">{{ record.complaint }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold">{{ record.monthlyTreatmentCost }} ج.م</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm">
                          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" [class.bg-success-light]="record.hasPrescription" [class.text-success-dark]="record.hasPrescription" [class.bg-gray-100]="!record.hasPrescription" [class.text-gray-600]="!record.hasPrescription">
                            {{ record.hasPrescription ? 'نعم' : 'لا' }}
                          </span>
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          }

          <!-- Family Needs -->
          @if (caseData()!.familyNeeds.length > 0) {
            <div class="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
              <div class="flex items-center gap-3 px-6 py-4 bg-gradient-to-l from-accent-50 to-white border-b border-gray-200">
                <div class="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-900">احتياجات الأسرة ({{ caseData()!.familyNeeds.length }})</h3>
              </div>
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th scope="col" class="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">نوع الاحتياج</th>
                      <th scope="col" class="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">الوصف</th>
                      <th scope="col" class="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">الأولوية</th>
                      <th scope="col" class="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">تم الوفاء</th>
                      <th scope="col" class="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">تاريخ الوفاء</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    @for (need of caseData()!.familyNeeds; track need.id) {
                      <tr class="hover:bg-gray-50 transition-colors">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ getNeedTypeLabel(need.needType) }}</td>
                        <td class="px-6 py-4 text-sm text-gray-800">{{ need.description }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm">
                          <span class="inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold" [class.bg-error-light]="need.priority >= 8" [class.text-error-dark]="need.priority >= 8" [class.bg-warning-light]="need.priority >= 5 && need.priority < 8" [class.text-warning-dark]="need.priority >= 5 && need.priority < 8" [class.bg-success-light]="need.priority < 5" [class.text-success-dark]="need.priority < 5">
                            {{ need.priority }}
                          </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm">
                          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" [class.bg-success-light]="need.isFulfilled" [class.text-success-dark]="need.isFulfilled" [class.bg-warning-light]="!need.isFulfilled" [class.text-warning-dark]="!need.isFulfilled">
                            {{ need.isFulfilled ? 'نعم' : 'لا' }}
                          </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ need.fulfilledDate || '—' }}</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `
})
export class CaseDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly caseService = inject(CaseService);

  readonly caseId = signal<string>('');
  readonly caseData = signal<CaseDetail | null>(null);
  readonly loading = signal(false);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.caseId.set(id);
      this.loadCase(id);
    }
  }

  loadCase(id: string): void {
    this.loading.set(true);
    this.caseService.getCase(id)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (data) => this.caseData.set(data),
        error: (error) => console.error('Error loading case:', error)
      });
  }

  getStatusClasses(status: string): string {
    const statusMap: { [key: string]: string } = {
      'draft': 'bg-gray-100 text-gray-600',
      'submitted': 'bg-info-light text-info-dark',
      'under_review': 'bg-warning-light text-warning-dark',
      'approved': 'bg-success-light text-success-dark',
      'rejected': 'bg-error-light text-error-dark'
    };
    return statusMap[status] || 'bg-gray-100 text-gray-600';
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'draft': 'مسودة', 'submitted': 'مقدم', 'under_review': 'قيد المراجعة',
      'approved': 'مقبول', 'rejected': 'مرفوض'
    };
    return labels[status] || status;
  }

  getGenderLabel(gender: string): string {
    return gender === 'male' ? 'ذكر' : 'أنثى';
  }

  getEducationLabel(education: string): string {
    const labels: { [key: string]: string } = {
      'illiterate': 'أمي', 'primary': 'ابتدائي', 'middle': 'إعدادي',
      'high': 'ثانوي', 'university': 'جامعي'
    };
    return labels[education] || education;
  }

  getMaritalStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'single': 'أعزب', 'married': 'متزوج', 'divorced': 'مطلق', 'widowed': 'أرمل'
    };
    return labels[status] || status;
  }

  getWorkTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      'government': 'حكومي', 'private': 'خاص', 'freelance': 'حر', 'unemployed': 'عاطل'
    };
    return labels[type] || type;
  }

  getHousingTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      'rent': 'إيجار', 'owned': 'ملك', 'family': 'عائلي'
    };
    return labels[type] || type;
  }

  getHouseTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      'apartment': 'شقة', 'house': 'منزل', 'private': 'خاص', 'villa': 'فيلا'
    };
    return labels[type] || type;
  }

  getNeedTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      'monthly_sponsorship': 'كفالة شهرية', 'health_treatment': 'علاج صحي',
      'education': 'تعليم', 'housing': 'سكن', 'other': 'أخرى'
    };
    return labels[type] || type;
  }

  isPositive(value: string): boolean {
    return parseFloat(value) >= 0;
  }
}

export { CaseDetailComponent as CaseDetail };
