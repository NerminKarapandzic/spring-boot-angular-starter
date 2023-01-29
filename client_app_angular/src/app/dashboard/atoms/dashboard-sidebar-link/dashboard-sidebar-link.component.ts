import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

export interface MenuItem {
  link: string;
  label: string;
  icon: IconProp;
}

@Component({
  selector: 'app-dashboard-sidebar-link',
  templateUrl: './dashboard-sidebar-link.component.html',
  styleUrls: ['./dashboard-sidebar-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    RouterLinkActive,
    FontAwesomeModule
  ],
  standalone: true
})
export class DashboardSidebarLinkComponent {

  @Input() menuItem!: MenuItem

}
