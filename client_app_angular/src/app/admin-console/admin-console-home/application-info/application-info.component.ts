import {Component, Input} from '@angular/core';
import {HealthIndicatorComponent} from "../health-indicator/health-indicator.component";
import {DecimalPipe} from "@angular/common";

@Component({
  selector: 'app-application-info',
  templateUrl: './application-info.component.html',
  styleUrls: ['./application-info.component.scss'],
  imports: [
    HealthIndicatorComponent,
    DecimalPipe
  ],
  standalone: true
})
export class ApplicationInfoComponent {
  @Input() status!: string;
  @Input() uptime!: number;
}
