import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionStore } from '../state/session.store';
import { APP_CONFIG, IAppConfig } from '../config/app-config.token';

export interface LoginRequest { email: string; password: string; }
export interface AuthUser { id: number; fullName: string; role: string; email: string; }
export interface LoginResponse { access: string; refresh: string; user: AuthUser }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly session = inject(SessionStore);
  private readonly config = inject<IAppConfig>(APP_CONFIG);

  readonly user = signal<AuthUser | null>(null);
  readonly isAuthenticated = signal<boolean>(false);

  constructor() {
    // Restore session from storage on bootstrap/refresh
    const access = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('auth_user');
    if (access && storedUser) {
      try {
        const user: AuthUser = JSON.parse(storedUser);
        this.user.set(user);
        this.isAuthenticated.set(true);
        this.session.setUser(user);
      } catch {
        // Corrupt data -> clear
        localStorage.removeItem('auth_user');
      }
    }
  }

  login(payload: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.config.apiBaseUrl}/auth/login/`, payload);
  }

  setSession(access: string, user: AuthUser, refresh?: string): void {
    localStorage.setItem('auth_token', access);
    if (refresh) localStorage.setItem('refresh_token', refresh);
    localStorage.setItem('auth_user', JSON.stringify(user));
    this.user.set(user);
    this.isAuthenticated.set(true);
    this.session.setUser(user);
  }

  logout(): void {
    const refresh = localStorage.getItem('refresh_token');
    if (refresh) {
      this.http.post(`${this.config.apiBaseUrl}/auth/logout/`, { refresh }).subscribe({ next: () => {}, error: () => {} });
    }
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('auth_user');
    this.user.set(null);
    this.isAuthenticated.set(false);
    this.session.setUser(null);
  }

  refresh() {
    const refresh = localStorage.getItem('refresh_token');
    if (!refresh) return this.http.post<LoginResponse>(`${this.config.apiBaseUrl}/auth/refresh/`, { refresh });
    return this.http.post<{ access: string; refresh: string }>(`${this.config.apiBaseUrl}/auth/refresh/`, { refresh });
  }
}

export type { AuthUser as IAuthUser };

