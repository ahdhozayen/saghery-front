# DataTable Component

A modern, reusable Angular Material table component with consistent UI/UX across the system.

## Features

- ✅ Modern, responsive design
- ✅ Loading states with spinner
- ✅ Empty states with custom messages
- ✅ Pagination with customizable page sizes
- ✅ Custom cell templates
- ✅ Column width configuration
- ✅ RTL support
- ✅ Hover effects
- ✅ Consistent styling across the system

## Basic Usage

```typescript
import { DataTableComponent, ColumnDef } from '@shared/components/data-table/data-table.component';

@Component({
  imports: [DataTableComponent],
  template: `
    <app-data-table
      [columns]="columns"
      [rows]="data()"
      [total]="total()"
      [pageSize]="pageSize()"
      [loading]="loading()"
      (page)="onPageChange($event)">
    </app-data-table>
  `
})
export class MyComponent {
  columns: ColumnDef[] = [
    { key: 'name', header: 'الاسم', width: '30%' },
    { key: 'email', header: 'البريد الإلكتروني', width: '40%' },
    { key: 'status', header: 'الحالة', width: '30%' }
  ];

  data = signal([
    { name: 'أحمد', email: 'ahmad@example.com', status: 'نشط' },
    { name: 'محمد', email: 'mohamed@example.com', status: 'غير نشط' }
  ]);

  total = signal(2);
  pageSize = signal(10);
  loading = signal(false);

  onPageChange(event: PageEvent): void {
    // Handle pagination
  }
}
```

## Custom Cell Templates

```typescript
import { TemplateRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  imports: [DataTableComponent, MatButtonModule],
  template: `
    <app-data-table
      [columns]="columns"
      [rows]="data()"
      (page)="onPageChange($event)">
    </app-data-table>

    <ng-template #statusTemplate let-row>
      <span class="badge" [class.active]="row.status === 'active'">
        {{ row.status }}
      </span>
    </ng-template>

    <ng-template #actionsTemplate let-row>
      <button mat-button (click)="edit(row)">تعديل</button>
      <button mat-button (click)="delete(row)">حذف</button>
    </ng-template>
  `
})
export class MyComponent implements AfterViewInit {
  @ViewChild('statusTemplate') statusTemplate!: TemplateRef<any>;
  @ViewChild('actionsTemplate') actionsTemplate!: TemplateRef<any>;

  columns: ColumnDef[] = [];
  columnsReady = signal(false);

  ngAfterViewInit(): void {
    this.columns = [
      { key: 'name', header: 'الاسم', width: '30%' },
      { key: 'status', header: 'الحالة', width: '30%', cellTemplate: this.statusTemplate },
      { key: 'actions', header: 'إجراءات', width: '40%', cellTemplate: this.actionsTemplate }
    ];
    this.columnsReady.set(true);
  }
}
```

## Input Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `columns` | `ColumnDef[]` | required | Column definitions |
| `rows` | `T[]` | required | Data rows to display |
| `total` | `number` | 0 | Total count for pagination |
| `pageSize` | `number` | 10 | Page size |
| `pageSizeOptions` | `number[]` | [5, 10, 25, 50, 100] | Available page sizes |
| `loading` | `boolean` | false | Show loading spinner |
| `emptyMessage` | `string` | 'لا توجد بيانات' | Empty state title |
| `emptySubMessage` | `string` | 'لم يتم العثور على أي سجلات' | Empty state subtitle |
| `showPagination` | `boolean` | true | Show/hide pagination |

## Output Events

| Event | Type | Description |
|-------|------|-------------|
| `page` | `PageEvent` | Emitted when page changes |

## Column Definition

```typescript
interface ColumnDef<T = any> {
  key: string;              // Property key to display
  header: string;           // Column header text
  width?: string;           // Column width (e.g., '30%', '200px')
  cellTemplate?: TemplateRef<any>; // Custom template for cell content
}
```

## Styling

The table uses CSS variables from the global design system:
- `--color-surface` - Table background
- `--color-border` - Borders
- `--color-text` - Text color
- `--spacing-*` - Spacing values
- `--shadow-*` - Shadow values
- etc.

All styling is consistent with the application's design system.
