import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import {LayoutsModule} from "../layouts/layouts.module";
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import {FormControlErrorsModule} from "../lib/components/form-control-errors/form-control-errors.module";



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    UpdatePasswordComponent,
    VerifyAccountComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent
      },
      {
        path: 'verify/:token',
        component: VerifyAccountComponent
      },
      {
        path: 'reset-password/:token',
        component: UpdatePasswordComponent
      }
    ]),
    ReactiveFormsModule,
    LayoutsModule,
    FormControlErrorsModule
  ]
})
export class AuthModule { }
