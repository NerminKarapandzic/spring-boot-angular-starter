import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {SnackbarService} from "../../lib/services/layout/snackbar.service";
import {environment} from "../../../environments/environment";
import {AuthService} from "../../lib/services/auth.service";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  resetPassword = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]]
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackbarService: SnackbarService
  ) {}

  async onSubmit() {
    lastValueFrom(this.authService.requestPasswordReset(this.resetPassword.getRawValue().email))
      .then(() => {
        console.log('verification code sent')
      })
      .catch(err => {
        this.snackbarService.handleError(err);
      })
  }
}
