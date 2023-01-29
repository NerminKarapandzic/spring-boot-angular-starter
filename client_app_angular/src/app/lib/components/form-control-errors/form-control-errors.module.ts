import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControlErrorsComponent} from "./form-control-errors.component";



@NgModule({
  declarations: [FormControlErrorsComponent],
  imports: [
    CommonModule
  ],
  exports: [
    FormControlErrorsComponent
  ]
})
export class FormControlErrorsModule { }
