import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { DashboardComponent } from './dashboard/dashboard.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {
    AuthenticatedUserDropdownModule
} from "../lib/components/authenticated-user-dropdown/authenticated-user-dropdown.module";
import {SupabaseImageModule} from "../lib/components/img/supabase-image.module";
import { MediaComponent } from './media/media.component';
import {LayoutsModule} from "../layouts/layouts.module";
import {MediaModule} from "../lib/components/media/media.module";
import {AdminOnlyModule} from "../lib/directives/admin-only/admin-only.module";
import {DashboardSidebarComponent} from "./atoms/dashboard-sidebar/dashboard-sidebar.component";
import {DashboardNavbarComponent} from "./atoms/dashboard-navbar/dashboard-navbar.component";

@NgModule({
  declarations: [
    DashboardComponent,
    MediaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
        children: [
          {
            path: 'media',
            component: MediaComponent
          }
        ]
      },
    ]),
    FontAwesomeModule,
    AuthenticatedUserDropdownModule,
    SupabaseImageModule,
    LayoutsModule,
    MediaModule,
    AdminOnlyModule,
    DashboardSidebarComponent,
    DashboardNavbarComponent
  ]
})
export class DashboardModule { }
