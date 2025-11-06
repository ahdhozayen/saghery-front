import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormArray, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-health-records-tab',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule
  ],
  template: `
    <div class="tab-content" [formGroup]="form()">
      <div class="section-card">
        <div class="section-header">
          <mat-icon>local_hospital</mat-icon>
          <h3>السجلات الصحية</h3>
          <button mat-icon-button type="button" (click)="addRecord.emit()" class="add-btn">
            <mat-icon>add_circle</mat-icon>
          </button>
        </div>
        <div class="section-body" formArrayName="healthRecords">
          @for (record of healthRecords().controls; track $index) {
            <div class="array-item" [formGroupName]="$index">
              <div class="form-grid">
                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>الصلة</mat-label>
                  <input matInput formControlName="relationship">
                </mat-form-field>

                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>الاسم</mat-label>
                  <input matInput formControlName="name">
                </mat-form-field>

                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>العمر</mat-label>
                  <input matInput type="number" formControlName="age">
                </mat-form-field>

                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>الشكوى</mat-label>
                  <input matInput formControlName="complaint">
                </mat-form-field>

                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>تكلفة العلاج الشهرية</mat-label>
                  <input matInput type="number" formControlName="monthlyTreatmentCost">
                </mat-form-field>

                <div class="checkbox-field">
                  <mat-checkbox formControlName="hasPrescription">لديه روشتة</mat-checkbox>
                </div>

                <button mat-icon-button type="button" (click)="removeRecord.emit($index)" class="remove-btn">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            </div>
          }
          @if (healthRecords().length === 0) {
            <p class="empty-message">لا توجد سجلات. اضغط + لإضافة سجل</p>
          }
        </div>
      </div>
    </div>
  `
})
export class HealthRecordsTabComponent {
  form = input.required<FormGroup>();
  healthRecords = input.required<FormArray>();
  addRecord = output<void>();
  removeRecord = output<number>();
}

