import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-researcher-opinion-tab',
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
          <mat-icon>rate_review</mat-icon>
          <h3>رأي الباحث</h3>
        </div>
        <div class="section-body">
          <mat-form-field appearance="outline" class="form-field full-width">
            <mat-label>رأي الباحث في الحالة</mat-label>
            <textarea matInput formControlName="researcherOpinion" rows="5"></textarea>
            @if (form().controls['researcherOpinion'].hasError('required')) {
              <mat-error>رأي الباحث مطلوب</mat-error>
            }
          </mat-form-field>
        </div>
      </div>
    </div>
  `
})
export class ResearcherOpinionTabComponent {
  form = input.required<FormGroup>();
}

