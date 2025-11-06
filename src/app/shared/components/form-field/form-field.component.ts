import { Component, input, computed, AfterContentInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
  ],
  template: `
    <mat-form-field
      appearance="outline"
      [class]="customClass()">
      <mat-label>{{ label() }}</mat-label>

      @if (prefixIcon()) {
        <mat-icon matIconPrefix>{{ prefixIcon() }}</mat-icon>
      }

      <ng-content />

      @if (displayError()) {
        <mat-error>{{ displayError() }}</mat-error>
      }

      @if (hint()) {
        <mat-hint>{{ hint() }}</mat-hint>
      }
    </mat-form-field>
  `
})
export class FormFieldComponent implements AfterContentInit {
  label = input.required<string>();
  prefixIcon = input<string>();
  errorMessage = input<string | null>();
  hint = input<string | null>();
  control = input<AbstractControl | null>();
  customClass = input<string>('');

  private cdr = inject(ChangeDetectorRef);

  ngAfterContentInit(): void {
    // Trigger change detection after content is projected
    // This ensures Material's MatFormField can find the projected control
    // Material checks for controls in ngAfterContentChecked, so we need to
    // ensure content is projected before that check
    this.cdr.detectChanges();
  }

  hasError = computed(() => {
    const errorMsg = this.errorMessage();
    if (errorMsg) return true;
    
    const ctrl = this.control();
    return ctrl ? ctrl.invalid && (ctrl.dirty || ctrl.touched) : false;
  });

  displayError = computed(() => {
    const errorMsg = this.errorMessage();
    if (errorMsg) return errorMsg;
    
    const ctrl = this.control();
    if (!ctrl || !ctrl.errors || !(ctrl.dirty || ctrl.touched)) {
      return null;
    }
    
    if (ctrl.errors['required']) {
      return this.label() + ' مطلوب';
    }
    
    return null;
  });
}
