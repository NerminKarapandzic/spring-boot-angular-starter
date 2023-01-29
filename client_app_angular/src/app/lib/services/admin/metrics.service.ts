import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, map, tap} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpRequestStatistics, Info, Status} from "../../types/Metrics.types";

@Injectable({
  providedIn: 'root'
})
export class MetricsService {

  private status: BehaviorSubject<Status | null> = new BehaviorSubject<Status | null>(null);
  public status$ = this.status.asObservable();

  http = inject(HttpClient);

  getStatus() {
    return this.http.get<Status>(environment.actuatorBaseUrl + '/health')
      .pipe(map(status => {
        this.status.next(status);
        return status;
      }))
  }

  getInfo() {
    return this.http.get<Info>(environment.actuatorBaseUrl + '/info')
  }

  getMetrics() {
    return this.http.get(environment.actuatorBaseUrl + '/metrics').subscribe(console.log)
  }

  getHttpRequestsStatistics(selectedFilters?: string[]) {
    let queryParams: HttpParams = new HttpParams();
    if (selectedFilters) {
      selectedFilters.forEach(filter => {
        queryParams = queryParams.append('tag', filter);
      })
    }
    return this.http.get<HttpRequestStatistics>(environment.actuatorBaseUrl + '/metrics/http.server.requests', {params: queryParams})
  }

  getMetric(name: string) {
    return this.http.get(environment.actuatorBaseUrl + '/metrics/' + name).subscribe(console.log)
  }

  getHttpTraces() {
    return this.http.get(environment.actuatorBaseUrl + '/httpexchanges')
  }

  getAllEndpoints() {
    return this.http.get(environment.actuatorBaseUrl + '/mappings')
  }
}
