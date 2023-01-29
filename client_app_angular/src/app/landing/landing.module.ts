import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { HomeComponent } from './home/home.component';
import {LayoutsModule} from "../layouts/layouts.module";
import { AboutComponent } from './about/about.component';



@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'about',
        component: AboutComponent
      }
    ]),
    LayoutsModule
  ]
})
export class LandingModule { }
