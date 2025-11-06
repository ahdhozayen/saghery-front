import { ChangeDetectionStrategy, Component, InputSignal, OutputEmitterRef, TemplateRef, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface PageEvent {
  pageIndex: number;
  pageSize: number;
  length: number;
}

export interface ColumnDef<T = any> {
  key: string;
  header: string;
  width?: string;
  cellTemplate?: TemplateRef<any>;
}

@Component({
  selector: 'app-data-table',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative bg-white rounded-xl border border-gray-200 overflow-hidden shadow-md animate-fadeIn" dir="rtl">
      <!-- Loading Overlay -->
      @if (loading()) {
        <div class="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-10">
          <div class="flex flex-col items-center gap-3">
            <svg class="w-12 h-12 text-primary-500 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="text-sm text-gray-600">جاري التحميل...</span>
          </div>
        </div>
      }

      <!-- Table Wrapper -->
      <div class="overflow-x-auto">
        <table class="w-full bg-white">
          <!-- Table Header -->
          <thead class="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              @for (col of columns(); track col.key) {
                <th 
                  class="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  [style.width]="col.width">
                  {{ col.header }}
                </th>
              }
            </tr>
          </thead>

          <!-- Table Body -->
          <tbody class="bg-white divide-y divide-gray-200">
            @if (!loading() && rows().length > 0) {
              @for (row of rows(); track $index) {
                <tr class="hover:bg-gray-50 transition-colors duration-150 even:bg-gray-50/30">
                  @for (col of columns(); track col.key) {
                    <td class="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                      @if (col.cellTemplate) {
                        <ng-container *ngTemplateOutlet="col.cellTemplate; context: { $implicit: row, index: $index }"></ng-container>
                      } @else {
                        {{ getRowValue(row, col.key) }}
                      }
                    </td>
                  }
                </tr>
              }
            }

            <!-- Empty State -->
            @if (!loading() && rows().length === 0) {
              <tr>
                <td [attr.colspan]="columns().length" class="px-6 py-16 text-center">
                  <div class="flex flex-col items-center gap-3">
                    <div class="text-5xl opacity-50">📋</div>
                    <h3 class="text-lg font-semibold text-gray-900">{{ emptyMessage() }}</h3>
                    <p class="text-sm text-gray-600">{{ emptySubMessage() }}</p>
                  </div>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      @if (showPagination() && total() > 0) {
        <div class="px-4 py-3 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <!-- Page Info -->
          <div class="text-sm text-gray-700">
            عرض 
            <span class="font-medium">{{ startIndex() }}</span>
            إلى 
            <span class="font-medium">{{ endIndex() }}</span>
            من 
            <span class="font-medium">{{ total() }}</span>
            نتيجة
          </div>

          <!-- Pagination Controls -->
          <div class="flex items-center gap-2">
            <!-- Page Size Selector -->
            <select
              [value]="pageSize()"
              (change)="onPageSizeChange($event)"
              class="px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent cursor-pointer"
            >
              @for (size of pageSizeOptions(); track size) {
                <option [value]="size">{{ size }}</option>
              }
            </select>

            <!-- Previous Button -->
            <button
              (click)="goToPreviousPage()"
              [disabled]="currentPage() === 1"
              class="px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              السابق
            </button>

            <!-- Page Numbers -->
            <div class="flex items-center gap-1">
              @for (pageNum of visiblePages(); track pageNum) {
                @if (pageNum === '...') {
                  <span class="px-2 py-1 text-sm text-gray-500">...</span>
                } @else {
                  <button
                    (click)="goToPage(typeof pageNum === 'number' ? pageNum : 1)"
                    [class.bg-primary-500]="pageNum === currentPage()"
                    [class.text-white]="pageNum === currentPage()"
                    [class.text-gray-700]="pageNum !== currentPage()"
                    class="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors min-w-[40px]"
                  >
                    {{ pageNum }}
                  </button>
                }
              }
            </div>

            <!-- Next Button -->
            <button
              (click)="goToNextPage()"
              [disabled]="currentPage() === totalPages()"
              class="px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              التالي
            </button>
          </div>
        </div>
      }
    </div>
  `
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
  readonly currentPageIndex = input<number>(0);

  readonly page: OutputEmitterRef<PageEvent> = output<PageEvent>();

  // Computed values for pagination
  readonly currentPage = computed(() => this.currentPageIndex() + 1);
  readonly totalPages = computed(() => Math.ceil(this.total() / this.pageSize()));
  readonly startIndex = computed(() => {
    if (this.total() === 0) return 0;
    return (this.currentPageIndex() * this.pageSize()) + 1;
  });
  readonly endIndex = computed(() => {
    const end = (this.currentPageIndex() + 1) * this.pageSize();
    return Math.min(end, this.total());
  });

  readonly visiblePages = computed(() => {
    const current = this.currentPage();
    const total = this.totalPages();
    const pages: (number | string)[] = [];

    if (total <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (current > 3) {
        pages.push('...');
      }

      // Show pages around current
      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (current < total - 2) {
        pages.push('...');
      }

      // Always show last page
      pages.push(total);
    }

    return pages;
  });

  onPageSizeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const newPageSize = parseInt(target.value, 10);
    this.page.emit({
      pageIndex: 0,
      pageSize: newPageSize,
      length: this.total()
    });
  }

  goToPage(pageNum: number): void {
    this.page.emit({
      pageIndex: pageNum - 1,
      pageSize: this.pageSize(),
      length: this.total()
    });
  }

  goToPreviousPage(): void {
    if (this.currentPage() > 1) {
      this.goToPage(this.currentPage() - 1);
    }
  }

  goToNextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.goToPage(this.currentPage() + 1);
    }
  }

  getRowValue(row: T, key: string): any {
    return (row as Record<string, any>)[key];
  }
}

export { DataTableComponent as DataTable };
