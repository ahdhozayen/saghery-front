import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: 'primary' | 'accent' | 'warn';
}

@Component({
  selector: 'app-confirm-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="confirm-dialog">
      <h2 mat-dialog-title>
        <mat-icon>warning</mat-icon>
        {{ data.title }}
      </h2>
      <mat-dialog-content>
        <p>{{ data.message }}</p>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-stroked-button (click)="onCancel()">
          {{ data.cancelText || 'إلغاء' }}
        </button>
        <button
          mat-flat-button
          [color]="data.confirmColor || 'primary'"
          (click)="onConfirm()">
          {{ data.confirmText || 'تأكيد' }}
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .confirm-dialog {
      h2 {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        color: var(--color-text-primary);
        font-size: var(--font-size-xl);
        margin: 0;

        mat-icon {
          color: var(--color-warning);
          font-size: 28px;
          width: 28px;
          height: 28px;
        }
      }

      mat-dialog-content {
        padding: var(--spacing-lg) 0;

        p {
          margin: 0;
          font-size: var(--font-size-base);
          line-height: 1.6;
          color: var(--color-text-secondary);
        }
      }

      mat-dialog-actions {
        padding: var(--spacing-md) 0 0;
        gap: var(--spacing-sm);

        button {
          min-width: 100px;
        }
      }
    }
  `]
})
export class ConfirmDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);
  readonly data = inject<ConfirmDialogData>(MAT_DIALOG_DATA);

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
