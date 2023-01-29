import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { AdminConsoleComponent } from './admin-console/admin-console.component';
import {DashboardSidebarComponent} from "../dashboard/atoms/dashboard-sidebar/dashboard-sidebar.component";
import {DashboardNavbarComponent} from "../dashboard/atoms/dashboard-navbar/dashboard-navbar.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { AdminConsoleHomeComponent } from './admin-console-home/admin-console-home.component';
import {HealthIndicatorComponent} from "./admin-console-home/health-indicator/health-indicator.component";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {HttpTracesComponent} from "./http-traces/http-traces.component";

@NgModule({
  declarations: [
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        'path': '', 'component': AdminConsoleComponent, 'children': [
          {'path': '', 'component': AdminConsoleHomeComponent},
          {'path': 'httptraces', 'component': HttpTracesComponent},
        ]
      }
    ]),
    DashboardSidebarComponent,
    DashboardNavbarComponent,
    FontAwesomeModule,
    HealthIndicatorComponent,
    NgxChartsModule
  ]
})
export class AdminConsoleModule { }
