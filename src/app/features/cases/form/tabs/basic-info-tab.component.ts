import { Component, input, computed } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-basic-info-tab',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIcon,
  ],
  template: `
    <div class="tab-content" [formGroup]="form()">
      <div class="section-card">

        <div class="section-header">
          <mat-icon>badge</mat-icon>
          <h3>البيانات الأساسية</h3>
        </div>

        <div class="section-body">
          <div class="form-grid">
            <mat-form-field appearance="outline">
              <mat-label>الاسم الكامل</mat-label>
              <mat-icon matIconPrefix>person</mat-icon>
              <input matInput formControlName="fullName">
              @if (form().controls['fullName'].hasError('required') && form().controls['fullName'].touched) {
                <mat-error>الاسم الكامل مطلوب</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>العمر</mat-label>
              <mat-icon matIconPrefix>cake</mat-icon>
              <input matInput type="number" formControlName="age">
              @if (form().controls['age'].hasError('required') && form().controls['age'].touched) {
                <mat-error>العمر مطلوب</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>النوع</mat-label>
              <mat-icon matIconPrefix>wc</mat-icon>
              <mat-select formControlName="gender">
                <mat-option value="male">ذكر</mat-option>
                <mat-option value="female">أنثى</mat-option>
              </mat-select>
              @if (form().controls['gender'].hasError('required') && form().controls['gender'].touched) {
                <mat-error>النوع مطلوب</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>الرقم القومي</mat-label>
              <mat-icon matIconPrefix>fingerprint</mat-icon>
              <input matInput formControlName="nationalId" maxlength="14">
              @if (nationalIdError()) {
                <mat-error>{{ nationalIdError() }}</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>الموبايل</mat-label>
              <mat-icon matIconPrefix>phone</mat-icon>
              <input matInput formControlName="mobile">
              @if (mobileError()) {
                <mat-error>{{ mobileError() }}</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>التليفون الأرضي</mat-label>
              <mat-icon matIconPrefix>call</mat-icon>
              <input matInput formControlName="landline">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>التعليم</mat-label>
              <mat-icon matIconPrefix>school</mat-icon>
              <mat-select formControlName="education">
                <mat-option value="illiterate">أمي</mat-option>
                <mat-option value="literacy_certificate">شهادة محو الأمية</mat-option>
                <mat-option value="preparatory">إعدادية</mat-option>
                <mat-option value="medium">مؤهل متوسط</mat-option>
                <mat-option value="high">مؤهل عالي</mat-option>
              </mat-select>
              @if (form().controls['education'].hasError('required') && form().controls['education'].touched) {
                <mat-error>التعليم مطلوب</mat-error>
              }
            </mat-form-field>
          </div>
        </div>
      </div>
    </div>
  `
})
export class BasicInfoTabComponent {
  form = input.required<FormGroup>();

  // Custom error messages for fields with multiple validations
  nationalIdError = computed(() => {
    const control = this.form().controls['nationalId'];
    if (!control || !control.errors || !(control.dirty || control.touched)) {
      return null;
    }
    if (control.errors['required']) return 'الرقم القومي مطلوب';
    if (control.errors['pattern']) return 'يجب أن يكون 14 رقم';
    return null;
  });

  mobileError = computed(() => {
    const control = this.form().controls['mobile'];
    if (!control || !control.errors || !(control.dirty || control.touched)) {
      return null;
    }
    if (control.errors['required']) return 'الموبايل مطلوب';
    if (control.errors['pattern']) return 'رقم الموبايل غير صحيح';
    return null;
  });
}

