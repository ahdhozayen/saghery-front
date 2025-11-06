import { AfterViewInit, ChangeDetectionStrategy, Component, TemplateRef, ViewChild, inject, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { CaseService, CaseFilters } from '../../../core/services/case.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { PageEvent } from '../../../shared/components/data-table/data-table.component';
import { RouterLink } from '@angular/router';
import { combineLatest, debounceTime, finalize, map, startWith, switchMap, tap } from 'rxjs';
import { DataTableComponent, ColumnDef } from '../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-case-list',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DataTableComponent,
    RouterLink
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-6 animate-fadeIn" dir="rtl">
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start gap-6 mb-8">
        <div>
          <h1 class="text-4xl font-bold text-gray-900 mb-2">الحالات</h1>
          <p class="text-lg text-gray-600">إدارة حالات المستفيدين من البرنامج</p>
        </div>
        <a
          [routerLink]="'/cases/new'"
          class="inline-flex items-center gap-2 px-6 py-2.5 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>حالة جديدة</span>
        </a>
      </div>

      <!-- Filters Card -->
      <div class="bg-white rounded-xl border border-gray-200 shadow-md p-6 mb-6">
        <form [formGroup]="filterForm" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Case Code Filter -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">رقم الحالة</label>
              <div class="relative">
                <div class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <input
                  type="text"
                  formControlName="code"
                  placeholder="ابحث برقم الحالة"
                  class="block w-full pr-10 pl-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                         focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                         hover:border-gray-400"
                />
              </div>
            </div>

            <!-- Name Filter -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">الاسم</label>
              <div class="relative">
                <div class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  formControlName="name"
                  placeholder="ابحث بالاسم"
                  class="block w-full pr-10 pl-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                         focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                         hover:border-gray-400"
                />
              </div>
            </div>

            <!-- Researcher Filter -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700">رقم الباحث</label>
              <div class="relative">
                <div class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <input
                  type="number"
                  formControlName="researcher"
                  placeholder="رقم الباحث"
                  class="block w-full pr-10 pl-3 py-2 text-sm border border-gray-300 rounded-lg transition-all duration-200
                         focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                         hover:border-gray-400"
                />
              </div>
            </div>
          </div>

          <!-- Clear Filters Button -->
          <div class="flex justify-end">
            <button
              type="button"
              (click)="clearFilters()"
              [disabled]="!hasActiveFilters()"
              class="px-4 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>مسح الفلاتر</span>
            </button>
          </div>
        </form>
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
          [emptyMessage]="'لا توجد حالات'"
          [emptySubMessage]="'لم يتم العثور على أي حالات في النظام'"
          (page)="onPageChange($event)">
        </app-data-table>
      }
    </div>

    <!-- Case Code Template -->
    <ng-template #caseCodeTemplate let-row>
      <span class="font-mono font-semibold text-primary-500 text-sm">{{ row.caseCode }}</span>
    </ng-template>

    <!-- Status Template -->
    <ng-template #statusTemplate let-row>
      <span 
        class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
        [ngClass]="getStatusClasses(row.status)">
        {{ getStatusLabel(row.status) }}
      </span>
    </ng-template>

    <!-- Income Template -->
    <ng-template #incomeTemplate let-row>
      <div class="flex items-center">
        <span 
          class="font-semibold text-sm"
          [class.text-error]="isNegative(row.netIncome)"
          [class.text-gray-900]="!isNegative(row.netIncome)">
          {{ row.netIncome }} ج.م
        </span>
      </div>
    </ng-template>

    <!-- Guide Name Template -->
    <ng-template #guideNameTemplate let-row>
      <span [class.text-gray-400]="!row.guideName" [class.italic]="!row.guideName">
        {{ row.guideName || '—' }}
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
                [routerLink]="['/cases', row.id]"
                (click)="closeMenu()"
                class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>عرض</span>
              </a>
              <a
                [routerLink]="['/cases', row.id, 'edit']"
                (click)="closeMenu()"
                class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>تعديل</span>
              </a>
              <a
                [routerLink]="['/cases', row.id, 'print']"
                (click)="closeMenu()"
                class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                <span>طباعة</span>
              </a>
            </div>
          }
        </div>
      </div>
    </ng-template>
  `
})
export class CaseListComponent implements AfterViewInit {
  private readonly api = inject(CaseService);

  @ViewChild('caseCodeTemplate') caseCodeTemplate!: TemplateRef<any>;
  @ViewChild('statusTemplate') statusTemplate!: TemplateRef<any>;
  @ViewChild('incomeTemplate') incomeTemplate!: TemplateRef<any>;
  @ViewChild('guideNameTemplate') guideNameTemplate!: TemplateRef<any>;
  @ViewChild('actionsTemplate') actionsTemplate!: TemplateRef<any>;

  readonly currentPageIndex = signal(0);
  readonly pageSize = signal(10);
  readonly total = signal(0);
  readonly loading = signal(false);
  readonly columnsReady = signal(false);
  readonly openMenuId = signal<number | null>(null);

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
    combineLatest([toObservable(this.currentPageIndex), this.filters$]).pipe(
      tap(() => this.loading.set(true)),
      switchMap(([pageIndex, filters]) => this.api.getCases(pageIndex + 1, this.pageSize(), filters).pipe(
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
      { key: 'guideName', header: 'المرشد', width: '15%', cellTemplate: this.guideNameTemplate },
      { key: 'governorate', header: 'المحافظة', width: '10%' },
      { key: 'netIncome', header: 'صافي الدخل', width: '10%', cellTemplate: this.incomeTemplate },
      { key: 'actions', header: 'إجراءات', width: '8%', cellTemplate: this.actionsTemplate }
    ];
    this.columnsReady.set(true);
  }

  onPageChange(event: PageEvent): void {
    this.currentPageIndex.set(event.pageIndex ?? 0);
    this.pageSize.set(event.pageSize ?? 10);
  }

  clearFilters(): void {
    this.filterForm.reset({
      code: '',
      name: '',
      researcher: null
    });
    this.currentPageIndex.set(0);
  }

  hasActiveFilters(): boolean {
    const values = this.filterForm.value;
    return !!(values.code || values.name || values.researcher);
  }

  getStatusClasses(status: string): string {
    const statusMap: { [key: string]: string } = {
      'draft': 'bg-gray-100 text-gray-500',
      'submitted': 'bg-info-light text-info-dark',
      'under_review': 'bg-warning-light text-warning-dark',
      'approved': 'bg-success-light text-success-dark',
      'rejected': 'bg-error-light text-error-dark'
    };
    return statusMap[status] || 'bg-gray-100 text-gray-500';
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

export { CaseListComponent as CaseList };
