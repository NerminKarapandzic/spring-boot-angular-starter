import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {SnackbarService} from "../services/layout/snackbar.service";
import {AuthService} from "../services/auth.service";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private errorHandlerService: SnackbarService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return next.handle(request.clone({setHeaders: {Authorization: 'Bearer ' + localStorage.getItem('token')}}))
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error(error.message))
        })
      )
  }
}
