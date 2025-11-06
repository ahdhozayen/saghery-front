import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modern-card-example',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="mb-8 text-center">
          <h1 class="text-4xl font-bold text-text-primary mb-2">بطاقات حديثة</h1>
          <p class="text-lg text-text-secondary">أمثلة على البطاقات باستخدام Tailwind CSS</p>
        </div>

        <!-- Grid: 3 columns on large, 2 on tablet, 1 on mobile -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Card 1: Basic Card -->
          <div class="bg-background-surface rounded-lg shadow-md border border-border-light overflow-hidden hover:shadow-lg transition-shadow duration-base">
            <div class="p-6">
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <svg class="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <span class="px-3 py-1 text-xs font-semibold rounded-full bg-success-light text-success-dark">جديد</span>
              </div>
              <h3 class="text-xl font-bold text-text-primary mb-2">بطاقة أساسية</h3>
              <p class="text-text-secondary text-sm mb-4">
                هذا مثال على بطاقة بسيطة مع تصميم نظيف وحديث. يمكن استخدامها لعرض المحتوى بشكل منظم.
              </p>
              <button class="text-primary-500 hover:text-primary-600 font-medium text-sm transition-colors duration-base">
                اقرأ المزيد →
              </button>
            </div>
          </div>

          <!-- Card 2: Card with Image -->
          <div class="bg-background-surface rounded-lg shadow-md border border-border-light overflow-hidden hover:shadow-lg transition-all duration-base transform hover:-translate-y-1">
            <div class="h-48 bg-gradient-to-br from-primary-400 to-primary-600"></div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-text-primary mb-2">بطاقة مع صورة</h3>
              <p class="text-text-secondary text-sm mb-4">
                بطاقة تحتوي على صورة أو تدرج لوني في الأعلى. مثالية لعرض المنتجات أو الخدمات.
              </p>
              <div class="flex items-center justify-between">
                <span class="text-text-secondary text-xs">15 يناير 2024</span>
                <button class="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors duration-base text-sm font-medium">
                  تفاصيل
                </button>
              </div>
            </div>
          </div>

          <!-- Card 3: Stats Card -->
          <div class="bg-background-surface rounded-lg shadow-md border border-border-light overflow-hidden hover:shadow-lg transition-shadow duration-base">
            <div class="p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-text-primary">الإحصائيات</h3>
                <svg class="w-6 h-6 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-text-secondary text-sm">المستخدمون النشطون</span>
                  <span class="text-2xl font-bold text-text-primary">1,234</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-text-secondary text-sm">الطلبات</span>
                  <span class="text-2xl font-bold text-text-primary">567</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-text-secondary text-sm">الإيرادات</span>
                  <span class="text-2xl font-bold text-success">$12,345</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Card 4: Feature Card -->
          <div class="bg-background-surface rounded-lg shadow-md border border-border-light overflow-hidden hover:shadow-lg transition-all duration-base">
            <div class="p-6">
              <div class="w-16 h-16 rounded-lg bg-accent-100 flex items-center justify-center mb-4">
                <svg class="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-text-primary mb-2">ميزة سريعة</h3>
              <p class="text-text-secondary text-sm mb-4">
                بطاقة تعرض ميزة معينة مع أيقونة كبيرة. مناسبة لعرض الخدمات أو الميزات.
              </p>
              <ul class="space-y-2 text-sm text-text-secondary">
                <li class="flex items-center">
                  <svg class="w-4 h-4 text-success mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  ميزة 1
                </li>
                <li class="flex items-center">
                  <svg class="w-4 h-4 text-success mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  ميزة 2
                </li>
                <li class="flex items-center">
                  <svg class="w-4 h-4 text-success mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  ميزة 3
                </li>
              </ul>
            </div>
          </div>

          <!-- Card 5: Alert Card -->
          <div class="bg-warning-light rounded-lg shadow-md border border-warning overflow-hidden">
            <div class="p-6">
              <div class="flex items-start">
                <svg class="w-6 h-6 text-warning-dark mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                <div>
                  <h3 class="text-lg font-semibold text-warning-dark mb-1">تنبيه</h3>
                  <p class="text-warning-dark text-sm">
                    هذه بطاقة تنبيه. يمكن استخدامها لعرض رسائل مهمة أو تحذيرات للمستخدمين.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Card 6: Success Card -->
          <div class="bg-success-light rounded-lg shadow-md border border-success overflow-hidden">
            <div class="p-6">
              <div class="flex items-start">
                <svg class="w-6 h-6 text-success-dark mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <div>
                  <h3 class="text-lg font-semibold text-success-dark mb-1">نجح!</h3>
                  <p class="text-success-dark text-sm">
                    تمت العملية بنجاح. هذه بطاقة نجاح يمكن استخدامها لتأكيد الإجراءات المكتملة.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ModernCardExampleComponent {}

