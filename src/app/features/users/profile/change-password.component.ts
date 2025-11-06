import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form class="container" [formGroup]="form" (ngSubmit)="onSubmit()">
      <h2>تغيير كلمة المرور</h2>
      <mat-form-field appearance="outline" class="field">
        <mat-label>كلمة المرور الحالية</mat-label>
        <input matInput type="password" formControlName="current">
      </mat-form-field>
      <mat-form-field appearance="outline" class="field">
        <mat-label>كلمة المرور الجديدة</mat-label>
        <input matInput type="password" formControlName="next">
      </mat-form-field>
      <button mat-flat-button color="primary" type="submit" [disabled]="form.invalid">حفظ</button>
    </form>
  `
})
export class ChangePasswordComponent {
  readonly form = new FormGroup({
    current: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    next: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(8)] })
  });

  onSubmit(): void { /* TODO: wire to service */ }
}

export { ChangePasswordComponent as ChangePassword };

