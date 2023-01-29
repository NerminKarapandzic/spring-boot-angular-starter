import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminOnlyDirective} from "./admin-only.directive";

@NgModule({
  declarations: [
    AdminOnlyDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AdminOnlyDirective
  ]
})
export class AdminOnlyModule { }
