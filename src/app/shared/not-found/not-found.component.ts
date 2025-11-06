import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container" style="text-align:center; padding: 64px 16px;">
      <h1>الصفحة غير موجودة</h1>
      <p>تعذر العثور على الصفحة المطلوبة.</p>
      <a mat-flat-button color="primary" [routerLink]="'/'">العودة للرئيسية</a>
    </div>
  `
})
export class NotFoundComponent {}

export { NotFoundComponent as NotFound };

