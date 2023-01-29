import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-authenticated-user-dropdown',
  templateUrl: './authenticated-user-dropdown.component.html',
  styleUrls: ['./authenticated-user-dropdown.component.scss']
})
export class AuthenticatedUserDropdownComponent {

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  async logout() {
    await this.router.navigate(['/auth/login']);
  }
}
