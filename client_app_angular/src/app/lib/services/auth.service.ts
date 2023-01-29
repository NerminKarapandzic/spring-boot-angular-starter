import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of, switchMap, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {TokenResponse, User} from "../types/Auth.types";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ : Observable<boolean> = this.isLoggedIn.asObservable();
  private loggedInUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public logedInUSer$ : Observable<User | null> = this.loggedInUser.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    console.log('AuthService constructor');

  }

  login(email: string, password: string) {
    console.log('AuthService login');
    return this.http.post<TokenResponse>(environment.apiBaseUrl + '/auth/login', {email, password})
      .pipe(
        tap({
          next: (tokenResponse) => {
            this.isLoggedIn.next(true);
            localStorage.setItem('token', tokenResponse.token);
            this.loggedInUser.next(tokenResponse.user);
          },
          error: (error) => {
            this.isLoggedIn.next(false);
            localStorage.removeItem('token');
          }
        })
      )
  }

  requestVerificationCode(email: string) {
    return this.http.get(environment.apiBaseUrl + '/auth/request-verification/' + email)
  }

  verifyAccount(token: any) {
    return this.http.post(environment.apiBaseUrl + '/auth/verify/' + token, {})
      .pipe(
        tap({
          next: (tokenResponse) => {
            this.isLoggedIn.next(true);
          }
        })
      )
  }

  getUser() {
    return this.http.get<User>(environment.apiBaseUrl + '/auth/me').pipe(
      tap(user => {
        this.loggedInUser.next(user);
        this.isLoggedIn.next(true);
      }
    ))
  }

  resetPassword(passwordResetToken: string, password: string) {
    return this.http.post(environment.apiBaseUrl + '/auth/reset-password/' + passwordResetToken, {password})
  }

  requestPasswordReset(email: string) {
    return this.http.post(environment.apiBaseUrl + '/auth/request-password-reset/' + email, {})
  }

  register(request: any) {
    return this.http.post(environment.apiBaseUrl + '/auth/register', request)
  }

  getCurrentUserValue() {
    return this.loggedInUser.getValue();
  }

  getAuthStatus(): Observable<boolean> {
    return this.isLoggedIn$.pipe(
      switchMap(val => {
        console.log('auth status. isLoggedIn: ', val);
        if (!val && localStorage.getItem('token')) {
          return this.getUser().pipe(
            map(user => {
              console.log('auth status. got user by token: ', user);
              this.isLoggedIn.next(true);
              this.loggedInUser.next(user);
              return true
            }),
            catchError(err => {
              console.log('auth status. failed get user by token: ', err);
              this.isLoggedIn.next(false);
              this.loggedInUser.next(null);
              this.router.navigate(['/auth/login']);
              return of(false)
            })
          )
        }
        return of(true);
      })
    );
  }

}
