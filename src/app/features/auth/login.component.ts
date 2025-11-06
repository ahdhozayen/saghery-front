import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatProgressSpinnerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="auth-wrap">
      <div class="auth-card animate-fade-in">
        <header class="auth-header">
          <img src="assets/logo.svg" alt="logo" class="logo" width="40" height="40" />
          <h1 class="title">تسجيل الدخول</h1>
          <p class="subtitle">مرحباً بك، برجاء إدخال بيانات الحساب للمتابعة</p>
        </header>

        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form">
          <mat-form-field appearance="outline" class="field">
            <mat-label>البريد الإلكتروني</mat-label>
            <mat-icon matIconPrefix>email</mat-icon>
            <input matInput formControlName="email" placeholder="name@example.com" type="email">
            @if (form.controls.email.touched && form.controls.email.invalid) {
              <mat-error>
                البريد الإلكتروني غير صالح
              </mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="outline" class="field">
            <mat-label>كلمة المرور</mat-label>
            <mat-icon matIconPrefix>lock</mat-icon>
            <input matInput [type]="passwordVisible() ? 'text' : 'password'" formControlName="password" placeholder="••••••••">
            <button type="button" mat-icon-button matSuffix (click)="togglePasswordVisibility()" [attr.aria-label]="passwordVisible() ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'">
              <mat-icon [fontSet]="'material-icons-outlined'" [fontIcon]="passwordVisible() ? 'visibility_off' : 'visibility'"></mat-icon>
            </button>
            @if (form.controls.password.touched && form.controls.password.invalid) {
              <mat-error>
                كلمة المرور مطلوبة
              </mat-error>
            }
          </mat-form-field>

          <button class="submit" mat-flat-button color="primary" type="submit" [disabled]="form.invalid || loading()">
            @if (loading()) {
              <mat-spinner diameter="20"></mat-spinner>
              <span>جاري تسجيل الدخول...</span>
            } @else {
              <span>دخول</span>
            }
          </button>
        </form>

        <footer class="auth-footer">
          <small>© 2025 صغيري - جميع الحقوق محفوظة</small>
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
      padding: var(--spacing-lg);
      background: linear-gradient(135deg, var(--color-background) 0%, var(--color-surface-hover) 100%);
    }

    .auth-card {
      width: 100%;
      max-width: 440px;
      background: var(--color-surface);
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-xl);
      padding: var(--spacing-2xl);
      border: 1px solid var(--color-border-light);
      transition: all var(--transition-base);

      &:hover {
        box-shadow: var(--shadow-xl);
        transform: translateY(-2px);
      }
    }

    .auth-header {
      text-align: center;
      margin-bottom: var(--spacing-xl);

      .logo {
        margin-bottom: var(--spacing-md);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-sm);
      }

      .title {
        font-size: var(--font-size-3xl);
        font-weight: var(--font-weight-bold);
        color: var(--color-text-primary);
        margin: var(--spacing-md) 0 var(--spacing-sm);
      }

      .subtitle {
        font-size: var(--font-size-base);
        color: var(--color-text-secondary);
        margin: 0;
      }
    }

    .form {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);

      .field {
        width: 100%;
      }
    }

    .submit {
      width: 100%;
      height: 48px;
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-semibold);
      margin-top: var(--spacing-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-sm);
    }

    .auth-footer {
      margin-top: var(--spacing-xl);
      padding-top: var(--spacing-lg);
      border-top: 1px solid var(--color-border-light);
      text-align: center;

      small {
        color: var(--color-text-secondary);
        font-size: var(--font-size-sm);
      }
    }

    @media (max-width: 768px) {
      .auth-wrap {
        padding: var(--spacing-md);
      }

      .auth-card {
        padding: var(--spacing-xl);
      }

      .auth-header .title {
        font-size: var(--font-size-2xl);
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
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
  });

  togglePasswordVisibility(): void { this.passwordVisible.update(v => !v); }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.loading.set(true);
    const { email, password } = this.form.getRawValue();
    const redirectTo = this.route.snapshot.queryParamMap.get('redirect') ?? '/dashboard';
    this.auth.login({ email, password }).subscribe({
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

