import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { UserService, CreateUserPayload, UpdateUserPayload } from '../../../core/services/user.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-user-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    RouterLink
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .page-container {
      width: 100%;
      animation: fadeIn var(--transition-base);
    }

    .page-header {
      margin-bottom: var(--spacing-xl);
    }

    .page-title {
      font-size: var(--font-size-4xl);
      font-weight: var(--font-weight-bold);
      color: var(--color-text-primary);
      margin: 0 0 var(--spacing-xs);
      line-height: 1.2;
    }

    .page-subtitle {
      font-size: var(--font-size-base);
      color: var(--color-text-secondary);
      margin: 0;
      line-height: 1.5;
    }

    .form-card {
      background: var(--color-surface);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      border: 1px solid var(--color-border-light);
      padding: var(--spacing-xl);
      transition: all var(--transition-base);
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--spacing-lg);
      margin-bottom: var(--spacing-xl);
    }

    .form-field {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .form-field.full-width {
      grid-column: 1 / -1;
    }

    .checkbox-field {
      grid-column: 1 / -1;
      padding: var(--spacing-md);
      background: var(--color-surface-hover);
      border-radius: var(--radius-md);
      border: 1px solid var(--color-border-light);
    }

    .checkbox-field mat-checkbox {
      margin-bottom: var(--spacing-xs);
    }

    .field-hint {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      margin: 0;
      line-height: 1.4;
    }

    :host ::ng-deep .mat-mdc-form-field {
      width: 100%;
      margin-bottom: 0;
    }

    :host ::ng-deep .mat-mdc-form-field .mat-icon[matIconPrefix] {
      margin-right: var(--spacing-sm);
      color: var(--color-text-secondary);
    }

    :host ::ng-deep .mat-mdc-form-field.mat-focused .mat-icon[matIconPrefix] {
      color: var(--color-primary);
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: var(--spacing-md);
      padding-top: var(--spacing-lg);
      border-top: 1px solid var(--color-border-light);
      flex-wrap: wrap;
    }

    .form-actions button {
      min-width: 120px;
      padding: var(--spacing-sm) var(--spacing-lg);
      font-weight: var(--font-weight-semibold);
      border-radius: var(--radius-md);
      transition: all var(--transition-base);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-xs);

      &:not([disabled]) {
        box-shadow: var(--shadow-sm);

        &:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-1px);
        }

        &:active {
          transform: translateY(0);
        }
      }

      mat-icon {
        font-size: 20px;
        width: 20px;
        height: 20px;
      }

      mat-spinner {
        display: inline-block;
      }

      span {
        font-size: var(--font-size-base);
      }
    }

    .form-actions button[mat-flat-button]:not([color]) {
      background-color: var(--color-surface);
      color: var(--color-text-primary);
      border: 1px solid var(--color-border-medium);

      &:hover:not([disabled]) {
        background-color: var(--color-surface-hover);
        border-color: var(--color-border-dark);
      }
    }

    :host ::ng-deep .mat-mdc-checkbox {
      --mdc-checkbox-selected-checkmark-color: var(--color-surface);
      --mdc-checkbox-selected-focus-icon-color: var(--color-primary);
      --mdc-checkbox-selected-hover-icon-color: var(--color-primary);
      --mdc-checkbox-selected-icon-color: var(--color-primary);
      --mdc-checkbox-selected-pressed-icon-color: var(--color-primary);
    }

    @media (max-width: 768px) {
      .form-card {
        padding: var(--spacing-lg);
      }

      .form-grid {
        grid-template-columns: 1fr;
        gap: var(--spacing-md);
        margin-bottom: var(--spacing-lg);
      }

      .form-field.full-width {
        grid-column: 1;
      }

      .page-title {
        font-size: var(--font-size-3xl);
      }

      .page-subtitle {
        font-size: var(--font-size-sm);
      }

      .form-actions {
        flex-direction: column-reverse;
        width: 100%;
      }

      .form-actions button {
        width: 100%;
        min-width: unset;
      }
    }
  `],
  template: `
    <div class="page-container">
      <div class="page-header">
        <div>
          <h1 class="page-title">{{ isEditMode() ? 'تعديل المستخدم' : 'مستخدم جديد' }}</h1>
          <p class="page-subtitle">{{ isEditMode() ? 'تحديث بيانات المستخدم' : 'إضافة مستخدم جديد إلى النظام' }}</p>
        </div>
      </div>

      <div class="form-card">
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <div class="form-grid">
            <!-- Full Name -->
            <mat-form-field appearance="outline" class="form-field full-width">
              <mat-label>الاسم الكامل</mat-label>
              <mat-icon matIconPrefix>person</mat-icon>
              <input matInput formControlName="full_name" placeholder="أدخل الاسم الكامل">
              @if (form.controls.full_name.hasError('required')) {
                <mat-error>الاسم الكامل مطلوب</mat-error>
              } @else if (form.controls.full_name.hasError('serverError')) {
                <mat-error>{{ form.controls.full_name.getError('serverError') }}</mat-error>
              }
            </mat-form-field>

            <!-- Email -->
            <mat-form-field appearance="outline" class="form-field full-width">
              <mat-label>البريد الإلكتروني</mat-label>
              <mat-icon matIconPrefix>email</mat-icon>
              <input matInput type="email" formControlName="email" placeholder="example@domain.com">
              @if (form.controls.email.hasError('required')) {
                <mat-error>البريد الإلكتروني مطلوب</mat-error>
              } @else if (form.controls.email.hasError('email')) {
                <mat-error>البريد الإلكتروني غير صحيح</mat-error>
              } @else if (form.controls.email.hasError('serverError')) {
                <mat-error>{{ form.controls.email.getError('serverError') }}</mat-error>
              }
            </mat-form-field>

            <!-- Mobile -->
            <mat-form-field appearance="outline" class="form-field">
              <mat-label>رقم الموبايل</mat-label>
              <mat-icon matIconPrefix>phone</mat-icon>
              <input matInput formControlName="mobile" placeholder="01234567890">
              @if (form.controls.mobile.hasError('pattern')) {
                <mat-error>رقم الموبايل غير صحيح (يجب أن يبدأ بـ 01 ويتكون من 11 رقم)</mat-error>
              } @else if (form.controls.mobile.hasError('serverError')) {
                <mat-error>{{ form.controls.mobile.getError('serverError') }}</mat-error>
              }
            </mat-form-field>

            <!-- Role -->
            <mat-form-field appearance="outline" class="form-field">
              <mat-label>الدور</mat-label>
              <mat-icon matIconPrefix>badge</mat-icon>
              <mat-select formControlName="role">
                <mat-option value="researcher">باحث</mat-option>
                <mat-option value="staff">موظف</mat-option>
                <mat-option value="help_desk">مكتب المساعدة</mat-option>
                <mat-option value="admin">مسؤول</mat-option>
              </mat-select>
              @if (form.controls.role.hasError('required')) {
                <mat-error>الدور مطلوب</mat-error>
              } @else if (form.controls.role.hasError('serverError')) {
                <mat-error>{{ form.controls.role.getError('serverError') }}</mat-error>
              }
            </mat-form-field>

            <!-- Password -->
            <mat-form-field appearance="outline" class="form-field">
              <mat-label>كلمة المرور{{ isEditMode() ? ' (اختياري)' : '' }}</mat-label>
              <mat-icon matIconPrefix>lock</mat-icon>
              <input matInput [type]="hidePassword() ? 'password' : 'text'" formControlName="password" [placeholder]="isEditMode() ? 'اتركه فارغًا للإبقاء على كلمة المرور الحالية' : 'أدخل كلمة المرور'">
              <button mat-icon-button matIconSuffix type="button" (click)="hidePassword.set(!hidePassword())">
                <mat-icon>{{ hidePassword() ? 'visibility_off' : 'visibility' }}</mat-icon>
              </button>
              @if (form.controls.password.hasError('required')) {
                <mat-error>كلمة المرور مطلوبة</mat-error>
              } @else if (form.controls.password.hasError('minlength')) {
                <mat-error>كلمة المرور يجب أن تكون 8 أحرف على الأقل</mat-error>
              } @else if (form.controls.password.hasError('serverError')) {
                <mat-error>{{ form.controls.password.getError('serverError') }}</mat-error>
              }
            </mat-form-field>

            <!-- Confirm Password -->
            <mat-form-field appearance="outline" class="form-field">
              <mat-label>تأكيد كلمة المرور{{ isEditMode() ? ' (اختياري)' : '' }}</mat-label>
              <mat-icon matIconPrefix>lock</mat-icon>
              <input matInput [type]="hideConfirmPassword() ? 'password' : 'text'" formControlName="confirmPassword" [placeholder]="isEditMode() ? 'اتركه فارغًا إذا لم تقم بتغيير كلمة المرور' : 'أعد إدخال كلمة المرور'">
              <button mat-icon-button matIconSuffix type="button" (click)="hideConfirmPassword.set(!hideConfirmPassword())">
                <mat-icon>{{ hideConfirmPassword() ? 'visibility_off' : 'visibility' }}</mat-icon>
              </button>
              @if (form.controls.confirmPassword.hasError('required')) {
                <mat-error>تأكيد كلمة المرور مطلوب</mat-error>
              }
              @if (form.hasError('passwordMismatch') && form.controls.confirmPassword.touched) {
                <mat-error>كلمة المرور غير متطابقة</mat-error>
              }
            </mat-form-field>

            <!-- Active Status -->
            <div class="form-field checkbox-field">
              <mat-checkbox formControlName="is_active">
                حساب نشط
              </mat-checkbox>
              <p class="field-hint">إذا كان محدداً، يمكن للمستخدم تسجيل الدخول إلى النظام</p>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="form-actions">
            <button mat-flat-button type="button" [routerLink]="'/users'" [disabled]="loading()">
              إلغاء
            </button>
            <button mat-flat-button color="primary" type="submit" [disabled]="form.invalid || loading()">
              @if (loading()) {
                <mat-spinner diameter="20"></mat-spinner>
                <span>{{ isEditMode() ? 'جارٍ التحديث...' : 'جارٍ الحفظ...' }}</span>
              } @else {
                <ng-container>
                  <mat-icon>save</mat-icon>
                  <span>{{ isEditMode() ? 'تحديث المستخدم' : 'حفظ المستخدم' }}</span>
                </ng-container>
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
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
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
    const payload = this.isEditMode() && !formData.password
      ? { ...formData, password: undefined }
      : formData;

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

