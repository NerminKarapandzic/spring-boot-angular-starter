import {Component, inject, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {MetricsService} from "../../lib/services/admin/metrics.service";

@Component({
  selector: 'app-http-traces',
  templateUrl: './http-traces.component.html',
  styleUrls: ['./http-traces.component.scss'],
  imports: [
    NgForOf
  ],
  standalone: true
})
export class HttpTracesComponent implements OnInit{

  metricsService = inject(MetricsService);

  data: any = [];

  ngOnInit() {
    this.metricsService.getAllEndpoints().subscribe((data) => {
      console.log(data);
    })
    this.metricsService.getHttpTraces().subscribe((data) => {
      console.log(data);
      this.data = data;
    });
  }
}
