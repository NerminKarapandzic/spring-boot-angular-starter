import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";
import {AuthService} from "../../lib/services/auth.service";
import {lastValueFrom} from "rxjs";
import {SnackbarService} from "../../lib/services/layout/snackbar.service";

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent implements OnInit {


  route: ActivatedRoute = inject(ActivatedRoute);
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  snackbarService: SnackbarService = inject(SnackbarService);


  ngOnInit() {
    let token = this.route.snapshot.params['token'];
    if (token) {
      console.log(token);
      lastValueFrom(this.authService.verifyAccount(token))
        .then(() => {
          this.router.navigate(['/dashboard']);
        })
        .catch(err => {
          this.snackbarService.handleError(err);
        })
    }
  }
}
