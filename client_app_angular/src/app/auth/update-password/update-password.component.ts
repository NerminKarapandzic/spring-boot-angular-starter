import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {SnackbarService} from "../../lib/services/layout/snackbar.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../lib/services/auth.service";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit{

  resetPassword = this.fb.nonNullable.group({
    password: ['', [Validators.required, Validators.minLength(8)]]
  }, {updateOn: 'blur'})
  route: ActivatedRoute = inject(ActivatedRoute);
  authService: AuthService = inject(AuthService);
  passwordResetToken!: string;

  constructor(
    private fb: FormBuilder,
    private snackbarService: SnackbarService
  ) {}

  async onSubmit() {
    console.log('update password')
    lastValueFrom(this.authService.resetPassword(this.passwordResetToken, this.resetPassword.getRawValue().password))
      .then(() => {
        console.log('password reset')
      })
      .catch(err => {
        this.snackbarService.handleError(err);
      })
  }

  ngOnInit(): void {
    this.passwordResetToken = this.route.snapshot.params['token'];
  }

}
