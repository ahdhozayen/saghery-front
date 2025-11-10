import { ChangeDetectionStrategy, Component, signal, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../core/services/translation.service';
import { LanguageService } from '../../core/services/language.service';
import { DashboardService } from '../../core/services/dashboard.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatCardModule, MatTableModule, MatProgressSpinnerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dashboard" [dir]="languageService.isRTL() ? 'rtl' : 'ltr'">
      <header class="page-header">
        <div>
          <h1 class="page-title">{{ t().dashboardTitle }}</h1>
          <p class="page-subtitle">{{ t().dashboardSubtitle }}</p>
        </div>
      </header>

      @if (loading()) {
        <div class="loading-container">
          <mat-spinner diameter="50"></mat-spinner>
          <p class="loading-text">جاري تحميل البيانات...</p>
        </div>
      } @else {

      <div class="stats-grid">
        <div class="stat-card stat-primary">
          <div class="stat-content">
            <div class="stat-info">
              <h6 class="stat-label">{{ t().totalCases }}</h6>
              <h2 class="stat-value">{{ stats().totalCases }}</h2>
            </div>
            <div class="stat-icon">
              <span>📁</span>
            </div>
          </div>
        </div>

        <div class="stat-card stat-success">
          <div class="stat-content">
            <div class="stat-info">
              <h6 class="stat-label">{{ t().approved }}</h6>
              <h2 class="stat-value">{{ stats().approved.count }}</h2>
            </div>
            <div class="stat-icon">
              <span>✅</span>
            </div>
          </div>
          <div class="stat-footer">{{ stats().approved.percentage }}% {{ t().ofTotal }}</div>
        </div>

        <div class="stat-card stat-warning">
          <div class="stat-content">
            <div class="stat-info">
              <h6 class="stat-label">{{ t().underReview }}</h6>
              <h2 class="stat-value">{{ stats().underReview.count }}</h2>
            </div>
            <div class="stat-icon">
              <span>⏱️</span>
            </div>
          </div>
          <div class="stat-footer">{{ stats().underReview.percentage }}% {{ t().ofTotal }}</div>
        </div>

        <div class="stat-card stat-info">
          <div class="stat-content">
            <div class="stat-info">
              <h6 class="stat-label">{{ t().totalNeeds }}</h6>
              <h2 class="stat-value">{{ stats().totalNeeds }}</h2>
            </div>
            <div class="stat-icon">
              <span>🤝</span>
            </div>
          </div>
          <div class="stat-footer">{{ stats().unfulfilled }} {{ t().unfulfilled }} ({{ stats().unfulfilledPct }}%)</div>
        </div>
      </div>

      <div class="content-grid">
        <mat-card class="modern-card" appearance="outlined">
          <div class="card-header">
            <h3 class="card-title">{{ t().familyNeedsDistribution }}</h3>
          </div>
          <div class="card-body">
            <div class="chips-container">
              @for (n of needs(); track n.type) {
                <div class="chip">
                  <span class="chip-label">{{ n.type }}</span>
                  <span class="chip-badge">{{ n.total }}</span>
                </div>
              }
              @empty {
                <div class="empty-state">{{ t().noNeedsRegistered }}</div>
              }
            </div>
          </div>
        </mat-card>

        <mat-card class="modern-card" appearance="outlined">
          <div class="card-header">
            <h3 class="card-title">{{ t().caseStatusDistribution }}</h3>
          </div>
          <div class="card-body">
            <div class="chips-container">
              @for (s of statusCounts(); track s.name) {
                <div class="chip">
                  <span class="chip-label">{{ s.name }}</span>
                  <span class="chip-badge">{{ s.count }}</span>
                </div>
              }
              @empty {
                <div class="empty-state">{{ t().noData }}</div>
              }
            </div>
          </div>
        </mat-card>
      </div>

      <mat-card class="modern-card table-card" appearance="outlined">
        <div class="card-header">
          <h3 class="card-title">{{ t().mostRequestedNeeds }}</h3>
        </div>
        <div class="card-body">
          <table mat-table [dataSource]="needs()" class="modern-table">
            <ng-container matColumnDef="type">
              <th mat-header-cell *matHeaderCellDef>{{ t().needType }}</th>
              <td mat-cell *matCellDef="let row">{{ row.type }}</td>
            </ng-container>
            <ng-container matColumnDef="total">
              <th mat-header-cell *matHeaderCellDef>{{ t().totalRequests }}</th>
              <td mat-cell *matCellDef="let row">{{ row.total }}</td>
            </ng-container>
            <ng-container matColumnDef="fulfilled">
              <th mat-header-cell *matHeaderCellDef>{{ t().fulfilled }}</th>
              <td mat-cell *matCellDef="let row">
                <span class="table-badge badge-success">{{ row.fulfilled }}</span>
              </td>
            </ng-container>
            <ng-container matColumnDef="pending">
              <th mat-header-cell *matHeaderCellDef>{{ t().pending }}</th>
              <td mat-cell *matCellDef="let row">
                <span class="table-badge badge-warning">{{ row.pending }}</span>
              </td>
            </ng-container>
            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
          </table>
        </div>
      </mat-card>

      <div class="content-grid">
        <mat-card class="modern-card" appearance="outlined">
          <div class="card-header">
            <h3 class="card-title">{{ t().geographicDistribution }}</h3>
          </div>
          <div class="card-body">
            <div class="list-container">
              @for (l of locations(); track l.governorate) {
                <div class="list-item">
                  <span class="list-label">{{ l.governorate }}</span>
                  <span class="list-badge">{{ l.count }}</span>
                </div>
              }
              @empty {
                <div class="empty-state">{{ t().noData }}</div>
              }
            </div>
          </div>
        </mat-card>

        <mat-card class="modern-card" appearance="outlined">
          <div class="card-header">
            <h3 class="card-title">{{ t().financialStatistics }}</h3>
          </div>
          <div class="card-body">
            <div class="financial-grid">
              <div class="financial-item">
                <span class="financial-label">{{ t().avgMonthlyIncome }}</span>
                <h3 class="financial-value success">{{ financial().avgIncome }} {{ t().egp }}</h3>
              </div>
              <div class="financial-item">
                <span class="financial-label">{{ t().avgExpenses }}</span>
                <h3 class="financial-value danger">{{ financial().avgExpenses }} {{ t().egp }}</h3>
              </div>
              <div class="financial-item">
                <span class="financial-label">{{ t().avgNetIncome }}</span>
                <h3 class="financial-value info">{{ financial().avgNetIncome }} {{ t().egp }}</h3>
              </div>
              <div class="financial-item">
                <span class="financial-label">{{ t().totalDebt }}</span>
                <h3 class="financial-value warning">{{ financial().totalDebt }} {{ t().egp }}</h3>
              </div>
            </div>
          </div>
        </mat-card>
      </div>
      }
    </div>
  `,
  styles: [`
    .dashboard {
      padding: var(--spacing-xl);
      max-width: 1400px;
      margin: 0 auto;
      animation: fadeIn var(--transition-base);
    }

    .page-header {
      margin-bottom: var(--spacing-xl);

      .page-title {
        font-size: var(--font-size-4xl);
        font-weight: var(--font-weight-bold);
        color: var(--color-text-primary);
        margin: 0 0 var(--spacing-sm);
      }

      .page-subtitle {
        font-size: var(--font-size-lg);
        color: var(--color-text-secondary);
        margin: 0;
      }
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: var(--spacing-lg);
      margin-bottom: var(--spacing-xl);
    }

    .stat-card {
      background: var(--color-surface);
      border-radius: var(--radius-lg);
      padding: var(--spacing-lg);
      box-shadow: var(--shadow-md);
      border: 1px solid var(--color-border-light);
      transition: all var(--transition-base);
      position: relative;
      overflow: hidden;

      &:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-lg);
      }

      &.stat-primary {
        border-top: 4px solid var(--color-primary);
      }

      &.stat-success {
        border-top: 4px solid var(--color-success);
      }

      &.stat-warning {
        border-top: 4px solid var(--color-warning);
      }

      &.stat-info {
        border-top: 4px solid var(--color-info);
      }

      .stat-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--spacing-sm);
      }

      .stat-info {
        flex: 1;
      }

      .stat-label {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        margin: 0 0 var(--spacing-xs);
        font-weight: var(--font-weight-medium);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .stat-value {
        font-size: var(--font-size-3xl);
        font-weight: var(--font-weight-bold);
        color: var(--color-text-primary);
        margin: 0;
      }

      .stat-icon {
        font-size: 48px;
        opacity: 0.2;
      }

      .stat-footer {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        padding-top: var(--spacing-sm);
        border-top: 1px solid var(--color-border-light);
      }
    }

    .content-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: var(--spacing-lg);
      margin-bottom: var(--spacing-xl);
    }

    .modern-card {
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      transition: all var(--transition-base);
      overflow: hidden;

      &:hover {
        box-shadow: var(--shadow-lg);
        transform: translateY(-2px);
      }

      .card-header {
        padding: var(--spacing-lg);
        background: var(--color-surface-hover);
        border-bottom: 1px solid var(--color-border-light);

        .card-title {
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text-primary);
          margin: 0;
        }
      }

      .card-body {
        padding: var(--spacing-lg);
      }
    }

    .chips-container {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-sm);
    }

    .chip {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-sm);
      padding: var(--spacing-sm) var(--spacing-md);
      background: var(--color-surface-hover);
      border-radius: var(--radius-full);
      border: 1px solid var(--color-border-light);
      transition: all var(--transition-fast);

      &:hover {
        background: var(--color-surface-active);
        transform: scale(1.05);
      }

      .chip-label {
        font-size: var(--font-size-sm);
        color: var(--color-text-primary);
      }

      .chip-badge {
        background: var(--color-primary);
        color: white;
        padding: 2px 8px;
        border-radius: var(--radius-full);
        font-size: var(--font-size-xs);
        font-weight: var(--font-weight-semibold);
      }
    }

    .list-container {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
    }

    .list-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--spacing-md);
      background: var(--color-surface-hover);
      border-radius: var(--radius-md);
      transition: all var(--transition-fast);

      &:hover {
        background: var(--color-surface-active);
        transform: translateX(4px);
      }

      .list-label {
        font-size: var(--font-size-base);
        color: var(--color-text-primary);
      }

      .list-badge {
        background: var(--color-primary);
        color: white;
        padding: 4px 12px;
        border-radius: var(--radius-full);
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-semibold);
      }
    }

    .financial-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--spacing-lg);
    }

    .financial-item {
      text-align: center;
      padding: var(--spacing-lg);
      background: var(--color-surface-hover);
      border-radius: var(--radius-md);
      transition: all var(--transition-fast);

      &:hover {
        background: var(--color-surface-active);
        transform: scale(1.05);
      }

      .financial-label {
        display: block;
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        margin-bottom: var(--spacing-sm);
      }

      .financial-value {
        font-size: var(--font-size-2xl);
        font-weight: var(--font-weight-bold);
        margin: 0;

        &.success {
          color: var(--color-success);
        }

        &.danger {
          color: var(--color-error);
        }

        &.info {
          color: var(--color-info);
        }

        &.warning {
          color: var(--color-warning);
        }
      }
    }

    .table-card {
      margin-bottom: var(--spacing-xl);
    }

    .table-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: var(--radius-full);
      font-size: var(--font-size-xs);
      font-weight: var(--font-weight-semibold);

      &.badge-success {
        background: rgba(16, 185, 129, 0.1);
        color: var(--color-success);
      }

      &.badge-warning {
        background: rgba(245, 158, 11, 0.1);
        color: var(--color-warning);
      }
    }

    .empty-state {
      text-align: center;
      padding: var(--spacing-xl);
      color: var(--color-text-secondary);
      font-size: var(--font-size-base);
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--spacing-4xl);
      gap: var(--spacing-lg);

      .loading-text {
        color: var(--color-text-secondary);
        font-size: var(--font-size-base);
        margin: 0;
      }
    }

    @media (max-width: 768px) {
      .dashboard {
        padding: var(--spacing-md);
      }

      .stats-grid,
      .content-grid {
        grid-template-columns: 1fr;
      }

      .page-header .page-title {
        font-size: var(--font-size-3xl);
      }

      .financial-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  protected readonly t = inject(TranslationService).t;
  protected readonly languageService = inject(LanguageService);
  private readonly dashboardService = inject(DashboardService);
  
  readonly loading = signal(false);
  
  readonly stats = signal({
    totalCases: 0,
    approved: { count: 0, percentage: 0 },
    underReview: { count: 0, percentage: 0 },
    totalNeeds: 0,
    unfulfilled: 0,
    unfulfilledPct: 0
  });

  readonly needs = signal<Array<{ type: string; total: number; fulfilled: number; pending: number }>>([]);
  readonly statusCounts = signal<Array<{ name: string; count: number }>>([]);
  readonly locations = signal<Array<{ governorate: string; count: number }>>([]);
  readonly financial = signal({ avgIncome: 0, avgExpenses: 0, avgNetIncome: 0, totalDebt: 0 });

  readonly displayedColumns = ['type', 'total', 'fulfilled', 'pending'];

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading.set(true);
    this.dashboardService.getStatistics().pipe(
      finalize(() => this.loading.set(false))
    ).subscribe({
      next: (data) => {
        // Update summary stats
        this.stats.set({
          totalCases: data.summary.totalCases,
          approved: {
            count: data.summary.approved.count,
            percentage: data.summary.approved.percentage
          },
          underReview: {
            count: data.summary.underReview.count,
            percentage: data.summary.underReview.percentage
          },
          totalNeeds: data.summary.totalNeeds,
          unfulfilled: data.summary.unfulfilledNeeds,
          unfulfilledPct: data.summary.unfulfilledPercentage
        });

        // Update needs distribution
        this.needs.set(data.needsDistribution);

        // Update status distribution
        this.statusCounts.set(data.statusDistribution);

        // Update geographic distribution
        this.locations.set(data.geographicDistribution);

        // Update financial statistics
        this.financial.set({
          avgIncome: Math.round(data.financialStatistics.avgIncome),
          avgExpenses: Math.round(data.financialStatistics.avgExpenses),
          avgNetIncome: Math.round(data.financialStatistics.avgNetIncome),
          totalDebt: Math.round(data.financialStatistics.totalDebt)
        });
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
        // Keep default values on error
      }
    });
  }
}

export { DashboardComponent as Dashboard };

