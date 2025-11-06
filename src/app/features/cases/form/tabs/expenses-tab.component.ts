import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-expenses-tab',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  template: `
    <div class="tab-content" [formGroup]="form()">
      <div class="section-card">
        <div class="section-header">
          <mat-icon>payments</mat-icon>
          <h3>المصروفات</h3>
        </div>
        <div class="section-body">
          <div class="form-grid">
            <mat-form-field appearance="outline" class="form-field">
              <mat-label>الإيجار</mat-label>
              <input matInput type="number" formControlName="rent">
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>مصروفات تعليم</mat-label>
              <input matInput type="number" formControlName="educationExpenses">
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>كهرباء</mat-label>
              <input matInput type="number" formControlName="electricityBill">
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>مياه</mat-label>
              <input matInput type="number" formControlName="waterBill">
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>غاز</mat-label>
              <input matInput type="number" formControlName="gasBill">
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>تليفون</mat-label>
              <input matInput type="number" formControlName="phoneBill">
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>دروس خصوصية</mat-label>
              <input matInput type="number" formControlName="tutoring">
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>جمعيات</mat-label>
              <input matInput type="number" formControlName="associations">
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>علاج شهري</mat-label>
              <input matInput type="number" formControlName="monthlyTreatment">
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>أقساط أجهزة</mat-label>
              <input matInput type="number" formControlName="deviceInstallments">
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>تدخين</mat-label>
              <input matInput type="number" formControlName="smoking">
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>مصروفات بيت</mat-label>
              <input matInput type="number" formControlName="householdExpenses">
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>إجمالي الديون</mat-label>
              <input matInput type="number" formControlName="totalDebt">
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>سبب الدين</mat-label>
              <input matInput formControlName="debtReason">
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>القسط الشهري</mat-label>
              <input matInput type="number" formControlName="monthlyDebtPayment">
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>صلة الدائن</mat-label>
              <input matInput formControlName="creditorRelationship">
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field full-width">
              <mat-label>مصروفات أخرى</mat-label>
              <input matInput formControlName="otherExpenses">
            </mat-form-field>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ExpensesTabComponent {
  form = input.required<FormGroup>();
}

