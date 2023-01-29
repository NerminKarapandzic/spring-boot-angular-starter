import {Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import {SnackbarService} from "../../lib/services/layout/snackbar.service";
import {AuthService} from "../../lib/services/auth.service";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService) { }

  ngOnInit() {}

  async onSubmit() {
    console.log(this.loginForm.value);
    lastValueFrom(this.authService.login(this.loginForm.getRawValue().email, this.loginForm.getRawValue().password))
      .then(() => {
        this.router.navigate(['/dashboard']);
      })
      .catch((err) => {
        this.snackbarService.handleError(err);
      })
  }

}
