import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SupabaseImage} from "./supabase-image.component";



@NgModule({
  declarations: [
    SupabaseImage
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SupabaseImage
  ]
})
export class SupabaseImageModule { }
