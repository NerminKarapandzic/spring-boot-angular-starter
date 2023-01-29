import {Component, Input} from '@angular/core';
import {HealthIndicatorComponent} from "../health-indicator/health-indicator.component";
import {DecimalPipe} from "@angular/common";

@Component({
  selector: 'app-disk-info',
  templateUrl: './disk-info.component.html',
  styleUrls: ['./disk-info.component.scss'],
  imports: [
    HealthIndicatorComponent,
    DecimalPipe
  ],
  standalone: true
})
export class DiskInfoComponent {
  @Input() total!: number;
  @Input() free!: number;
  @Input() status!: string;

}
