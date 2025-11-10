import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { SessionStore } from '../../../core/state/session.store';
import { AuthService } from '../../../core/services/auth.service';
import { LanguageService } from '../../../core/services/language.service';
import { TranslationService } from '../../../core/services/translation.service';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatIconModule, RouterLink, NgOptimizedImage, MatMenuModule, MatButtonModule, MatDividerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .header {
      height: 64px;
      padding: 0 var(--spacing-lg);
      box-shadow: var(--shadow-md);
      position: relative;
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
    }

    .brand {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      text-decoration: none;
      color: white;
      font-weight: var(--font-weight-bold);
      font-size: var(--font-size-xl);
      transition: all var(--transition-base);
      padding: var(--spacing-sm) var(--spacing-md);
      border-radius: var(--radius-md);
      margin-left: var(--spacing-md);

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        transform: translateY(-1px);
      }

      &:active {
        transform: translateY(0);
      }
    }

    .brand-logo {
      width: 32px;
      height: 32px;
      object-fit: contain;
    }

    .brand-text {
      font-family: 'Cairo', sans-serif;
      letter-spacing: 0.5px;
    }

    .spacer {
      flex: 1;
    }

    .user-btn,
    .lang-btn {
      width: 40px;
      height: 40px;
      padding: 0;
      margin-left: var(--spacing-md);
      transition: all var(--transition-base);

      &:hover {
        transform: scale(1.05);
      }

      &:focus-visible {
        outline: 2px solid rgba(255, 255, 255, 0.5);
        outline-offset: 2px;
      }
    }

    .lang-btn {
      .lang-icon {
        width: 24px;
        height: 24px;
        font-size: 20px;
        font-weight: var(--font-weight-semibold);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all var(--transition-base);
      border: 2px solid rgba(255, 255, 255, 0.3);

      mat-icon {
        color: white;
        font-size: 20px;
        width: 20px;
        height: 20px;
      }
    }

    .user-btn:hover .avatar {
      background: rgba(255, 255, 255, 0.3);
      border-color: rgba(255, 255, 255, 0.5);
      transform: scale(1.05);
    }

    :host ::ng-deep .user-menu-panel {
      margin-top: var(--spacing-sm);
      min-width: 240px;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-xl);
      border: 1px solid var(--color-border-light);
      overflow: hidden;
    }

    .user-menu-header {
      padding: var(--spacing-lg);
      background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
      color: white;
    }

    .user-info {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
    }

    .user-info .name {
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-semibold);
      line-height: 1.4;
    }

    .user-info .role {
      font-size: var(--font-size-sm);
      opacity: 0.9;
      font-weight: var(--font-weight-regular);
    }

    :host ::ng-deep .user-menu-panel .mat-mdc-menu-item {
      padding: var(--spacing-md) var(--spacing-lg);
      min-height: 48px;
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      transition: all var(--transition-fast);

      &:hover {
        background-color: var(--color-surface-hover);
      }

      .mi {
        margin-right: 0;
        margin-left: 0;
        width: 20px;
        height: 20px;
        font-size: 20px;
        color: var(--color-text-secondary);
      }

      span {
        font-size: var(--font-size-base);
        font-weight: var(--font-weight-regular);
        color: var(--color-text-primary);
      }

      &:hover .mi {
        color: var(--color-primary);
      }
    }

    :host ::ng-deep .user-menu-panel mat-divider {
      margin: var(--spacing-xs) 0;
      border-color: var(--color-border-light);
    }

    @media (max-width: 768px) {
      .header {
        padding: 0 var(--spacing-md);
        height: 56px;
      }

      .brand-text {
        font-size: var(--font-size-lg);
      }

      .brand-logo {
        width: 28px;
        height: 28px;
      }

      :host ::ng-deep .user-menu-panel {
        min-width: 200px;
      }
    }
  `],
  template: `
    <mat-toolbar color="primary" class="header" [dir]="languageService.isRTL() ? 'rtl' : 'ltr'">
      @if (session.isAuthenticated()) {
        <button mat-icon-button [matMenuTriggerFor]="userMenu" class="user-btn" aria-label="User menu">
          <div class="avatar"><mat-icon>person</mat-icon></div>
        </button>
        <mat-menu #userMenu="matMenu" xPosition="after" yPosition="below" [overlapTrigger]="false" class="user-menu-panel">
          <div class="user-menu-header">
            <div class="user-info">
              <span class="name">{{ session.fullName() }}</span>
              @if (session.role()) { <span class="role">{{ session.role() }}</span> }
            </div>
          </div>
          <mat-divider></mat-divider>
          <button mat-menu-item [routerLink]="'/users/profile'">
            <mat-icon class="mi">account_circle</mat-icon>
            <span>{{ t().profile }}</span>
          </button>
          <button mat-menu-item [routerLink]="'/users/change-password'">
            <mat-icon class="mi">lock</mat-icon>
            <span>{{ t().changePassword }}</span>
          </button>
          <button mat-menu-item (click)="onLogout()">
            <mat-icon class="mi">logout</mat-icon>
            <span>{{ t().logout }}</span>
          </button>
        </mat-menu>
      }
      <button mat-icon-button (click)="toggleLanguage()" class="lang-btn" [attr.aria-label]="languageService.currentLanguage() === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'">
        <div class="lang-icon">{{ languageService.currentLanguage() === 'ar' ? 'EN' : 'AR' }}</div>
      </button>
      <ng-content />
      <span class="spacer"></span>
      <a class="brand" [routerLink]="homeLink()">
        <img ngSrc="assets/logo.svg" width="28" height="28" class="brand-logo" alt="logo" />
        <span class="brand-text">صغيري</span>
      </a>
    </mat-toolbar>
  `
})
export class HeaderComponent {
  protected readonly session = inject(SessionStore);
  readonly homeLink = input<string>('/');
  protected readonly languageService = inject(LanguageService);
  protected readonly t = inject(TranslationService).t;
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  onLogout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }
}

export { HeaderComponent as Header };

