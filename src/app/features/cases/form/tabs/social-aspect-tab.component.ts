import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-social-aspect-tab',
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
          <mat-icon>family_restroom</mat-icon>
          <h3>الجانب الاجتماعي</h3>
        </div>
        <div class="section-body">
          <div class="form-grid">
            <mat-form-field appearance="outline" class="form-field">
              <mat-label>الحالة الاجتماعية</mat-label>
              <mat-select formControlName="maritalStatus">
                <mat-option value="single">أعزب</mat-option>
                <mat-option value="married">متزوج</mat-option>
                <mat-option value="divorced">مطلق</mat-option>
                <mat-option value="widowed">أرمل</mat-option>
              </mat-select>
              @if (form().controls['maritalStatus'].hasError('required')) {
                <mat-error>الحالة الاجتماعية مطلوبة</mat-error>
              }
            </mat-form-field>

            <div class="checkbox-field">
              <mat-checkbox formControlName="isProvider">هل هو المعيل</mat-checkbox>
            </div>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>عدد الأفراد</mat-label>
              <input matInput type="number" formControlName="numberOfDependents">
              @if (form().controls['numberOfDependents'].hasError('required')) {
                <mat-error>عدد الأفراد مطلوب</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>عدد الزوجات</mat-label>
              <input matInput type="number" formControlName="numberOfWives">
              @if (form().controls['numberOfWives'].hasError('required')) {
                <mat-error>عدد الزوجات مطلوب</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>عدد الأولاد</mat-label>
              <input matInput type="number" formControlName="numberOfChildren">
              @if (form().controls['numberOfChildren'].hasError('required')) {
                <mat-error>عدد الأولاد مطلوب</mat-error>
              }
            </mat-form-field>
          </div>
        </div>
      </div>
    </div>
  `
})
export class SocialAspectTabComponent {
  form = input.required<FormGroup>();
}

