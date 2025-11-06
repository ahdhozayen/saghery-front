import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

export interface SidebarLink {
  label: string;
  icon?: string;
  link: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <aside class="sidebar">
      @for (item of items(); track item.link) {
        <a class="side-item" [routerLink]="item.link" routerLinkActive="active">
          @if (item.icon) {
            <mat-icon class="item-icon">{{ item.icon }}</mat-icon>
          }
          <span class="item-label">{{ item.label }}</span>
        </a>
      }
    </aside>
  `
})
export class SidebarComponent {
  readonly items = input.required<SidebarLink[]>();
}

export { SidebarComponent as Sidebar };

