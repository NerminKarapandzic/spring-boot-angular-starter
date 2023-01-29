import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticatedUserDropdownComponent } from './authenticated-user-dropdown.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    AuthenticatedUserDropdownComponent
  ],
  exports: [
    AuthenticatedUserDropdownComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterLink
  ]
})
export class AuthenticatedUserDropdownModule { }
