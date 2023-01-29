import {ChangeDetectionStrategy, Component, inject, Input, OnInit} from '@angular/core';
import {AsyncPipe, LowerCasePipe, NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-health-indicator',
  templateUrl: './health-indicator.component.html',
  styleUrls: ['./health-indicator.component.scss'],
  standalone: true,
  imports: [
    NgClass,
    LowerCasePipe,
    AsyncPipe,
    NgIf
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HealthIndicatorComponent {

  @Input() status!: string;

}
