import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer">
      <div class="container">
        <p class="mb-0">
          <span class="heart">❤</span>
          نظام إدارة الحالات - صغيري
          <span class="heart">❤</span>
        </p>
        <small class="muted">© 2025 جميع الحقوق محفوظة</small>
      </div>
    </footer>
  `
})
export class FooterComponent {}

export { FooterComponent as Footer };

