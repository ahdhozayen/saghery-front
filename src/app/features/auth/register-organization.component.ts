import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OrganizationService } from '../../core/services/organization.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-register-organization',
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule, MatProgressSpinnerModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="auth-wrap" dir="rtl">
      <div class="auth-card">
        <!-- Logo in top-left -->
        <div class="logo-container">
          <div class="logo-box">
            <svg class="logo-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
        </div>

        <!-- Header -->
        <header class="auth-header">
          <h1 class="title">إنشاء منظمة جديدة</h1>
          <p class="subtitle">قم بإنشاء منظمتك وحساب المدير</p>
        </header>

        <!-- Form -->
        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form">
          <!-- Organization Section -->
          <div class="section-divider">
            <h3 class="section-title">معلومات المنظمة</h3>
          </div>

          <!-- Organization Name -->
          <div class="field-group">
            <label class="field-label">
              <span class="required-asterisk">*</span> اسم المنظمة
            </label>
            <input
              type="text"
              formControlName="organization_name"
              placeholder="أدخل اسم المنظمة"
              class="input-field"
              [class.input-error]="form.controls.organization_name.touched && form.controls.organization_name.invalid"
            />
            @if (form.controls.organization_name.touched && form.controls.organization_name.hasError('required')) {
              <p class="error-message">اسم المنظمة مطلوب</p>
            }
            @if (getFieldError('organization_name')) {
              <p class="error-message">{{ getFieldError('organization_name') }}</p>
            }
          </div>

          <!-- Organization Email -->
          <div class="field-group">
            <label class="field-label">البريد الإلكتروني للمنظمة</label>
            <input
              type="email"
              formControlName="organization_email"
              placeholder="org@example.com"
              class="input-field"
              [class.input-error]="form.controls.organization_email.touched && form.controls.organization_email.invalid"
            />
            @if (form.controls.organization_email.touched && form.controls.organization_email.hasError('email')) {
              <p class="error-message">البريد الإلكتروني غير صالح</p>
            }
            @if (getFieldError('organization_email')) {
              <p class="error-message">{{ getFieldError('organization_email') }}</p>
            }
          </div>

          <!-- Registration Number -->
          <div class="field-group">
            <label class="field-label">رقم التسجيل</label>
            <input
              type="text"
              formControlName="registration_number"
              placeholder="رقم التسجيل الرسمي"
              class="input-field"
              [class.input-error]="form.controls.registration_number.touched && form.controls.registration_number.invalid"
            />
            @if (getFieldError('registration_number')) {
              <p class="error-message">{{ getFieldError('registration_number') }}</p>
            }
          </div>

          <!-- Organization Phone -->
          <div class="field-group">
            <label class="field-label">رقم الهاتف</label>
            <input
              type="tel"
              formControlName="organization_phone"
              placeholder="01234567890"
              class="input-field"
            />
          </div>

          <!-- Organization Address -->
          <div class="field-group">
            <label class="field-label">العنوان</label>
            <textarea
              formControlName="organization_address"
              placeholder="أدخل عنوان المنظمة"
              class="input-field textarea-field"
              rows="3"
            ></textarea>
          </div>

          <!-- Admin User Section -->
          <div class="section-divider">
            <h3 class="section-title">معلومات المدير</h3>
          </div>

          <!-- Username -->
          <div class="field-group">
            <label class="field-label">
              <span class="required-asterisk">*</span> اسم المستخدم
            </label>
            <input
              type="text"
              formControlName="username"
              placeholder="أدخل اسم المستخدم"
              class="input-field"
              [class.input-error]="form.controls.username.touched && form.controls.username.invalid"
            />
            @if (form.controls.username.touched && form.controls.username.hasError('required')) {
              <p class="error-message">اسم المستخدم مطلوب</p>
            }
            @if (getFieldError('username')) {
              <p class="error-message">{{ getFieldError('username') }}</p>
            }
          </div>

          <!-- Full Name -->
          <div class="field-group">
            <label class="field-label">
              <span class="required-asterisk">*</span> الاسم الكامل
            </label>
            <input
              type="text"
              formControlName="full_name"
              placeholder="أدخل الاسم الكامل"
              class="input-field"
              [class.input-error]="form.controls.full_name.touched && form.controls.full_name.invalid"
            />
            @if (form.controls.full_name.touched && form.controls.full_name.hasError('required')) {
              <p class="error-message">الاسم الكامل مطلوب</p>
            }
          </div>

          <!-- Email -->
          <div class="field-group">
            <label class="field-label">البريد الإلكتروني</label>
            <input
              type="email"
              formControlName="email"
              placeholder="user@example.com"
              class="input-field"
              [class.input-error]="form.controls.email.touched && form.controls.email.invalid"
            />
            @if (form.controls.email.touched && form.controls.email.hasError('email')) {
              <p class="error-message">البريد الإلكتروني غير صالح</p>
            }
            @if (getFieldError('email')) {
              <p class="error-message">{{ getFieldError('email') }}</p>
            }
          </div>

          <!-- Mobile -->
          <div class="field-group">
            <label class="field-label">رقم الموبايل</label>
            <input
              type="tel"
              formControlName="mobile"
              placeholder="01234567890"
              class="input-field"
              [class.input-error]="form.controls.mobile.touched && form.controls.mobile.invalid"
            />
            @if (getFieldError('mobile')) {
              <p class="error-message">{{ getFieldError('mobile') }}</p>
            }
          </div>

          <!-- Password -->
          <div class="field-group">
            <label class="field-label">
              <span class="required-asterisk">*</span> كلمة المرور
            </label>
            <div class="input-wrapper">
              <input
                [type]="passwordVisible() ? 'text' : 'password'"
                formControlName="password"
                placeholder="........"
                class="input-field"
                [class.input-error]="form.controls.password.touched && form.controls.password.invalid"
              />
              <button
                type="button"
                (click)="togglePasswordVisibility()"
                class="password-toggle"
              >
                @if (passwordVisible()) {
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
            @if (form.controls.password.touched && form.controls.password.hasError('required')) {
              <p class="error-message">كلمة المرور مطلوبة</p>
            }
            @if (form.controls.password.touched && form.controls.password.hasError('minlength')) {
              <p class="error-message">كلمة المرور يجب أن تكون 8 أحرف على الأقل</p>
            }
          </div>

          <!-- Confirm Password -->
          <div class="field-group">
            <label class="field-label">
              <span class="required-asterisk">*</span> تأكيد كلمة المرور
            </label>
            <div class="input-wrapper">
              <input
                [type]="confirmPasswordVisible() ? 'text' : 'password'"
                formControlName="confirm_password"
                placeholder="........"
                class="input-field"
                [class.input-error]="form.controls.confirm_password.touched && (form.controls.confirm_password.invalid || form.hasError('passwordMismatch'))"
              />
              <button
                type="button"
                (click)="toggleConfirmPasswordVisibility()"
                class="password-toggle"
              >
                @if (confirmPasswordVisible()) {
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
            @if (form.controls.confirm_password.touched && form.controls.confirm_password.hasError('required')) {
              <p class="error-message">تأكيد كلمة المرور مطلوب</p>
            }
            @if (form.hasError('passwordMismatch') && form.controls.confirm_password.touched) {
              <p class="error-message">كلمة المرور غير متطابقة</p>
            }
            @if (getFieldError('confirm_password')) {
              <p class="error-message">{{ getFieldError('confirm_password') }}</p>
            }
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="submit-button"
            [disabled]="form.invalid || loading()"
          >
            @if (loading()) {
              <mat-spinner diameter="20" class="spinner"></mat-spinner>
              <span>جاري الإنشاء...</span>
            } @else {
              <span>إنشاء المنظمة</span>
            }
          </button>

          <!-- Back to Login -->
          <div class="back-to-login">
            <a [routerLink]="'/login'" class="back-link">العودة إلى تسجيل الدخول</a>
          </div>
        </form>
      </div>
    </section>
  `,
  styles: [`
    .auth-wrap {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      background-color: #f5f1eb;
    }

    .auth-card {
      position: relative;
      width: 100%;
      max-width: 600px;
      background: white;
      border-radius: 0.75rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      padding: 2.5rem;
      max-height: 90vh;
      overflow-y: auto;
    }

    .logo-container {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
    }

    .logo-box {
      width: 40px;
      height: 40px;
      background-color: #60a5fa;
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    }

    .logo-icon {
      width: 24px;
      height: 24px;
      color: white;
    }

    .auth-header {
      text-align: center;
      margin-bottom: 2rem;
      margin-top: 0.5rem;
    }

    .title {
      font-size: 2rem;
      font-weight: 700;
      color: #1f2937;
      margin: 0 0 0.5rem 0;
    }

    .subtitle {
      font-size: 1rem;
      color: #4b5563;
      margin: 0;
      font-weight: 400;
    }

    .form {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .section-divider {
      margin: 1.5rem 0 1rem 0;
      padding-top: 1.5rem;
      border-top: 2px solid #e5e7eb;
    }

    .section-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #374151;
      margin: 0;
    }

    .field-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .field-label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
      text-align: right;
    }

    .required-asterisk {
      color: #ef4444;
      margin-left: 0.25rem;
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .input-field {
      width: 100%;
      padding: 0.75rem;
      font-size: 0.875rem;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      background-color: white;
      color: #1f2937;
      text-align: right;
      transition: all 0.2s;
    }

    .textarea-field {
      resize: vertical;
      min-height: 80px;
    }

    .input-field::placeholder {
      color: #9ca3af;
      text-align: right;
    }

    .input-field:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .input-field.input-error {
      border-color: #ef4444;
    }

    .password-toggle {
      position: absolute;
      left: 0.75rem;
      background: none;
      border: none;
      color: #6b7280;
      cursor: pointer;
      padding: 0.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.2s;
    }

    .password-toggle:hover {
      color: #374151;
    }

    .error-message {
      font-size: 0.75rem;
      color: #ef4444;
      margin: 0;
      text-align: right;
    }

    .submit-button {
      width: 100%;
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      font-weight: 500;
      color: white;
      background-color: #3b82f6;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all 0.2s;
      margin-top: 1rem;
    }

    .submit-button:hover:not(:disabled) {
      background-color: #2563eb;
    }

    .submit-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .spinner {
      display: inline-block;
    }

    .back-to-login {
      text-align: center;
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid #e5e7eb;
    }

    .back-link {
      color: #3b82f6;
      text-decoration: none;
      font-size: 0.875rem;
      transition: color 0.2s;
    }

    .back-link:hover {
      color: #2563eb;
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      .auth-wrap {
        padding: 1rem;
      }

      .auth-card {
        padding: 1.5rem;
        max-width: 100%;
      }

      .title {
        font-size: 1.75rem;
      }
    }
  `]
})
export class RegisterOrganizationComponent {
  private readonly organizationService = inject(OrganizationService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  readonly loading = signal(false);
  readonly passwordVisible = signal(false);
  readonly confirmPasswordVisible = signal(false);
  readonly serverErrors = signal<Record<string, string>>({});

  readonly form = new FormGroup({
    // Organization fields
    organization_name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    organization_name_en: new FormControl<string>('', { nonNullable: true }),
    organization_email: new FormControl<string>('', { nonNullable: true, validators: [Validators.email] }),
    organization_phone: new FormControl<string>('', { nonNullable: true }),
    organization_address: new FormControl<string>('', { nonNullable: true }),
    registration_number: new FormControl<string>('', { nonNullable: true }),
    established_date: new FormControl<string>('', { nonNullable: true }),

    // Admin user fields
    username: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    full_name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.email] }),
    mobile: new FormControl<string>('', { nonNullable: true }),
    password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(8)] }),
    confirm_password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
  }, { validators: this.passwordMatchValidator });

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirm_password')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  togglePasswordVisibility(): void {
    this.passwordVisible.update(v => !v);
  }

  toggleConfirmPasswordVisibility(): void {
    this.confirmPasswordVisible.update(v => !v);
  }

  getFieldError(fieldName: string): string | null {
    const errors = this.serverErrors();
    return errors[fieldName] || null;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.serverErrors.set({});

    const formValue = this.form.getRawValue();
    
    // Prepare payload - convert empty strings to undefined for optional fields
    const payload: any = {
      organization_name: formValue.organization_name,
      organization_name_en: formValue.organization_name_en || undefined,
      organization_email: formValue.organization_email || undefined,
      organization_phone: formValue.organization_phone || undefined,
      organization_address: formValue.organization_address || undefined,
      registration_number: formValue.registration_number || undefined,
      established_date: formValue.established_date || undefined,
      username: formValue.username,
      full_name: formValue.full_name,
      email: formValue.email || undefined,
      mobile: formValue.mobile || undefined,
      password: formValue.password,
      confirm_password: formValue.confirm_password
    };

    this.organizationService.register(payload).pipe(
      finalize(() => this.loading.set(false))
    ).subscribe({
      next: (response) => {
        if (response.success) {
          this.snackBar.open('تم إنشاء المنظمة بنجاح! يمكنك الآن تسجيل الدخول', 'إغلاق', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
          this.router.navigate(['/login']);
        }
      },
      error: (error) => {
        if (error.error?.errors) {
          // Set server-side validation errors
          this.serverErrors.set(error.error.errors);
          // Mark fields as touched to show errors
          Object.keys(error.error.errors).forEach(field => {
            const control = this.form.get(field);
            if (control) {
              control.setErrors({ serverError: error.error.errors[field] });
              control.markAsTouched();
            }
          });
        }
        
        const message = error.error?.message || 'حدث خطأ أثناء إنشاء المنظمة';
        this.snackBar.open(message, 'إغلاق', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    });
  }
}

