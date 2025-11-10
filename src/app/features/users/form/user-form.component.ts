import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { UserService, CreateUserPayload, UpdateUserPayload } from '../../../core/services/user.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-user-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    RouterLink
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-6 animate-fadeIn" dir="rtl">
      <!-- Page Header -->
      <div class="mb-8 pb-6 border-b-2 border-gray-200">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">{{ isEditMode() ? 'تعديل المستخدم' : 'مستخدم جديد' }}</h1>
        <p class="text-lg text-gray-600">{{ isEditMode() ? 'تحديث بيانات المستخدم' : 'إضافة مستخدم جديد إلى النظام' }}</p>
      </div>

      <!-- Form Card -->
      <div class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-md">
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <!-- Form Header -->
          <div class="flex items-center gap-3 px-6 py-4 bg-gradient-to-l from-primary-50 to-white border-b border-gray-200">
            <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900">بيانات المستخدم</h3>
          </div>

          <!-- Form Fields -->
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              <!-- Full Name (Full Width) -->
              <div class="space-y-1.5 md:col-span-2 lg:col-span-3">
                <label class="block text-sm font-medium text-gray-700">
                  الاسم الكامل <span class="text-error">*</span>
                </label>
                <div class="relative">
                  <div class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    formControlName="full_name"
                    placeholder="أدخل الاسم الكامل"
                    class="block w-full pr-10 pl-3 py-2 text-sm border rounded-lg transition-all duration-200
                           focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                           hover:border-gray-400"
                    [class.border-error]="form.controls.full_name.invalid && form.controls.full_name.touched"
                    [class.border-success]="form.controls.full_name.valid && form.controls.full_name.touched"
                    [class.border-gray-300]="!form.controls.full_name.touched"
                  />
                </div>
                @if (form.controls.full_name.hasError('required') && form.controls.full_name.touched) {
                  <p class="text-xs text-error flex items-center gap-1 animate-slideInRTL">
                    <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                    الاسم الكامل مطلوب
                  </p>
                }
                @if (form.controls.full_name.hasError('serverError')) {
                  <p class="text-xs text-error flex items-center gap-1 animate-slideInRTL">
                    <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                    {{ form.controls.full_name.getError('serverError') }}
                  </p>
                }
              </div>

              <!-- Username (Full Width) -->
              <div class="space-y-1.5 md:col-span-2 lg:col-span-3">
                <label class="block text-sm font-medium text-gray-700">
                  اسم المستخدم <span class="text-error">*</span>
                </label>
                <div class="relative">
                  <div class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    formControlName="username"
                    placeholder="أدخل اسم المستخدم"
                    class="block w-full pr-10 pl-3 py-2 text-sm border rounded-lg transition-all duration-200
                           focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                           hover:border-gray-400"
                    [class.border-error]="form.controls.username.invalid && form.controls.username.touched"
                    [class.border-success]="form.controls.username.valid && form.controls.username.touched"
                    [class.border-gray-300]="!form.controls.username.touched"
                  />
                </div>
                @if (form.controls.username.hasError('required') && form.controls.username.touched) {
                  <p class="text-xs text-error flex items-center gap-1 animate-slideInRTL">
                    <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                    اسم المستخدم مطلوب
                  </p>
                }
                @if (form.controls.username.hasError('serverError')) {
                  <p class="text-xs text-error flex items-center gap-1 animate-slideInRTL">
                    <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                    {{ form.controls.username.getError('serverError') }}
                  </p>
                }
              </div>

              <!-- Email (Full Width) -->
              <div class="space-y-1.5 md:col-span-2 lg:col-span-3">
                <label class="block text-sm font-medium text-gray-700">
                  البريد الإلكتروني
                </label>
                <div class="relative">
                  <div class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    formControlName="email"
                    placeholder="example@domain.com"
                    class="block w-full pr-10 pl-3 py-2 text-sm border rounded-lg transition-all duration-200
                           focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                           hover:border-gray-400"
                    [class.border-error]="form.controls.email.invalid && form.controls.email.touched"
                    [class.border-success]="form.controls.email.valid && form.controls.email.touched"
                    [class.border-gray-300]="!form.controls.email.touched"
                  />
                </div>
                @if (form.controls.email.hasError('email') && form.controls.email.touched) {
                  <p class="text-xs text-error flex items-center gap-1 animate-slideInRTL">
                    <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                    البريد الإلكتروني غير صحيح
                  </p>
                }
                @if (form.controls.email.hasError('serverError')) {
                  <p class="text-xs text-error flex items-center gap-1 animate-slideInRTL">
                    <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                    {{ form.controls.email.getError('serverError') }}
                  </p>
                }
              </div>

              <!-- Mobile -->
              <div class="space-y-1.5">
                <label class="block text-sm font-medium text-gray-700">
                  رقم الموبايل
                </label>
                <div class="relative">
                  <div class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <input
                    type="tel"
                    formControlName="mobile"
                    placeholder="01234567890"
                    class="block w-full pr-10 pl-3 py-2 text-sm border rounded-lg transition-all duration-200
                           focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                           hover:border-gray-400"
                    [class.border-error]="form.controls.mobile.invalid && form.controls.mobile.touched"
                    [class.border-success]="form.controls.mobile.valid && form.controls.mobile.touched"
                    [class.border-gray-300]="!form.controls.mobile.touched"
                  />
                </div>
                @if (form.controls.mobile.hasError('pattern') && form.controls.mobile.touched) {
                  <p class="text-xs text-error flex items-center gap-1 animate-slideInRTL">
                    <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                    رقم الموبايل غير صحيح (يجب أن يبدأ بـ 01 ويتكون من 11 رقم)
                  </p>
                }
                @if (form.controls.mobile.hasError('serverError')) {
                  <p class="text-xs text-error flex items-center gap-1 animate-slideInRTL">
                    <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                    {{ form.controls.mobile.getError('serverError') }}
                  </p>
                }
              </div>

              <!-- Role -->
              <div class="space-y-1.5">
                <label class="block text-sm font-medium text-gray-700">
                  الدور <span class="text-error">*</span>
                </label>
                <div class="relative">
                  <div class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <select
                    formControlName="role"
                    class="block w-full pr-10 pl-3 py-2 text-sm border rounded-lg transition-all duration-200
                           focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                           hover:border-gray-400 cursor-pointer appearance-none bg-white"
                    [class.border-error]="form.controls.role.invalid && form.controls.role.touched"
                    [class.border-success]="form.controls.role.valid && form.controls.role.touched"
                    [class.border-gray-300]="!form.controls.role.touched"
                  >
                    <option value="researcher">باحث</option>
                    <option value="staff">موظف</option>
                    <option value="help_desk">مكتب المساعدة</option>
                    <option value="admin">مسؤول</option>
                  </select>
                  <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                @if (form.controls.role.hasError('required') && form.controls.role.touched) {
                  <p class="text-xs text-error flex items-center gap-1 animate-slideInRTL">
                    <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                    الدور مطلوب
                  </p>
                }
                @if (form.controls.role.hasError('serverError')) {
                  <p class="text-xs text-error flex items-center gap-1 animate-slideInRTL">
                    <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                    {{ form.controls.role.getError('serverError') }}
                  </p>
                }
              </div>

              <!-- Password -->
              <div class="space-y-1.5">
                <label class="block text-sm font-medium text-gray-700">
                  كلمة المرور{{ isEditMode() ? ' (اختياري)' : '' }} <span class="text-error" [class.hidden]="isEditMode()">*</span>
                </label>
                <div class="relative">
                  <div class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    [type]="hidePassword() ? 'password' : 'text'"
                    formControlName="password"
                    [placeholder]="isEditMode() ? 'اتركه فارغًا للإبقاء على كلمة المرور الحالية' : 'أدخل كلمة المرور'"
                    class="block w-full pr-10 pl-10 py-2 text-sm border rounded-lg transition-all duration-200
                           focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                           hover:border-gray-400"
                    [class.border-error]="form.controls.password.invalid && form.controls.password.touched"
                    [class.border-success]="form.controls.password.valid && form.controls.password.touched"
                    [class.border-gray-300]="!form.controls.password.touched"
                  />
                  <button
                    type="button"
                    (click)="hidePassword.set(!hidePassword())"
                    class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    @if (hidePassword()) {
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.29 3.29m0 0L3 12.879M6.29 6.29L12.879 3M12 12l-3-3m6 0l-3 3m0 0l3 3m-3-3l3-3" />
                      </svg>
                    } @else {
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    }
                  </button>
                </div>
                @if (form.controls.password.hasError('required') && form.controls.password.touched && !isEditMode()) {
                  <p class="text-xs text-error flex items-center gap-1 animate-slideInRTL">
                    <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                    كلمة المرور مطلوبة
                  </p>
                }
                @if (form.controls.password.hasError('minlength') && form.controls.password.touched) {
                  <p class="text-xs text-error flex items-center gap-1 animate-slideInRTL">
                    <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                    كلمة المرور يجب أن تكون 8 أحرف على الأقل
                  </p>
                }
                @if (form.controls.password.hasError('serverError')) {
                  <p class="text-xs text-error flex items-center gap-1 animate-slideInRTL">
                    <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                    {{ form.controls.password.getError('serverError') }}
                  </p>
                }
              </div>

              <!-- Confirm Password -->
              <div class="space-y-1.5">
                <label class="block text-sm font-medium text-gray-700">
                  تأكيد كلمة المرور{{ isEditMode() ? ' (اختياري)' : '' }} <span class="text-error" [class.hidden]="isEditMode()">*</span>
                </label>
                <div class="relative">
                  <div class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    [type]="hideConfirmPassword() ? 'password' : 'text'"
                    formControlName="confirmPassword"
                    [placeholder]="isEditMode() ? 'اتركه فارغًا إذا لم تقم بتغيير كلمة المرور' : 'أعد إدخال كلمة المرور'"
                    class="block w-full pr-10 pl-10 py-2 text-sm border rounded-lg transition-all duration-200
                           focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                           hover:border-gray-400"
                    [class.border-error]="(form.controls.confirmPassword.invalid || form.hasError('passwordMismatch')) && form.controls.confirmPassword.touched"
                    [class.border-success]="form.controls.confirmPassword.valid && !form.hasError('passwordMismatch') && form.controls.confirmPassword.touched"
                    [class.border-gray-300]="!form.controls.confirmPassword.touched"
                  />
                  <button
                    type="button"
                    (click)="hideConfirmPassword.set(!hideConfirmPassword())"
                    class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    @if (hideConfirmPassword()) {
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.29 3.29m0 0L3 12.879M6.29 6.29L12.879 3M12 12l-3-3m6 0l-3 3m0 0l3 3m-3-3l3-3" />
                      </svg>
                    } @else {
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    }
                  </button>
                </div>
                @if (form.controls.confirmPassword.hasError('required') && form.controls.confirmPassword.touched && !isEditMode()) {
                  <p class="text-xs text-error flex items-center gap-1 animate-slideInRTL">
                    <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                    تأكيد كلمة المرور مطلوب
                  </p>
                }
                @if (form.hasError('passwordMismatch') && form.controls.confirmPassword.touched) {
                  <p class="text-xs text-error flex items-center gap-1 animate-slideInRTL">
                    <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                    كلمة المرور غير متطابقة
                  </p>
                }
              </div>

              <!-- Active Status Checkbox (Full Width) -->
              <div class="space-y-1.5 md:col-span-2 lg:col-span-3">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  حالة الحساب
                </label>
                <div class="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <input
                    type="checkbox"
                    formControlName="is_active"
                    class="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
                  />
                  <div class="flex-1">
                    <label class="text-sm font-medium text-gray-900 cursor-pointer block mb-1">
                      حساب نشط
                    </label>
                    <p class="text-xs text-gray-500">
                      إذا كان محدداً، يمكن للمستخدم تسجيل الدخول إلى النظام
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex flex-col sm:flex-row gap-4 justify-end px-6 py-4 border-t border-gray-200 bg-gray-50">
            <button
              type="button"
              [routerLink]="'/users'"
              [disabled]="loading()"
              class="px-6 py-2.5 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              إلغاء
            </button>
            <button
              type="submit"
              [disabled]="form.invalid || loading()"
              class="px-6 py-2.5 rounded-md bg-primary-500 text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-sm hover:shadow-md flex items-center justify-center gap-2"
            >
              @if (loading()) {
                <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{{ isEditMode() ? 'جارٍ التحديث...' : 'جارٍ الحفظ...' }}</span>
              } @else {
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>{{ isEditMode() ? 'تحديث المستخدم' : 'حفظ المستخدم' }}</span>
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class UserFormComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly snackBar = inject(MatSnackBar);

  readonly loading = signal(false);
  readonly hidePassword = signal(true);
  readonly hideConfirmPassword = signal(true);
  readonly isEditMode = signal(false);
  readonly userId = signal<string | null>(null);

  readonly form = new FormGroup({
    full_name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    username: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.email] // Email is optional, but if provided must be valid
    }),
    mobile: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/)]
    }),
    role: new FormControl<string>('researcher', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)]
    }),
    confirmPassword: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    is_active: new FormControl<boolean>(true, {
      nonNullable: true
    })
  }, { validators: this.passwordMatchValidator });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.userId.set(id);
      this.loadUserData(id);
      // Make password fields optional in edit mode
      this.form.controls.password.clearValidators();
      this.form.controls.password.addValidators([Validators.minLength(8)]);
      this.form.controls.confirmPassword.clearValidators();
      this.form.controls.password.updateValueAndValidity();
      this.form.controls.confirmPassword.updateValueAndValidity();
    }
  }

  loadUserData(id: string): void {
    this.loading.set(true);
    this.userService.getUser(id)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (user) => {
          this.form.patchValue({
            full_name: user.fullName,
            username: user.username || '',
            email: user.email || '',
            mobile: user.mobile || '',
            role: user.role,
            is_active: user.active ?? true
          });
        },
        error: (error) => {
          const message = error?.error?.message || 'حدث خطأ أثناء تحميل بيانات المستخدم';
          this.snackBar.open(message, 'إغلاق', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
          this.router.navigate(['/users']);
        }
      });
  }

  passwordMatchValidator(control: any) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const { confirmPassword, ...formData } = this.form.getRawValue();

    // Remove password fields if empty in edit mode
    let payload: any = this.isEditMode() && !formData.password
      ? { ...formData, password: undefined }
      : formData;
    
    // Convert empty email string to undefined (optional field)
    if (payload.email === '') {
      payload.email = undefined;
    }

    const request$ = this.isEditMode() && this.userId()
      ? this.userService.updateUser(this.userId()!, payload as UpdateUserPayload)
      : this.userService.createUser(payload as CreateUserPayload);

    request$
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          if (response.success) {
            const message = this.isEditMode()
              ? 'تم تحديث المستخدم بنجاح'
              : 'تم إنشاء المستخدم بنجاح';
            this.snackBar.open(message, 'إغلاق', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['success-snackbar']
            });
            this.router.navigate(['/users']);
          } else {
            // Handle field-level errors
            const hasFieldErrors = response.errors && typeof response.errors === 'object';
            if (hasFieldErrors) {
              this.handleFieldErrors(response.errors);
            }

            // Show general error message only if there are no field-specific errors
            if (!hasFieldErrors || response.message) {
              const message = response.message || `حدث خطأ أثناء ${this.isEditMode() ? 'تحديث' : 'إنشاء'} المستخدم. يرجى التحقق من البيانات المدخلة.`;
              this.snackBar.open(message, 'إغلاق', {
                duration: 5000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
                panelClass: ['error-snackbar']
              });
            }
          }
        },
        error: (error) => {
          // Handle field-level errors from error response
          const hasFieldErrors = error?.error?.errors && typeof error.error.errors === 'object';
          if (hasFieldErrors) {
            this.handleFieldErrors(error.error.errors);
          }

          // Show general error message only if there are no field-specific errors
          if (!hasFieldErrors || error?.error?.message) {
            const message = error?.error?.message || `حدث خطأ أثناء ${this.isEditMode() ? 'تحديث' : 'إنشاء'} المستخدم. يرجى التحقق من البيانات المدخلة.`;
            this.snackBar.open(message, 'إغلاق', {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['error-snackbar']
            });
          }
        }
      });
  }

  private handleFieldErrors(errors: any): void {
    // Map of backend field names to form control names
    const fieldMapping: { [key: string]: string } = {
      'email': 'email',
      'full_name': 'full_name',
      'mobile': 'mobile',
      'password': 'password',
      'role': 'role'
    };

    // Clear previous server errors
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      if (control) {
        const currentErrors = control.errors;
        if (currentErrors && currentErrors['serverError']) {
          delete currentErrors['serverError'];
          control.setErrors(Object.keys(currentErrors).length ? currentErrors : null);
        }
      }
    });

    // Set new server errors
    Object.keys(errors).forEach(fieldKey => {
      const formControlName = fieldMapping[fieldKey] || fieldKey;
      const control = this.form.get(formControlName);

      if (control && Array.isArray(errors[fieldKey]) && errors[fieldKey].length > 0) {
        const errorMessage = errors[fieldKey][0]; // Get first error message
        control.setErrors({
          ...control.errors,
          serverError: errorMessage
        });
        control.markAsTouched();
      }
    });
  }
}

export { UserFormComponent as UserForm };
