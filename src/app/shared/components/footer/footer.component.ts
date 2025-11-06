import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="mt-12 pt-8 pb-6 border-t border-gray-200 bg-white" dir="rtl">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex flex-col items-center justify-center gap-3">
          <!-- Main Footer Text -->
          <p class="text-lg md:text-xl font-semibold text-gray-800 flex items-center gap-2">
            <span class="text-primary-500 animate-pulse">❤</span>
            <span>نظام إدارة الحالات - صغيري</span>
            <span class="text-primary-500 animate-pulse">❤</span>
          </p>
          
          <!-- Copyright Text -->
          <p class="text-sm text-gray-600">
            © 2025 جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}

export { FooterComponent as Footer };
