import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container">
      <h2>الملف الشخصي</h2>
      <p>—</p>
    </div>
  `
})
export class UserProfileComponent {}

export { UserProfileComponent as UserProfile };

