import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-case-print',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container">
      <h2>طباعة الحالة</h2>
      <p>—</p>
    </div>
  `
})
export class CasePrintComponent {}

export { CasePrintComponent as CasePrint };

