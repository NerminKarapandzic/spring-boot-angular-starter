import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {DashboardSidebarLinkComponent, MenuItem} from "../dashboard-sidebar-link/dashboard-sidebar-link.component";
import {
  AuthenticatedUserDropdownModule
} from "../../../lib/components/authenticated-user-dropdown/authenticated-user-dropdown.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DashboardSidebarLinkComponent,
    AuthenticatedUserDropdownModule,
    FontAwesomeModule,
    NgForOf
  ],
  standalone: true
})
export class DashboardSidebarComponent {

  @Input() sidebarOpen!: boolean;
  @Input() menuItems!: MenuItem[];


}
