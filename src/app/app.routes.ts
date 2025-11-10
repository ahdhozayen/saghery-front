import { Routes } from '@angular/router';
import { ShellComponent } from './shared/layout/shell.component';
import { authChildGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: '',
    component: ShellComponent,
    canActivateChild: [authChildGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'cases',
        loadChildren: () => import('./features/cases/cases.routes').then((m) => m.CASES_ROUTES),
      },
      {
        path: 'users',
        loadChildren: () => import('./features/users/users.routes').then((m) => m.USERS_ROUTES),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register-organization',
    loadComponent: () => import('./features/auth/register-organization.component').then((m) => m.RegisterOrganizationComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./shared/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
