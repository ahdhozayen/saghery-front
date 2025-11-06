import { InjectionToken } from '@angular/core';

export interface AppConfig {
  apiBaseUrl: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');

export const DEFAULT_APP_CONFIG: AppConfig = {
  apiBaseUrl: 'http://localhost:8000/api/v1'
};

export type { AppConfig as IAppConfig };

