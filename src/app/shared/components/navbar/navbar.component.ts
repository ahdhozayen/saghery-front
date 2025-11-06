import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

export interface NavLink {
  label: string;
  icon?: string;
  link: string;
  requiresAdmin?: boolean;
}

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .navbar {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      flex: 1;
      justify-content: flex-end;
      margin-left: var(--spacing-md);
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      padding: var(--spacing-sm) var(--spacing-md);
      color: rgba(255, 255, 255, 0.9);
      text-decoration: none;
      border-radius: var(--radius-md);
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-medium);
      transition: all var(--transition-base);
      position: relative;
      white-space: nowrap;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        color: white;
        transform: translateY(-1px);
      }

      &:active {
        transform: translateY(0);
      }

      &.active {
        background-color: rgba(255, 255, 255, 0.15);
        color: white;
        font-weight: var(--font-weight-semibold);

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 50%;
          transform: translateX(50%);
          width: 60%;
          height: 2px;
          background-color: white;
          border-radius: 2px 2px 0 0;
        }

        .nav-icon {
          color: white;
        }
      }

      &:focus-visible {
        outline: 2px solid rgba(255, 255, 255, 0.5);
        outline-offset: 2px;
      }
    }

    .nav-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
      color: rgba(255, 255, 255, 0.8);
      transition: all var(--transition-base);
      margin-left: 0;
      margin-right: 0;
    }

    .nav-item:hover .nav-icon,
    .nav-item.active .nav-icon {
      color: white;
    }

    .nav-label {
      line-height: 1.5;
    }

    @media (max-width: 768px) {
      .navbar {
        gap: var(--spacing-xs);
        margin-left: var(--spacing-sm);
      }

      .nav-item {
        padding: var(--spacing-xs) var(--spacing-sm);
        font-size: var(--font-size-sm);
        gap: var(--spacing-xs);

        .nav-label {
          display: none;
        }

        .nav-icon {
          font-size: 22px;
          width: 22px;
          height: 22px;
        }
      }
    }

    @media (max-width: 480px) {
      .navbar {
        gap: 0;
      }

      .nav-item {
        padding: var(--spacing-xs);
        min-width: 40px;
        justify-content: center;
      }
    }
  `],
  template: `
    <nav class="navbar">
      @for (item of items(); track item.link) {
        <a [routerLink]="item.link" routerLinkActive="active" class="nav-item">
          @if (item.icon) {
            <mat-icon [fontSet]="'material-icons-outlined'" [fontIcon]="item.icon" class="nav-icon"></mat-icon>
          }
          <span class="nav-label">{{ item.label }}</span>
        </a>
      }
    </nav>
  `
})
export class NavbarComponent {
  readonly items = input.required<NavLink[]>();
}

export { NavbarComponent as Navbar };

