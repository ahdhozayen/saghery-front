import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-properties-skills-tab',
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
          <mat-icon>emoji_objects</mat-icon>
          <h3>الممتلكات والمهارات</h3>
        </div>
        <div class="section-body">
          <div class="form-grid">
            <div class="checkbox-field">
              <mat-checkbox formControlName="hasProperty">لديه ممتلكات</mat-checkbox>
            </div>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>وصف الممتلكات</mat-label>
              <input matInput formControlName="propertyDescription">
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>ممتلكات الأب</mat-label>
              <input matInput formControlName="fatherProperty">
            </mat-form-field>

            <div class="checkbox-field">
              <mat-checkbox formControlName="hasSkills">لديه مهارات</mat-checkbox>
            </div>

            <mat-form-field appearance="outline" class="form-field full-width">
              <mat-label>وصف المهارات</mat-label>
              <textarea matInput formControlName="skillsDescription" rows="3"></textarea>
            </mat-form-field>
          </div>
        </div>
      </div>
    </div>
  `
})
export class PropertiesSkillsTabComponent {
  form = input.required<FormGroup>();
}

