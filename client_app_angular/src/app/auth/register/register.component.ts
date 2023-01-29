import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {SnackbarService} from "../../lib/services/layout/snackbar.service";
import {Router} from "@angular/router";
import {AuthService} from "../../lib/services/auth.service";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  constructor(
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private router: Router,
    private authService: AuthService) { }


  onSubmit() {
    lastValueFrom(this.authService.register(this.registerForm.getRawValue()))
      .then(() => {
        console.log('Successfully registered')
        this.router.navigate(['/auth/login']);
        this.snackbarService.addMessage({
          message: 'Account created. Verification email will be sent to your email address',
          type: 'success'
        });
      })
      .catch(err => {
        this.snackbarService.handleError(err);
      })

  }
}
