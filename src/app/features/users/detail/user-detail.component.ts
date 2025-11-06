import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-user-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container">
      <h2>تفاصيل المستخدم</h2>
      <p>—</p>
    </div>
  `
})
export class UserDetailComponent {}

export { UserDetailComponent as UserDetail };

