import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormArray, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-education-records-tab',
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
          <mat-icon>school</mat-icon>
          <h3>سجلات التعليم</h3>
          <button mat-icon-button type="button" (click)="addRecord.emit()" class="add-btn">
            <mat-icon>add_circle</mat-icon>
          </button>
        </div>
        <div class="section-body" formArrayName="educationRecords">
          @for (record of educationRecords().controls; track $index) {
            <div class="array-item" [formGroupName]="$index">
              <div class="form-grid">
                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>الاسم</mat-label>
                  <input matInput formControlName="name">
                </mat-form-field>

                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>العمر</mat-label>
                  <input matInput type="number" formControlName="age">
                </mat-form-field>

                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>المرحلة التعليمية</mat-label>
                  <input matInput formControlName="educationStage">
                </mat-form-field>

                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>المصروفات</mat-label>
                  <input matInput type="number" formControlName="educationExpenses">
                </mat-form-field>

                <div class="checkbox-field">
                  <mat-checkbox formControlName="isDropout">متسرب</mat-checkbox>
                </div>

                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>سبب التسرب</mat-label>
                  <input matInput formControlName="dropoutReason">
                </mat-form-field>

                <button mat-icon-button type="button" (click)="removeRecord.emit($index)" class="remove-btn">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            </div>
          }
          @if (educationRecords().length === 0) {
            <p class="empty-message">لا توجد سجلات. اضغط + لإضافة سجل</p>
          }
        </div>
      </div>
    </div>
  `
})
export class EducationRecordsTabComponent {
  form = input.required<FormGroup>();
  educationRecords = input.required<FormArray>();
  addRecord = output<void>();
  removeRecord = output<number>();
}

