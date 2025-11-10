import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslationService } from '../../../core/services/translation.service';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="mt-12 pt-8 pb-6 border-t border-gray-200 bg-white" [dir]="languageService.isRTL() ? 'rtl' : 'ltr'">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex flex-col items-center justify-center gap-3">
          <!-- Main Footer Text -->
          <p class="text-lg md:text-xl font-semibold text-gray-800 flex items-center gap-2">
            <span class="text-primary-500 animate-pulse">❤</span>
            <span>{{ t().footerText }}</span>
            <span class="text-primary-500 animate-pulse">❤</span>
          </p>
          
          <!-- Copyright Text -->
          <p class="text-sm text-gray-600">
            {{ t().copyright }}
          </p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  protected readonly t = inject(TranslationService).t;
  protected readonly languageService = inject(LanguageService);
}

export { FooterComponent as Footer };
