import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-delete',
  imports: [MatButtonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container">
      <h2>تأكيد حذف المستخدم</h2>
      <div style="display:flex; gap: 8px;">
        <button mat-stroked-button color="warn">حذف</button>
        <a mat-button [routerLink]="'/users'">إلغاء</a>
      </div>
    </div>
  `
})
export class UserDeleteComponent {}

export { UserDeleteComponent as UserDelete };

