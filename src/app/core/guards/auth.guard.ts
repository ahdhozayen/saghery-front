import { CanActivateChildFn, CanMatchFn, Router, RouterStateSnapshot, UrlSegment, Route } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanMatchFn = (route?: Route, segments?: UrlSegment[]) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isAuthenticated() || localStorage.getItem('auth_token')) {
    return true;
  }
  const redirect = '/' + (segments ?? []).map(s => s.path).join('/');
  return router.createUrlTree(['/login'], { queryParams: { redirect } });
};

// Use this to protect children of the shell route to avoid matching '/login'
export const authChildGuard: CanActivateChildFn = (_route, state: RouterStateSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isAuthenticated() || localStorage.getItem('auth_token')) {
    return true;
  }
  // Preserve the attempted URL to redirect after login
  return router.createUrlTree(['/login'], { queryParams: { redirect: state.url } });
};


