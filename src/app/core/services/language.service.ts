import { Injectable, inject, signal, effect, computed } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type Language = 'ar' | 'en';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly document = inject(DOCUMENT);
  private readonly storageKey = 'saghery-language';
  
  readonly currentLanguage = signal<Language>(this.getInitialLanguage());
  readonly isRTL = computed(() => this.currentLanguage() === 'ar');

  constructor() {
    // Set initial HTML attributes
    const initialLang = this.currentLanguage();
    const htmlElement = this.document.documentElement;
    htmlElement.setAttribute('lang', initialLang);
    htmlElement.setAttribute('dir', initialLang === 'ar' ? 'rtl' : 'ltr');
    
    // Update HTML attributes when language changes
    effect(() => {
      const lang = this.currentLanguage();
      htmlElement.setAttribute('lang', lang);
      htmlElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
      
      // Save to localStorage
      localStorage.setItem(this.storageKey, lang);
    });
  }

  private getInitialLanguage(): Language {
    // Check localStorage first
    const saved = localStorage.getItem(this.storageKey);
    if (saved === 'ar' || saved === 'en') {
      return saved;
    }
    
    // Check browser language
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('ar')) {
      return 'ar';
    }
    
    // Default to Arabic
    return 'ar';
  }

  setLanguage(lang: Language): void {
    this.currentLanguage.set(lang);
  }

  toggleLanguage(): void {
    const newLang = this.currentLanguage() === 'ar' ? 'en' : 'ar';
    this.setLanguage(newLang);
  }
}

