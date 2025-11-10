import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface DashboardSummary {
  totalCases: number;
  approved: {
    count: number;
    percentage: number;
  };
  underReview: {
    count: number;
    percentage: number;
  };
  totalNeeds: number;
  unfulfilledNeeds: number;
  unfulfilledPercentage: number;
}

export interface NeedDistribution {
  type: string;
  total: number;
  fulfilled: number;
  pending: number;
}

export interface StatusDistribution {
  name: string;
  count: number;
  percentage: number;
}

export interface GeographicDistribution {
  governorate: string;
  count: number;
}

export interface FinancialStatistics {
  avgIncome: number;
  avgExpenses: number;
  avgNetIncome: number;
  totalDebt: number;
}

export interface DashboardData {
  summary: DashboardSummary;
  needsDistribution: NeedDistribution[];
  statusDistribution: StatusDistribution[];
  geographicDistribution: GeographicDistribution[];
  financialStatistics: FinancialStatistics;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly http = inject(HttpClient);

  getStatistics(): Observable<DashboardData> {
    return this.http.get<ApiResponse<DashboardData>>('dashboard/statistics/').pipe(
      map(res => res?.data ?? {
        summary: {
          totalCases: 0,
          approved: { count: 0, percentage: 0 },
          underReview: { count: 0, percentage: 0 },
          totalNeeds: 0,
          unfulfilledNeeds: 0,
          unfulfilledPercentage: 0
        },
        needsDistribution: [],
        statusDistribution: [],
        geographicDistribution: [],
        financialStatistics: {
          avgIncome: 0,
          avgExpenses: 0,
          avgNetIncome: 0,
          totalDebt: 0
        }
      })
    );
  }
}

