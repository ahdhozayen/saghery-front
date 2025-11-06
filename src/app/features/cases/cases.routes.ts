import { Routes } from '@angular/router';
import { unsavedChangesGuard } from '../../core/guards/unsaved-changes.guard';

export const CASES_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./list/case-list.component').then(m => m.CaseListComponent) },
  {
    path: 'new',
    loadComponent: () => import('./form/case-form.component').then(m => m.CaseFormComponent),
    canDeactivate: [unsavedChangesGuard]
  },
  { path: ':id', loadComponent: () => import('./detail/case-detail.component').then(m => m.CaseDetailComponent) },
  { path: ':id/print', loadComponent: () => import('./print/case-print.component').then(m => m.CasePrintComponent) },
  { path: 'search/all', loadComponent: () => import('./search/case-search.component').then(m => m.CaseSearchComponent) }
];

