import { CanDeactivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';

export interface ComponentWithUnsavedChanges {
  hasUnsavedChanges(): boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<ComponentWithUnsavedChanges> = (
  component: ComponentWithUnsavedChanges
): Observable<boolean> | boolean => {
  if (!component.hasUnsavedChanges || !component.hasUnsavedChanges()) {
    return true;
  }

  const dialog = inject(MatDialog);

  const dialogRef = dialog.open(ConfirmDialogComponent, {
    width: '400px',
    data: {
      title: 'تحذير: تغييرات غير محفوظة',
      message: 'لديك تغييرات غير محفوظة. هل تريد المغادرة دون حفظ؟',
      confirmText: 'المغادرة',
      cancelText: 'البقاء',
      confirmColor: 'warn'
    },
    direction: 'rtl'
  });

  return dialogRef.afterClosed().pipe(
    map(result => result === true)
  );
};
