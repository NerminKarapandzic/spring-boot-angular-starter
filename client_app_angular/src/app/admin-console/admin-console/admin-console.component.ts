import {Component, inject} from '@angular/core';
import {AuthService} from "../../lib/services/auth.service";
import {MenuItem} from "../../dashboard/atoms/dashboard-sidebar-link/dashboard-sidebar-link.component";
import {DashboardSidebarComponent} from "../../dashboard/atoms/dashboard-sidebar/dashboard-sidebar.component";
import {DashboardNavbarComponent} from "../../dashboard/atoms/dashboard-navbar/dashboard-navbar.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-admin-console',
  templateUrl: './admin-console.component.html',
  styleUrls: ['./admin-console.component.scss'],
  imports: [
    DashboardSidebarComponent,
    DashboardNavbarComponent,
    FontAwesomeModule,
    RouterOutlet
  ],
  standalone: true
})
export class AdminConsoleComponent {

  sidebarOpen = true;

  authService = inject(AuthService);

  menuItems: MenuItem[] = [
    {
      link: '/_',
      label: 'Dashboard',
      icon: 'home'
    },
    {
      link: '/_/httptraces',
      label: 'HTTP Traces',
      icon: 'sliders'
    },
    {
      link: '/_/settings',
      label: 'Settings',
      icon: 'cog'
    }
  ]

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
