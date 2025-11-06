import { Routes } from '@angular/router';

export const USERS_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./list/user-list.component').then(m => m.UserListComponent) },
  { path: 'new', loadComponent: () => import('./form/user-form.component').then(m => m.UserFormComponent) },
  { path: ':id/edit', loadComponent: () => import('./form/user-form.component').then(m => m.UserFormComponent) },
  { path: ':id', loadComponent: () => import('./detail/user-detail.component').then(m => m.UserDetailComponent) },
  { path: ':id/delete', loadComponent: () => import('./delete/user-delete.component').then(m => m.UserDeleteComponent) },
  { path: 'profile/me', loadComponent: () => import('./profile/user-profile.component').then(m => m.UserProfileComponent) },
  { path: 'change-password', loadComponent: () => import('./profile/change-password.component').then(m => m.ChangePasswordComponent) }
];

