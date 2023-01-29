import {ChangeDetectorRef, Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ChartData, SeriesData} from "../../../lib/types/Charts.types";
import {MetricsService} from "../../../lib/services/admin/metrics.service";
import {catchError, interval, map, startWith, Subject, switchMap, takeUntil} from "rxjs";
import {LineChartModule} from "@swimlane/ngx-charts";
import {DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {AvailableTags} from "../../../lib/types/Metrics.types";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ActuatorTagsComponent} from "../actuator-tags/actuator-tags.component";

@Component({
  selector: 'app-http-request-metrics',
  templateUrl: './http-request-metrics.component.html',
  styleUrls: ['./http-request-metrics.component.scss'],
  imports: [
    LineChartModule,
    NgIf,
    DecimalPipe,
    NgForOf,
    FontAwesomeModule,
    ActuatorTagsComponent
  ],
  standalone: true
})
export class HttpRequestMetricsComponent implements OnInit, OnDestroy{

  metricsService = inject(MetricsService);
  cdref = inject(ChangeDetectorRef);
  destroyed$: Subject<boolean> = new Subject();

  metrics: ChartData = {
    seriesData: [
      {
        name: 'count',
        series: []
      }
    ]
  }

  totalTime: number = 0;
  maxTime: number = 0;
  averageTime: number = 0;
  availableTags: AvailableTags[] | null = null;
  selectedFilters: string[] = [];

  ngOnInit() {
    interval(5000).pipe(
        startWith(0),
        switchMap(() => this.metricsService.getHttpRequestsStatistics(this.selectedFilters)
          .pipe(
            map(data => {
              console.log(data)
              if (!this.availableTags ) {
                this.availableTags = data.availableTags;
              }
              const countIndex = 0;
              const totalTimeIndex = 1;
              const maxTimeIndex = 2;

              const time = new Date();
              const countSeries: SeriesData = {
                name: 'count',
                series: [
                  {
                    name: time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds(),
                    value: data.measurements[countIndex].value
                  }
                ]
              }
              this.totalTime = data.measurements[totalTimeIndex].value;
              this.maxTime = data.measurements[maxTimeIndex].value;
              this.averageTime = this.totalTime / data.measurements[countIndex].value;
              if (this.metrics.seriesData[0].series.length == 10) {
                this.metrics.seriesData[0].series.shift();
              }
              this.metrics.seriesData[0].series.push(countSeries.series[0])
              this.metrics.seriesData = [...this.metrics.seriesData]

            }),
            catchError(err => {
              console.log(err);
              return [];
            })
          )
        ),
        takeUntil(this.destroyed$),
      ).subscribe()
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
