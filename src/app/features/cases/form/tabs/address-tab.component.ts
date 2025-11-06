import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-address-tab',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  template: `
    <div class="tab-content" [formGroup]="form()">
      <div class="section-card">
        <div class="section-header">
          <mat-icon>location_on</mat-icon>
          <h3>العنوان</h3>
        </div>
        <div class="section-body">
          <div class="form-grid">
            <mat-form-field appearance="outline">
              <mat-label>المحافظة</mat-label>
              <input matInput formControlName="governorate">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>المدينة/المركز</mat-label>
              <input matInput formControlName="cityCenter">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>المنطقة/القرية</mat-label>
              <input matInput formControlName="areaVillage">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>الشارع</mat-label>
              <input matInput formControlName="street">
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>العنوان التفصيلي</mat-label>
              <textarea matInput formControlName="detailedAddress" rows="3"></textarea>
            </mat-form-field>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AddressTabComponent {
  form = input.required<FormGroup>();
}

