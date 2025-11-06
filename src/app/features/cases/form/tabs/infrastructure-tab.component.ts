import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-infrastructure-tab',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatIconModule
  ],
  template: `
    <div class="tab-content" [formGroup]="form()">
      <div class="section-card">
        <div class="section-header">
          <mat-icon>construction</mat-icon>
          <h3>المرافق</h3>
        </div>
        <div class="section-body">
          <div class="form-grid">
            <div class="checkbox-field">
              <mat-checkbox formControlName="hasSewage">صرف صحي</mat-checkbox>
            </div>

            <div class="checkbox-field">
              <mat-checkbox formControlName="hasWater">مياه</mat-checkbox>
            </div>

            <div class="checkbox-field">
              <mat-checkbox formControlName="hasElectricity">كهرباء</mat-checkbox>
            </div>

            <div class="checkbox-field">
              <mat-checkbox formControlName="hasGas">غاز</mat-checkbox>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class InfrastructureTabComponent {
  form = input.required<FormGroup>();
}

