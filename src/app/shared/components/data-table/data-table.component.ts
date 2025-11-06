import { ChangeDetectionStrategy, Component, InputSignal, OutputEmitterRef, TemplateRef, contentChild, input, output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

export interface ColumnDef<T = any> {
  key: string;
  header: string;
  width?: string;
  cellTemplate?: TemplateRef<any>;
}

@Component({
  selector: 'app-data-table',
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatProgressSpinnerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="table-container">
      @if (loading()) {
        <div class="loading-overlay">
          <mat-spinner diameter="48"></mat-spinner>
        </div>
      }

      <div class="table-wrapper">
        <table mat-table [dataSource]="rows()" class="modern-table">
          @for (col of columns(); track col.key) {
            <ng-container [matColumnDef]="col.key">
              <th mat-header-cell *matHeaderCellDef [style.width]="col.width">
                {{ col.header }}
              </th>
              <td mat-cell *matCellDef="let row; let i = index">
                @if (col.cellTemplate) {
                  <ng-container *ngTemplateOutlet="col.cellTemplate; context: { $implicit: row, index: i }"></ng-container>
                } @else {
                  {{ row[col.key] }}
                }
              </td>
            </ng-container>
          }

          <tr mat-header-row *matHeaderRowDef="displayedColumns()"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns()"></tr>

          @if (!loading() && rows().length === 0) {
            <tr class="mat-row empty-row">
              <td [attr.colspan]="columns().length" class="empty-state">
                <div class="empty-content">
                  <div class="empty-icon">📋</div>
                  <h3>{{ emptyMessage() }}</h3>
                  <p>{{ emptySubMessage() }}</p>
                </div>
              </td>
            </tr>
          }
        </table>
      </div>

      @if (showPagination()) {
        <mat-paginator
          [length]="total()"
          [pageSize]="pageSize()"
          [pageSizeOptions]="pageSizeOptions()"
          (page)="onPageChange($event)"
          class="modern-paginator">
        </mat-paginator>
      }
    </div>
  `,
  styles: [`
    .table-container {
      position: relative;
      background: var(--color-surface);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      border: 1px solid var(--color-border-light);
      overflow: hidden;
      animation: fadeIn var(--transition-base);
    }

    .loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
      backdrop-filter: blur(2px);
    }

    .table-wrapper {
      overflow-x: auto;
      overflow-y: visible;
    }

    .modern-table {
      width: 100%;
      background: var(--color-surface);

      .mat-mdc-header-row {
        background: var(--color-surface-hover);
        border-bottom: 2px solid var(--color-border-light);

        th {
          font-weight: var(--font-weight-semibold);
          color: var(--color-text-primary);
          font-size: var(--font-size-sm);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: var(--spacing-md) var(--spacing-lg);
        }
      }

      .mat-mdc-row {
        transition: all var(--transition-fast);
        border-bottom: 1px solid var(--color-border-light);

        &:hover {
          background-color: var(--color-surface-hover);
          transform: scale(1.001);
        }

        &:last-child {
          border-bottom: none;
        }

        &:nth-child(even) {
          background-color: rgba(251, 246, 233, 0.2);
        }

        td {
          padding: var(--spacing-md) var(--spacing-lg);
          color: var(--color-text-primary);
          font-size: var(--font-size-base);
        }
      }

      .empty-row {
        td {
          padding: var(--spacing-3xl) var(--spacing-lg);
          text-align: center;
        }
      }
    }

    .empty-state {
      .empty-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-md);
        padding: var(--spacing-xl);

        .empty-icon {
          font-size: 48px;
          opacity: 0.5;
        }

        h3 {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text-primary);
          margin: 0;
        }

        p {
          font-size: var(--font-size-base);
          color: var(--color-text-secondary);
          margin: 0;
        }
      }
    }

    .modern-paginator {
      border-top: 1px solid var(--color-border-light);
      background: var(--color-surface);
    }

    @media (max-width: 768px) {
      .modern-table {
        .mat-mdc-header-row th,
        .mat-mdc-row td {
          padding: var(--spacing-sm) var(--spacing-md);
          font-size: var(--font-size-sm);
        }
      }

      .table-container {
        border-radius: var(--radius-md);
      }
    }
  `]
})
export class DataTableComponent<T = any> {
  readonly columns = input.required<ColumnDef<T>[]>();
  readonly rows: InputSignal<T[]> = input.required<T[]>();
  readonly total = input<number>(0);
  readonly pageSize = input<number>(10);
  readonly pageSizeOptions = input<number[]>([5, 10, 25, 50, 100]);
  readonly loading = input<boolean>(false);
  readonly emptyMessage = input<string>('لا توجد بيانات');
  readonly emptySubMessage = input<string>('لم يتم العثور على أي سجلات');
  readonly showPagination = input<boolean>(true);

  readonly page: OutputEmitterRef<PageEvent> = output<PageEvent>();

  displayedColumns(): string[] {
    return this.columns().map(c => c.key);
  }

  onPageChange(event: PageEvent): void {
    this.page.emit(event);
  }
}

export { DataTableComponent as DataTable };

