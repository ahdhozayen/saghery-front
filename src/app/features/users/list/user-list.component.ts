import { AfterViewInit, ChangeDetectionStrategy, Component, TemplateRef, ViewChild, inject, signal } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { finalize, map, switchMap, tap } from 'rxjs';
import { DataTableComponent, ColumnDef } from '../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-user-list',
  imports: [DataTableComponent, MatButtonModule, MatIconModule, MatMenuModule, RouterLink],
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

    .text-muted {
      color: var(--color-text-muted);
      font-style: italic;
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      padding: var(--spacing-xs) var(--spacing-md);
      border-radius: var(--radius-full);
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-medium);
      white-space: nowrap;

      &.active {
        background-color: rgba(16, 185, 129, 0.1);
        color: var(--color-success);
      }

      &.inactive {
        background-color: rgba(156, 163, 175, 0.1);
        color: var(--color-text-muted);
      }
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
    }
  `],
  template: `
    <div class="page-container">
      <div class="page-header">
        <div>
          <h1 class="page-title">المستخدمون</h1>
          <p class="page-subtitle">إدارة مستخدمي النظام والصلاحيات</p>
        </div>
        <a mat-flat-button color="primary" [routerLink]="'/users/new'" class="add-button">
          <span>+ مستخدم جديد</span>
        </a>
      </div>

      @if (columnsReady()) {
        <app-data-table
          [columns]="columns"
          [rows]="rows()"
          [total]="total()"
          [pageSize]="pageSize()"
          [loading]="loading()"
          [emptyMessage]="'لا يوجد مستخدمون'"
          [emptySubMessage]="'لم يتم العثور على أي مستخدمين في النظام'"
          (page)="onPageChange($event)">
        </app-data-table>
      }
    </div>

    <ng-template #mobileTemplate let-row>
      <span [class.text-muted]="!row.mobile">
        {{ row.mobile || '—' }}
      </span>
    </ng-template>

    <ng-template #activeTemplate let-row>
      <span class="status-badge" [class.active]="row.active" [class.inactive]="!row.active">
        {{ row.active ? 'نعم' : 'لا' }}
      </span>
    </ng-template>

    <ng-template #actionsTemplate let-row>
      <div class="actions">
        <button mat-icon-button [matMenuTriggerFor]="menu" class="menu-trigger">
          <mat-icon>more_vert</mat-icon>
        </button>
        <mat-menu #menu="matMenu" xPosition="before">
          <button mat-menu-item [routerLink]="['/users', row.id, 'edit']">
            <mat-icon>edit</mat-icon>
            <span>تعديل</span>
          </button>
          <button mat-menu-item [routerLink]="'/users/change-password'">
            <mat-icon>lock</mat-icon>
            <span>تغيير كلمة المرور</span>
          </button>
        </mat-menu>
      </div>
    </ng-template>
  `
})
export class UserListComponent implements AfterViewInit {
  private readonly api = inject(UserService);

  @ViewChild('mobileTemplate') mobileTemplate!: TemplateRef<any>;
  @ViewChild('activeTemplate') activeTemplate!: TemplateRef<any>;
  @ViewChild('actionsTemplate') actionsTemplate!: TemplateRef<any>;

  readonly page = signal(1);
  readonly pageSize = signal(10);
  readonly total = signal(0);
  readonly loading = signal(false);
  readonly columnsReady = signal(false);

  readonly rows = toSignal(
    toObservable(this.page).pipe(
      tap(() => this.loading.set(true)),
      switchMap((p) => this.api.getUsers(p, this.pageSize()).pipe(
        map((res) => {
          this.total.set(res.meta?.count ?? 0);
          return res.data;
        }),
        finalize(() => this.loading.set(false))
      ))
    ),
    { initialValue: [] }
  );

  columns: ColumnDef[] = [];

  ngAfterViewInit(): void {
    this.columns = [
      { key: 'fullName', header: 'الاسم', width: '25%' },
      { key: 'mobile', header: 'الموبايل', width: '20%', cellTemplate: this.mobileTemplate },
      { key: 'role', header: 'الدور', width: '15%' },
      { key: 'active', header: 'نشط', width: '10%', cellTemplate: this.activeTemplate },
      { key: 'actions', header: 'إجراءات', width: '30%', cellTemplate: this.actionsTemplate }
    ];
    this.columnsReady.set(true);
  }

  onPageChange(event: PageEvent): void {
    this.page.set((event.pageIndex ?? 0) + 1);
    this.pageSize.set(event.pageSize ?? 10);
  }
}

export { UserListComponent as UserList };

