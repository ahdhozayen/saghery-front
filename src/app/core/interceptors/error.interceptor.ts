import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  let retried = false;
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401 && !retried) {
        retried = true;
        const refresh = localStorage.getItem('refresh_token');
        if (!refresh) return throwError(() => err);
        return auth.refresh().pipe(
          switchMap((res: any) => {
            const access = res?.access;
            const newRefresh = res?.refresh;
            if (access) {
              auth.setSession(access, auth.user()!, newRefresh);
              const cloned = req.clone({ setHeaders: { Authorization: `Bearer ${access}` } });
              return next(cloned);
            }
            return throwError(() => err);
          })
        );
      }
      return throwError(() => err);
    })
  );
};

