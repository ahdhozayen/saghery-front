import { AfterViewInit, ChangeDetectionStrategy, Component, TemplateRef, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { CaseService, CaseFilters } from '../../../core/services/case.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { combineLatest, debounceTime, finalize, map, startWith, switchMap, tap } from 'rxjs';
import { DataTableComponent, ColumnDef } from '../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-case-list',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DataTableComponent,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .page-container {
      width: 100%;
      animation: fadeIn var(--transition-base);
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: var(--spacing-xl);
      gap: var(--spacing-lg);
      flex-wrap: wrap;
    }

    .page-title {
      font-size: var(--font-size-4xl);
      font-weight: var(--font-weight-bold);
      color: var(--color-text-primary);
      margin: 0 0 var(--spacing-xs);
      line-height: 1.2;
    }

    .page-subtitle {
      font-size: var(--font-size-base);
      color: var(--color-text-secondary);
      margin: 0;
      line-height: 1.5;
    }

    .add-button {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      padding: var(--spacing-sm) var(--spacing-lg);
      font-weight: var(--font-weight-semibold);
      border-radius: var(--radius-md);
      transition: all var(--transition-base);
      box-shadow: var(--shadow-sm);

      &:hover {
        box-shadow: var(--shadow-md);
        transform: translateY(-1px);
      }

      &:active {
        transform: translateY(0);
      }

      span {
        font-size: var(--font-size-base);
      }
    }

    .filters-card {
      background: var(--color-surface);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      border: 1px solid var(--color-border-light);
      padding: var(--spacing-lg);
      margin-bottom: var(--spacing-xl);
    }

    .filters-container {
      display: flex;
      flex-direction: row;
      gap: var(--spacing-md);
      justify-content: space-between;
      align-items: center;
    }

    .filters-form {
      width: 100%;
    }

    .filter-field {
      width: 100%;
    }

    .filter-actions {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
    }

    :host ::ng-deep .filter-field .mat-mdc-form-field {
      width: 100%;
      margin-bottom: 0;
    }

    :host ::ng-deep .filter-field .mat-icon[matIconPrefix] {
      margin-right: var(--spacing-sm);
      color: var(--color-text-secondary);
    }

    :host ::ng-deep .filter-field .mat-mdc-form-field.mat-focused .mat-icon[matIconPrefix] {
      color: var(--color-primary);
    }

    .filter-actions button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-xs);
      padding: var(--spacing-sm) var(--spacing-md);
      font-weight: var(--font-weight-medium);
      border-radius: var(--radius-md);
      transition: all var(--transition-base);
      height: 56px;
      box-sizing: border-box;
      color: var(--color-text-secondary);
      border-color: var(--color-border-medium);

      &:hover:not([disabled]) {
        background-color: var(--color-surface-hover);
        border-color: var(--color-border-dark);
        color: var(--color-text-primary);
        transform: translateY(-1px);
      }

      &:active {
        transform: translateY(0);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }

      span {
        font-size: var(--font-size-sm);
      }
    }

    .case-code {
      font-family: 'Courier New', monospace;
      font-weight: var(--font-weight-semibold);
      color: var(--color-primary);
      font-size: var(--font-size-sm);
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      padding: var(--spacing-xs) var(--spacing-md);
      border-radius: var(--radius-full);
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-medium);
      white-space: nowrap;

      &.draft {
        background-color: rgba(156, 163, 175, 0.1);
        color: var(--color-text-muted);
      }

      &.submitted {
        background-color: rgba(6, 182, 212, 0.1);
        color: var(--color-info);
      }

      &.under_review {
        background-color: rgba(245, 158, 11, 0.1);
        color: var(--color-warning);
      }

      &.approved {
        background-color: rgba(16, 185, 129, 0.1);
        color: var(--color-success);
      }

      &.rejected {
        background-color: rgba(239, 68, 68, 0.1);
        color: var(--color-error);
      }
    }

    .income-cell {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    .amount {
      font-weight: var(--font-weight-semibold);
      font-size: var(--font-size-base);
      color: var(--color-text-primary);

      &.negative {
        color: var(--color-error);
      }
    }

    .text-muted {
      color: var(--color-text-muted);
      font-style: italic;
    }

    .actions {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: var(--spacing-xs);
    }

    .menu-trigger {
      width: 36px;
      height: 36px;
      transition: all var(--transition-fast);

      &:hover {
        background-color: var(--color-surface-hover);
      }

      mat-icon {
        font-size: 20px;
        width: 20px;
        height: 20px;
        color: var(--color-text-secondary);
      }
    }

    :host ::ng-deep .mat-mdc-menu-panel {
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-xl);
      border: 1px solid var(--color-border-light);
      margin-top: var(--spacing-xs);
    }

    :host ::ng-deep .mat-mdc-menu-item {
      padding: var(--spacing-md) var(--spacing-lg);
      min-height: 48px;
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      transition: all var(--transition-fast);

      &:hover {
        background-color: var(--color-surface-hover);
      }

      mat-icon {
        margin-right: 0;
        margin-left: 0;
        width: 20px;
        height: 20px;
        font-size: 20px;
        color: var(--color-text-secondary);
      }

      span {
        font-size: var(--font-size-base);
        font-weight: var(--font-weight-regular);
        color: var(--color-text-primary);
      }

      &:hover mat-icon {
        color: var(--color-primary);
      }
    }

    @media (max-width: 768px) {
      .page-header {
        flex-direction: column;
        align-items: stretch;
        margin-bottom: var(--spacing-lg);
      }

      .page-title {
        font-size: var(--font-size-3xl);
      }

      .page-subtitle {
        font-size: var(--font-size-sm);
      }

      .add-button {
        width: 100%;
        justify-content: center;
      }

      .filters-card {
        padding: var(--spacing-md);
      }

      .filter-actions {
        width: 100%;
        justify-content: stretch;
      }

      .filter-actions button {
        width: 100%;
        justify-content: center;
      }
    }
  `],
  template: `
    <div class="page-container">
      <div class="page-header">
        <div>
          <h1 class="page-title">الحالات</h1>
          <p class="page-subtitle">إدارة حالات المستفيدين من البرنامج</p>
        </div>
        <a mat-flat-button color="primary" [routerLink]="'/cases/new'" class="add-button">
          <span>+ حالة جديدة</span>
        </a>
      </div>

      <!-- Filters -->
      <div class="filters-card">
        <form [formGroup]="filterForm" class="filters-form">
          <div class="filters-container">
            <mat-form-field appearance="outline" class="filter-field">
              <mat-label>رقم الحالة</mat-label>
              <mat-icon matIconPrefix>tag</mat-icon>
              <input matInput formControlName="code" placeholder="ابحث برقم الحالة">
            </mat-form-field>

            <mat-form-field appearance="outline" class="filter-field">
              <mat-label>الاسم</mat-label>
              <mat-icon matIconPrefix>person</mat-icon>
              <input matInput formControlName="name" placeholder="ابحث بالاسم">
            </mat-form-field>

            <mat-form-field appearance="outline" class="filter-field">
              <mat-label>رقم الباحث</mat-label>
              <mat-icon matIconPrefix>badge</mat-icon>
              <input matInput type="number" formControlName="researcher" placeholder="رقم الباحث">
            </mat-form-field>

            <div class="filter-actions">
              <button mat-stroked-button type="button" (click)="clearFilters()" [disabled]="!hasActiveFilters()">
                <mat-icon>clear</mat-icon>
                <span>مسح الفلاتر</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      @if (columnsReady()) {
        <app-data-table
          [columns]="columns"
          [rows]="rows()"
          [total]="total()"
          [pageSize]="pageSize()"
          [loading]="loading()"
          [emptyMessage]="'لا توجد حالات'"
          [emptySubMessage]="'لم يتم العثور على أي حالات في النظام'"
          (page)="onPageChange($event)">
        </app-data-table>
      }
    </div>

    <ng-template #caseCodeTemplate let-row>
      <span class="case-code">{{ row.caseCode }}</span>
    </ng-template>

    <ng-template #statusTemplate let-row>
      <span class="status-badge" [ngClass]="getStatusClass(row.status)">
        {{ getStatusLabel(row.status) }}
      </span>
    </ng-template>

    <ng-template #incomeTemplate let-row>
      <div class="income-cell">
        <span class="amount" [class.negative]="isNegative(row.netIncome)">
          {{ row.netIncome }} ج.م
        </span>
      </div>
    </ng-template>

    <ng-template #assignedToTemplate let-row>
      <span [class.text-muted]="!row.assignedTo">
        {{ row.assignedTo || '—' }}
      </span>
    </ng-template>

    <ng-template #actionsTemplate let-row>
      <div class="actions">
        <button mat-icon-button [matMenuTriggerFor]="menu" class="menu-trigger">
          <mat-icon>more_vert</mat-icon>
        </button>
        <mat-menu #menu="matMenu" xPosition="before">
          <button mat-menu-item [routerLink]="['/cases', row.id]">
            <mat-icon>visibility</mat-icon>
            <span>عرض</span>
          </button>
          <button mat-menu-item [routerLink]="['/cases', row.id, 'edit']">
            <mat-icon>edit</mat-icon>
            <span>تعديل</span>
          </button>
          <button mat-menu-item [routerLink]="['/cases', row.id, 'print']">
            <mat-icon>print</mat-icon>
            <span>طباعة</span>
          </button>
        </mat-menu>
      </div>
    </ng-template>
  `
})
export class CaseListComponent implements AfterViewInit {
  private readonly api = inject(CaseService);

  @ViewChild('caseCodeTemplate') caseCodeTemplate!: TemplateRef<any>;
  @ViewChild('statusTemplate') statusTemplate!: TemplateRef<any>;
  @ViewChild('incomeTemplate') incomeTemplate!: TemplateRef<any>;
  @ViewChild('assignedToTemplate') assignedToTemplate!: TemplateRef<any>;
  @ViewChild('actionsTemplate') actionsTemplate!: TemplateRef<any>;

  readonly page = signal(1);
  readonly pageSize = signal(10);
  readonly total = signal(0);
  readonly loading = signal(false);
  readonly columnsReady = signal(false);

  readonly filterForm = new FormGroup({
    code: new FormControl<string>('', { nonNullable: true }),
    name: new FormControl<string>('', { nonNullable: true }),
    researcher: new FormControl<number | null>(null)
  });

  private readonly filters$ = this.filterForm.valueChanges.pipe(
    startWith(this.filterForm.value),
    debounceTime(400),
    map(values => {
      const filters: CaseFilters = {};
      if (values.code) filters.code = values.code;
      if (values.name) filters.name = values.name;
      if (values.researcher) filters.researcher = values.researcher;
      return filters;
    })
  );

  readonly rows = toSignal(
    combineLatest([toObservable(this.page), this.filters$]).pipe(
      tap(() => this.loading.set(true)),
      switchMap(([p, filters]) => this.api.getCases(p, this.pageSize(), filters).pipe(
        map((res) => {
          this.total.set(res.meta?.count ?? 0);
          return res.data;
        }),
        finalize(() => this.loading.set(false))
      ))
    ),
    { initialValue: [] as any[] }
  );

  columns: ColumnDef[] = [];

  ngAfterViewInit(): void {
    this.columns = [
      { key: 'caseCode', header: 'رقم الحالة', width: '12%', cellTemplate: this.caseCodeTemplate },
      { key: 'fullName', header: 'الاسم', width: '18%' },
      { key: 'status', header: 'الحالة', width: '12%', cellTemplate: this.statusTemplate },
      { key: 'researcher', header: 'الباحث', width: '15%' },
      { key: 'assignedTo', header: 'المسند إليه', width: '15%', cellTemplate: this.assignedToTemplate },
      { key: 'governorate', header: 'المحافظة', width: '10%' },
      { key: 'netIncome', header: 'صافي الدخل', width: '10%', cellTemplate: this.incomeTemplate },
      { key: 'actions', header: 'إجراءات', width: '8%', cellTemplate: this.actionsTemplate }
    ];
    this.columnsReady.set(true);
  }

  onPageChange(event: PageEvent): void {
    this.page.set((event.pageIndex ?? 0) + 1);
    this.pageSize.set(event.pageSize ?? 10);
  }

  clearFilters(): void {
    this.filterForm.reset({
      code: '',
      name: '',
      researcher: null
    });
    this.page.set(1);
  }

  hasActiveFilters(): boolean {
    const values = this.filterForm.value;
    return !!(values.code || values.name || values.researcher);
  }

  getStatusClass(status: string): string {
    return status;
  }

  getStatusLabel(status: string): string {
    const statusLabels: { [key: string]: string } = {
      'draft': 'مسودة',
      'submitted': 'مقدم',
      'under_review': 'قيد المراجعة',
      'approved': 'مقبول',
      'rejected': 'مرفوض'
    };
    return statusLabels[status] || status;
  }

  isNegative(value: string): boolean {
    return parseFloat(value) < 0;
  }
}

export { CaseListComponent as CaseList };
