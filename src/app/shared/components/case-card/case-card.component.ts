import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

export interface CaseSummary {
  id: string | number;
  title: string;
  subtitle?: string;
  status?: string;
  meta?: string;
}

@Component({
  selector: 'app-case-card',
  imports: [MatCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card appearance="outlined">
      <mat-card-header>
        <mat-card-title>{{ data().title }}</mat-card-title>
        @if (data().subtitle) { <mat-card-subtitle>{{ data().subtitle }}</mat-card-subtitle> }
      </mat-card-header>
      <mat-card-content>
        <ng-content />
      </mat-card-content>
      @if (data().meta || data().status) {
        <mat-card-footer class="footer">
          @if (data().status) { <span class="status">{{ data().status }}</span> }
          @if (data().meta) { <span class="meta">{{ data().meta }}</span> }
        </mat-card-footer>
      }
    </mat-card>
  `
})
export class CaseCardComponent {
  readonly data = input.required<CaseSummary>();
}

export { CaseCardComponent as CaseCard };

