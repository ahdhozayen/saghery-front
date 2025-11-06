import { Injectable, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Injectable({ providedIn: 'root' })
export class IconService {
  private readonly iconRegistry = inject(MatIconRegistry);
  private readonly sanitizer = inject(DomSanitizer);

  constructor() {
    this.register();
  }

  private register(): void {
    // Example custom SVG icon (can be swapped to real SVG files later)
    const heartSvg = this.sanitizer.bypassSecurityTrustHtml(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-6.716-4.773-9.428-7.485A6.667 6.667 0 1 1 12 5.143a6.667 6.667 0 1 1 9.428 8.372C18.716 16.227 12 21 12 21z"/></svg>'
    );
    this.iconRegistry.addSvgIconLiteral('heart', heartSvg);
  }
}


