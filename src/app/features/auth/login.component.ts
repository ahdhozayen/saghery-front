import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
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
          <h1 class="title">تسجيل الدخول</h1>
          <p class="subtitle">مرحباً بك، برجاء إدخال بيانات الحساب للمتابعة</p>
        </header>

        <!-- Form -->
        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form">
          <!-- Username Field -->
          <div class="field-group">
            <label class="field-label">
              <span class="required-asterisk">*</span> اسم المستخدم
            </label>
            <div class="input-wrapper">
              <div class="input-icon">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                type="text"
                formControlName="username"
                placeholder="اسم المستخدم، البريد الإلكتروني، أو رقم الموبايل"
                class="input-field"
                [class.input-error]="form.controls.username.touched && form.controls.username.invalid"
              />
            </div>
            @if (form.controls.username.touched && form.controls.username.hasError('required')) {
              <p class="error-message">اسم المستخدم مطلوب</p>
            }
          </div>

          <!-- Password Field -->
          <div class="field-group">
            <label class="field-label">
              <span class="required-asterisk">*</span> كلمة المرور
            </label>
            <div class="input-wrapper">
              <div class="input-icon">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
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
                [attr.aria-label]="passwordVisible() ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'"
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
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="submit-button"
            [disabled]="form.invalid || loading()"
          >
            @if (loading()) {
              <mat-spinner diameter="20" class="spinner"></mat-spinner>
              <span>جاري تسجيل الدخول...</span>
            } @else {
              <span>دخول</span>
            }
          </button>

          <!-- Create Organization Link -->
          <div class="create-org-section">
            <a [routerLink]="'/register-organization'" class="create-org-link">
              إنشاء منظمة جديدة
            </a>
          </div>
        </form>

        <!-- Footer -->
        <footer class="auth-footer">
          <small>صغيري - جميع الحقوق محفوظة 2025 ©</small>
        </footer>
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
      max-width: 440px;
      background: white;
      border-radius: 0.75rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      padding: 2.5rem;
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
      gap: 1.5rem;
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

    .input-icon {
      position: absolute;
      right: 0.75rem;
      color: #6b7280;
      pointer-events: none;
      z-index: 1;
    }

    .input-field {
      width: 100%;
      padding: 0.75rem 2.75rem 0.75rem 0.75rem;
      font-size: 0.875rem;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      background-color: white;
      color: #1f2937;
      text-align: right;
      transition: all 0.2s;
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
      color: #374151;
      background-color: #e5e7eb;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all 0.2s;
      margin-top: 0.5rem;
    }

    .submit-button:hover:not(:disabled) {
      background-color: #d1d5db;
    }

    .submit-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .spinner {
      display: inline-block;
    }

    .auth-footer {
      margin-top: 2rem;
      padding-top: 1.5rem;
      text-align: center;
    }

    .auth-footer small {
      color: #9ca3af;
      font-size: 0.875rem;
    }

    .create-org-section {
      text-align: center;
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid #e5e7eb;
    }

    .create-org-link {
      color: #3b82f6;
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 500;
      transition: color 0.2s;
      display: inline-block;
    }

    .create-org-link:hover {
      color: #2563eb;
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      .auth-wrap {
        padding: 1rem;
      }

      .auth-card {
        padding: 1.5rem;
      }

      .title {
        font-size: 1.75rem;
      }

      .logo-container {
        top: 1rem;
        right: 1rem;
      }

      .logo-box {
        width: 36px;
        height: 36px;
      }

      .logo-icon {
        width: 20px;
        height: 20px;
      }
    }
  `]
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly snack = inject(MatSnackBar);
  readonly passwordVisible = signal(false);
  readonly loading = signal(false);
  readonly form = new FormGroup({
    username: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
  });

  togglePasswordVisibility(): void { this.passwordVisible.update(v => !v); }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.loading.set(true);
    const { username, password } = this.form.getRawValue();
    const redirectTo = this.route.snapshot.queryParamMap.get('redirect') ?? '/dashboard';
    this.auth.login({ username, password }).subscribe({
      next: ({ access, refresh, user }) => {
        this.loading.set(false);
        this.auth.setSession(access, user, refresh);
        this.router.navigateByUrl(redirectTo);
      },
      error: () => {
        this.loading.set(false);
        this.snack.open('بيانات تسجيل الدخول غير صحيحة', 'إغلاق', { duration: 3000 });
      }
    });
  }
}

export { LoginComponent as Login };

