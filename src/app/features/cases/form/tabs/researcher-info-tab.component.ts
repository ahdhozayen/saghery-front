import { Component, input, OnInit, signal, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserService, UserItem } from '../../../../core/services/user.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-researcher-info-tab',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="tab-content" [formGroup]="form()">
      <div class="section-card">
        <div class="section-header">
          <mat-icon>manage_accounts</mat-icon>
          <h3>معلومات الباحث</h3>
        </div>
        <div class="section-body">
          <div class="form-grid">
            <mat-form-field appearance="outline" class="form-field">
              <mat-label>الباحث</mat-label>
              <mat-icon matIconPrefix>person</mat-icon>
              <mat-select formControlName="researcher">
                <mat-option [value]="null">اختر الباحث</mat-option>
                @if (loadingResearchers()) {
                  <mat-option disabled>
                    <span>جاري التحميل...</span>
                  </mat-option>
                } @else {
                  @for (researcher of researchers(); track researcher.id) {
                    <mat-option [value]="researcher.id">
                      {{ researcher.fullName }}
                    </mat-option>
                  }
                  @if (researchers().length === 0 && !loadingResearchers()) {
                    <mat-option disabled>
                      <span>لا يوجد باحثين</span>
                    </mat-option>
                  }
                }
              </mat-select>
              @if (loadingResearchers()) {
                <mat-hint>
                  <mat-spinner diameter="16"></mat-spinner>
                  <span>جاري تحميل الباحثين...</span>
                </mat-hint>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>اسم الدليل</mat-label>
              <input matInput formControlName="guideName">
              @if (form().controls['guideName'].hasError('required')) {
                <mat-error>اسم الدليل مطلوب</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>موبايل الدليل</mat-label>
              <input matInput formControlName="guideMobile">
              @if (form().controls['guideMobile'].hasError('required')) {
                <mat-error>موبايل الدليل مطلوب</mat-error>
              } @else if (form().controls['guideMobile'].hasError('pattern')) {
                <mat-error>رقم الموبايل غير صحيح</mat-error>
              }
            </mat-form-field>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ResearcherInfoTabComponent implements OnInit {
  private readonly userService = inject(UserService);

  form = input.required<FormGroup>();
  readonly researchers = signal<UserItem[]>([]);
  readonly loadingResearchers = signal(false);

  constructor() {
    // Use effect to enable/disable the researcher control based on loading state
    effect(() => {
      const researcherControl = this.form()?.get('researcher');
      if (researcherControl) {
        if (this.loadingResearchers()) {
          researcherControl.disable({ emitEvent: false });
        } else {
          researcherControl.enable({ emitEvent: false });
        }
      }
    });
  }

  ngOnInit(): void {
    this.loadResearchers();
  }

  private loadResearchers(): void {
    this.loadingResearchers.set(true);
    this.userService.getResearchers(1, 100)
      .pipe(
        catchError(() => {
          this.loadingResearchers.set(false);
          return of({ data: [], meta: { count: 0, page: 1, page_size: 100, num_pages: 0 } });
        })
      )
      .subscribe({
        next: (response) => {
          this.researchers.set(response.data);
          this.loadingResearchers.set(false);
        },
        error: () => {
          this.loadingResearchers.set(false);
        }
      });
  }
}

