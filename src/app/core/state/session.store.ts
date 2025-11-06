import { Injectable, computed, signal } from '@angular/core';
import type { IAuthUser } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class SessionStore {
  readonly user = signal<IAuthUser | null>(null);
  readonly isAuthenticated = computed(() => this.user() !== null);
  readonly role = computed(() => this.user()?.role ?? null);
  readonly fullName = computed(() => this.user()?.fullName ?? '');

  setUser(user: IAuthUser | null): void {
    this.user.set(user);
  }
}


