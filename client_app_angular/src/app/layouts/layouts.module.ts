import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingLayoutComponent } from './landing-layout/landing-layout.component';
import {RouterLink, RouterOutlet} from "@angular/router";
import { AuthLayoutComponent } from './auth-layou/auth-layout.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PipesModule} from "../lib/pipes/pipes.module";
import {SupabaseImageModule} from "../lib/components/img/supabase-image.module";



@NgModule({
  declarations: [
    LandingLayoutComponent,
    AuthLayoutComponent,
  ],
    exports: [
        LandingLayoutComponent,
        AuthLayoutComponent,
    ],
    imports: [
        CommonModule,
        RouterLink,
        RouterOutlet,
        FontAwesomeModule,
        PipesModule,
        SupabaseImageModule
    ]
})
export class LayoutsModule { }
