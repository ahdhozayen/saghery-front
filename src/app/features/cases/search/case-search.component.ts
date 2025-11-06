import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-case-search',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container">
      <h2>البحث</h2>
      <mat-form-field appearance="outline">
        <mat-label>بحث عن حالة</mat-label>
        <input matInput [formControl]="q">
      </mat-form-field>
    </div>
  `
})
export class CaseSearchComponent {
  readonly q = new FormControl<string>('');
}

export { CaseSearchComponent as CaseSearch };

