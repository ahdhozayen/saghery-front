import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormArray, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-family-needs-tab',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule
  ],
  template: `
    <div class="tab-content" [formGroup]="form()">
      <div class="section-card">
        <div class="section-header">
          <mat-icon>inventory</mat-icon>
          <h3>احتياجات الأسرة</h3>
          <button mat-icon-button type="button" (click)="addNeed.emit()" class="add-btn">
            <mat-icon>add_circle</mat-icon>
          </button>
        </div>
        <div class="section-body" formArrayName="familyNeeds">
          @for (need of familyNeedsArray.controls; track $index) {
            <div class="array-item" [formGroupName]="$index">
              <div class="form-grid">
                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>نوع الاحتياج</mat-label>
                  <mat-select formControlName="needType">
                    <mat-option value="monthly_sponsorship">كفالة شهرية</mat-option>
                    <mat-option value="health_sponsorship">كفالة صحية</mat-option>
                    <mat-option value="education">تعليم</mat-option>
                    <mat-option value="housing">سكن</mat-option>
                    <mat-option value="other">أخرى</mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>الوصف</mat-label>
                  <input matInput formControlName="description">
                </mat-form-field>

                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>نوع الاحتياج الصحي</mat-label>
                  <mat-select formControlName="healthNeedType">
                    <mat-option [value]="null">لا يوجد</mat-option>
                    <mat-option value="medicine">دواء</mat-option>
                    <mat-option value="surgery">جراحة</mat-option>
                    <mat-option value="treatment">علاج</mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>الأولوية</mat-label>
                  <input matInput type="number" formControlName="priority" min="1" max="10">
                </mat-form-field>

                <div class="checkbox-field">
                  <mat-checkbox formControlName="isFulfilled">تم الوفاء</mat-checkbox>
                </div>

                <button mat-icon-button type="button" (click)="removeNeed.emit($index)" class="remove-btn">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            </div>
          }
          @if (familyNeedsArray.length === 0) {
            <p class="empty-message">لا توجد احتياجات. اضغط + لإضافة احتياج</p>
          }
        </div>
      </div>
    </div>
  `
})
export class FamilyNeedsTabComponent {
  form = input.required<FormGroup>();
  familyNeeds = input.required<FormArray>();
  addNeed = output<void>();
  removeNeed = output<number>();

  get familyNeedsArray(): FormArray {
    return this.familyNeeds();
  }
}

