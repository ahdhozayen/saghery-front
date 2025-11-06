import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { NavbarComponent, NavLink } from '../components/navbar/navbar.component';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, NavbarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .layout {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background-color: var(--color-background);
    }

    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: var(--spacing-lg);
    }

    .main-content {
      flex: 1;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
    }

    .page {
      flex: 1;
      width: 100%;
    }

    .page.centered {
      display: flex;
      flex-direction: column;
    }

    @media (max-width: 768px) {
      .content {
        padding: var(--spacing-md);
      }

      .main-content {
        max-width: 100%;
      }
    }
  `],
  template: `
    <div class="layout">
      <app-header>
        <app-navbar [items]="navItems" />
      </app-header>
      <div class="content">
        <div class="main-content">
          <div class="page centered">
            <router-outlet />
          </div>
          <app-footer />
        </div>
      </div>
    </div>
  `
})
export class ShellComponent {
  readonly navItems: NavLink[] = [
    { label: 'الحالات', icon: 'folder_open', link: '/cases' },
    { label: 'حالة جديدة', icon: 'add_circle', link: '/cases/new' },
    { label: 'المستخدمين', icon: 'group', link: '/users' },
  ];
}

export { ShellComponent as Shell };

