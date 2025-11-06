import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-employment-income-tab',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule
  ],
  template: `
    <div class="tab-content" [formGroup]="form()">
      <div class="section-card">
        <div class="section-header">
          <mat-icon>work</mat-icon>
          <h3>العمل والدخل</h3>
        </div>
        <div class="section-body">
          <div class="form-grid">
            <div class="checkbox-field">
              <mat-checkbox formControlName="isEmployed">لديه عمل</mat-checkbox>
            </div>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>نوع العمل</mat-label>
              <mat-select formControlName="workType">
                <mat-option value="">اختر نوع العمل</mat-option>
                <mat-option value="government">حكومي</mat-option>
                <mat-option value="private">خاص</mat-option>
                <mat-option value="stable">ثابت</mat-option>
                <mat-option value="craftsman">حرفي</mat-option>
                <mat-option value="seasonal">موسمي</mat-option>
                <mat-option value="daily">يومية</mat-option>
              </mat-select>
              @if (form().controls['workType'].hasError('required')) {
                <mat-error>نوع العمل مطلوب</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>المسمى الوظيفي</mat-label>
              <input matInput formControlName="jobTitle">
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>الحرفة</mat-label>
              <input matInput formControlName="craft">
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>الدخل الشهري</mat-label>
              <input matInput type="number" formControlName="monthlyIncome">
              @if (form().controls['monthlyIncome'].hasError('required')) {
                <mat-error>الدخل الشهري مطلوب</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>المعاش</mat-label>
              <input matInput type="number" formControlName="pension">
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>النفقة</mat-label>
              <input matInput type="number" formControlName="alimony">
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>الصدقات</mat-label>
              <input matInput type="number" formControlName="charity">
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>مساعدات الأقارب</mat-label>
              <input matInput type="number" formControlName="relativesHelp">
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>دخل آخر</mat-label>
              <input matInput type="number" formControlName="otherIncome">
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field full-width">
              <mat-label>وصف الدخل الآخر</mat-label>
              <input matInput formControlName="otherIncomeDescription">
            </mat-form-field>

            <div class="checkbox-field">
              <mat-checkbox formControlName="hasOwnProject">لديه مشروع خاص</mat-checkbox>
            </div>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>نوع المشروع</mat-label>
              <input matInput formControlName="projectType">
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>الجهة المانحة</mat-label>
              <input matInput formControlName="projectDonor">
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>رأس المال</mat-label>
              <input matInput type="number" formControlName="projectCapital">
            </mat-form-field>
          </div>
        </div>
      </div>
    </div>
  `
})
export class EmploymentIncomeTabComponent {
  form = input.required<FormGroup>();
}

