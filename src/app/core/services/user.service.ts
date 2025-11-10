import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface UserItem { id: number; fullName: string; role: string; username: string; email?: string; mobile?: string; active?: boolean; }
export interface Paginated<T> { data: T[]; meta: { count: number; page: number; page_size: number; num_pages: number; }; }
export interface CreateUserPayload { username: string; email?: string; full_name: string; password: string; role: string; mobile?: string; is_active?: boolean; }
export interface UpdateUserPayload { username: string; email?: string; full_name: string; role: string; mobile?: string; is_active?: boolean; password?: string; }
export interface CreateUserResponse { success: boolean; message: string; data: UserItem; errors: any; meta: any; }
export interface UpdateUserResponse { success: boolean; message: string; data: UserItem; errors: any; meta: any; }

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);

  getUsers(page = 1, pageSize = 10): Observable<Paginated<UserItem>> {
    const params = new HttpParams().set('page', page).set('page_size', pageSize);
    return this.http.get<any>('users/', { params }).pipe(
      map(res => ({ data: res?.data ?? [], meta: res?.meta ?? { count: 0, page, page_size: pageSize, num_pages: 0 } }))
    );
  }

  getResearchers(page = 1, pageSize = 100): Observable<Paginated<UserItem>> {
    const params = new HttpParams()
      .set('page', page)
      .set('page_size', pageSize)
      .set('role', 'researcher');
    return this.http.get<any>('users/', { params }).pipe(
      map(res => ({
        data: (res?.data ?? []).filter((user: UserItem) => user.role === 'researcher'),
        meta: res?.meta ?? { count: 0, page, page_size: pageSize, num_pages: 0 }
      }))
    );
  }

  getUser(id: string | number): Observable<UserItem> {
    return this.http.get<any>(`users/${id}/`).pipe(
      map(res => {
        const data = res?.data ?? res;
        return {
          id: data.id,
          fullName: data.full_name,
          username: data.username,
          email: data.email,
          mobile: data.mobile,
          role: data.role,
          active: data.is_active
        };
      })
    );
  }

  createUser(payload: CreateUserPayload): Observable<CreateUserResponse> {
    return this.http.post<CreateUserResponse>('users/create/', payload);
  }

  updateUser(id: string | number, payload: UpdateUserPayload): Observable<UpdateUserResponse> {
    return this.http.patch<UpdateUserResponse>(`users/${id}/`, payload);
  }
}

export type { UserItem as IUserItem };

