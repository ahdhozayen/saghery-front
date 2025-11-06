import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-health-aspect-tab',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule
  ],
  template: `
    <div class="tab-content" [formGroup]="form()">
      <div class="section-card">
        <div class="section-header">
          <mat-icon>medical_services</mat-icon>
          <h3>الجانب الصحي</h3>
        </div>
        <div class="section-body">
          <div class="form-grid">
            <div class="checkbox-field">
              <mat-checkbox formControlName="hasHealthInsurance">لديه تأمين صحي</mat-checkbox>
            </div>

            <div class="checkbox-field">
              <mat-checkbox formControlName="isWifePregnant">الزوجة حامل</mat-checkbox>
            </div>

            <div class="checkbox-field">
              <mat-checkbox formControlName="visitsFamilyPlanning">تتردد على تنظيم الأسرة</mat-checkbox>
            </div>

            <div class="checkbox-field">
              <mat-checkbox formControlName="hasDrugAddiction">لديه إدمان</mat-checkbox>
            </div>

            <div class="checkbox-field">
              <mat-checkbox formControlName="receivesAddictionTreatment">يتلقى علاج الإدمان</mat-checkbox>
            </div>

            <mat-form-field appearance="outline" class="form-field full-width">
              <mat-label>مكان العلاج (إن وجد)</mat-label>
              <input matInput formControlName="addictionTreatmentPlace">
            </mat-form-field>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HealthAspectTabComponent {
  form = input.required<FormGroup>();
}

