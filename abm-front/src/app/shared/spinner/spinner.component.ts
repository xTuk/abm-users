import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'spinner',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  template: ` <div class="flex justify-center mt-4">
    <mat-spinner></mat-spinner>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {}
