import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { APP_CONFIG, DEFAULT_APP_CONFIG } from './core/config/app-config.token';
import { baseUrlInterceptor } from './core/interceptors/base-url.interceptor';
import { authTokenInterceptor } from './core/interceptors/auth-token.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([baseUrlInterceptor, authTokenInterceptor, errorInterceptor])),
    { provide: APP_CONFIG, useValue: DEFAULT_APP_CONFIG },
  ]
};
