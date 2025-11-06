import { AfterViewInit, ChangeDetectionStrategy, Component, TemplateRef, ViewChild, inject, signal, HostListener } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { PageEvent } from '../../../shared/components/data-table/data-table.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { finalize, map, switchMap, tap } from 'rxjs';
import { DataTableComponent, ColumnDef } from '../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, DataTableComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-6 animate-fadeIn" dir="rtl">
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start gap-6 mb-8">
        <div>
          <h1 class="text-4xl font-bold text-gray-900 mb-2">المستخدمون</h1>
          <p class="text-lg text-gray-600">إدارة مستخدمي النظام والصلاحيات</p>
        </div>
        <a
          [routerLink]="'/users/new'"
          class="inline-flex items-center gap-2 px-6 py-2.5 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>مستخدم جديد</span>
        </a>
      </div>

      <!-- Data Table -->
      @if (columnsReady()) {
        <app-data-table
          [columns]="columns"
          [rows]="rows()"
          [total]="total()"
          [pageSize]="pageSize()"
          [currentPageIndex]="currentPageIndex()"
          [loading]="loading()"
          [emptyMessage]="'لا يوجد مستخدمون'"
          [emptySubMessage]="'لم يتم العثور على أي مستخدمين في النظام'"
          (page)="onPageChange($event)">
        </app-data-table>
      }
    </div>

    <!-- Mobile Template -->
    <ng-template #mobileTemplate let-row>
      <span [class.text-gray-400]="!row.mobile" [class.italic]="!row.mobile">
        {{ row.mobile || '—' }}
      </span>
    </ng-template>

    <!-- Active Status Template -->
    <ng-template #activeTemplate let-row>
      <span 
        class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
        [class.bg-success-light]="row.active"
        [class.text-success-dark]="row.active"
        [class.bg-gray-100]="!row.active"
        [class.text-gray-500]="!row.active">
        {{ row.active ? 'نعم' : 'لا' }}
      </span>
    </ng-template>

    <!-- Actions Template -->
    <ng-template #actionsTemplate let-row>
      <div class="flex items-center gap-2">
        <div class="relative">
          <button
            (click)="toggleMenu(row.id)"
            class="w-9 h-9 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
          @if (openMenuId() === row.id) {
            <div class="absolute left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
              <a
                [routerLink]="['/users', row.id, 'edit']"
                (click)="closeMenu()"
                class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>تعديل</span>
              </a>
              <a
                [routerLink]="'/users/change-password'"
                (click)="closeMenu()"
                class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>تغيير كلمة المرور</span>
              </a>
            </div>
          }
        </div>
      </div>
    </ng-template>
  `
})
export class UserListComponent implements AfterViewInit {
  private readonly api = inject(UserService);

  @ViewChild('mobileTemplate') mobileTemplate!: TemplateRef<any>;
  @ViewChild('activeTemplate') activeTemplate!: TemplateRef<any>;
  @ViewChild('actionsTemplate') actionsTemplate!: TemplateRef<any>;

  readonly currentPageIndex = signal(0);
  readonly pageSize = signal(10);
  readonly total = signal(0);
  readonly loading = signal(false);
  readonly columnsReady = signal(false);
  readonly openMenuId = signal<number | null>(null);

  readonly rows = toSignal(
    toObservable(this.currentPageIndex).pipe(
      tap(() => this.loading.set(true)),
      switchMap((pageIndex) => this.api.getUsers(pageIndex + 1, this.pageSize()).pipe(
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
    this.currentPageIndex.set(event.pageIndex ?? 0);
    this.pageSize.set(event.pageSize ?? 10);
  }

  toggleMenu(id: number): void {
    this.openMenuId.set(this.openMenuId() === id ? null : id);
  }

  closeMenu(): void {
    this.openMenuId.set(null);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.closeMenu();
    }
  }
}

export { UserListComponent as UserList };

