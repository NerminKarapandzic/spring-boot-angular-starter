import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventSnackbarComponent } from './event-snackbar.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {RouterLink} from "@angular/router";



@NgModule({
    declarations: [
        EventSnackbarComponent
    ],
    exports: [
        EventSnackbarComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        RouterLink
    ]
})
export class EventSnackbarModule { }
