import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormArray, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-family-members-tab',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="tab-content" [formGroup]="form()">
      <div class="section-card">
        <div class="section-header">
          <mat-icon>people</mat-icon>
          <h3>أفراد الأسرة</h3>
          <button mat-icon-button type="button" (click)="addMember.emit()" class="add-btn">
            <mat-icon>add_circle</mat-icon>
          </button>
        </div>
        <div class="section-body" formArrayName="familyMembers">
          @for (member of familyMembers().controls; track $index) {
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
                  <mat-label>الصلة</mat-label>
                  <input matInput formControlName="relationship">
                </mat-form-field>

                <button mat-icon-button type="button" (click)="removeMember.emit($index)" class="remove-btn">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            </div>
          }
          @if (familyMembers().length === 0) {
            <p class="empty-message">لا توجد أفراد. اضغط + لإضافة فرد</p>
          }
        </div>
      </div>
    </div>
  `
})
export class FamilyMembersTabComponent {
  form = input.required<FormGroup>();
  familyMembers = input.required<FormArray>();
  addMember = output<void>();
  removeMember = output<number>();
}

