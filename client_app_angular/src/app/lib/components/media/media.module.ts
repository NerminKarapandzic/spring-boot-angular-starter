import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MediaComponent} from "./media.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PipesModule} from "../../pipes/pipes.module";
import {SupabaseImageModule} from "../img/supabase-image.module";
import {PaginationModule} from "../pagination/pagination.module";



@NgModule({
  declarations: [
    MediaComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    PipesModule,
    SupabaseImageModule,
    PaginationModule
  ],
  exports: [
    MediaComponent
  ]
})
export class MediaModule { }
