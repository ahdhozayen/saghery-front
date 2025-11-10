import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrganizationRegistrationPayload {
  // Organization fields
  organization_name: string;
  organization_name_en?: string;
  organization_email?: string;
  organization_phone?: string;
  organization_address?: string;
  registration_number?: string;
  established_date?: string;

  // Admin user fields
  username: string;
  full_name: string;
  email?: string;
  mobile?: string;
  password: string;
  confirm_password: string;
}

export interface OrganizationRegistrationResponse {
  success: boolean;
  message: string;
  data: {
    organization: {
      id: number;
      name: string;
      email?: string;
    };
    user: {
      id: number;
      username: string;
      fullName: string;
      email?: string;
    };
  };
  errors?: any;
}

@Injectable({ providedIn: 'root' })
export class OrganizationService {
  private readonly http = inject(HttpClient);

  register(payload: OrganizationRegistrationPayload): Observable<OrganizationRegistrationResponse> {
    return this.http.post<OrganizationRegistrationResponse>('tenants/register/', payload);
  }
}

