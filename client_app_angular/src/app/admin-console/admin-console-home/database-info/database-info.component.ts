import {Component, Input} from '@angular/core';
import {HealthIndicatorComponent} from "../health-indicator/health-indicator.component";

@Component({
  selector: 'app-database-info',
  templateUrl: './database-info.component.html',
  styleUrls: ['./database-info.component.scss'],
  imports: [
    HealthIndicatorComponent
  ],
  standalone: true
})
export class DatabaseInfoComponent {
  @Input() status!: string;
  @Input() database!: string;
}
