import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ReactiveFormsModule} from "@angular/forms";
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faBell, faCircleXmark, faUser} from "@fortawesome/free-regular-svg-icons";
import {
  faBars,
  faCog,
  faHome,
  faInbox,
  faPenToSquare,
  faTag,
  faUpload,
  faUsers,
  faTimes, faSliders
} from "@fortawesome/free-solid-svg-icons";
import {EventSnackbarModule} from "./lib/components/event-snackbar/event-snackbar.module";
import {HttpErrorInterceptor} from "./lib/http/http-error.interceptor";
import {AuthService} from "./lib/services/auth.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        FontAwesomeModule,
        EventSnackbarModule,
        HttpClientModule,
        BrowserAnimationsModule
    ],
    providers: [
        HttpErrorInterceptor,
        AuthService,
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
    ],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faBell,
      faUser,
      faBars,
      faCircleXmark,
      faHome,
      faInbox,
      faTag,
      faUsers,
      faPenToSquare,
      faUpload,
      faCog,
      faTimes,
      faSliders
    );
  }
}
