import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "../../lib/services/auth.service";
import {MenuItem} from "../atoms/dashboard-sidebar-link/dashboard-sidebar-link.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  sidebarOpen = true;

  authService = inject(AuthService);
  menuItems: MenuItem[] = [
    {
      link: '/dashboard',
      label: 'Dashboard',
      icon: 'home'
    }
  ]

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  ngOnInit() {

  }
}
