import {inject, Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import {map, Observable, of, switchMap} from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AdminOnlyGuard implements CanActivate, CanLoad {

  authService = inject(AuthService);
  router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.getAuthStatus()
      .pipe(
        switchMap( authenticated => {
          if (authenticated) {
            return this.authService.logedInUSer$
              .pipe(
                map(user => {
                  console.log('user: ', user);
                  const decision = !!user?.roles.includes('SUPER_ADMIN');
                  console.log('admin guard decision: ', decision);
                  return decision;
                })
              )
          }
          this.router.navigate(['/login']);
          return of(false);
        })
      )
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.getAuthStatus()
      .pipe(
        switchMap( authenticated => {
          if (authenticated) {
            return this.authService.logedInUSer$
              .pipe(
                map(user => {
                  console.log('user: ', user);
                  const decision = !!user?.roles.includes('SUPER_ADMIN');
                  console.log('admin guard decision: ', decision);
                  return decision;
                })
              )
          }
          this.router.navigate(['/login']);
          return of(false);
        })
      )
  }
}
