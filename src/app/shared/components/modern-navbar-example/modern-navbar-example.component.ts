import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-modern-navbar-example',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Responsive Navigation Bar -->
    <nav class="bg-background-surface border-b border-border-light shadow-sm sticky top-0 z-50" dir="rtl">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo and Brand -->
          <div class="flex items-center">
            <div class="flex-shrink-0 flex items-center">
              <div class="w-10 h-10 rounded-lg bg-primary-500 flex items-center justify-center">
                <span class="text-white font-bold text-xl">س</span>
              </div>
              <span class="mr-3 text-xl font-bold text-text-primary">صاغري</span>
            </div>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:block">
            <div class="flex items-center space-x-reverse space-x-8">
              <a routerLink="/" class="text-text-primary hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-base">
                الرئيسية
              </a>
              <a routerLink="/cases" class="text-text-primary hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-base">
                الحالات
              </a>
              <a routerLink="/users" class="text-text-primary hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-base">
                المستخدمون
              </a>
              <a routerLink="/dashboard" class="text-text-primary hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-base">
                لوحة التحكم
              </a>
            </div>
          </div>

          <!-- Right Side Actions -->
          <div class="flex items-center gap-4">
            <!-- Notifications -->
            <button class="relative p-2 text-text-secondary hover:text-text-primary hover:bg-background-surface-hover rounded-md transition-colors duration-base">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span class="absolute top-1 left-1 w-2 h-2 bg-error rounded-full"></span>
            </button>

            <!-- User Menu -->
            <div class="relative">
              <button
                (click)="toggleUserMenu()"
                class="flex items-center gap-2 p-2 rounded-md hover:bg-background-surface-hover transition-colors duration-base"
              >
                <div class="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center">
                  <span class="text-white text-sm font-semibold">م</span>
                </div>
                <span class="hidden sm:block text-sm font-medium text-text-primary">محمد أحمد</span>
                <svg class="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <!-- Dropdown Menu -->
              @if (isUserMenuOpen()) {
                <div class="absolute left-0 mt-2 w-48 bg-background-surface rounded-md shadow-lg border border-border-light py-1 z-50">
                  <a href="#" class="block px-4 py-2 text-sm text-text-primary hover:bg-background-surface-hover transition-colors duration-base">
                    الملف الشخصي
                  </a>
                  <a href="#" class="block px-4 py-2 text-sm text-text-primary hover:bg-background-surface-hover transition-colors duration-base">
                    الإعدادات
                  </a>
                  <hr class="my-1 border-border-light" />
                  <a href="#" class="block px-4 py-2 text-sm text-error hover:bg-background-surface-hover transition-colors duration-base">
                    تسجيل الخروج
                  </a>
                </div>
              }
            </div>

            <!-- Mobile Menu Button -->
            <button
              (click)="toggleMobileMenu()"
              class="md:hidden p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-background-surface-hover transition-colors duration-base"
            >
              @if (!isMobileMenuOpen()) {
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              } @else {
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              }
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      @if (isMobileMenuOpen()) {
        <div class="md:hidden border-t border-border-light">
          <div class="px-2 pt-2 pb-3 space-y-1">
            <a routerLink="/" class="block px-3 py-2 rounded-md text-base font-medium text-text-primary hover:bg-background-surface-hover transition-colors duration-base">
              الرئيسية
            </a>
            <a routerLink="/cases" class="block px-3 py-2 rounded-md text-base font-medium text-text-primary hover:bg-background-surface-hover transition-colors duration-base">
              الحالات
            </a>
            <a routerLink="/users" class="block px-3 py-2 rounded-md text-base font-medium text-text-primary hover:bg-background-surface-hover transition-colors duration-base">
              المستخدمون
            </a>
            <a routerLink="/dashboard" class="block px-3 py-2 rounded-md text-base font-medium text-text-primary hover:bg-background-surface-hover transition-colors duration-base">
              لوحة التحكم
            </a>
          </div>
        </div>
      }
    </nav>

    <!-- Page Content Example -->
    <div class="min-h-screen bg-background">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="bg-background-surface rounded-lg shadow-md border border-border-light p-6">
          <h1 class="text-3xl font-bold text-text-primary mb-4">شريط التنقل الحديث</h1>
          <p class="text-text-secondary mb-4">
            هذا مثال على شريط تنقل متجاوب باستخدام Tailwind CSS. يتضمن:
          </p>
          <ul class="list-disc list-inside space-y-2 text-text-secondary">
            <li>تصميم متجاوب يعمل على جميع الأجهزة</li>
            <li>قائمة منسدلة للمستخدم</li>
            <li>قائمة جوال قابلة للطي</li>
            <li>أيقونات وإشعارات</li>
            <li>انتقالات سلسة وتأثيرات hover</li>
          </ul>
        </div>
      </div>
    </div>
  `,
})
export class ModernNavbarExampleComponent {
  isMobileMenuOpen = signal(false);
  isUserMenuOpen = signal(false);

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(value => !value);
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen.update(value => !value);
  }
}

