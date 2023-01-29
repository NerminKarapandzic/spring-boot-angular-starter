import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, DecimalPipe, NgClass, NgIf} from "@angular/common";
import {HealthIndicatorComponent} from "./health-indicator/health-indicator.component";
import {MetricsService} from "../../lib/services/admin/metrics.service";
import {catchError, interval, map, Observable, of, startWith, switchMap} from "rxjs";
import {DiskInfoComponent} from "./disk-info/disk-info.component";
import {DatabaseInfoComponent} from "./database-info/database-info.component";
import {ApplicationInfoComponent} from "./application-info/application-info.component";
import {Info, Status} from "../../lib/types/Metrics.types";
import {LineChartModule, ScaleType} from "@swimlane/ngx-charts";
import {ChartData} from "../../lib/types/Charts.types";
import {AdminConsoleModule} from "../admin-console.module";
import {HttpRequestMetricsComponent} from "./http-request-metrics/http-request-metrics.component";

@Component({
  selector: 'app-admin-console-home',
  templateUrl: './admin-console-home.component.html',
  styleUrls: ['./admin-console-home.component.scss'],
  imports: [
    AsyncPipe,
    NgIf,
    HealthIndicatorComponent,
    DecimalPipe,
    NgClass,
    DiskInfoComponent,
    DatabaseInfoComponent,
    ApplicationInfoComponent,
    LineChartModule,
    HttpRequestMetricsComponent,
  ],
  standalone: true
})
export class AdminConsoleHomeComponent implements OnInit{

  metricsService = inject(MetricsService);
  status$: Observable<Status | null> = this.metricsService.status$;
  info$: Observable<Info | null> | null = null;

  selectedTab: string = 'httpRequests';

  ngOnInit() {
    this.metricsService.getMetrics()
    this.metricsService.getMetric('jvm.memory.used')
    this.metricsService.getMetric('jvm.memory.max')
    this.metricsService.getHttpRequestsStatistics()

      this.metricsService.getMetric('process.cpu.usage')

    this.info$ = this.metricsService.getInfo()
    this.status$ = interval(1000).pipe(
      startWith(0),
      switchMap(() => this.metricsService.getStatus().pipe(
        map(status => {
          return status;
        }),
        catchError(err => {
          return of(null);
        })
      ))
    )
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
}
