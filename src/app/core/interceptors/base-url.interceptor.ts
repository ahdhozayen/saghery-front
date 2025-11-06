import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { APP_CONFIG } from '../config/app-config.token';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const { apiBaseUrl } = inject(APP_CONFIG);
  const isAbsolute = /^https?:\/\//i.test(req.url);
  const url = isAbsolute ? req.url : `${apiBaseUrl.replace(/\/$/, '')}/${req.url.replace(/^\//, '')}`;
  return next(req.clone({ url }));
};


